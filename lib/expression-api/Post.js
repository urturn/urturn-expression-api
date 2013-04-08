; (function(){
  "use strict";

  UT.Post = function(states){
    if(!states || !states.collections){
      throw new Error("ArgumentError", "Missing collections in state arguments");
    }
    // quicker than bind
    var self = this;

    // scoped properties



    var eventTypesBindings = {}; // handle event bindings for each event type
    var collectionStore = new UT.CollectionStore({
      data: states.collections,
      currentUserId: states.currentUserId,
      delegate: {
        save: function(name, items, callback) {
          UT.Expression._callAPI('collections.save', [name, items], callback);
        },
        authenticate: function(callback) {
          UT.Expression._callAPI('authenticate');
        },
        find: function(name, options, callback) {
          UT.Expression._callAPI('collections.find', [name, options], callback);
        }
      }
    });

    /** 
     * Retrieve Parent Post Datas.
     *
     * This is available only during the first edition of a post
     * if the expression is created from another one.
     */
    var parentCollection;
    if(states.parentData){
      var items = [];
      for(var k in states.parentData){
        states.parentData[k]._key = k;
        items.push(states.parentData[k]);
      }
      parentCollection = new UT.Collection({
        data: {
          name: 'parent',
          items: items,
          count: items.length
        },
        delegate: {
          save: function(){
            throw new Error('ReadOnly collection');
          },
          authenticate: function(){
            throw new Error('ReadOnly collection');
          }
        },
        currentUserId: states.currentUserId
      });
    }

    // scoped functions



    var setNote = function(value){
      states.note = value;
      UT.Expression._callAPI('document.setNote', [states.note]);
      return value;
    };

    this.__defineGetter__('note', function() {
      return states.note;
    });
    this.__defineSetter__('note', function(value) {
      return setNote(value);
    });

    // Public Properties

    /**
     * context of the current editor
     * - player: true if in player mode
     * - editor: true if in editor mode
     * - thumbnail: true if in thumbnail mode
     * - privacy: one of 'private', 'unlisted' or 'public' the current state of the document publication.
     *
     * Those attributes should not be modified as the context is read-only.
     * read-only
     */
    var context = this.context = {
      player: false,
      editor: false,
      thumbnail: false,
      privacy: null
    };
    // set the proper context values
    if(states.mode == 'edit'){
      context.editor = true;
    } else if(states.mode == 'player'){
      context.player = true;
    }
    context.privacy = states.documentPrivacy;

    /**
     * Retrieve the public url of the document.
     *
     * read-only
     */
    var url = this.url = states.documentURL;

    /**
     * the expression outter dom node
     */
    var node = this.node = document.querySelector('.webdoc_expression_wrapper');
    if(!node){
      throw new Error('Missing wrapper node');
    }

    // Public Functions

    /**
     * Native text input for mobile.
     *
     * if options is passed, it might contains:
     * - value, the default value,
     * - max, the number of chars allowed,
     * - multiline, if true, allow for a multiline text input
     *
     * The callback will be passed the resulting string or null
     * if no value have been selected.
     *
     * XXX: Need to be supported on desktop as well
     */
    var textDialog = function(options, callback){
      if(typeof options == 'function'){
        callback = options;
        options = {};
      }
      UT.Expression._callAPI(
        'document.textInput',
        [options.value || null, options.max || null, options.multiline || false],
        callback
      );
    };

    var imageDialog = function(options, callback) {
      UT.Expression._callAPI(
        'medias.openImageChooser',
        [options],
        function(imageDescriptor) {
          var image = new UT.Image();
          image.init(imageDescriptor);
          callback.call(self, image);
      });
    };

    var soundDialog = function(options, callback) {
      UT.Expression._callAPI(
        'medias.openSoundChooser',
        [options],
        function(soundDecriptor) {
          var sound = new UT.Sound(soundDecriptor);
          callback.call(self, sound);
      });
      UT.Expression._callAPI('medias.openSoundChooser', [options], callback);
    };

    var videoDialog = function(options, callback) {
      UT.Expression._callAPI(
        'medias.openVideoChooser',
        [options],
        function(videoDescriptor) {
          var video = new UT.Video(videoDescriptor);
          callback.call(self, video);
      });
    };

    var cropDialog = function(options, callback) {
      if (options.image.descriptor) {
        options.image = options.image.descriptor;
      }
      UT.Expression._callAPI('medias.crop', [options],
        function(imageDescriptor) {
          var image = null;
          if (options.image.init) {
            options.image.init(imageDescriptor);
            image = options.image;
          }
          else {
            image = new UT.Image();
            image.init(imageDescriptor);
          }
          callback.call(self, image);
      });
    };

    // Handler for the various dialog type
    var dialogHandler = {
      text: textDialog,
      image: imageDialog,
      sound: soundDialog,
      video: videoDialog,
      crop: cropDialog
    };


    /**
     * Calls all fns in the list for a given eventName. Passes arguments
     * through to the caller.
     * @params {String} eventName The eventName to fire
     */
    var fire = this.fire = function(eventName) {
      var list = eventTypesBindings[eventName],
          promises = [],
          nextTrigger = 'after' + eventName.charAt(0).toUpperCase() + eventName.slice(1),
          listLength,
          listIndex,
          callbackFunction,
          callbackArgs,
          promise;

      // Nothing to fire
      if (!list) {
        return;
      }

      // We copy the list in case the original mutates while we're
      // looping over it. We take the arguments, lop of the first entry,
      // and pass the rest to the listeners when we call them.
      list = list.slice(0);
      listLength = list.length;
      listIndex = -1;
      callbackArgs = Array.prototype.slice.call(arguments, 1);
      callbackTarget = (callbackArgs.length !== 0 ? callbackArgs[0] : self);

      while (++listIndex < listLength) {
        callbackFunction = list[listIndex];
        promise = callbackFunction.apply(callbackTarget, callbackArgs);
        if(promise && typeof promise.then === 'function') {
          promises.push(promise);
        }
      }

      if(promises.length > 0) {
        when.all(promises).then(function() {
          fire(nextTrigger);
        });
      }
      else {
        fire(nextTrigger);
      }
    };

    /**
     * Register a listener for the given eventName.
     *
     * Available events:
     *
     * publish callback()
     * ------------------
     * Fired when the user wants to post his content. The callback 
     * will be called on the Post instance and receive no argument.
     * It must be runnable synchronously as the current context 
     * will be destroyed after all callbacks as been processed.
     *
     * scroll callback(ScrollDataEvent)
     * --------------------------------
     * Fired every time the visible part of the iframe
     * on the page change. 
     * the callback is passed the scrolling data.
     * XXX what are the scrolling data?
     *
     * resize callback(ResizeEvent)
     * ----------------------------
     * Fired when the content box size changed. The callback is
     * called on the event and will be passed the ResizeEvent instance.
     *
     * media callback(MediaEvent)
     * --------------------------
     * Fired when a media is incoming from an external action
     * like a bookmarklet adding a resource or a drag and drop.
     * The callback is called on the event and will be passed a
     * the MediaEvent instance.
     */
    var on = this.on = function(eventName, callback) {
      var list = eventTypesBindings[eventName] || (eventTypesBindings[eventName] = []);

      // This callback is not a function
      if (typeof callback !== 'function') {
        return;
      }

      list.push(callback);
    };

    /**
     * Removes the given callback for the given eventName.
     *
     * @param {String} eventName
     * @param {Function} callback to remove
     */
    var off = this.off = function(eventName, callback) {
      var list = eventTypesBindings[eventName],
      l;

      // Nothing to unbind
      if (!list) {
        return;
      }

      // No function specified, so unbind all by removing the list
      if (!callback) {
        delete eventTypesBindings[eventName];
        return;
      }

      // Remove all occurences of this function from the list
      l = list ? list.indexOf(callback) : -1;

      while (l !== -1) {
        list.splice(l, 1);
        l = list.indexOf(callback);
      }
    };

    /**
     * Flag a post as being valid or not.
     * A valid document can be posted synchronously at any time.
     * 
     * @param flag {boolean} if provided, set the current validity state.
     * @return {boolean} the current validity flag
     */
    var valid = this.valid = function(flag){
      if(flag !== undefined && flag != states.readyToPost ){
        states.readyToPost = !!flag;
        UT.Expression._callAPI('document.readyToPost', [states.readyToPost]);
      }
      return states.readyToPost;
    };

    /**
     * on the callback function to the scrollChanged event.
     * The function will receive the new scroll values.
     * @param {function} callback will be passed the new scrollvalues
     */
    var scrollChanged = this.scollChanged = function(callback) {
      on('scrollChanged', callback);
    };

    /**
     * on the callback function to the imageAdded event.
     * The function will receive the image and optional extraData param.
     * @param {Function} callback
     */
    var imageAdded = this.imageAdded = function(callback) {
      on('imageAdded', callback);
    };

    /**
     * Create the dialog of the given type using an options object and
     * retrieve the dialog output in the callback.
     */
    var dialog = this.dialog = function(type, options, callback) {
      if (callback === undefined && typeof(options) === 'function') {
        callback = options;
        options = {};
      }
      if(dialogHandler[type]){
        dialogHandler[type](options, callback);
      } else {
        throw new Error('InvalidArgument', 'unknown dialog type ' + type);
      }
    };

    /**
     * Ask the container to resize to the given parameters.
     *
     * The asynchronous result of this function can be listened on
     * the DOM node event.
     * size can be one of:
     * - {height: Number} an object containing the height in pixels
     * - {height: '133px'} an object continaing the height in a css string
     * - Number the height in pixel
     * - 'auto' automatically resize to the actual content size
     */
    var resize = this.resize = function(sizeInfo){
      var height;
      if(typeof sizeInfo === 'number'){ // 99
        height = sizeInfo;
      } else if(sizeInfo && sizeInfo == 'auto'){
        height = node.offsetHeight;
      } else if (sizeInfo && sizeInfo.height){
        if(typeof sizeInfo.height === "string" && sizeInfo.height.match &&
            sizeInfo.height.match(/^[0-9]+px$/)){ // {height: '99px'}
          height = sizeInfo.height.substring(0, sizeInfo.height.length-2);
        } else { // {height: 99}
          height = sizeInfo.height;
        }
      }
      UT.Expression._callAPI('container.resizeHeight', [height]);
    };

    /**
     * Push a navigation state
     * @param  {String}   state    The state to push : 'default', 'back', 'cancel'
     * @param  {Function} callback The function called when this state is clicked
     */
    var pushNavigation = this.pushNavigation = function(state, callback) {
      UT.Expression._callAPI('container.pushNavigation', [state], callback);
    };

    /**
     * Pop the current navigation state
     */
    var popNavigation = this.popNavigation = function() {
      UT.Expression._callAPI('container.popNavigation');
    };

    /**
     * Let the user navigate to an other website
     * or to a particullar part of urturn
     * @param  {string} app     the app to use [optional] 
     * @param  {string} target  Where to navigate
     */
    var navigate = this.navigate = function(app) {
      var options = {};
      if (arguments.length >= 2) {
        options = arguments[1];
      }
      else if (arguments.length === 1) {
        options = app;
        app = 'browse';
      }
      var opt = {
        app : app,
        parameters : options
      };
      UT.Expression._callAPI('container.navigate', [opt]);
    };

    /**
     * Retrieve a collection given its name.
     *
     * The name can be any public collection defined in expression.json,
     * 'default' for the default collection (aka post.storage)
     * or parent for this post parent default collection (this is available
     * only during the first edition of a post if the expression is created 
     * from another one.)
     * 
     * @param {String} name the collection name
     */
    var collection = this.collection = function(name){
      if(name == 'parent'){
        return parentCollection || null;
      } else {
        return collectionStore.get(name);
      }
    };

    /**
     * Save data in all collections.
     */
    var save = this.save = function(){
      collectionStore.each(function(c){
        c.save();
      });
    };

    /**
     * Request an user data object containing informations on
     * current user
     * @param  {Function} callback the callback is been passed a UT.User instance.
     */
    var getUserData = this.getUserData = function(callback) {
      if(window.console && console.log){
        console.log('deprecated, please use UT.Post#user([item], callback) instead');
      }
      users('current', callback);
    };

    /**
     * Asynchronously retrieve an UT.User instance given an optional array of items.
     * 
     * @param {object|Array} items from which to retrieve the user.
     * @param {Function} callback the callback is been passed a UT.User instance.
     */
    var users = this.users = function(items, callback) {
      if(typeof items === 'function'){
        callback = items;
        items = 'current';
      }
      if(items === 'current'){
        UT.Expression._callAPI('document.getUserData', [], function(userInfo){
          var user = (userInfo ? new UT.User(userInfo) : null);
          callback(user);
        });
      } else if (Object.prototype.toString.call(items) === '[object Array]') {
        UT.Expression._callAPI('document.getUserData', [items], function(data){
          var users = [];
          for(var i = 0; i < data.length; i++){
            var user = new UT.User(data[i]);
            for(var j=0; j < items.length; j++){
              if(items[j]._key === user._id){
                if(!items[j]._user){
                  items[j]._user = items[j];
                }
                break;
              }
            }
            users.push(user);
          }
          console.log('users', users);
          callback(users);
        });
      } else  {
        UT.Expression._callAPI('document.getUserData', [items], function(userInfo){
          var user = (userInfo ? new UT.User(userInfo) : null);
          if(user && !items._user){
            items._user = user;
          }
          callback(user);
        });
      }
    };

    /**
     * The default, private collection
     */
    this.storage = collection('default');

    window.addEventListener('resize', function(){
      self.fire('resize', new UT.ResizeEvent(window.offsetWidth, window.offsetHeight));
    }, false);
  };
})();