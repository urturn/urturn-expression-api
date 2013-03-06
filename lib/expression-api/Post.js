; (function(){
  UT.Post = function(states){
    if(!states || !states.collections){
      throw new Error("ArgumentError", "Missing collections in state arguments");
    }
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
        }
      }
    });

    // scoped functions
    var setNote = function(){
      if (typeof(self.note) == 'string') {
        states.note = self.note;
        UT.Expression._callAPI('document.setNote', [states.note]);
      }
    };

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
      if (options && options.size && options.size.auto) {
        if(window.console && console.warn){
          console.warn('Use of size.auto is deprecated, use size.autoCrop instead');
        }
      }
      UT.Expression._callAPI(
        'medias.openImageChooser',
        [options],
        function(imageDescriptor) {
          var image = new UT.Image();
          image.init(imageDescriptor);
          callback.call(this, image);
      });
    };

    var soundDialog = function(options, callback) {
      UT.Expression._callAPI(
        'medias.openSoundChooser',
        [options],
        function(soundDecriptor) {
          var sound = new UT.Sound(soundDecriptor);
          callback.call(this, sound);
      });
      UT.Expression._callAPI('medias.openSoundChooser', [options], callback);
    };

    var videoDialog = function(options, callback) {
      UT.Expression._callAPI(
        'medias.openVideoChooser',
        [options],
        function(videoDescriptor) {
          var video = new UT.Video(videoDescriptor);
          callback.call(this, video);
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
          callback.call(this, image);
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
     * Calls all fns in the list for a given type. Passes arguments
     * through to the caller.
     * @params {String} type The type to trigger
     */
    var trigger = this.trigger = function(type) {
      var list = eventTypesBindings[type],
          promises = [],
          nextTrigger = 'after' + type.charAt(0).toUpperCase() + type.slice(1),
          listLength,
          listIndex,
          callbackFunction,
          callbackArgs,
          promise;

      // Nothing to trigger
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

      while (++listIndex < listLength) {
        callbackFunction = list[listIndex];
        promise = callbackFunction.apply(classModule, callbackArgs);
        if(promise && typeof promise.then === 'function') {
          promises.push(promise);
        }
      }

      if(promises.length > 0) {
        when.all(promises).then(function() {
          trigger(nextTrigger);
        });
      }
      else {
        trigger(nextTrigger);
      }
    };

    /**
     * Adds a listener fn to the list for a given event type.
     */
    var bind = this.bind = function(type, fn) {
      var list = eventTypesBindings[type] || (eventTypesBindings[type] = []);

      // This fn is not a function
      if (typeof fn !== 'function') {
        return;
      }

      list.push(fn);
    };

    /**
     * Removes a listener fn from its list.
     */
    var unbind = this.unbind = function(type, fn) {
      var list = eventTypesBindings[type],
      l;

      // Nothing to unbind
      if (!list) {
        return;
      }

      // No function specified, so unbind all by removing the list
      if (!fn) {
        delete eventTypesBindings[type];
        return;
      }

      // Remove all occurences of this function from the list
      l = list ? list.indexOf(fn) : -1;

      while (l !== -1) {
        list.splice(l, 1);
        l = list.indexOf(fn);
      }
    };

    /**
     * Register a post callback.
     */
    var publish = this.publish = function(callback) {
      bind('publish', callback);
    };

    /**
     * Flag a post as being valid or not.
     * A valid document can be posted synchronously at any time.
     * 
     * @param flag {boolean} if provided, set the current validity state.
     * @return validity flag
     */
    var valid = this.valid = function(flag){
      if(flag !== undefined && flag != states.readyToPost ){
        states.readyToPost = !!flag;
        UT.Expression._callAPI('document.readyToPost', [states.readyToPost]);
      }
      return states.readyToPost;
    };

    /**
     * Bind the callback function to the scrollChanged event.
     * The function will receive the new scroll values.
     * @param {function} callback will be passed the new scrollvalues
     */
    var scrollChanged = this.scollChanged = function(callback) {
      bind('scrollChanged', callback);
    };

    /**
     * Bind the callback function to the imageAdded event.
     * The function will receive the image and optional extraData param.
     * @param {Function} callback
     */
    var imageAdded = this.imageAdded = function(callback) {
      bind('imageAdded', callback);
    };

    /**
     * create the dialog of the given type using an options object and
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
     * The default, private collection
     */
    this.storage = collectionStore.get('default');

    /** 
     * Retrieve Parent Post Datas.
     *
     * This is available only during the first edition of a post
     * if the expression is created from another one.
     */
    var getParentData = this.getParentData = function() {
      return this.getState('parentData') || {};
    };

    var pushNavigation = this.pushNavigation = function(state, callback) {
      UT.Expression._callAPI('container.pushNavigation', [state], callback);
    };

    var popNavigation = this.popNavigation = function() {
      UT.Expression._callAPI('container.popNavigation');
    };

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

    // Properties

    var context = this.context = {
      player: false,
      editor: false,
      thumbnail: false
    };
    // set the proper context values
    if(states.mode == 'edit'){
      context.editor = true;
    } else if(states.mode == 'player'){
      context.player = true;
    }

    // the expression outter dom node
    var node = this.node = document.querySelector('.webdoc_expression_wrapper');
  };
})();