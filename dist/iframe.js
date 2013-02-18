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

    // handle touchs
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
      document.querySelector('html').className = document.querySelector('html').className + ' touch';

      if (typeof FastClick != 'undefined') {
        window.addEventListener('load', function() {
          new FastClick(document.body);
        }, false);
      }
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
    if(callback){
      // assign an id to the callback function
      var callbackId = UT.uuid().toString();
      _callBacks[callbackId] = callback;
      jsonMessage.callbackId = callbackId;
    }
    var json = JSON.stringify(jsonMessage);
    window.parent.postMessage(json, "*");
  }

  function _getInstance(){
    expression = expression || _buildExpression({});
    return expression;
  }

  function _reset(){
    expression = null;
  }

  classModule._callAPI = _callAPI;
  classModule._getInstance = _getInstance;
  classModule._reset = _reset;

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
      if(ready !== undefined && ready != _states.readyToPost ){
        _states.readyToPost = !!ready;
        UT.Expression._callAPI('document.readyToPost', [_states.readyToPost], function(){});
      }
      return _states.readyToPost;
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
     * DEPRECATED signature: (defaultValue, max, callback)
     */
    function textInput(options, callback) {
      if(typeof arguments[0] == 'string'){
        options = {
          value: arguments[0],
          max: arguments[1]
        };
        callback = arguments[2];
      } else if(typeof options == 'function'){
        callback = options;
        options = {};
      }
      UT.Expression._callAPI(
        'document.textInput',
        [options.value || null, options.max || null, options.multiline || false],
        callback
      );
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
            if(window.console && console.warn){
              console.warn('Use of size.auto is deprecated, use size.autoCrop instead');
            }
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
      expression.isReady = true;
      _states = states;

      // default ready to post state is false
      _states.readyToPost = false;
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
    expression._ready = _ready;

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
      if (!imageOrURLOrBase64._type || imageOrURLOrBase64._type !== 'image') {
        imageOrURLOrBase64 = {
          url : imageOrURLOrBase64
        };
      }
      UT.Expression._callAPI('medias.reCrop', [{
          size : options,
          image : imageOrURLOrBase64
        }],
        function(imageDescriptor) {
            callback.call(this, imageDescriptor);
      });
    },

    crop : function(imageOrURLOrBase64, options , callback){
      if (!imageOrURLOrBase64._type || imageOrURLOrBase64._type !== 'image') {
        imageOrURLOrBase64 = {
          url : imageOrURLOrBase64
        };
      }
      UT.Expression._callAPI('medias.crop', [{
            size : options,
            image : imageOrURLOrBase64
          }],
          function(imageDescriptor) {
              callback.call(this, imageDescriptor);
        });
    },

    applyFilterToImage : function(imageOrURLOrBase64, options, callback) {
      if (!imageOrURLOrBase64._type || imageOrURLOrBase64._type !== 'image') {
        imageOrURLOrBase64 = {
          url : imageOrURLOrBase64
        };
      }
      UT.Expression._callAPI('medias.applyFilter', [{
            filter : options,
            image : imageOrURLOrBase64
          }],
          function(imageDescriptor) {
              callback.call(this, imageDescriptor);
        });
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