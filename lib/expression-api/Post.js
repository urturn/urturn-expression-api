; (function(UT, window, document, undefined){
  "use strict";

  UT.Post = function(states){
    if(!states || !states.collections){
      throw new Error("ArgumentError", "Missing collections in state arguments");
    }
    // quicker than bind
    var self = this;

    // scoped properties
    var currentSize = {height: 0, width: 0};
    var currentScroll = {scrollTop: 0, scrollBottom: 0};
    var queuedUpTickets = {};
    var eventTypesBindings = {}; // handle event bindings for each event type
    var isIOSApp = /(urturn)/i.test(navigator.userAgent);
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
        try {
          // Safari6 bug with accessing _key using dot notation with 'use strict'
          /*jshint sub:true*/
          states.parentData[k]['_key'] = k;
        } catch(e) {
          if(window.console && console.log) {
            console.log('Unexpected Error: ' + e);
          }
        }
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

    var deprecated = function(methodName, sinceVersion, removeVersion, replacementCall) {
      if(window.console && console.log){
        console.log(methodName + ' has been deprecated since ' + sinceVersion +
          ' and will be removed in version ' + removeVersion + '.' +
          ' Use ' + replacementCall + ' instead.');
      }
    };

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
      sandbox: false,
      thumbnail: false,
      privacy: null,
      mediaFirst : false
    };
    // set the proper context values
    if(states.mode == 'edit'){
      context.editor = true;
    } else if(states.mode == 'view'){
      context.player = true;
    }
    if (states.sandbox === true) {
      context.sandbox = true;
    }
    context.privacy = states.documentPrivacy;

    if (states.mediaFirst === true) {
      context.mediaFirst = true;
    }
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
    var textDialog = function(options, callback, errorCallback){
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

    var imageDialog = function(options, callback, errorCallback) {
      if (!callback) {
        return;
      }
      UT.Expression._callAPI(
        'medias.openImageChooser',
        [options],
        function(imageDescriptor) {
          if (imageDescriptor === null && arguments.length === 2 && arguments[1] === 'cameraNotFound') {
            if (errorCallback) {
              errorCallback({
                type : 'cameraNotFound',
                message : 'User camera can not be found.'
              });
            }
            else {
              callback(null);
            } 
            return;
          }
          if (imageDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            } 
            return;
          }
          var image = new UT.Image();
          image.init(imageDescriptor);
          callback.call(self, image);
      });
    };

    var soundDialog = function(options, callback, errorCallback) {
      if (!callback) {
        return;
      }
      UT.Expression._callAPI(
        'medias.openSoundChooser',
        [options],
        function(soundDecriptor) {
           if (soundDecriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            } 
            return;
          }
          var sound = new UT.Sound(soundDecriptor);
          callback.call(self, sound);
      });
    };

    var videoDialog = function(options, callback, errorCallback) {
      UT.Expression._callAPI(
        'medias.openVideoChooser',
        [options],
        function(videoDescriptor) {
          if (videoDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            } 
            return;
          }
          var video = new UT.Video(videoDescriptor);
          callback.call(self, video);
      });
    };

    var cropDialog = function(options, callback, errorCallback) {
      if (options.image.descriptor) {
        options.image = options.image.descriptor;
      }
      UT.Expression._callAPI('medias.crop', [options],
        function(imageDescriptor) {
          if (imageDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            } 
            return;
          }
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

    // Send a request to list users with the given ids.
    var userListDialog = function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }
      if(options.items) {
        options.users = options.users || [];
        for(var i = 0; i < options.items.length ; i++){
          options.users.push(options.items[i]._key);
        }
        delete options.items;
      }
      if(options.title) {
        options.label = options.title;
        delete options.title;
      }
      if (!self.context.player || !options.users || options.users.length === 0 ) {
        callback.apply(self);
      } else {
        UT.Expression._callAPI('dialog.users', [options], function(){
          callback.apply(self);
        });
      }
    };


    // Handler for the various dialog type
    var dialogHandler = {
      text: textDialog,
      image: imageDialog,
      sound: soundDialog,
      video: videoDialog,
      crop: cropDialog,
      users: userListDialog
    };


   
    var suggestRotationInfo = function(options) {
      UT.Expression._callAPI('dialog.suggestRotation', [options], function(){});
    };

    var notificationHandler = {
      suggestRotation : suggestRotationInfo
    };
    

    var notification = this.notification = function(type, options) {
      if(notificationHandler[type]){
        notificationHandler[type](options);
      } else {
        throw new Error('InvalidArgument', 'unknown notification type ' + type);
      }
    };




    /**
     * Calls all fns in the list for a given eventName. Passes arguments
     * through to the caller.
     * @params {String} eventName The eventName to fire
     */
    var fire = this.fire = function(eventName) {
      if(eventName == 'scrollChanged'){
        eventName = 'scroll';
      }
      var list = eventTypesBindings[eventName],
          promises = [],
          listLength,
          listIndex,
          callbackFunction,
          callbackArgs,
          callbackTarget,
          promise;

      if(eventName == 'scroll'){
        list = (list ? list.concat(eventTypesBindings['scrollChanged']) : eventTypesBindings['scrollChanged'] );
      }

      // Nothing to fire
      if (!list) {
        return;
      }

      callbackArgs = Array.prototype.slice.call(arguments, 1);
      callbackTarget = (callbackArgs.length !== 0 ? callbackArgs[0] : self);

      // convert to newer name and fire them as well.
      switch(eventName){
        case 'scroll':
          currentScroll.scrollTop = callbackArgs[0].scrollTop;
          currentScroll.scrollBottom = callbackArgs[0].scrollBottom;
          break;
      }

      // We copy the list in case the original mutates while we're
      // looping over it. We take the arguments, lop of the first entry,
      // and pass the rest to the listeners when we call them.
      list = list.slice(0);
      listLength = list.length;
      listIndex = -1;

      while (++listIndex < listLength) {
        callbackFunction = list[listIndex];
        if(callbackFunction){
          promise = callbackFunction.apply(callbackTarget, callbackArgs);
          if(promise && typeof promise.then === 'function') {
            promises.push(promise);
          }
        }
      }

      var nextTrigger = 'after' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
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

    // XXX Test the replacement on('media').
    /**
     * on the callback function to the imageAdded event.
     * The function will receive the image and optional extraData param.
     * @param {Function} callback
     */
    var imageAdded = this.imageAdded = function(callback) {
      on('imageAdded', callback);
    };

    var showNode = function() {
        self.node.style.display = 'block';
    };

    var hideNodeOnDialog = function() {
      if (isIOSApp) {
        self.node.style.display = 'none';
      }
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

      var errorCallback = null;
      if (arguments.length == 4 && typeof(arguments[3]) === 'function') {
        errorCallback = arguments[3];
      } 

      // hide the body to avoid weird effect because of latency on mobile
      hideNodeOnDialog();

      var _scrollPositionTop = currentScroll.scrollTop;
      var _scrollPositionBottom = currentScroll.scrollBottom;
      var _this = this;

      var _callback = function () {
        // readd visibility
        showNode();
        if(callback){
          _this.scroll({
            scrollTop : _scrollPositionTop,
            scrollBottom : _scrollPositionBottom
          }, function () {});
          callback.apply(this, arguments);
        }
      };

      var _errorCallback = null;
      if (errorCallback) {
        _errorCallback = function () {
          // readd visibility
          showNode();
          if(errorCallback){
            _this.scroll({
              scrollTop : _scrollPositionTop,
              scrollBottom : _scrollPositionBottom
            }, function () {});
            errorCallback.apply(this, arguments);
          }
        };
      }
      if(dialogHandler[type]){
        dialogHandler[type](options, _callback, _errorCallback);
      } else {
        throw new Error('InvalidArgument', 'unknown dialog type ' + type);
      }
    };



    /**
     * Ask the container to resize to the given parameters or return the
     * current size without parameter.
     *
     * The asynchronous result of this function can be listened on
     * the DOM node event.
     * size can be one of:
     * - {height: Number} an object containing the height in pixels
     * - {height: '133px'} an object continaing the height in a css string
     * - Number the height in pixel
     * - 'auto' automatically resize to the actual content size
     */
    var size = this.size = function(sizeInfo, callback) {
      if(typeof sizeInfo === 'function'){
        callback = sizeInfo;
        sizeInfo = null;
      }
      if(sizeInfo){
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
        var fn = null;
        if(callback){
          fn = function(){
            callback(new UT.ResizeEvent(currentSize.width, currentSize.height));
          };
        }
        UT.Expression._callAPI('container.resizeHeight', [height, true], fn);
        return this;
      } else {
        var event = new UT.ResizeEvent(currentSize.width, currentSize.height);
        if(callback){
          callback(event);
          return this;
        } else {
          return event;
        }
      }
    };

    /**
     * Display the post and call resize events
     */
    var display = this.display = function() {
      UT.Expression._callAPI('container.display', [], function (){});
    };

    /**
     * Ask to the sdk to stop all other media in all other expressions!
     */
    var stopAllOther = this.stopAllOther = function() {
      UT.Expression._callAPI('document.stopAllOther', [], function() {});
    };
    /**
     * Ask the container to scroll to the top OR bottom position.
     *
     * @param {Object{scrollTop,scrollBottom}} position
     * @param callback receives a UT.ScrollEvent
     * @return this or scroll values if called without arguments
     */
    var scroll = this.scroll = function(position, callback){
      if(typeof position === 'function') {
        callback = position;
        position = null;
      }
      if(position) {
        UT.Expression._callAPI('container.scroll',
          [position.scrollTop||position.scrollBottom, (position.scrollTop?'top':'bottom')],
          function(scrollValues){
            currentScroll.scrollTop = scrollValues.scrollTop;
            currentScroll.scrollBottom = scrollValues.scrollBottom;
            if(callback){
              callback(new UT.ScrollEvent(scrollValues.scrollTop, scrollValues.scrollBottom));
            }
          }
        );
        return this;
      } else {
        var event = new UT.ScrollEvent(currentScroll.scrollTop, currentScroll.scrollBottom);
        if(callback) {
          callback(event);
          return this;
        } else {
          return event;
        }
      }
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
     * Retrieve a unique number for a given queue
     * name. This number would be the last attributed
     * number + one.
     *
     * @since 0.8.0
     */
    var queueUp = this.queueUp = function(name, callback) {
      if(!callback){
        return this;
      }
      var self = this;
      if (queuedUpTickets[name] !== undefined) {
        callback(queuedUpTickets[name]);
        return this;
      } else {
        queuedUpTickets[name] = -1;
        UT.Expression._callAPI('document.queueUp', [name], function(number){
          queuedUpTickets[name] = number;
          callback(number);
        });
        return this;
      }
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
        if(context.editor || c.isPublic()){
          c.save();
        }
      });
    };


    /**
     * Enable or diable the rotation of screen on mobile devices
     * @param  {boolean} enable If true rotation is enable, if false rotatin is disable
     */
    var enableRotation = this.enableRotation = function(enable) {
      UT.Expression._callAPI('container.enableRotation', [enable], function(){});
    };

    /**
     * urturn
     * Make a urturn on this post
     * Param (Hash) :
     * - expressionFullSystemName : (String) ex : thefactory/pix
     * - documentId : UUID of document on wich the urturn is done
     * - creatorId : Id du createur a notifier
     * Callback : called with 0 as parameter if Urturn fail
     */
    var urturn = this.urturn = function (params, callback)  {
      UT.Expression._callAPI('document.urturn', [params], function(){});
    };

    /**
     * Post a post
     */
    var post = this.post = function(params) {
      UT.Expression._callAPI('document.post', [params], function(){});
    };


    var geoLocation = this.geoLocation = function(callback) {
      UT.Expression._callAPI('document.geoLocation', [], function(longitude, latitude) {
        callback(longitude, latitude);
      });
    };

    /**
     * Define if player of this post should be static
     * @param  {Boolean}  staticState 
     */
    var __static_state = false;
    var isStatic = this.isStatic = function(staticState) {
      if (staticState !== undefined && this.context.editor) {
        __static_state = staticState;
        UT.Expression._callAPI('document.isStatic', [staticState], function() {
        });
      }
      return staticState || __static_state;
    };

    /**
     * autoLink
     * Parse text to convert @mentions and #hashtags
     * to html links
     *
     * @param {String}
     * @return {String} containing html
     */

    var autoLink = this.autoLink = function (text)  {

      var hashtagsRegex = /(^|\s|<br\/>|\.)#([A-Za-z0-9_\-ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþş]+)/g,
          mentionsRegex = /(^|\s|<br\/>|\.)@([A-Za-z0-9_\-.]+)/g,
          linkHashtagsPattern  = '$1<a href="search:#$2" class="ut-navigate-hashtag">#$2</a>',
          linkMentionsPattern  = '$1<a href="user:$2" class="ut-navigate-mention">@$2</a>';

      text = text.replace(hashtagsRegex, linkHashtagsPattern);
      text = text.replace(mentionsRegex, linkMentionsPattern);

      text = text.replace(
        /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
        function(url){
            var full_url = url;
            if (!full_url.match('^https?:\/\/')) {
                full_url = 'http://' + full_url;
            }
            return '<a href="' + full_url + '" class="ut-navigate-url">' + url + '</a>';
        }
      );

      return text;
    };


    /**
     * Follow API
     */
    var follow = this.follow = function(uuid, username, callback) {
      UT.Expression._callAPI('dialog.follow', [uuid, username], function(){
          callback();
        });
    };

    var getFollowers = this.getFollowers = function(from, callback) {
        if (arguments.length == 1 && typeof (arguments[0]) === ' function') {
          callback = from;
          from = 0;
        } 
         UT.Expression._callAPI('document.followship', ['follower', from], function(followerList){
          callback(followerList);
        });
    };

    var getFollowing = this.getFollowing = function(from, callback) {
        if (arguments.length == 1 && typeof (arguments[0]) === ' function') {
          callback = from;
          from = 0;
        } 
         UT.Expression._callAPI('document.followship', ['following', from], function(followerList){
          callback(followerList);
        });
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
      if (!callback) {
        return;
      }
      if(items === 'current'){
        UT.Expression._callAPI('document.getUserData', [], function(userInfo){
          var user = (userInfo ? new UT.User(userInfo) : null);
          callback(user, null);
        });
      } else if (Object.prototype.toString.call(items) === '[object Array]') {
        var ids = [];
        for(var k = 0; k < items.length; k++) {
          if(items[k]._key){
            ids.push(items[k]._key);
          }
        }
        UT.Expression._callAPI('document.users', [ids], function(users){
          var validUsers = [];
          var validItems = [];
          for(var j = 0; j < items.length; j++){
            for(var i = 0; i < users.length; i++){
              if(items[j]._key == users[i].uuid){
                validUsers.push(new UT.User(users[i]));
                validItems.push(items[j]);
                break;
              }
            }
          }
          callback(validUsers, validItems);
        });
      } else  {
        UT.Expression._callAPI('document.users', [[items._key]], function(data){
          var userInfo = data[0];
          if(userInfo){
            callback(new UT.User(userInfo), items);
          } else { // Missing user
            callback(null, null);
          }
        });
      }
    };

    /**
     * true if the user is the post Owner
     */
    this.isOwner = function(user){
      return user.uuid == states.postUserId;
    };

    this.isCurrentUser = function(user){
      return user.uuid == states.currentUserId;
    };

    var updateSize = function(){
      currentSize.width = window.innerWidth;
      currentSize.height = window.innerHeight;
    };

    var updateScroll = function(values){
      currentScroll.scrollTop = values.scrollTop;
      currentScroll.scrollBottom = values.scrollBottom;
    };

    /**
     * The default, private collection
     */
    this.storage = collection('default');
    window.addEventListener('resize', function(){
      updateSize();
      self.fire('resize', new UT.ResizeEvent(currentSize.width, currentSize.height));
    }, false);
    updateSize();

    /**
    * listen to click to navigate
    */
    window.addEventListener('click', function(e){
      var url = e.target.getAttribute('href');

      if (url && url.match(/^(search|user|http)/gi)) {
        var app     = url.split(":")[0],
            target  = url.substring(url.indexOf(':')+1);

        if (app == 'http' || app == 'https') {
          app = 'browse';
          target = url;
        }

        e.preventDefault();
        self.navigate(app,target);
      }
    }, false);

  };
})(UT, window, document, undefined);
