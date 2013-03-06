/**
 * Namespace of the Webdoc public API.
 */
var UT = {},
    WD = UT;

// Generate Random UUID compliant with rfc4122 v4
// Fantastic piece of code from @broofa on:
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
UT.uuid = function(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

UT.UUID = UT.uuid;
/**
 * valid options keys: data, delegate, currentUserId
 */
UT.Collection = function(options) {
  // PUBLIC Properties
  this.length = 0; // loded items count
  this.name = null;

  // PUBLIC Methods
  // Add an anonymous item (without a key).
  this.setUserItem = function(item) {
    if(!currentUserId) {
      delegate.authenticate();
      throw new Error("ArgumentError", "No currentUserId defined");
    }
    return this.setItem(currentUserId, item);
  };

  this.getUserItem = function(item) {
    if(!currentUserId) {
      return;
    }
    return this.getItem(currentUserId);
  };

  // Add or updated an item binded to a specific key
  var setItem = function(key, item) {
    if(!key) {
      throw new Error("InvalidKey", key);
    }
    if(privateKeys.indexOf(key) != -1) {
      throw new Error("ReservedKey", key);
    }
    var sanItem = sanitizeItem(key, item);
    var oldItem = null;
    if(key) {
      oldItem = this.getItem(key);
    }
    recomputeOperations(oldItem, sanItem);
    if(oldItem && (sanItem === null || typeof sanItem == 'undefined')) {
      // delete
      keys.splice(keys.indexOf(key), 1);
      count--;
      delete items[key];
    } else if(!oldItem && sanItem) {
      // insert
      count++;
      keys.push(key);
      items[key] = sanItem;
    } else {
      // update
      items[key] = sanItem;
    }
    if(item) {
      item._key = key;
    }
    // Add key to dirtyKeys
    if(dirtyKeys.indexOf(key) == -1) {
      dirtyKeys.push(key);
    }

    this.length = keys.length;
    return item;
  };
  this.setItem = setItem;

  var getItem = function(key, defaultValue) {
    if(!key) {
      return null;
    }
    var item = items[key];

    if (item === undefined) {
      if(boundKeys.indexOf(key) === -1 && this[key] !== undefined){
        return this[key];
      }
      return defaultValue;
    } else if (item._type == 'literal') {
      return item.value;
    } else {
      return item;
    }
  };
  this.getItem = getItem;

  this.key = function(n) {
    if(n >= keys.length) {
      return null;
    }
    return keys[n];
  };

  this.average = function(name) {
    if(!operations[name]) {
      return;
    }
    return operations[name].average;
  };

  this.sum = function(name) {
    if(!operations[name]) {
      return;
    }
    return operations[name].sum;
  };

  /**
   * Without argument retrieve the total count
   * if filterKey is given, return the number
   * of item where this properties is defined and not null.
   * This last option is available only for field declared
   * in collection field.
   */
  this.count = function(filterKey) {
    if(!filterKey){
      return count;
    } else if(!operations[filterKey]) {
      return;
    } else {
      if(operations[filterKey]){
        return operations[filterKey].count;
      }
    }
  };

  this.toString = function() {
    return '<Collection @name="' + this.name + '">';
  };

  this.save = function() {
    bindNewKeys.apply(this);
    var itemsToSave = {};
    if(dirtyKeys.length > 0) {
      for(var i = 0; i < dirtyKeys.length; i++) {
        itemsToSave[dirtyKeys[i]] = items[dirtyKeys[i]];
      }
      delegate.save(this.name, itemsToSave);
      dirtyKeys = [];
    }
  };

  /**
   * Retrieve a hash of data compatible with the one received.
   */
  this.getCurrentData = function() {
    var newData = {
      name: this.name,
      count: count,
      definition: data.definition,
      operations: [],
      items: []
    };

    if(data.operations) {
      for(var i = 0; i < data.operations.length; i++) {
        var operation = {
          operation: data.operations[i].operation,
          field: data.operations[i].field
        };
        opsToolbox[operation.operation].toJsonData(operations[operation.field], operation);
        newData.operations.push(operation);
      }
    }

    for (var k in items) {
      var item = items[k] ;
      item._key = k ;
      newData.items.push(item);
    }
    return newData;
  };

  this.refresh = function(json) {
    initialize.call(this, {currentUserId: currentUserId, delegate: delegate, data: json});
  };

  // PRIVATE Properties
  var currentUserId, delegate, data, items,
      operations, keys, dirtyKeys, boundKeys, count,
      privateKeys = ['refresh', 'setItem', 'getItem', 'count', 'sum', 'key', 'getUserItem', 'setUserItem', 'average', 'toString', 'size', 'length', 'length', 'name', 'save', 'fieldDefs', 'sanitizedItem', 'getCurrentData'];

  var opsToolbox = {
    _transfer: function(source, dest /*, k1, k2, ..., kn*/){
      var keys = Array.prototype.slice.call(arguments, 2);
      for (var i = keys.length - 1; i >= 0; i--) {
        dest[keys[i]] = source[keys[i]];
      }
    },
    average: {
      fromJsonData: function(field, operation){
        if(operation.average === undefined || operation.average_count === undefined){
          field.average = -1;
          field.average_count = 0;
        } else {
          opsToolbox._transfer(operation, field, 'average', 'average_count');
        }
      },
      toJsonData: function(field, operation){
        opsToolbox._transfer(field, operation, 'average', 'average_count');
      },
      recompute: function(field, operation, oldItem, newItem){
        var count = field.average_count;
        if(oldItem && oldItem[operation.field] !== undefined) {
          field.average = (field.average * (count) - oldItem[operation.field]) / parseFloat(count - 1);
          count--;
        }
        if(newItem && newItem[operation.field] !== undefined) {
          field.average = (field.average * (count) + newItem[operation.field]) / parseFloat(count + 1);
          count++;
        }
        field.average_count = count;
      }
    },
    count: {
      fromJsonData: function(field, operation) {
        if(operation.count === undefined){
          field.count = 0;
        } else {
          opsToolbox._transfer(operation, field, 'count');
        }
      },
      toJsonData: function(field, operation) {
        opsToolbox._transfer(field, operation, 'count');
      },
      recompute: function(field, operation, oldItem, newItem) {
        if(oldItem && oldItem[operation.field] && oldItem[operation.field] !== undefined) {
          field.count = field.count -1;
        }
        if(newItem && newItem[operation.field] && newItem[operation.field] !== undefined) {
          field.count ++;
        }
      }
    },
    sum: {
      fromJsonData: function(field, operation) {
        if(operation.sum === undefined){
          field.sum = 0;
        } else {
          opsToolbox._transfer(operation, field, 'sum');
        }
      },
      toJsonData: function(field, operation) {
        opsToolbox._transfer(field, operation, 'sum');
      },
      recompute: function(field, operation, oldItem, newItem) {
        if(oldItem && oldItem[operation.field] && oldItem[operation.field] !== undefined) {
          field.sum = field.sum - oldItem[operation.field];
        }
        if(newItem && newItem[operation.field] && newItem[operation.field] !== undefined) {
          field.sum = field.sum + newItem[operation.field];
        }
      }
    }
  };


  // PRIVATE Methods
  // Recompute the operations results
  var recomputeOperations = function(oldItem, newItem) {
    if(data.operations) {
      for(var i = 0; i < data.operations.length; i++) {
        var operation = data.operations[i];
        if(newItem && newItem[operation.field] !== undefined || oldItem && oldItem[operation.field] !== undefined) {
          opsToolbox[operation.operation].recompute(operations[operation.field], operation, oldItem, newItem);
        }
      }
    }
  };

  // Cleanup item to keep only authorized keys

  var sanitizeItem = function(key, item) {
    // Convert literal to object.
    if(typeof(item) !== 'object' || Array.isArray && Array.isArray(item)) {
      item = {
        _type: 'literal',
        value: item
      };
    }

    if(!item) {
      return null;
    }
    sanitizedItem = {
      _key: key
    };

    var fieldDefs;
    if( data.definition &&
        (fieldDefs = data.definition.fields) &&
        fieldDefs.length > 0) {
      for(var i = 0; i < fieldDefs.length; i++) {
        var fd = fieldDefs[i];
        if(typeof item[fd.name] != 'undefined') {
          if(fd.type == 'string') {
            sanitizedItem[fd.name] = item[fd.name];
          } else if(fd.type == 'number') {
            var n = parseFloat(item[fd.name]);
            if(!isNaN(n) && isFinite(item[fd.name])) {
              sanitizedItem[fd.name] = n;
            } else {
              throw new Error('TypeError', 'Wrong value for field note');
            }
          } else if(fd.type == 'boolean'){
            sanitizedItem[fd.name] = !!item[fd.name];
          } else {
            throw new Error('TypeError', 'Unkown type ' + fd.type);
          }
        }
      }
    } else {
      sanitizedItem = item;
      sanitizedItem._key = key;
    }
    return sanitizedItem;
  };

  // constructor
  var initialize = function(options) {
    if(!options.data) {
      throw new Error("ArgumentError", "missing data");
    }
    if(!options.data.name) {
      throw new Error("ArgumentError", "no name in data");
    }
    if(options.data.count === undefined) {
      throw new Error("ArgumentError", "no count in data");
    }
    operations = {}; // map of operations results
    keys = []; // all used keys
    dirtyKeys = []; // item keys to be saved
    boundKeys = [];

    currentUserId = options.currentUserId;
    delegate = options.delegate;
    data = options.data;
    this.name = data.name;
    count = data.count;

    // Build a map of operations : {field_name: {average: 2, average_count: 2, ...}}
    if(data.operations) {
      for(var i = 0; i < data.operations.length; i++) {
        var operation = data.operations[i];
        operations[operation.field] = operations[operation.field] || {};
        opsToolbox[operation.operation].fromJsonData(operations[operation.field], operation);
      }
    }
    initializeItems.call(this, data.items);
  };

  var initializeItems = function(dataItems) {
    items = {};
    if(!dataItems) {
      return;
    }
    for(var j = 0; j < dataItems.length; j++) {
      var item = dataItems[j];
      var key = item._key;
      items[key] = item;
      bindItem.call(this, key, item);
      keys.push(key);
    }
    this.length = keys.length;
  };

  var bindItem = function(key, value) {
    if(boundKeys.indexOf(key) == -1 && privateKeys.indexOf(key) == -1){
      boundKeys.push(key);
      this.__defineGetter__(key, function() {
        return getItem.call(this, key);
      });
      this.__defineSetter__(key, function(value) {
        return setItem.call(this, key, value);
      });
    }
  };

  var bindNewKeys = function() {
    var keys = Object.keys(this);
    for(var i = keys.length - 1; i >= 0; i--) {
      var key = keys[i];
      if(privateKeys.indexOf(key) == -1 && boundKeys.indexOf(key) == -1) {
        setItem.call(this, key, this[key]);
        bindItem.call(this, key, this[key]);
      }
    }
  };
  initialize.call(this, options);
};

/**
 * Add Support to IE GEt/Set
 */
var supportGetSet = function() {
  try {
    if(!Object.prototype.__defineGetter__ && Object.defineProperty({}, "x", {
      get: function() {
        return true;
      }
    }).x) {
      Object.defineProperty(Object.prototype, "__defineGetter__", {
        enumerable: false,
        configurable: true,
        value: function(name, func) {
          Object.defineProperty(this, name, {
            get: func,
            enumerable: true,
            configurable: true
          });
        }
      });
      Object.defineProperty(Object.prototype, "__defineSetter__", {
        enumerable: false,
        configurable: true,
        value: function(name, func) {
          Object.defineProperty(this, name, {
            set: func,
            enumerable: true,
            configurable: true
          });
        }
      });
    }
  } catch(defPropException) { /* can't define __defineGetter__ and __defineSetter__. Certainly ie < 8*/
    throw new Error('Simple Storage API not Supported');
  }
};
supportGetSet();

// Create a store for containing collections defined in data
// mandatory options keys: data, currentUserId, delegate
UT.CollectionStore = function(options) {
  this.data = options.data;
  var delegate = options.delegate;
  delegate.store = this;
  var collections = {};

  for(var i = 0; i < this.data.length; i++) {
    var data = this.data[i];
    var name = data.name;
    if(!name) {
      throw new Error("ArgumentError", "data contains unamed collections.");
    }
    collections[name] = new UT.Collection({
      data: data,
      postMessageApi: options.postMessageApi,
      currentUserId: options.currentUserId,
      delegate: delegate
    });
  }

  // Retrieve a collection given its name.
  this.get = function(name) {
    return collections[name];
  };

  this.set = function(collection) {
    collections[collection.name] = collection;
  };

  // Ensure all the write operations are made against
  // ServerRequest.
  this.flush = function(collection) {
    delegate.flush();
  };

  /**
   * Retrieve all data for the current collections.
   */
  this.getCurrentData = function() {
    data = [];
    for(var k in collections) {
      data.push(collections[k].getCurrentData());
    }
    return data;
  };

  this.refresh = function(names, callback) {
    delegate.refreshCollections(names, callback);
  };
};

; (function(){
  // Scoped variables
  var readyListeners = []; // contains the various ready event callbacks
  var apiListeners = {}; // contains the various api callbacks keyed by uuid
  var isReady = false; // become true once the environment is ready
  var postInstance; // will contains the current post instance
  var states; // contains the expression state data

  /**
   * Expression static class is the wrapper between the client code, server code. It is responsible
   * to setup a proper environment and notify actor of global state changes.
   * 
   * @throw StaticClass error if instantiated.
   */
  UT.Expression = function(){ throw new Error('StaticClass'); };

  /**
   * Register a new callback function to be called once the environment is ready.
   * @param callback {function} will be passed a Post instance
   */
  UT.Expression.ready = function(callback){
    if(readyListeners.indexOf(callback) == -1){
      readyListeners.push(callback);
    }
    if(isReady){
      callback.call(this, postInstance);
    }
  };

  /**
   * Call the server API using post message
   *
   * @private
   * @param methodName {String} method of the APi to call
   * @param args {Array} arguments to the method
   * @param callBack {Function} the callback function that will contains the result of call
   */
  var _callAPI = UT.Expression._callAPI = function(methodName, args, callback){
    var jsonMessage = {
      type:"ExpAPICall",
      methodName:methodName,
      args:args,
      expToken: states ? states.expToken : null
    };
    if(callback){
      // assign an id to the callback function
      var callbackId = UT.uuid().toString();
      apiListeners[callbackId] = callback;
      jsonMessage.callbackId = callbackId;
    }
    var json = JSON.stringify(jsonMessage);
    window.parent.postMessage(json, "*");
  };

  /**
   * Events called when callback are received from post message.
   * @private
   * @param callBackUUID the uuid of the callback to call
   * @param result the result parameter to the caallback
   */
  var _receiveCallback = function(callbackUUID, result) {
    var callback = apiListeners[callbackUUID];
    if (callback) {
      if ( !(result && result instanceof Array )) {
        if(window.console && console.error){
          console.error('received result is not an array.', result);
        }
      }
      callback.apply(this, result);
      delete apiListeners[callbackUUID];
    }
  };

  var _ready = function(newStates) {
    states = newStates;
    isReady = true;
    // default ready to post state is false
    states.readyToPost = false;
    // create scoped post instance
    postInstance = new UT.Post(states);

    postInstance.on('scrollChanged', function(newScrollValues) {
      states.scrollValues = newScrollValues;
    });
    for(var i = 0; i < readyListeners.length; i++){
      readyListeners[i].apply(postInstance, [postInstance]);
    }
  };

  var _post = function() {
    postInstance.fire('publish');
    _callAPI("posted");
  };

  UT.Expression._dispatch = function(msg) {
    switch (msg.type) {
      case 'ready' :
        _ready(msg.options);
        break;
      case 'triggerEvent' :
        postInstance.fire.apply(postInstance, [msg.eventName].concat(msg.eventArgs));
        break;
      case 'callback' :
        _receiveCallback(msg.callbackId, msg.result);
        break;
      case 'post' :
        _post();
    }
  };

  /**
   * @private
   * Reset the current environment.
   */
  UT.Expression._reset = function(){
    readyListeners = [];
    apiListeners = [];
    postInstance = null;
    isReady = false;
  };

  /**
   * @private
   * Retrieve the post instance.
   */
  UT.Expression._postInstance = function(){
    postInstance = postInstance;
    return postInstance;
  };
})();
; (function(){
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

    /** 
     * Retrieve Parent Post Datas.
     *
     * This is available only during the first edition of a post
     * if the expression is created from another one.
     */
    var parentData = this.parentData = states.parentData || {};

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
     * - 'auto' automatically resize to the actual content size
     */
    var resize = this.resize = function(sizeInfo){
      if(size && size == 'auto'){
        UT.Expression._callAPI('container.resizeHeight', [node.scrollHeight]);
      } else if (size && size.height){
        UT.Expression._callAPI('container.resizeHeight', [size.height]);
      }
    };

    /**
     * The default, private collection
     */
    this.storage = collectionStore.get('default');

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
  };
})();
/**
* An image object return by create('image');
* Use it to manipulate an image (crop, filter, ...)
* @param {object} imageDescriptor an object return by internal sdk
*/
UT.Image = function() {
  /**
  * The url of the media
  * @type {String}
  */
  this.url = "";

  /**
  * A set of metadata about this item
  * - source
  * - crop
  * @type {Object}
  */
  this.info = {};

  /**
  * A string containing the type of this media,
  * Aka "image" here
  * @type {String}
  */
  this.type = 'image';

  /**
  * Crop an image
  * @param {Object}   options  a hash of options :
  * {
  *  x : source X,
  *  y : source Y,
  *  w : source width,
  *  h : source height,
  *  width : dest Width,
  *  height : dest Height
  * }
  * 
  * @param  {Function}   callback   The function called once image has been croped
  * @return {void}                Return nothing
  */
  this.crop = function(options , callback) {
   UT.Expression._callAPI('medias.recrop', [{
     size : options,
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.on(this));
  };

  /**
  * Autocrop the image to specified ratio
  * @param  {int}       width      desired width of image
  * @param  {int}       height    desired height of image
  * @param  {function}   callback   callback called when image has been croped
  * @return {void}       
  */
  this.autocrop = function(width, height, callback) {
   UT.Expression._callAPI('medias.crop', [{
     size : {
       width : width,
       height : height,
       auto : true
     },
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.on(this));
  };

  /**
  * Apply Filters to an Image
  * @param  {Array}     filters    An array of filter to apply to image
  * @param  {Function} callback  The function called once image has been filterd
  * @return {void}                Return nothing
  */
  this.filter = function(filters, callback) {
   UT.Expression._callAPI('medias.applyFilter', [{
     filter : filters,
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.on(this));
  };

  /**
  * Make this image editable.
  * You can use it inside a CANVAS without tainted it!
  * @return {String} A data:url of this image. Can be used inside a canvas;
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
  this.editable = function(callback) {
   UT.Expression._callAPI(
     'medias.getEditableImage',
     [this.url],
     function(editableImageUrl) {
       this.url = editableImageUrl;
       callback.call(this, this);
     }.on(this)
   );
  };

  /**
   * Return a JSON vesion of this object
   * @return {String} A json string containing document datas
   */
  this.toJSON = function() {
    return JSON.stringify(this.descriptor);
  };

  // Private methods
  // LOOK AWAY!
  // Use to on this interface with Urturn API
  this.init = function(imageDescriptor) {
   this.url = imageDescriptor.url;
   this.descriptor = imageDescriptor;
   this.info = imageDescriptor.info;
   if (imageDescriptor.center) {
     this.info.crop = imageDescriptor.center;
   }
  };

  this.descriptor = {};
};

/**
 * An video object return by create('video');
 * Use it to manipulate a video (crop and filters comming in futur)
 * @param {object} videoDescriptor an object return by internal sdk
 */
UT.Video = function(videoDescriptor) {

	/**
	 * The url of the video
	 * @type {String}
	 */
	this.url = "";

	/**
	 * A string containing the type of this media,
	 * Aka "video" here
	 * @type {String}
	 */
	this.type = 'video';


	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildVideo(videoDescriptor) {
		this.url = videoDescriptor.url;
		descriptor = videoDescriptor;
	}
	var descriptor = {};
	// init !
	_buildVideo.on(this)(videoDescriptor);
};
/**
 * A sound object return by create('sound');
 * Use it to manipulate a sound (filter, ...)
 * @param {object} soundDescriptor an object return by internal sdk
 */
UT.Sound = function(soundDescriptor) {
	
	/**
	 * Name of the service in wich this sound is hosted
	 * Currently soundcloud or itunes
	 * @type {String}
	 */
	this.service = '';
	
	/**
	 * url of the sound on the service
	 * @type {URL}
	 */
	this.url = '';

	/**
	 * Title of the sound
	 * @type {String}
	 */
	this.title = '';

	/**
	 * Name of artist / author
	 * @type {String}
	 */
	this.artist = '';

	/**
	 * Link to an image representing the sound or the artist / author
	 * @type {URL}
	 */
	this.cover = '';

	/**
	 * Link to an image representing the artist / author of this sound
	 * @type {URL}
	 */
	this.artistCover = '';

	/**
	 * Link to an image representing this sound
	 * @type {URL}
	 */
	this.soundCover = '';

	/**
	 * Link to an image representing the waveForm of this sound;
	 * @type {URL}
	 */
	this.waveFormImage = '';

	/**
	 * Link to the sound page on the service
	 * @type {URL}
	 */
	this.link = '';

	/**
	 * Original data as we retrive them from the service
	 * @type {Object}
	 */
	this.appData = {};


	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildSound(soundDescriptor) {
		descriptor = soundDescriptor;
		this.service = soundDescriptor.service;
		this.url = soundDescriptor.url;
		this.title = soundDescriptor.title;
		this.artist = soundDescriptor.artist;
		this.cover = soundDescriptor.cover;
		this.artistCover = soundDescriptor.artistCover;
		this.soundCover = soundDescriptor.soundCover;
		this.waveFormImage = soundDescriptor.waveFormImage;
		this.link = soundDescriptor.link;
		this.appData = soundDescriptor.appData;
	}

	var descriptor = {};
	_buildSound.on(this)(soundDescriptor);
};
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.5.6
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchMove = function() { FastClick.prototype.onTouchMove.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { FastClick.prototype.onTouchCancel.apply(self, arguments); };

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return;
	}

	// Set up event handlers as required
	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires an exception for labels.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires an exception for alert confirm dialogs.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'button':
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if (this.deviceIsIOS && target.type === 'file') {
			return true;
		}

		// Don't send a synthetic click to disabled inputs (issue #62)
		return target.disabled;
	case 'label':
	case 'video':
		return true;
	default:
		return (/\bneedsclick\b/).test(target.className);
	}
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
	case 'select':
		return true;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	if (this.deviceIsIOS && targetElement.setSelectionRange) {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}
		
			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.targetTouches[0];

	if (Math.abs(touch.pageX - this.touchStartX) > 10 || Math.abs(touch.pageY - this.touchStartY) > 10) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var oldTargetElement;

	// If a target element was never set (because a touch event was never fired) allow the click
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	oldTargetElement = this.targetElement;
	this.targetElement = null;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.trackingClick = false;
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	// Derive and check the target element to see whether the click needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(oldTargetElement) || this.cancelNextClick) {
		this.cancelNextClick = false;

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If clicks are permitted, return true for the action to go through.
	return true;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = function(layer) {
		'use strict';
		return new FastClick(layer);
	};

	module.exports.FastClick = FastClick;
}

/**
 * Initialization code
 */

// handle touch events
if ('ontouchstart' in window || 'onmsgesturechange' in window) {
  document.querySelector('html').className = document.querySelector('html').className + ' touch';

  if (typeof FastClick != 'undefined') {
    window.addEventListener('load', function() {
      new FastClick(document.body);
    }, false);
  }
}

/**
 * post message handler
 */
window.addEventListener("message", function (e) {
  // webdoc will always set json data so we parse it
  try {
      msgObj = JSON.parse(e.data);
  }
  catch (exception) {
      if (console && console.error) {
        console.error("receive invalid message", e.data, exception.message) ;
      }
      msgObj = {};
  }
  UT.Expression._dispatch(msgObj);
}, false);