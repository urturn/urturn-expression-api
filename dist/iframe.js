/*
 * This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
 * Add Support to IE GEt/Set
 */
(function() {
  "use strict";
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
}());

/**
 * Fix touch events with text input on iOS
 */
/**
 * Fix touch events with text input on iOS
 */
UT.touchEventFix = (function (global, isIframe) {
  "use strict";
  //Test if it is an iOS device and that we may swap the implementation
  if (!/(iPad|iPhone|iPod)/g.test(global.navigator.userAgent) || !Element.prototype.addEventListener) {
    return null;
  }

  var nativeAddEventListener = global.Element.prototype.addEventListener,
    nativeRemoveEventListener = global.Element.prototype.removeEventListener,
    uuid = 0,
    eventListeners = {},
    returnObj,
    touchEventsEnabled = true,
    debug = false;

  //Run the tweak
  swapEventListenerImplementation();

  //Default behaviour
  enableCapture();

  // log helpers
  var log = function(arg) {
    if (debug) {
      console.log(arg);
    }
  };
  var group = function(arg) {
    return debug && global.console && global.console.group && global.console.group(arg);
  };
  var groupEnd = function() {
    return debug && global.console && global.console.groupEnd && global.console.groupEnd();
  };

  function swapEventListenerImplementation() {
    var newAddEventListener = function () {
      var type = arguments[0],
        listener = arguments[1],
        shouldAddListener = true;

      if ((type === 'touchstart' || type === 'touchend' || type === 'touchcancel' || type === 'touchmove' || type === 'touchleave') &&
        typeof listener === 'function') {
        if (touchEventsEnabled) {
          this.__UT__uuid = this.__UT__uuid || getUUID();
          eventListeners[this.__UT__uuid] = eventListeners[this.__UT__uuid] || {};
          eventListeners[this.__UT__uuid][type] = {
            node: this,
            callback: listener
          };
        } else {
          shouldAddListener = false;
        }
      }

      log("_");
      log("->> Called addEventListener, type: " + type + ", in iframe: " + isIframe + ", will be added: " + shouldAddListener);

      if (shouldAddListener) {
        nativeAddEventListener.apply(this, arguments);
      }
    };

    var newRemoveEventListener = function () {
      var type = arguments[0],
        listener = arguments[1];

      if ((type === 'touchstart' || type === 'touchend' || type === 'touchcancel' || type === 'touchmove' || type === 'touchleave') &&
        typeof listener === 'function') {
        if (eventListeners[this.__UT__uuid] && eventListeners[this.__UT__uuid][type]) {
          delete eventListeners[this.__UT__uuid][type];
        }
      }

      nativeRemoveEventListener.apply(this, arguments);
    };

    global.Element.prototype.addEventListener = newAddEventListener;
    global.Element.prototype.removeEventListener = newRemoveEventListener;
    global.document.addEventListener = newAddEventListener;
    global.document.removeEventListener = newRemoveEventListener;
  }

  //Not public for now

  function restoreEventListenerImplementation() {
    global.Element.prototype.addEventListener = nativeAddEventListener;
    global.Element.prototype.removeEventListener = nativeRemoveEventListener;
    global.document.addEventListener = nativeAddEventListener;
    global.document.removeEventListener = nativeRemoveEventListener;
  }

  function onFocus(event) {
    if (global.document.activeElement.nodeName == 'TEXTAREA' ||
      global.document.activeElement.nodeName == 'INPUT' ||
      global.document.activeElement.getAttribute('contenteditable')) {
      disableTouchEvents();
    }
  }

  function enableTouchEvents() {
    var obj1, obj2, obj3, obj4, obj5;

    touchEventsEnabled = true;
    log("->> enableTouchEvents");

    if (isIframe) {
      global.top.postMessage('"touchevents-enable"', "*");
    }

    for (var key in eventListeners) {
      if (eventListeners.hasOwnProperty(key)) {
        obj1 = eventListeners[key].touchstart;
        obj2 = eventListeners[key].touchend;
        obj3 = eventListeners[key].touchcancel;
        obj4 = eventListeners[key].touchmove;
        obj5 = eventListeners[key].touchleave;

        if (obj1) {
          nativeAddEventListener.call(obj1.node, 'touchstart', obj1.callback, false);
        }
        if (obj2) {
          nativeAddEventListener.call(obj2.node, 'touchend', obj2.callback, false);
        }
        if (obj3) {
          nativeAddEventListener.call(obj3.node, 'touchcancel', obj3.callback, false);
        }
        if (obj4) {
          nativeAddEventListener.call(obj4.node, 'touchmove', obj4.callback, false);
        }
        if (obj5) {
          nativeAddEventListener.call(obj5.node, 'touchleave', obj5.callback, false);
        }
      }
    }
  }

  function disableTouchEvents() {
    var obj1, obj2, obj3, obj4, obj5;
    touchEventsEnabled = false;

    log("->> disableTouchEvents");

    if (isIframe) {
      global.top.postMessage('"touchevents-disable"', "*");
    }

    for (var key in eventListeners) {
      if (eventListeners.hasOwnProperty(key)) {
        obj1 = eventListeners[key].touchstart;
        obj2 = eventListeners[key].touchend;
        obj3 = eventListeners[key].touchcancel;
        obj4 = eventListeners[key].touchmove;
        obj5 = eventListeners[key].touchleave;

        if (obj1) {
          nativeRemoveEventListener.call(obj1.node, 'touchstart', obj1.callback, false);
        }
        if (obj2) {
          nativeRemoveEventListener.call(obj2.node, 'touchend', obj2.callback, false);
        }
        if (obj3) {
          nativeRemoveEventListener.call(obj3.node, 'touchcancel', obj3.callback, false);
        }
        if (obj4) {
          nativeRemoveEventListener.call(obj4.node, 'touchmove', obj4.callback, false);
        }
        if (obj5) {
          nativeRemoveEventListener.call(obj5.node, 'touchleave', obj5.callback, false);
        }
      }
    }
  }

  function enableCapture() {
    if (isIframe) {
      nativeAddEventListener.call(global.document, 'focus', onFocus, true);
      nativeAddEventListener.call(global.document, 'blur', enableTouchEvents, true);
    }
    global.addEventListener("message", didReceiveMessage, true);
  }

  function disableCapture() {
    if (isIframe) {
      nativeRemoveEventListener.call(global.document, 'focus', onFocus, true);
      nativeRemoveEventListener.call(global.document, 'blur', enableTouchEvents, true);
    }
    global.removeEventListener("message", didReceiveMessage, true);
  }

  function didReceiveMessage(event) {
    log("didReceiveMessage" + " " + event.data);

    if (event.data === "touchevents-enable") {
      enableTouchEvents();
    } else if (event.data === "touchevents-disable") {
      disableTouchEvents();
    }
  }

  function getUUID() {
    return parseInt(uuid++,10);
  }

  function getEventListenersDescription() {
    console.group("EventListeners description:");

    for (var key in eventListeners) {
      console.group("%s:", key);

      if (eventListeners.hasOwnProperty(key)) {
        log(eventListeners[key]);
      }

      console.groupEnd();
    }

    console.groupEnd();
  }

  returnObj = {
    enableCapture: enableCapture,
    disableCapture: disableCapture,
    enableTouchEvents: enableTouchEvents,
    disableTouchEvents: disableTouchEvents,
    getEventListenersDescription: getEventListenersDescription,
    didReceiveMessage : didReceiveMessage
  };

  return returnObj;
}(window, true));

__STACK_JQUERY_JS = null;

; (function(UT, window, document, undefined){
  "use strict";
  /**
   * valid options keys: data, delegate, currentUserId
   */
  UT.Collection = function(options) {
    var self = this;
    // PRIVATE Properties
    var currentUserId, delegate, data,
        items, cached_items,
        keys, dirtyKeys, boundKeys, count,
        operations;

    // PUBLIC Properties
    this.length = 0; // loded items count
    this.name = null;
    this.isPublic = function isPublic(){
      return false;
    };

    // Add or updated an item binded to a specific key
    var setItem = this.setItem = function(key, item) {
      if(!key) {
        throw new Error("InvalidKey", key);
      }
      if(UT.Collection.isReservedKey(key)) {
        throw new Error("ReservedKey", key);
      }
      var oldItem = items[key]; // Avoid getItem here as we want the copied value.
      var sanItem = sanitizeItem(key, item);

      if(!sanItem && !items[key]){
        // set null or undefined on an inexistant item
        // do not delete in this case.
        return sanItem;
      }
      if(oldItem && (sanItem === null || sanItem === undefined)) {
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
      // Add key to dirtyKeys
      if(dirtyKeys.indexOf(key) == -1) {
        dirtyKeys.push(key);
      }
      self.length = keys.length;
      cached_items[key] = item;
      return item;
    };

    var getItemFromBoundedKey = function(key){
      if(boundKeys.indexOf(key) === -1 && self[key] !== undefined){
        return self[key];
      }
    };

    var getItem = this.getItem = function(key, defaultValue) {
      if(!key) {
        return null;
      }
      var item = cached_items[key];
      if(!item){
        item = UT.Collection.buildItem(items[key]);
        if (item === undefined) {
          item = getItemFromBoundedKey(key);
        }
        if (item === undefined) {
          item = defaultValue;
        }
        cached_items[key] = item;
      }
      return item;
    };

    this.key = function(n) {
      if(n >= keys.length) {
        return null;
      }
      return keys[n];
    };

    /**
     * Without argument retrieve the total count
     * if filterKey is given, return the number
     * of item where this properties is defined and not null.
     * This last option is available only for field declared
     * in collection field.
     */
    this.count = function() {
      return count;
    };

    this.toString = function() {
      return '<Collection @name="' + self.name + '">';
    };

    this.save = function() {
      bindNewKeys();
      var itemsToSave = {};
      if(dirtyKeys.length > 0) {
        for(var i = 0; i < dirtyKeys.length; i++) {
          itemsToSave[dirtyKeys[i]] = UT.Collection.marshallItem(items[dirtyKeys[i]]);
        }
        delegate.save(self.name, itemsToSave);
        dirtyKeys = [];
      }
    };

    /**
     * Retrieve a hash of data compatible with the one received.
     */
    this.getCurrentData = function() {
      var newData = {
        name: self.name,
        count: count,
        definition: data.definition,
        operations: [],
        items: [],
        public: false
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
      initialize.call(self, {currentUserId: currentUserId, delegate: delegate, data: json});
    };

    // Cleanup item to keep only authorized keys

    var sanitizeItem = UT.Collection.sanitizeItem;

    // constructor
    var initialize = function(options) {
      UT.Collection.validateOptions(options);
      operations = {}; // map of operations results
      keys = []; // all used keys
      dirtyKeys = []; // item keys to be saved
      boundKeys = [];

      currentUserId = options.currentUserId;
      delegate = options.delegate;
      data = options.data;
      self.name = data.name;
      count = data.count;
      initializeItems(data.items);
    };

    var initializeItems = function(dataItems) {
      items = {};
      cached_items = {};
      if(!dataItems) {
        return;
      }
      for(var j = 0; j < dataItems.length; j++) {
        var item = dataItems[j];
        var key = item._key;
        items[key] = item;
        bindItem(key, item);
        keys.push(key);
      }
      self.length = keys.length;
    };

    var bindItem = function(key, value) {
      if(boundKeys.indexOf(key) == -1 && !UT.Collection.isReservedKey(key)){
        boundKeys.push(key);
        self.__defineGetter__(key, function() {
          return getItem.call(self, key);
        });
        self.__defineSetter__(key, function(value) {
          return setItem.call(self, key, value);
        });
      }
    };

    var bindNewKeys = function() {
      var keys = Object.keys(self);
      for(var i = keys.length - 1; i >= 0; i--) {
        var key = keys[i];
        if(!UT.Collection.isReservedKey(key) && boundKeys.indexOf(key) == -1) {
          setItem(key, self[key]);
          bindItem(key, self[key]);
        }
      }
    };
    initialize(options);
  };

  UT.Collection.RESERVED_KEYS = [
    'refresh',
    'setItem',
    'getItem',
    'count',
    'sum',
    'key',
    'isPublic',
    'getUserItem',
    'setUserItem',
    'average',
    'toString',
    'size',
    'length',
    'name',
    'save',
    'fieldDefs',
    'sanitizedItem',
    'getCurrentData'
  ];
  UT.Collection.isReservedKey = function(key) {
    return UT.Collection.RESERVED_KEYS.indexOf(key) >= 0;
  };

  UT.Collection.validateOptions = function(options){
    if(!options.data) {
      throw new Error("ArgumentError", "missing data");
    }
    if(!options.data.name) {
      throw new Error("ArgumentError", "no name in data");
    }
    if(options.data.count === undefined) {
      throw new Error("ArgumentError", "no count in data");
    }
  };

  UT.Collection.marshallItem = function(item){
    if(item && item.marshall){
      return item.marshall();
    } else if(item !== undefined && item !== null) {
      return item;
    } else {
      return null; // item to delete
    }
  };

  /**
   * Send back a sanitized copy of the item.
   */
  UT.Collection.sanitizeItem = function(key, item) {
    if(typeof item === 'function'){
      throw new Error("ArgumentError cannot serialize function");
    }
    var result = UT.Collection.marshallItem(item);
    if(result !== null){
      // Convert built-in type to literal object.
      if(typeof(result) !== 'object' || [].constructor === result.constructor) {
        result = {
          _type: 'literal',
          value: result
        };
      }
      result._key = key;
      if(!result || result.constructor !== {}.constructor){
        throw new Error("Unserialisable object");
      }
      // Cloning this way is safe and only
      // 18% slower than manual cloning given jsPerf results.
      return JSON.parse(JSON.stringify(result));
    } else {
      return null;
    }
  };

  UT.Collection.buildItem = function(data) {
    if(data && data._type && UT.Collection.ItemBuilders[data._type]){
      return UT.Collection.ItemBuilders[data._type](data);
    } else {
      return data;
    }
  };

  UT.Collection.ItemBuilders = {
    image: function(data){
      return new UT.Image(data);
    },
    sound: function(data){
      return new UT.Sound(data);
    },
    video: function(data){
      return new UT.Video(data);
    },
    literal: function(data){
      return data.value;
    }
  };
})(UT, window, document, undefined);
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
    if(data.public){
      collections[name] = new UT.PublicCollection({
        data: data,
        postMessageApi: options.postMessageApi,
        currentUserId: options.currentUserId,
        delegate: delegate
      });
    } else {
      collections[name] = new UT.Collection({
        data: data,
        postMessageApi: options.postMessageApi,
        currentUserId: options.currentUserId,
        delegate: delegate
      });
    }
  }

  // Retrieve a collection given its name.
  this.get = function(name) {
    return collections[name];
  };

  this.set = function(collection) {
    collections[collection.name] = collection;
  };

  this.each = function(fn) {
    for(var k in collections){
      fn(collections[k]);
    }
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

; (function(UT, window, document, undefined){
  "use strict";

  var VALID_FILTERS = ['recent', 'friends'];

  /**
   * valid options keys: data, delegate, currentUserId
   */
  UT.PublicCollection = function(options) {
    // PUBLIC Properties
    this.length = 0; // loded items count
    this.name = null;

    var userItem = null;
    var dirty = false;

    this.isPublic = function isPublic(){
      return true;
    };

    // PUBLIC Methods
    // Add an anonymous item (without a key).
    var setUserItem = this.setUserItem = function(item) {
      if(!currentUserId) {
        delegate.authenticate();
        throw new Error("ArgumentError", "No currentUserId defined");
      }
      var key = currentUserId;
      var sanItem = sanitizeItem(key, item);
      var oldItem = userItem;

      if(!sanItem && !oldItem){
        return sanItem;
      }
      recomputeOperations(oldItem, sanItem);

      if(oldItem && (sanItem === null || sanItem === undefined)) {
        // delete
        count--;
        userItem = null;
      } else if(!oldItem && sanItem) {
        // insert
        count++;
        userItem = sanItem;
      } else {
        // update
        userItem = sanItem;
      }
      dirty = true;
      return userItem;
    };

    var getUserItem = this.getUserItem = function(item) {
      if(!currentUserId) {
        return;
      }
      return userItem;
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

    var sanitizeItem = function(key, item){
      var sanitizedItem = UT.Collection.sanitizeItem(key, item);
      var fieldDefs = data.definition.fields;
      if(item && fieldDefs && fieldDefs.length > 0) {
        var valid = false;
        for(var i = 0; i < fieldDefs.length; i++) {
          var fd = fieldDefs[i];
          if(item[fd.name] !== undefined) {
            valid = true;
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
              throw new Error('TypeError', 'Unknown type ' + fd.type);
            }
          }
        }
        if(!valid){
          throw new Error('InvalidItemError no valid field specified');
        }
      }
      return sanitizedItem;
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
      return '<PublicCollection @name="' + this.name + '">';
    };


    var marshall = function(item){
      if(item && item.marshall){
        return item.marshall();
      } else if(item) {
        return item;
      } else {
        return null; // item to delete
      }
    };

    this.save = function() {
      if (!dirty){
        return;
      }
      var items = {};
      items[currentUserId] = UT.Collection.marshallItem(userItem);
      delegate.save(this.name, items);
      dirty = false;
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
        items: [],
        public: true
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

      if (getUserItem()){
        userItem._key = currentUserId;
        newData.items.push(getUserItem());
      }
      for(var j = 0; j < data.items.length; j++){
        if(data.items[j]._key && data.items[j]._key != currentUserId){
          newData.items.push(data.items[j]);
        }
      }
      return newData;
    };

    /**
     * Let you find the latest items.
     *
     * @params [options] or a filter string
     * @params callback function
     */
    this.find = function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = {filters: {recent: true}};
      }
      if(typeof options === 'string') {
        if(VALID_FILTERS.indexOf(options) === -1){
          throw new Error('invalid filter ('+ options +')');
        }
        var filters = {};
        filters[options] = true;
        options = {filters: filters};
      }
      if(!callback || typeof callback !== 'function'){
        throw new Error('missing callback argument');
      }
      delegate.find(this.name, options, callback);
    };

    this.refresh = function(json) {
      initialize.call(this, {currentUserId: currentUserId, delegate: delegate, data: json});
    };

    // PRIVATE Properties
    var currentUserId, delegate, data, items,
        operations, count;

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
            if(count === 1){ // When we remove the only item.
              field.average = -1;
            } else {
              field.average = ((field.average * count) - oldItem[operation.field]) / parseFloat(count - 1);
            }
            count--;
          }
          if(newItem && newItem[operation.field] !== undefined) {
            field.average = ((field.average * count) + newItem[operation.field]) / parseFloat(count + 1);
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

    // constructor
    var initialize = function(options) {
      UT.Collection.validateOptions(options);
      operations = {}; // map of operations results

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
      if(!dataItems) {
        return;
      }
      for(var j = 0; j < dataItems.length; j++) {
        var item = dataItems[j];
        var key = item._key;
        if(key == currentUserId){
          userItem = item;
        }
      }
    };

    initialize.call(this, options);
  };
})(UT, window, document, undefined);

; (function(UT, window, document, undefined){
  "use strict";
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
    if(isReady){
      callback.call(this, postInstance);
      _callAPI("changeCurrentState", ["initialized"]);
    } else {
      if(readyListeners.indexOf(callback) === -1){
        readyListeners.push(callback);
      }
    }
  };

  /**
   * Retrieve the API version of the current expression
   */
  UT.Expression.apiVersion = function() {
    return states && states.apiVersion || '1.2.11-alpha1-vanilla';
  };

  UT.Expression.version = function() {
    return states && states.version || null;
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
    // For save we delay it until post is ready
    if (methodName == 'collections.save' && !postInstance.isDisplay()) {
      __callAPIStack.push({methodName : methodName, args : args, callback : function() {}});
      if (callback) {
          callback(); 
      }
      return;
    }
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

  var __callAPIStack = [];

  var _resolveCallAPIStack = UT.Expression._resolveCallAPIStack = function () {
    var i = 0;
    while (i < __callAPIStack.length) {
      _callAPI(__callAPIStack[i].methodName, __callAPIStack[i].args, __callAPIStack[i].callback);
      ++i;
    }
    __callAPIStack = [];
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

    postInstance.on('scroll', function(newScrollValues) {
      states.scrollValues = newScrollValues;
    });
    for(var i = 0; i < readyListeners.length; i++){
      readyListeners[i].call(postInstance, postInstance);
    }
    readyListeners = [];
     _callAPI("changeCurrentState", ["initialized"]);
  };

  var _post = function() {
    postInstance.fire('publish');
    _callAPI("posted");
  };

  var _pause = function() {
    postInstance.fire('pause');
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
        break;
      case 'pause':
        _pause();
        break;
      case 'media' :
        postInstance.fire('media', msg.eventArgs[0]);
        break;
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
    states = null;
  };

  /**
   * @private
   * Retrieve the post instance.
   */
  UT.Expression._postInstance = function(){
    postInstance = postInstance;
    return postInstance;
  };
})(UT, window, document, undefined);
; (function(UT){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this.avatar = function(){
      return userDescriptor.avatar;
    };
    // Might not be set
    this.uuid = userDescriptor.uuid;
    this.numberOfPost = userDescriptor.numberOfPost;
    this.numberOfUse = userDescriptor.numberOfUse;
  };

  UT.User.prototype.marshall = function(){
    return { _type: 'user', uuid: this.uuid };
  };
})(UT);
;(function(UT, window, document, undefined){
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


    // Set parameters in states
    var parameters = states.parameters;

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
      self.fire('noteUpdated');
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

    if (context.player) {
      __STACK_JQUERY_JS = [];
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
      if(eventName === 'scrollChanged'){
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
        case 'image':
          var img = new UT.Image();
          img.init(callbackArgs[0]);
          callbackArgs[0] = img;
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
        //  self.node.style.display = 'none';
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


    var _isDisplay = false;
    var isDisplay = this.isDisplay = function( ) {
      return _isDisplay;
    };
    /**
     * Display the post and call resize events
     */
    var display = this.display = function() {
      _isDisplay = true;
      UT.Expression._resolveCallAPIStack();
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
     * Touchevents Fix
     */
    var enabletouchevents = null;
    var disabletouchevents = null;

    if (UT.touchEventFix) {
      enabletouchevents = UT.touchEventFix.enableTouchEvents;
      disabletouchevents =  UT.touchEventFix.disableTouchEvents;
    }

    this.on('enabletouchevents', enabletouchevents);
    this.on('disabletouchevents', disabletouchevents);

    /**
     * Respond on note modification event.
     */
    this.on('shouldUpdateNote', function(newNoteValue) {
      states.note = newNoteValue;
      self.fire('noteUpdated');
    });




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

/**
* An image object return by create('image');
* Use it to manipulate an image (crop, filter, ...)
* @param {object} imageDescriptor an object return by internal sdk
*/
UT.Image = function(imageDescriptor) {
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
   }.bind(this));
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
   }.bind(this));
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
   }.bind(this));
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
     }.bind(this)
   );
  };

  this.marshall = function() {
    this.descriptor._type = 'image';
    return this.descriptor;
  };

  /**
   * Instantiate an Image instance
   * since: 0.9.0
   */
  this.node = function(callback) {
    var img = new Image();
    img.onload = function(){
      callback.call(img, img);
    };
    img.src = this.url;
  };

  // Private methods
  // LOOK AWAY!
  // Use to on this interface with Urturn API
  this.init = function(imageDescriptor) {
    if (typeof(imageDescriptor) == 'string') {
      this.url = imageDescriptor;
      this.descriptor = {};
      this.descriptor.url = imageDescriptor;
      this.descriptor._type = 'image';
    }
    else if (imageDescriptor && imageDescriptor.url) {
      this.url = imageDescriptor.url;
      this.descriptor = imageDescriptor;
      this.info = imageDescriptor.info;
      if (imageDescriptor.center) {
        this.info.crop = imageDescriptor.center;
      }
    }
  };

  this.descriptor = {};
  if(imageDescriptor){
    this.init(imageDescriptor);
  }
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

	this.marshall = function(){
		descriptor.url = this.url;
		descriptor._type = 'video';
		descriptor.appData = this.appData;
		return descriptor;
	};

	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildVideo(videoDescriptor) {
		this.url = videoDescriptor.url;
		this.appData = videoDescriptor.appData;
		descriptor = videoDescriptor;
	}
	var descriptor = {};
	// init !
	_buildVideo.call(this, videoDescriptor);
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

	this.marshall = function(){
		return {
			_type: 'sound',
			service: this.service,
			url: this.url,
			title: this.title,
			artist: this.artist,
			cover: this.cover,
			artistCover: this.artistCover,
			soundCover: this.soundCover,
			waveFormImage: this.waveFormImage,
			link: this.link,
			appData: this.appData
		};
	};

	var descriptor = {};
	_buildSound.call(this, soundDescriptor);
};
; (function(UT){
  /**
   * This event is sent by the on('resize') producers.
   */
  UT.ResizeEvent = function(width, height){
    this.height = height;
    this.width = width;
  };

  UT.ScrollEvent = function(scrollTop, scrollBottom){
    this.scrollTop = scrollTop;
    this.scrollBottom = scrollBottom;
  };
})(UT);
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
        console.error("received invalid message", e.data, exception.message) ;
      }
      msgObj = {};
  }
  UT.Expression._dispatch(msgObj);
}, false);

; (function(UT, window, document, undefined){
  "use strict";

  UT.preloader = {};

  UT.preloader.waitFor = function(keys, debug){
    if(typeof(debug) == 'undefined') debug = false;
    var that = this;
    var instance = {
      keys:{},
      callback:{
        loadstart: function(){},
        progress:function(){},
        load:function(){}
      }
    };

    var now = function(){
      return new Date().getTime();
    };

    var setKeys = function(keys){
      keys.map(function(key){instance.keys[key] = {ready:false, startTime:now()};});
    };

    var readyKey = function(key){
      var that = this;
      if(!instance.keys[key]) {console.error('wrong key, that was not defined for waitFor');return;}
      instance.keys[key].ready = true;
      instance.keys[key].endTime = now();
      instance.keys[key].delay = (instance.keys[key].endTime - instance.keys[key].startTime);
      if(debug && console && console.log) console.log(' -- waitFor:progress: key:'+key);
      instance.callback.progress.call(that,instance.keys);
      for(var i in instance.keys){
        if(!instance.keys[i].ready) {return;}
      }
      if(debug && console && console.group){
        console.group(' -- waitFor:load',instance.keys);
        for(var j in instance.keys){
          console.log(j,' = ',instance.keys[j].delay+'ms');
        }
        console.groupEnd();
      }
      instance.callback.load.call(that,instance.keys);
    };

    var cacheImage = function(key, url) {
      if(!url) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify image url as a second parameter of readyImage(key, url).. currently url='+name);
        return;
      }
      var tmpImg = new Image();
      tmpImg.onload = function() {
        readyKey(key);
      };
      tmpImg.onerror = function() {
        readyKey(key);
      };
      instance.keys[key].startTime = now();
      instance.keys[key].url = url;
      tmpImg.src = url;
    };

    var cacheFont = function(key, name) {
      if(!name) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify font name as a second parameter of readyFont(key, fontName).. currently fontname='+name);
        return;
      }
      instance.keys[key].startTime = now();
      instance.keys[key].fontName = name;
      fontdetect.onFontLoaded(name, function(){
        readyKey(key);
      }, function() {
        if(debug) console.error('We was not able to load the font "'+name+'" in 5 sec...');
        readyKey(key);
      }, {msInterval: 30, msTimeout: 5000});
    };

    instance.on = function(event,callback){
      instance.callback[event] = callback;
      return instance;
    };

    instance.ready = function(key){
      readyKey(key);
      return instance;
    };

    instance.readyImage = function(key, url){
      cacheImage(key, url);
      return instance;
    };

    instance.readyFont = function(key, fontName){
      cacheFont(key, fontName);
      return instance;
    };

    setKeys(keys);
    return instance;
  };
})(UT, window, document, undefined);