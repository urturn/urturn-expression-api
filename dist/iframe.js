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
      throw "ArgumentError: no currentUserId defined";
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
      throw "invalid key: " + key;
    }
    if(privateKeys.indexOf(key) != -1) {
      throw "reserved key: " + key;
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
              throw 'TypeError: wrong value for field note';
            }
          } else if(fd.type == 'boolean'){
            sanitizedItem[fd.name] = !!item[fd.name];
          } else {
            throw 'TypeError: Unkown type ' + fd.type;
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
      throw "ArgumentError: missing data";
    }
    if(!options.data.name) {
      throw "ArgumentError: no name in data";
    }
    if(options.data.count === undefined) {
      throw "ArgumentError: no count in data";
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
    throw('Simple Storage API not Supported');
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
      throw "ArgumentError: data contains unamed collections.";
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

/**
 * Expression authors should use UT.Expression.ready(callback) to run
 * their expression initialization code.
 */
UT.Expression = (function(){
  var classModule, // returned module
      isReady = false, // set to true once the document is ready.
      postFunction = null,
      types = {},
      _states,
      expression = null,
      extensions = [],
      _callBacks = {};

  /**
   * Extend the Expression.
   *
   * @namespace the name of the submodule
   * @extension an object or a function that will match the namespace.
   * @throw if the namespace is already defined
   * @return nothing
   */
  function extendExpression(namespace, extension){
    expression = null ; // reset expression singleton.
    extensions.push({name: namespace, module: extension}) ;
  }

  /**
   * Register a function <tt>fn</tt> to be called once the expression is ready.
   */
  function ready(fn) {
    this._getInstance().bind('ready', fn);
    if(expression.isReady){
      fn.apply(this, [expression]);
    }

    // quick hack to add touch class on touch device
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
      document.querySelector('body').className = document.querySelector('body').className + ' touch';
    }

    return expression;
  }

  classModule = {
    ready: ready,
    extendExpression: extendExpression,
    _expression: expression
  };

  // == Undocumented Functions.

  /**
   * @private
   * @param methodName {String} method of the APi to call
   * @param args {Array} arguments to the method
   * @param callBack {Function} the callback function that will contains the result of call
   */
  function _callAPI(methodName, args, callback) {
    var jsonMessage = {
      type:"ExpAPICall",
      methodName:methodName,
      args:args,
      expToken: _states ? _states.expToken : null
    };

    if (callback) {
      // assign an id to the callback function
      var callbackId = new UT.UUID().toString();
      _callBacks[callbackId] = callback;
      jsonMessage.callbackId = callbackId;
    }
    window.parent.postMessage(JSON.stringify(jsonMessage), "*");
  }

  function _getInstance(){
    expression = expression || _buildExpression({});
    return expression;
  }

  classModule._callAPI = _callAPI;
  classModule._getInstance = _getInstance;

  // == Private Functions.

  /**
   * build an instance of Expression
   */
  function _buildExpression(expression){
    var debug = (window.console && console.log),
        eventTypesBindings = {}; // handle event bindings for each event type

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
      _dispatch(msgObj);
    }, false);

    /**
     * Calls all fns in the list for a given type. Passes arguments
     * through to the caller.
     * @params {String} type The type to trigger
     */
    function trigger(type) {
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
    }

    /**
     * Adds a listener fn to the list for a given event type.
     */
    function bind(type, fn) {
      var list = eventTypesBindings[type] || (eventTypesBindings[type] = []);

      // This fn is not a function
      if (typeof fn !== 'function') {
        return;
      }

      list.push(fn);
    }

    /**
     * Removes a listener fn from its list.
     */
    function unbind(type, fn) {
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
    }

    /**
     * register a post callback.
     */
    //REVIEW: this method has a bad name: post should be use to trigger the post action from within the expression.
    //        the async parameter looks weird to my eyes as well.
    // TODO : use BIND
    function post(fn) {
      postFunction = fn;
    }


    function setNote(note){
      if (typeof(note) == 'string') {
        _states.note = note;
        // TODO : think : do we need a callback or not here
        UT.Expression._callAPI('document.setNote', [note], function(){});
      }
      else {
        // Warning for Expression developers
        console.error('note should be a string (expression.setNote)');
      }
    }

    /*
     *  Call to activate / de activate next button
     *  @param ready [boolean] : true : activate, false : deactivate
     */
    function readyToPost(ready) {
       UT.Expression._callAPI('document.readyToPost', [ready], function(){});
    }

    function getNote(){
      return _states.note;
    }
    /**
     * Bind the callback function to the modeChanged event.
     * The function will receive the new mode string (edit or view).
     */
    function modeChanged(fn) {
      bind('modeChanged', fn);
    }

    /**
     * Bind the callback function to the scrollChanged event.
     * The function will receive the new scroll values.
     */
    function scrollChanged(fn) {
      bind('scrollChanged', fn);
    }

    /**
     * Bind the callback function to the imageAdded event.
     * The function will receive the image and optional extraData param.
     * @param {Function} fn
     */
    function imageAdded(fn) {
      bind('imageAdded', fn);
    }

    /**
     * Retrieve the current display mode of the expression ('either view or edit')
     */
    function getMode() {
      return _states.mode;
    }

    /**
     * Retrieve the current scroll values
     */
    function getScrollValues() {
      return _states.scrollValues;
    }

    /**
     * Retrieve an expression 'state' by its key.
     */
    // REVIEW: this is not self-explanatory and exposes the internal API. We should have a private method here instead.
    function getState(key) {
      if(!(_states && _states[key])){ return; }
      return _states[key];
    }

    /**
     * Retrieve the container DOM node.
     */
    function getElement(){
      return document.querySelector('.webdoc_expression_wrapper');
    }

    function initializeExtension(){
      // load expression extensions
      for(var i in extensions) {
        var ext = extensions[i];
        if(expression[ext.name]){
          throw "Extension " + ext.name + " is already defined.";
        }
        if(typeof ext.module === 'function'){
          expression[ext.name] = ext.module.call(UT, expression);
        } else {
          expression[ext.name] = ext.module;
        }
      }
    }

     /**
     * Native text input for mobile
     */
    function textInput(defaultValue, max, callback) {
      UT.Expression._callAPI('document.textInput', [defaultValue, max], callback);
    }


    function dialog(type, options, callback) {
      if (callback === undefined && typeof(options) === 'function') {
        callback = options;
        options = {};
      }
      switch (type) {
        case 'sound':
            UT.Expression._callAPI('medias.openSoundChooser', [options], callback);
        break;
        case 'image':
          if (options && options.size && options.size.auto) {
            console.warn('Use of size.auto is deprecated, use size.autoCrop instead');
          }
          UT.Expression._callAPI(
            'medias.openImageChooser',
            [options],
            function(imageDescriptor) {
             callback.call(this, imageDescriptor);
          });
        break;
        case 'video':
          UT.Expression._callAPI('medias.openVideoChooser', [options], callback);
        break;
      }
    }
    
    expression.dialog = dialog;
    expression.textInput = textInput;

    // Events bindings
    expression.trigger = trigger;
    expression.bind = bind;
    expression.unbind = unbind;

    // Post event
    expression.post = post;
    // ?? executePost ? TODO ?

    expression.modeChanged = modeChanged;
    expression.scrollChanged = scrollChanged;
    expression.imageAdded = imageAdded;

    // Retrieve expression mode ('edit' or 'view')
    expression.getMode = getMode;

    // Retrieve scroll values
    expression.getScrollValues = getScrollValues;

    // retrieve a specific state
    expression.getState = getState;

    expression.getElement = getElement;

    expression.initializeExtension = initializeExtension;
    
    expression.getNote = getNote;
    expression.setNote = setNote;

    expression.readyToPost = readyToPost;

    // == Private Methods

    function _dispatch(msg) {
      switch (msg.type) {
        case 'ready' :
          _ready(msg.options);
          break;
        case 'triggerEvent' :
          trigger.apply(this, [msg.eventName].concat(msg.eventArgs));
          break;
        case 'callback' :
          _receiveCallBack(msg.callbackId, msg.result);
          break;
        case 'post' :
          _post();
      }
    }

    function _ready(states) {
      console.log('READY', states);
      expression.isReady = true;
      _states = states;

      bind('modeChanged', function(newMode) {
        _states.mode = newMode;
      });
      bind('scrollChanged', function(newScrollValues) {
        _states.scrollValues = newScrollValues;
      });
      bind('afterReady', function() {
        _changeCurrentState('initialized');
      });
      initializeExtension();
      trigger('ready', expression);
    }

    function _post() {
      if (postFunction) {
        postFunction.call(classModule, function() {});
      }
      UT.Expression._callAPI("posted");
    }

    function _changeCurrentState(newState) {
      UT.Expression._callAPI("changeCurrentState", [newState]);
    }
    /**
     * Events called when callback are recieved from post message.
     * @private
     * @param callBackUUID the uuid of the callback to call
     * @param result the result parameter to the caallback
     */
    function _receiveCallBack(callBackUUID, result) {
      var callBack = _callBacks[callBackUUID];
      if (callBack) {
        if ( !(result && result instanceof Array )) {
          if(window.console && console.error){
            console.error('received result is not an array.', result);
          }
        }
        callBack.apply(this, result);
        delete _callBacks[callBackUUID];
      }
    }
    return expression;
  }

  return classModule;
})();

UT.Expression.extendExpression('container', function(expression){

  var module = {};

  // Tell the iframe to resize to the whole content size.
  module.autoResize = function() {
    var height = expression.getElement().scrollHeight;
    UT.Expression._callAPI('container.resizeHeight', [height]);
  };
 // autoResize only work on certain condition. Often it is much more easier to set the height needed
 // callback is called when container has been resized
  module.resizeHeight = function(height, callback) {
    UT.Expression._callAPI('container.resizeHeight', [height], callback);
  };

  module.setTitle = function(title){
    UT.Expression._callAPI('container.setTitle', [title]);
  };

  // XXX Unused
  popupUsers = function(userIds) {
    UT.Expression._callAPI('container.popupUsers', [uerIds]);
  };

  // XXX Unused
  popup = function(data, ratio) {
    UT.Expression._callAPI('container.popup', [data, ratio]);
  };
  // XXX Unused
  closePopup = function() {
    UT.Expression._callAPI('container.closePopup');
  };



  return module;
});

UT.Expression.extendExpression('medias', function(expression){
  return {
    // open a dialog box that let the user pick an image from various sources.
    //
    // The last parameter is a callback function that will receive the image.
    imageDialog: function(options, callback) {
      if (console && console.warn) {
        console.warn('Usage of imageDialog Deprecated, use expression.dialog instead');
      }
      if (!callback){
        callback = options;
        options = {};
      }

      if (options && options.size && options.size.auto && window.console && console.warn) {
        console.warn('Use of size.auto is deprecated, use size.autoCrop instead');
      }
      UT.Expression._callAPI('medias.openImageChooser', [options], function(imageDescriptor){
        callback.call(this, imageDescriptor);
      });
    },

    createImage: function(urlOrBase64, callback) {
      var readyState = expression.readyToPost();
      expression.readyToPost();
      UT.Expression._callAPI('medias.createImage', [urlOrBase64], function(){
        expression.readyToPost(readyState);
        callback.apply(expression, arguments);
      });
    },


    /*
     * Options should be : {x : source X,y : source Y, w : source width, h  : source height, width : dest Width, height : dest Height}
     */
    reCrop : function(imageOrURLOrBase64, options, callback) {
      if (imageOrURLOrBase64._type && imageOrURLOrBase64._type === 'image') {
        if (imageOrURLOrBase64._original) {
          UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64._original, crop : options, info : imageOrURLOrBase64.info}], callback);
        }
        else {
          UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64.url, crop : options, info : imageOrURLOrBase64.info}], callback);
        }
      }
      else {
        UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64, crop : options}], callback);
      }
    },

    crop : function(imageOrURLOrBase64, options , callback){

      var pictureID = 0;
      var center = null;
      var info = null;
      if (imageOrURLOrBase64.pictureID) {
        pictureID = imageOrURLOrBase64.pictureID;
      }
      if (imageOrURLOrBase64._center) {
        center = imageOrURLOrBase64._center;
      }
      if (imageOrURLOrBase64.info) {
        info = imageOrURLOrBase64.info;
      }
      if (imageOrURLOrBase64._original) {
        imageOrURLOrBase64 = imageOrURLOrBase64._original;
      }
      else if (imageOrURLOrBase64.url) {
        if (imageOrURLOrBase64.url.indexOf('http://proxy') !== 0) {
          imageOrURLOrBase64 = expression.url.proxify(imageOrURLOrBase64.url);
        }
        else {
          imageOrURLOrBase64 = imageOrURLOrBase64.url;
        }
      }
   
      UT.Expression._callAPI('medias.crop', [{
          pictureID : pictureID,
          url : imageOrURLOrBase64,
          size : options,
          center : center,
          info : info
        }], function(imageDescriptor){
            callback.call(this, imageDescriptor);
        });
    },

    applyFilterToImage : function(urlOrBase64, options, callback) {
      var crop =  null;
      var info = null;
      if (urlOrBase64._center) {
        crop = urlOrBase64._center;
        // a bug prevent x and y properties to be send by postmessage ???
        crop.xb = crop.x;
        crop.yb = crop.y;
      }
      if (urlOrBase64.info) {
        info = urlOrBase64.info;
      }
      if (urlOrBase64._type && urlOrBase64._type === 'image') {
        if (urlOrBase64._original) {
          UT.Expression._callAPI('medias.applyFilter', [{url : urlOrBase64._original, filter :  options, crop : crop, info : info}], callback);
        }
        else {
          UT.Expression._callAPI('medias.applyFilter', [{url : urlOrBase64.url, filter :  options, crop : crop, info : info}], callback);
        }
      }
      else {
        UT.Expression._callAPI('medias.applyFilter', [{url : urlOrBase64, filter :  options, info : info}], callback);
      }
    },

    // XXX: USE EXPRESSION.ITEMS.SAVE
    /**
    * saveImage
    * WIP an helper function that combine medias.createImage() and items.save();
    * @param key the key associate with the image (to retrieve it latter with save)
    * @param urlOrBase64 URL or dataURL of the image to save
    * @param callback Callback called when function execution is over (success or failed)
    */
    saveImage: function(key, urlOrBase64, callback) {
       UT.Expression._callAPI(
          'medias.createImage',
           [urlOrBase64],
           function (obj, error) {
            postMessageAPI.apply('items.save', [key, obj], function(data, error){
              if(error){
                // XXX have to define an error format.
                if(!callback && window.console && console.error){
                  console.error('Unable to save object with key: ' + key, error.message);
                } else if(callback){
                  callback.call(error, null, error);
                }
                return;
              }
              obj._id = data._id;
             // TODO : cahcke the item when saved success
             //  cacheItem(key, obj);
              if(callback){
                callback.call(obj, obj, null);
              }
            });
        });
    },

    imageWithDataUrl: function(image, callback){
      UT.Expression._callAPI('medias.imageWithDataUrl', [image], callback);
    },

    soundDialog: function(options, callback) {
     if (console && console.warn) {
        console.warn('Usage of soundDialog Deprecated, use expression.dialog instead');
      }
      UT.Expression._callAPI('medias.openSoundChooser', [options], callback);
    },

    videoDialog: function(options, callback) {
      if (console && console.warn) {
        console.warn('Usage of videoDialog Deprecated, use expression.dialog instead');
      }
      UT.Expression._callAPI('medias.openVideoChooser', [options], callback);
    },

    findImage: function(mediaId, callback) {
      UT.Expression._callAPI('medias.findImage', [mediaId], callback);
    }
  };
});
UT.Expression.extendExpression('document', function(expression){
  return {
    getDocumentURL: function() {
      return expression.getState('documentURL');
    },

    getDocumentPrivacy: function() {
      return expression.getState('documentPrivacy');
    }
  };
});
/**
 * Webdoc Url API
 */

UT.Expression.extendExpression('url', function(expression){
  var url = {};

  url['for'] = function(asset) {
    return url.getAssetPath(asset);
  };

  url.getAssetThroughProxy = function(asset)
  {
    return this.proxify(this.getAssetPath(asset));
  };

  url.getAssetPath = function(asset) {
    // var host = 'http://' + expression.getState('host');
    if (asset.indexOf('./') === 0) {
      asset = asset.substring(1);
    }
    if (expression.getState('assetPath').indexOf('http') === -1) {
      return  'http://' + expression.getState('host') + '/' + expression.getState('assetPath') + asset;
    }
    return expression.getState('assetPath') + asset;
  };

  url.proxify = function(urlOrBase64){
  //  console.log('Proxify : ', urlOrBase64);
    var host = window.location.protocol + '//' + expression.getState('host') + '/image_proxy/';
    if (typeof(urlOrBase64) == 'string' &&
        urlOrBase64.indexOf('data:image') !== 0 &&
        urlOrBase64.indexOf('image_proxy') == -1){
      var newUrl = urlOrBase64;
      if (urlOrBase64.indexOf('http://') === 0)
        newUrl = host + urlOrBase64.substring(7);
      else if(urlOrBase64.indexOf('https://') === 0)
        newUrl = host + urlOrBase64.substring(8);
      else if(urlOrBase64.indexOf('./') === 0 || urlOrBase64.indexOf('/') === 0)
        return urlOrBase64;
      else if(urlOrBase64.indexOf('//') === 0)
        newUrl = host + urlOrBase64.substring(2);
      else
        newUrl = host + urlOrBase64;
      return newUrl;
    }
    return urlOrBase64;
  };
  return url;
});


// Define collections
UT.Expression.extendExpression('collections', function(expression) {
  var documentId = expression.getState('documentId');
  var collections = expression.getState('collections');
  var currentUserId = expression.getState('currentUserId');
  if(documentId && collections) {
    var collectionStore = new UT.CollectionStore({
      data: collections,
      currentUserId: currentUserId,
      delegate: {
        save: function(name, items, callback) {
          UT.Expression._callAPI('collections.save', [name, items], callback);
        },
        authenticate: function(callback) {
          UT.Expression._callAPI('authenticate');
        }
      }
    });
    expression.storage = collectionStore.get('default');
    return collectionStore;
  }
});

UT.Expression._getInstance();