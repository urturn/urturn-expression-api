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
      addDirtyObjects();
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

    // retrieve properties defined on this that
    // are not reserved keywords.
    var eachItemProperties = function(fn) {
      var keys = Object.keys(self);
      for(var i = keys.length - 1; i >= 0; i--) {
        var key = keys[i];
        if(!UT.Collection.isReservedKey(key)) {
          fn(key, self[key]);
        }
      }
    };

    var addDirtyObjects = function() {
      for (var i = self.length - 1; i >= 0; i--) {
        var k = self.key(i),
            v = self.getItem(k);

        if (v && v.hasOwnProperty('_dirty') && v._dirty && dirtyKeys.indexOf(k) === -1) {
          delete v._dirty;
          self.setItem(k, v);
        }
      }
    };

    var bindNewKeys = function() {
      eachItemProperties(function(k,v) {
        if (boundKeys.indexOf(k) === -1) {
          setItem(k, v);
          bindItem(k, v);
        }
      });
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
    return states && states.apiVersion || '1.2.12-alpha2';
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
    var parameters = this.parameters = states.parameters;

    if (parameters && parameters.filter) {
      parameters.filter = JSON.parse(parameters.filter);
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
        UT.Expression._callAPI('container.resizeHeight', [height], fn);
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


    var setInteractionMap = this.setInteractionMap = function(map) {
      UT.Expression._callAPI('document.setInteractionMap', [map], function() {
      });
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

(function(document, undefined) {
  var RE_CSS_INJECTION_SELECTOR = /^((?:[\w\s#,.<>]|(?:\[[\w\:]+\=[\w\:'"]+\]))*)(?:\[([\w\:]+)\])?$/;
  var RE_DATA_URL_SVG = /data\:image\/svg\+xml;/;
  var SVG_NS_URL = "http://www.w3.org/2000/svg";
  var XMLNS_NS_URL = "http://www.w3.org/2000/xmlns/";
  var XLINK_NS_URL = "http://www.w3.org/1999/xlink";

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
     * In case the UT.Image has a filter or a svgTemplate,
     * a rasterized version might be created by our server to
     * be used in place of the current image + filters.
     */
    this.rasterUrl = null;

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
     * Apply Filters to an Image and retrieve a new UT.Image instance.
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
      if (this.svgTemplate) {
        this.descriptor.svgTemplate = this._svgTemplateString();
        this.descriptor.svgCssSelector = this.svgCssSelector;
      }
      return this.descriptor;
    };

    var _loadImage = function(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback.call(this, img);
      };
      // Added in 1.2.12
      img.onerror = function() {
        callback.call(this, null, new Error("Unable to load image"));
      };
      img.src = url;
    };

    /**
     * Asynchronous function that retrieve a DOM Element to display
     * the picture.
     *
     * @param optional {String}type one of ('img'|'svg'|'canvas')
     * @param {function}callback receive (element, error)
     *
     * since 1.2.12
     *
     * Until 1.2.12, node accepted only the callback parameter
     * and always pass its an Image Element.
     * Instantiate an Image instance
     * since: 0.9.0
     */
    this.node = function(type, callback) {
      if (!callback) {
        callback = type;
        type = 'img';
      }
      try {
        return {
          img: function(callback) {
            if (this.rasterUrl) {
              _loadImage(this.rasterUrl, callback);
            } else if (this.svgTemplate) {
              callback(null, new Error('No Raster Image'));
            } else {
              _loadImage(this.url, callback);
            }
          },
          svg: function(callback) {
            this.svg(callback);
          }
        }[type].call(this, callback);
      }
      catch (ex) {
        callback(null, new Error('Invalid node type given: ' + type));
      }
    };

    /**
     * This method has two signatures:
     * - svg({function}callback)
     * - svg({string}template, {string}injectionCssSelector)
     * - svg({SVGElement}template, {string}injectionCssSelector)
     * It return this for chaining.
     * since: 1.2.12
     */
    this.svg = function() {
      var self = this;

      // Build an svg image tag.
      var _buildSVGImage = function(url, img) {
        var svgImage = document.createElementNS(SVG_NS_URL, 'image');
        svgImage.setAttributeNS(XLINK_NS_URL, 'xlink:href', url);
        svgImage.setAttribute('x', 0);
        svgImage.setAttribute('y', 0);
        svgImage.setAttribute('width', img.width);
        svgImage.setAttribute('height', img.height);
        return svgImage;
      };

      // return true if the image source is some kind of SVG.
      var _isSvgUrl = function() {
        return self.url && !!self.url.match(RE_DATA_URL_SVG);
      };

      // return the svg raw source as a string.
      //
      // You must ensure this is a SVG based image first.
      var _svgTextFromUrl = function() {
        return self.url.substring(19); // 19: string length.
      };

      /**
       * svg(callback):
       * Callback will be passed (svgElement, err) arguments.
       *
       * If no SVG tempalte has been set beforehand, svgElement will be null
       * and err.message will be 'No SVG Template'.
       *
       * If svgElement is an actual node, it will be retrieved by reference rather
       * than copied.
       */
      var _getSVG = function(callback) {
        var container = document.createElement('div');
        if (_isSvgUrl()) { // SVG Data URL to SVG Element
          container.innerHTML = _svgTextFromUrl();
          callback(container.children[0]);
          return;
        } else {
          _loadImage.call(self, self.url, function(img, err) {
            if (err) {
              return callback.call(self, null, err);
            }
            var svg;
            if (self.svgTemplate) { // SVG Text Template to SVG Element
              if (typeof self.svgTemplate === 'string') {
                container = document.createElement('div');
                container.innerHTML = self.svgTemplate;
                self.svgTemplate = container.children[0];
              }
              svg = self.svgTemplate;
              self._injectImage(svg);
              callback.call(self, svg);
            } else {
              callback.call(self, null, new Error('No SVG Template'));
            }
          });
        }
      };

      /**
       * SVG(template, cssSelector) define a new SVG template for this node,
       * where the cssSelector point either to a DOM Element or a DOM Attribute.
       * If the selector points to an element, an image tag will be injected inside ;
       * If the selector points to an attribute, the image URL will be injected in that attribute.
       */
      var _setSVG = function(template, cssSelector) {
        self.svgTemplate = template;
        self.svgCssSelector = cssSelector || 'image[xlink:href]';
        if (typeof self.svgTemplate !== 'string') {
          self._injectImage(self.svgTemplate);
        }
      };

      if (arguments[0] && typeof arguments[0] === 'function' ) {
        _getSVG.apply(this, arguments);
      } else {
        _setSVG.apply(this, arguments);
      }

      return this;
    };

    this._svgTemplateString = function() {
      if (typeof this.svgTemplate === 'string') {
        return this.svgTemplate;
      } else {
        var pn = this.svgTemplate.parentNode;
        c = document.createElement('div');
        this._removeInjectedImage(this.svgTemplate);
        c.appendChild(this.svgTemplate);
        var source = c.innerHTML;
        this._injectImage(this.svgTemplate);
        return source;
      }
    };

    this._injectImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            element.setAttribute(attribute, this.url);
          } else {
            element.appendChild(_buildImage(this.url));
          }
        }
      }
    };

    this._removeInjectedImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            element.removeAttribute(attribute, this.url);
          } else {
            element.removeChild(element.querySelector('image[xlink:href="'+this.url+'"]'));
          }
        }
      }
    };



    // Private methods
    // LOOK AWAY!

    // Accessed through UT.Post interface within Urturn API
    // supported signature:
    // - {string} that represent an URL
    // - {object} that contains `{string}url` key
    // - {object} that contains `{string|SVGElement}svg` key
    // in case of an object, `{object}info` and `{object}center`
    // are optional arguments.
    this.init = function(imageDescriptor) {
      if (!imageDescriptor) {
        return;
      }
      if (typeof(imageDescriptor) == 'string') {
        this.url = imageDescriptor;
        this.descriptor = {};
        this.descriptor.url = imageDescriptor;
        this.descriptor._type = 'image';
      }
      else {
        if (imageDescriptor.url) {
          this.url = imageDescriptor.url;
        } else if (imageDescriptor.svg) {
          // build using svg text or element
          if (typeof imageDescriptor.svg !== 'string') {
            var container = document.createElement('div');
            container.appendChild(imageDescriptor.svg);
            imageDescriptor.svg = container.innerHTML;
          }
          this.url = 'data:image/svg+xml;utf8,' + imageDescriptor.svg;
          imageDescriptor.svg = null;
        }
        if (imageDescriptor.svgTemplate) {
          this.svg(imageDescriptor.svgTemplate, imageDescriptor.svgCssSelector || 'image[xlink:href]');
        }
        this.rasterUrl = imageDescriptor.rasterUrl;

        // general descriptor and info
        this.descriptor = imageDescriptor;
        this.info = imageDescriptor.info;

        // crop center
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

}(document));
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
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.8
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
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


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
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
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
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
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

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
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
		return !target.disabled && !target.readOnly;
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

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

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
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
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

	// If the touch has moved, cancel the click tracking
	if (this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

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

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
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
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

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

	// If the mouse event is permitted, return true for the action to go through.
	return true;
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
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

		// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
				return true;
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );

/**
 * FontDetect - A simple library to detect if an internal font is present or an external font got loaded.
 * 
 * TO USE: 
 *     Include jQuery. This was developed using jQuery 1.7.
 *     Include this file. If desired, you can load this file after the BODY.
 *     Create a new fontdetect().
 *     After you load the fonts you want to test, call either of these methods:
 *     
 *	       fontDetect = new fontdetect();
 *	       
 *	       // Checks that the font is loaded now.
 *	       isLoaded = fontDetect.isFontLoaded(fontname);
 *     
 *         // Polls for the font getting loaded and calls a callback when it does.
 *	       fontDetect.onFontLoaded(fontname, callback [, {onFail: xxx, msInterval: yyy, msTimeout: zzz}]);
 *     
 *     Note: For externally loaded fonts, you may have to wait for more than a second to get a reliable 
 *     answer. Internal browser fonts can be detected immediately.
 *     
 *         // Determines which font in the font stack is being used for a given element.
 *	       sFontname = fontDetect.whichFont(element);
 *     
 * @author		Jennifer Simonds
 * @copyright	2012 Jennifer Simonds
 * @license	MIT License http://opensource.org/licenses/MIT
 * 
 * @version 1.0  2012-04-11	Created.
 * 
 * @version 1.0  2012-04-12	Refined the algorithm to use fewer helper elements, more reference fonts,
 *								and quicker detection of a nonexistent font.
 * 
 * @version 2.0  2012-06-01	Added onFontLoaded for a callback to execute as soon as the font is 
 *								detected or when a timeout has passed without loading. Added whichFont
 *								to determine which font actually loaded. Changed the license from BSD 
 *								3-clause to MIT.
 *								
 * @version 2.1  2012-08-12	Fixed a bug that caused horizontal scrollbar to show up in FF & IE.
 *                              (Thanks to Geoff Beaumont for the bug report & fix)
 */
fontdetect = function()
{
	// The private parts
	var _isInitialized = false;
	var _aFallbackFonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
	
	function _init ()
	{
		if (_isInitialized)
		{	return;
		}

		_isInitialized = true;

		$('body > :first-child').before(
			'<div id="fontdetectHelper"><span>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</span></div>'
		);
		$('#fontdetectHelper').css({
			'position': 'absolute',
			'visibility': 'hidden',
			'top': '-200px',
			'left': '-100000px',
			'width': '100000px',
			'height': '200px',
			'font-size': '100px'
		});
	}

	
	// The public interface
	return	{
		/**
		 * Polls 10 times/second until a font gets loaded or until it times out. (Default = 2 secs) It 
		 * calls a callback on load, & optionally calls another function if it times out without loading.
		 * 
		 * NOTE: You must specify at least one callback - for success or failure.
		 * 
		 * @param string		The font name to check for.
		 * @param function		The function to call if it gets loaded within the timeout period.
		 * @param options		An optional object with named parameters:
		 *     @param onFail       The function to call if the font doesn't load within the timeout period.
		 *     @param msInterval   How many milliseconds for the polling interval. Default = 100.
		 *     @param msTimeout    How many milliseconds until we time out & call onFail. Default = 2000.
		 */
		onFontLoaded: function (p_cssFontName, p_onLoad, p_onFail, p_options)
		{
			if (!p_cssFontName)
			{	return;
			}
			
			// Our hashtable of optional params.
			var msInterval = (p_options && p_options.msInterval) ? p_options.msInterval : 100;
			var msTimeout  = (p_options && p_options.msTimeout) ? p_options.msTimeout : 2000;

			if (!p_onLoad && !p_onFail)
			{	// Caller must specify at least one callback.
				return;
			}
			
			if (!_isInitialized)
			{	_init ();
			}
			
			if (this.isFontLoaded(p_cssFontName))
			{	// It's already here, so no need to poll.
				if (p_onLoad)
				{	p_onLoad(p_cssFontName);
				}
				return;
			}
			
			// At this point we know the font hasn't loaded yet. Add it to the list of fonts to monitor.
			
			// Set up an interval using msInterval. The callback calls isFontLoaded(), & if true
			// it closes the interval & calls p_onLoad, else if the current time has timed out
			// it closes the interval & calls onFail if there is one.
			var outerThis = this;
			var utStart = new Date().getTime();
			var idInterval = setInterval (
				function()
				{
					if (outerThis.isFontLoaded(p_cssFontName))
					{	// It's now loaded.
						clearInterval (idInterval);
						p_onLoad(p_cssFontName);
						return;
					}
					else
					{	// Still not loaded.
						var utNow = new Date().getTime();
						if ((utNow - utStart) > msTimeout)
						{
							clearInterval (idInterval);
							if (p_onFail)
							{	p_onFail(p_cssFontName);
							}
						}
					}
				},
				msInterval
			);
		},


		/**
		 * Determines if a font has gotten loaded.
		 * 
		 * @param string		The font name to check for.
		 * 
		 * @returns bool		true if it's loaded, else false if the browser had to use a fallback font.
		 */
		isFontLoaded: function (p_cssFontName)
		{
			var wThisFont = 0;
			var wPrevFont = 0;

			if (!_isInitialized)
			{	_init ();
			}
			
			for(var ix = 0; ix < _aFallbackFonts.length; ++ix)
			{
				var $helperSpan = $('#fontdetectHelper > SPAN');
				$helperSpan.css('font-family', p_cssFontName + ',' + _aFallbackFonts[ix]);
				wThisFont = $helperSpan.width();
				if (ix > 0 && wThisFont != wPrevFont)
				{// This iteration's font was different than the previous iteration's font, so it must
				//  have fallen back on a generic font. So our font must not exist.
					return false;
				}

				wPrevFont = wThisFont;
			}

			// The widths were all the same, therefore the browser must have rendered the text in the same
			// font every time. So unless all the generic fonts are identical widths (highly unlikely), it 
			// couldn't have fallen back to a generic font. It's our font.
			return true;
		},


		/**
		 * Determines which font is being used for a given element.
		 * 
		 * @param string/object		The element to examine. If it's a string, it's a jQuery selector. If it's 
		 *							an object, it's taken as a DOM element.
		 * 
		 * @returns string			The name of the font that's being used - either one of the fonts 
		 *							listed in the element's font-family css value, or null.
		 */
		whichFont: function (p_element)
		{
			var sStack = $(p_element).css('font-family');
			var aStack = sStack.split(',');
			
			var sFont = aStack.shift();
			while (sFont)
			{
				sFont = sFont.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, '$1');
				
				if (this.isFontLoaded(sFont))
				{	return sFont;
				}
				sFont = aStack.shift();
			}
			
			return null;
		}
	};
}();

/**
 * @preserve  textfill
 * @name      jquery.textfill.js
 * @author    Russ Painter
 * @author    Yu-Jie Lin
 * @version   0.4.0
 * @date      2013-08-16
 * @copyright (c) 2012-2013 Yu-Jie Lin
 * @copyright (c) 2009 Russ Painter
 * @license   MIT License
 * @homepage  https://github.com/jquery-textfill/jquery-textfill
 * @example   http://jquery-textfill.github.io/jquery-textfill/index.html
*/
; (function($) {
  /**
  * Resizes an inner element's font so that the inner element completely fills the outer element.
  * @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')
  * @return All outer elements processed
  */
  $.fn.textfill = function(options) {
    var defaults = {
      debug: false,
      maxFontPixels: 40,
      minFontPixels: 4,
      innerTag: 'span',
      widthOnly: false,
      success: null,          // callback when a resizing is done
      callback: null,         // callback when a resizing is done (deprecated, use success)
      fail: null,             // callback when a resizing is failed
      complete: null,         // callback when all is done
      explicitWidth: null,
      explicitHeight: null
    };
    var Opts = $.extend(defaults, options);

    function _sizing(prefix, ourText, func, max, maxHeight, maxWidth, minFontPixels, maxFontPixels) {
      while (minFontPixels < maxFontPixels - 1) {
        var fontSize = Math.floor((minFontPixels + maxFontPixels) / 2)
        ourText.css('font-size', fontSize);
        if (func.call(ourText) <= max) {
          minFontPixels = fontSize;
          if (func.call(ourText) == max) {
            break;
          }
        } else {
          maxFontPixels = fontSize;
        }
      }
      ourText.css('font-size', maxFontPixels);
      if (func.call(ourText) <= max) {
        minFontPixels = maxFontPixels;
      }
      return minFontPixels;
    }

    this.each(function() {
      var ourText = $(Opts.innerTag + ':visible:first', this);
      // Use explicit dimensions when specified
      var maxHeight = Opts.explicitHeight || $(this).height();
      var maxWidth = Opts.explicitWidth || $(this).width();
      var oldFontSize = ourText.css('font-size');
      var fontSize;
      var minFontPixels = Opts.minFontPixels;
      var maxFontPixels = Opts.maxFontPixels <= 0 ? maxHeight : Opts.maxFontPixels;
      var HfontSize = undefined;

      if (!Opts.widthOnly) {
        HfontSize = _sizing('H', ourText, $.fn.height, maxHeight, maxHeight, maxWidth, minFontPixels, maxFontPixels);
      }
      var WfontSize = _sizing('W', ourText, $.fn.width, maxWidth, maxHeight, maxWidth, minFontPixels, maxFontPixels);

      if (Opts.widthOnly) {
        ourText.css('font-size', WfontSize);
      } else {
        ourText.css('font-size', Math.min(HfontSize, WfontSize));
      }

      if (ourText.width()  > maxWidth 
      || (ourText.height() > maxHeight && !Opts.widthOnly)
      ) {
        ourText.css('font-size', oldFontSize);
        if (Opts.fail) {
          Opts.fail(this);
        }
      } else if (Opts.success) {
        Opts.success(this);
      } else if (Opts.callback) {
        // call callback on each result
        Opts.callback(this);
      }
    });

    // call complete when all is complete
    if (Opts.complete) Opts.complete(this);

    return this;
  };
})(window.jQuery);

/* This source code is licensed under version 3 of the AGPL.
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
/* global UT:true */
(function( UT, $, window, document, undefined ) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        if(this.utSticker) {
          if(typeof(options) === "object") {
            this.utSticker.options = $.extend(true, this.utSticker.options, options);
          }
          if(this.utSticker.update) {
            this.utSticker.update.call(this, options && options.styles && options.styles.pos ? options.styles.pos : null);
          }
          return;
        }
        var events = {
          ready: "utSticker:ready",
          change: "utSticker:change",
          rotate: "utSticker:rotate",
          resize: "utSticker:resize",
          move: "utSticker:move",
          buttonClick: "utSticker:buttonClick",
          destroy: "utSticker:destroy",
          click: "utSticker:click",
          dblClick: "utSticker:dblClick",
          focus: "utSticker:focus",
          blur: "utSticker:blur"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            edit: false,
            resize: null,
            rotate: null,
            remove: true
            //custom: "class1"
          },
          styles: {
            proportional: true,
            autoflip: true,
            useBounds: true,
            pos: {
              width: undefined, //'30%',
              ratio: undefined, //1,
              height: undefined,
              cx: undefined, //'50%', // x-pos from center
              cy: undefined, //'50%', // y-pos from center
              left: undefined,
              right: undefined,
              top: undefined,
              bottom: undefined,
              rotation: 0,
              zIndex: undefined
            },
            parentIndent: {
              top: null,
              left: null,
              bottom: null,
              right: null
            },
            selfOutdent: {
              top: '0%',
              left: '0%',
              bottom: '0%',
              right: '0%'
            },
            sizeLimits: {
              minWidth: '10%',
              minHeight: '10%',
              maxWidth: '90%',
              maxHeight: '90%'
            },
            rotationLimits: {
              min: '-180',
              max: '180'
            },
            rotationSnap: {
              base: 90,
              precision: 3
            },
            topOnFocus: true,
            preventAutoRemove: false,
            preventEventsBubble: true // prevent default and stop propogation for click events on item and buttons
          },
          i18n: {
            edit: "edit",
            resize: "resize",
            rotate: "rotate",
            remove: "remove"
          }
        };

        var that = {};
        this.utSticker = that;
        that.initialized = false;
        var bound = this.getBoundingClientRect();

        var defWidth = parseInt(bound.width, 10);
        var defHeight = parseInt(bound.height, 10);
        var parentObj = this.parentNode;
        var $content = $(this);
        var $that = $("<div>").appendTo(parentObj);
        $content.detach();
        $that.append($content);
        $that[0].utSticker = this.utSticker;

        if(options && options.style && !options.styles) {
          console.warn("utSticker :: The 'styles' parameter not found, but 'style' present.");
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isMSIE = window.navigator.userAgent.indexOf("MSIE") !== -1;
        that.data = {
          editable: true,
          // (updated width parent size)
          parentWidth: 0,
          parentHeight: 0,
          // (updated every time when sticker change size or position)
          curBounds: {},
          movable: false,
          rotatable: false,
          resizable: false,
          // rotation regions
          minAngle: -Math.PI,
          maxAngle: Math.PI,
          // (updated width parent size, px)
          parentIndent: {},
          // min and max sizes (updated width parent size, px)
          minWidth: 0,
          minHeight: 0,
          maxWidth: 10000,
          maxHeight: 10000,
          // (updated with sticker size, based on size or bounds, px)
          selfOutdent: {}
        };
        that.view = {};
        that.pos = {};
        that.post = null;
        that.isEditMode = false;
        if(typeof(window.utStickerLastZIndex) === "undefined") {
          window.utStickerLastZIndex = 10;
        }

        var testStyles = window.getComputedStyle(document.body, null);

        var transformStyle = "transform";
        if(typeof(testStyles.webkitTransform) !== "undefined") {
          transformStyle = "webkitTransform";
        } else if(typeof(testStyles.MozTransform) !== "undefined") {
          transformStyle = "MozTransform";
        } else if(typeof(testStyles.msTransform) !== "undefined") {
          transformStyle = "msTransform";
        } else if(typeof(testStyles.OTransform) !== "undefined") {
          transformStyle = "OTransform";
        }

        var mouseStart = that.isTouch ? "touchstart" : "mousedown";
        var mouseMove = that.isTouch ? "touchmove" : "mousemove";
        var mouseEnd = that.isTouch ? "touchend touchcancel" : "mouseup mouseleave";

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function(){
              if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
                that._savePosition();
              }
              $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
            },0);
          }
        });

        that._updateParentSize = function() {
          var parentStyles = window.getComputedStyle(parentObj, null);

          if(parentStyles.position === "static") {
            parentObj.style.position = "relative";
          }
          var isChanged = false;
          var ww = parseInt(parentStyles.width, 10);
          var hh = parseInt(parentStyles.height, 10);
          if(ww && ww > 0 && ww !== that.data.parentWidth) {
            that.data.parentWidth = ww;
            isChanged = true;
          }
          if(hh && hh > 0 && hh !== that.data.parentHeight) {
            that.data.parentHeight = hh;
            isChanged = true;
          }
          if(ww === 0 || hh === 0) {
            console.warn("utSticker :: parent size has zero value");
          }
          return isChanged;
        };

        that.catchEvents = function(obj, callback) {
          var mStart = {};
          var mLast = {};
          var path = 0;
          var $body = $("body");
          var onDown = function(e) {
            path = 0;
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            mStart = { x:mx, y:my };
            mLast = { x:mx, y:my };
            $body.on(mouseMove, onMove);
            $body.on(mouseEnd, onUp);
            if(callback) {
              if(callback.call(obj, "down", {x:mx, y:my, offStart:{x:0, y:0}, offLast:{x:0, y:0}}) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
          };
          var onUp = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            if(callback) {
              if(callback.call(obj, "up", {
                x: mx,
                y: my,
                offStart: {
                  x: mx - mStart.x,
                  y: my - mStart.y
                },
                offLast:{
                  x: mx - mLast.x,
                  y: my - mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            if(path < 3 && that.options.styles.preventEventsBubble && that.isTouch) {
              obj.trigger("click");
            }
            mLast = { x:mx, y:my };
            $body.off(mouseMove, onMove);
            $body.off(mouseEnd, onUp);
          };
          var onMove = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            path += Math.abs(mx-mLast.x) + Math.abs(my-mLast.y);
            if(callback) {
              if(callback.call(obj, "move", {
                x: mx,
                y: my,
                offStart: {
                  x: mx-mStart.x,
                  y: my-mStart.y
                },
                offLast:{
                  x: mx-mLast.x,
                  y: my-mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            mLast = { x:mx, y:my };
          };
          obj.on(mouseStart, onDown);
        };

        /********************************************************************************
         * sticker buttons
         ********************************************************************************/
        that.createButtons = function() {
          // get or create remove button
          $that.find(".ut-sticker-button").remove();
          that.view.remove = null;
          that.view.edit = null;
          that.view.rotate = null;
          that.view.resize = null;

          if(that.options.ui.remove) {
            that.view.remove = $("<a>").addClass("ut-sticker-button ut-sticker-button-remove icon_delete")
              .attr("data-bkey", "remove")
              .attr("title", that.options.i18n.remove)
              .appendTo($that);
            that.view.remove.on(mouseStart, that.onButtonDown);
            that.view.remove.on(mouseEnd, that.onButtonUp);
            that.view.remove.on("click", that.onButtonClick);
          }

          if(that.options.ui.edit) {
            that.view.edit = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-edit icon_edit")
              .attr("data-bkey", "edit")
              .attr("title", that.options.i18n.edit).appendTo($that);
            that.view.edit.on(mouseStart, that.onButtonDown);
            that.view.edit.on(mouseEnd, that.onButtonUp);
            that.view.edit.on("click", that.onButtonClick);
          }

          that.options.ui.rotate = that.data.rotatable ? that.options.ui.rotate : false;
          that.options.ui.resize = that.data.resizable ? that.options.ui.resize : false;

          if(that.options.ui.rotate === null) {
            if(that.options.styles.proportional) {
              that.options.ui.rotate = !that.options.ui.resize;
            } else {
              that.options.ui.rotate = true;
            }
          }
          if(that.options.ui.resize === null) {
            if(that.options.styles.proportional) {
              that.options.ui.resize = !that.options.ui.rotate;
            } else {
              that.options.ui.resize = true;
            }
          }

          // get or create rotate button
          if(that.options.ui.rotate) {
            that.view.rotate = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-rotate icon_rotate")
              .attr("title", that.options.i18n.rotate)
              .appendTo($that);
            that.catchEvents(that.view.rotate, that.onElementRotate);
          }

          // get or create remove button
          if(that.options.ui.resize) {
            that.view.resize = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-resize icon_fullscreen")
              .attr("title", that.options.i18n.resize)
              .appendTo($that);
            that.catchEvents(that.view.resize, that.onElementResize);
          }

          if((that.view.rotate && !that.view.resize) || (!that.view.rotate && that.view.resize)) {
            $that.addClass("ut-sticker-one-scale-size-button");
          } else {
            $that.removeClass("ut-sticker-one-scale-size-button");
          }

          for(var qq in that.options.ui) {
            if(that.options.ui[qq]) {
              if(qq === "edit" || qq === "resize" || qq === "rotate" || qq === "remove") {
                continue;
              }
              var className = that.options.ui[qq];
              var tmp = $("<a>").addClass("ut-sticker-button ut-sticker-button-custom " + className);
              if(that.options.i18n[qq]) {
                tmp.attr("title", that.options.i18n[qq]);
              }
              tmp.appendTo($that);
              tmp.attr("data-bkey", qq);
              tmp.on(mouseStart, that.onButtonDown);
              tmp.on(mouseEnd, that.onButtonUp);
              tmp.on("click", that.onButtonClick);
            }
          }
        };

        that.onButtonDown = function(e) {
          that.preventButtonEvents = $(this).attr("data-bkey");
          e.stopPropagation();
        };

        that.onButtonUp = function(e) {
          if(that.preventButtonEvents !== $(this).attr("data-bkey")) {
            return;
          }
          e.stopPropagation();
        };

        that.onButtonClick = function(event) {
          var id = $(this).attr("data-bkey");
          var isStopEvent = false;
          var isBreakEvent = false;
          if(id === "remove" && !that.options.styles.preventAutoRemove) {
            that.removeElement();
          } else {
            var ev = $.Event(events.buttonClick);
            $content.trigger(ev, id);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        /********************************************************************************
         * prepare element
         ********************************************************************************/
        that.prepareElement = function() {
          $that.addClass("ut-sticker");
          if(that.isMSIE) {
            $that.addClass("msie");
          }

          $that[0].style.position = "absolute";
          $content.addClass("ut-sticker-content");

          if($content[0].getAttribute("id") === "" && that.options.id) {
            that.options.id = "sticker-" + UT.uuid();
            console.warn("utSticker :: element ID not found, generating new:", that.options.id);
          }
          if(that.options.id !== "") {
            $content[0].setAttribute("id", that.options.id);
          } else {
            that.options.id = $content[0].getAttribute("id");
          }

          $content[0].style.width = "100%";
          $content[0].style.height = "100%";

          if(that.isEditMode) {
            $that.addClass("ut-sticker-edit");
          }

          // attach events for move sticker and blur
          that.catchEvents($that, that.onElementMouse);
          // "click" event to ut-sticker-content
          $that.on("click", that.onElementClick);
          $("body").on(mouseStart, that.onBodyClick);
        };

        that.parseSizeValue = function(sss, size, def) {
          var tmp;
          tmp = sss.toString().match(/([+\-]?[0-9]*(\.[0-9]+)?)(px|%)?/i);
          if(tmp && (typeof(tmp[3]) === "undefined" || tmp[3] === null || tmp[3] === "px")) {
            return parseFloat(tmp[1]);
          } else if(tmp && tmp[3] === "%") {
            return parseFloat(tmp[1]) / 100 * size;
          }
          return (typeof(def) !== "undefined" ? def : null);
        };

        that.preparePosition = function() {
          that.pos = that.post.storage["utSticker_" + that.options.id + "_pos"] || {};
          var width = 0;
          var height = 0;

          if(typeof(that.pos.width) === "undefined" &&
            typeof(that.pos.ratio) === "undefined" &&
            (typeof(that.options.styles.pos.width) === "undefined" || that.options.styles.pos.width === null || that.options.styles.pos.width === false || that.options.styles.pos.width === "auto") &&
            (typeof(that.options.styles.pos.ratio) === "undefined" || that.options.styles.pos.ratio === null || that.options.styles.pos.ratio === false || that.options.styles.pos.ratio === "auto") &&
            (typeof(that.options.styles.pos.height) === "undefined" || that.options.styles.pos.height === null || that.options.styles.pos.height === false || that.options.styles.pos.height === "auto") &&
            defWidth && defHeight) {
            width = defWidth;
            height = defHeight;
            that.pos.width = width / that.data.parentWidth;
            that.pos.ratio = width / height;
          } else {
            // check width
            if(typeof(that.pos.width) === "undefined") {
              width = that.parseSizeValue(that.options.styles.pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
              that.pos.width = width / that.data.parentWidth;
            } else {
              width = that.pos.width * that.data.parentWidth;
            }

            // check height
            if(typeof(that.pos.ratio) === "undefined") {
              if(that.options.styles.pos.ratio === "auto" || that.options.styles.pos.height === "auto") {
                that.pos.ratio = defWidth / defHeight;
              } else {
                if(typeof(that.options.styles.pos.ratio) !== "undefined" && that.options.styles.pos.ratio !== null && that.options.styles.pos.ratio !== false && that.options.styles.pos.ratio !== "auto") {
                  that.pos.ratio = parseFloat(that.options.styles.pos.ratio);
                  height = width / that.pos.ratio;
                } else if(typeof(that.options.styles.pos.height) !== "undefined" && that.options.styles.pos.height !== null && that.options.styles.pos.height !== false && that.options.styles.pos.height !== "auto") {
                  height = that.parseSizeValue(that.options.styles.pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
                  that.pos.ratio = width / height;
                } else {
                  height = width;
                  that.pos.ratio = width / height;
                }
              }
            }
          }

          // check left
          if(typeof(that.pos.left) === "undefined") {
            if(typeof(that.options.styles.pos.cx) !== "undefined" && that.options.styles.pos.cx !== null && that.options.styles.pos.cx !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            } else if(typeof(that.options.styles.pos.left) !== "undefined" && that.options.styles.pos.left !== null && that.options.styles.pos.left !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left += width / 2;
            } else if(typeof(that.options.styles.pos.right) !== "undefined" && that.options.styles.pos.right !== null && that.options.styles.pos.right !== false) {
              that.pos.left = that.data.parentWidth - that.parseSizeValue(that.options.styles.pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left -= width / 2;
            } else {
              that.pos.left = 0.5 * that.data.parentWidth;
            }
            that.pos.left = that.pos.left / that.data.parentWidth;
          }

          // check top
          if(typeof(that.pos.top) === "undefined") {
            if(typeof(that.options.styles.pos.cy) !== "undefined" && that.options.styles.pos.cy !== null && that.options.styles.pos.cy !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            } else if(typeof(that.options.styles.pos.top) !== "undefined" && that.options.styles.pos.top !== null && that.options.styles.pos.top !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top += height / 2;
            } else if(typeof(that.options.styles.pos.bottom) !== "undefined" && that.options.styles.pos.bottom !== null && that.options.styles.pos.bottom !== false) {
              that.pos.top = that.data.parentHeight - that.parseSizeValue(that.options.styles.pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top -= height / 2;
            } else {
              that.pos.top = 0.5 * that.data.parentHeight;
            }
            that.pos.top = that.pos.top / that.data.parentHeight;
          }

          // check angle
          if(typeof(that.pos.angle) === "undefined") {
            if(typeof(that.options.styles.pos.rotation) === "undefined") {
              that.pos.angle = 0;
            } else {
              that.pos.angle = parseFloat(that.options.styles.pos.rotation) / 180 * Math.PI;
            }
          }

          // check zIndex
          if(typeof(that.pos.zIndex) === "undefined") {
            if(typeof(that.options.styles.pos.zIndex) === "undefined") {
              that.pos.zIndex = window.utStickerLastZIndex++;
            } else {
              that.pos.zIndex = parseInt(that.options.styles.pos.zIndex, 10);
            }
          }
          if(window.utStickerLastZIndex <= that.pos.zIndex) {
            window.utStickerLastZIndex = that.pos.zIndex + 1;
          }
        };

        that.applyNewPosition = function(pos) {
          var width, height, isChanged = false;
          if(typeof(pos.width) !== "undefined" && pos.width !== null && pos.width !== false && pos.width !== "auto") {
            width = that.parseSizeValue(pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
            that.pos.width = width / that.data.parentWidth;
            isChanged = true;
          } else {
            width = that.pos.width * that.data.parentWidth;
          }

          if(typeof(pos.ratio) !== "undefined" && pos.ratio !== null && pos.ratio !== false && pos.ratio !== "auto") {
            that.pos.ratio = parseFloat(pos.ratio);
            height = width / that.pos.ratio;
            isChanged = true;
          } else if(typeof(pos.height) !== "undefined" && pos.height !== null && pos.height !== false && pos.height !== "auto") {
            height = that.parseSizeValue(pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
            that.pos.ratio = width / height;
            isChanged = true;
          } else {
            height = width * that.data.parentWidth;
          }

          if(typeof(pos.cx) !== "undefined" && pos.cx !== null && pos.cx !== false) {
            that.pos.left = that.parseSizeValue(pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.left) !== "undefined" && pos.left !== null && pos.left !== false) {
            that.pos.left = that.parseSizeValue(pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left += width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.right) !== "undefined" && pos.right !== null && pos.right !== false) {
            that.pos.left = that.data.parentWidth - that.parseSizeValue(pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left -= width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          }

          if(typeof(pos.cy) !== "undefined" && pos.cy !== null && pos.cy !== false) {
            that.pos.top = that.parseSizeValue(pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.top) !== "undefined" && pos.top !== null && pos.top !== false) {
            that.pos.top = that.parseSizeValue(pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top += height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.bottom) !== "undefined" && pos.bottom !== null && pos.bottom !== false) {
            that.pos.top = that.data.parentHeight - that.parseSizeValue(pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top -= height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          }

          // check angle
          if(typeof(pos.rotation) !== "undefined" && pos.rotation !== null && pos.rotation !== false) {
            that.pos.angle = parseFloat(pos.rotation) / 180 * Math.PI;
            isChanged = true;
          }

          // check zIndex
          if(typeof(pos.zIndex) !== "undefined" && pos.zIndex !== null && pos.zIndex !== false) {
            that.pos.zIndex = parseInt(pos.zIndex, 10);
            isChanged = true;
          }
          return isChanged;
        };

        that.removeElement = function() {
          $content.trigger(events.destroy, that.options.id);
          $that.remove();
          if(that.post) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = null;
            that.post.save();
          }
        };

        /********************************************************************************
         * update element position, size, e.t.c.
         ********************************************************************************/
        that.updateAngleForSnap = function(ang) {
          var bb = parseFloat(that.options.styles.rotationSnap.base) / 180 * Math.PI;
          var pr = parseFloat(that.options.styles.rotationSnap.precision) / 180 * Math.PI;
          var da = that.pos.angle - Math.round(that.pos.angle/bb) * bb;
          if(Math.abs(da) < pr) {
            return Math.round(that.pos.angle/bb) * bb;
          }
          return ang;
        };

        that.updateAngle = function() {
          // update only rotation by css-transform
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          var tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
          if(that.isMSIE) {
            tmpVal = "rotate("+viewAngle+"rad)";
          }
          var obj = $that[0];
          obj.style[transformStyle] = tmpVal;

          that.updateButtonsAngle();
          if(that.options.styles.autoflip) {
            that.updateContentAngle();
          }
        };

        that.updateContentAngle = function() {
          var aa = that.updateAngleForSnap(that.pos.angle);
          aa=(aa / ( 2 * Math.PI) - Math.floor(aa / (2 * Math.PI))) * (2 * Math.PI);
          if(Math.abs(aa) > (Math.PI / 2) && Math.abs(aa) < (3 * Math.PI / 2)) {
            if($content[0].classList) {
              $content[0].classList.add("ut-sticker-flip");
            } else {
              $content.addClass("ut-sticker-flip");
            }
          } else {
            if($content[0].classList) {
              $content[0].classList.remove("ut-sticker-flip");
            } else {
              $content.removeClass("ut-sticker-flip");
            }
          }
        };

        that.updateButtonsAngle = function() {
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          viewAngle *= -1;
          var qq, obj, tmpVal, tmp = $that[0].getElementsByClassName("ut-sticker-button");
          if(tmp && tmp.length > 0) {
            tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
            if(that.isMSIE) {
              tmpVal = "rotate("+viewAngle+"rad)";
            }
            for(qq = 0; qq < tmp.length; ++qq) {
              obj = tmp[qq];
              obj.style[transformStyle] = tmpVal;
            }
          }
        };

        /**
         * change element size (and margins)
         */
        that.updateSize = function() {
          $that[0].style.width = Math.round(that.pos.width * that.data.parentWidth) + "px";
          $that[0].style.height = Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth) + "px";
          $that[0].style.marginLeft = -Math.round(that.pos.width * that.data.parentWidth / 2) + "px";
          $that[0].style.marginTop = -Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth / 2) + "px";
        };

        /**
         * change element position
         */
        that.updatePosition = function() {
          $that[0].style.left = Math.round(that.pos.left * that.data.parentWidth) + "px";
          $that[0].style.top = Math.round(that.pos.top * that.data.parentHeight) + "px";
          $that[0].style.zIndex = that.pos.zIndex;
        };

        that.getBounds = function(obj, transformObject, refObject) {
          var _obj = obj.jquery ? obj[0] : obj;
          var data = _obj.getBoundingClientRect();
          if(!data) {
            return { left:0, top:0, right:0, bottom:0, width:0, height:0 };
          }

          if(refObject) {
            refObject = refObject.jquery ? refObject[0] : refObject;
            var offset = refObject.getBoundingClientRect();
            return {
              left: data.left - offset.left,
              top: data.top - offset.top,
              right: data.left - offset.left + data.width,
              bottom: data.top - offset.top + data.height,
              width: data.width,
              height: data.height
            };
          }
          return {
            left: data.left,
            top: data.top,
            right: data.left + data.width,
            bottom: data.top + data.height,
            width: data.width,
            height: data.height
          };
        };

        /**
         * update item's bounds data (that.data.curBounds)
         * @warning DOM Element repainting by browser
         * @private
         */
        that._updateBoundsInfo = function() {
          if(!that.options.styles.useBounds) {
            return;
          }
          that.data.curBounds = that.getBounds($that, false, parentObj);
        };

        /********************************************************************************
         * validate object size by bounds rect
         * @change that.pos
         * @return {Boolean} -- 'true' is position updated, 'false' - if position not changed
         ********************************************************************************/
        that.validateSizeInBounds = function(allowUpdate) {
          var asc = Math.min(that.data.parentWidth/that.data.curBounds.width, that.data.parentHeight/that.data.curBounds.height);
          if(asc < 1) {
            if(allowUpdate !== false) {
              that.pos.width *= asc;
            }
            return true;
          }
          return false;
        };

        /**
         * check element size for min and max
         * using info from that.pos
         * @change that.pos
         * @returns {boolean} -- true if size was changed
         */
        that.validateSize = function() {
          var res = that.validateSizeInBounds();

          // size in px
          var ww = that.pos.width * that.data.parentWidth;
          var hh = ww / that.pos.ratio;

          var nww = Math.min(Math.max(that.data.minWidth, ww), that.data.maxWidth);
          var nhh = Math.min(Math.max(that.data.minHeight, hh), that.data.maxHeight);

          if(nww === ww && nhh === hh) {
            return res || false;
          }

          if(that.options.styles.proportional) {
            if((nww / that.pos.ratio) > nhh) {
              nww = nhh * that.pos.ratio;
            }
            that.pos.width = nww / that.data.parentWidth;
          } else {
            that.pos.ratio = nww / nhh;
            that.pos.width = nww / that.data.parentWidth;
          }
          return true;
        };

        /**
         * check element position by parentIndent and selfOutdent
         * using info from that.pos or that.data.curBounds
         * @change that.pos
         * @returns {boolean} -- true if position was changed
         */
        that.validatePosition = function() {
          var updatePos = false;

          // without using bounds
          if(!that.options.styles.useBounds) {
            var ww = that.pos.width * that.data.parentWidth;
            var hh = ww / that.pos.ratio;
            var ll = that.pos.left * that.data.parentWidth;
            var tt = that.pos.top * that.data.parentHeight;

            if(that.data.parentIndent.left !== null) {
              if((ll - ww / 2) < that.data.parentIndent.left - that.data.selfOutdent.left) {
                ll = that.data.parentIndent.left - that.data.selfOutdent.left + ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.top !== null) {
              if((tt - hh / 2) < that.data.parentIndent.top - that.data.selfOutdent.top) {
                tt = that.data.parentIndent.top - that.data.selfOutdent.top + hh / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.right !== null) {
              if((ll + ww / 2) > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
                ll = (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right) - ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.bottom !== null) {
              if((tt + hh / 2) > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
                tt = (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom) - hh / 2;
                updatePos = true;
              }
            }

            if(updatePos) {
              that.pos.left = ll / that.data.parentWidth;
              that.pos.top = tt / that.data.parentHeight;
            }
            return updatePos;
          }

          // check position
          if(that.data.parentIndent.left !== null) {
            if(that.data.curBounds.left < that.data.parentIndent.left - that.data.selfOutdent.left) {
              that.pos.left += (that.data.parentIndent.left - that.data.selfOutdent.left - that.data.curBounds.left) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.top !== null) {
            if(that.data.curBounds.top < that.data.parentIndent.top - that.data.selfOutdent.top) {
              that.pos.top += (that.data.parentIndent.top - that.data.selfOutdent.top - that.data.curBounds.top) / that.data.parentHeight;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.right !== null) {
            if(that.data.curBounds.right > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
              that.pos.left -= (that.data.curBounds.right - (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.bottom !== null) {
            if(that.data.curBounds.bottom > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
              that.pos.top -= (that.data.curBounds.bottom - (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) / that.data.parentHeight;
              updatePos = true;
            }
          }
          return updatePos;
        };

        /**
         * check element angle
         * @change that.pos
         */
        that.validateAngle = function() {
          var res = false;
          var amin, amax;
          if(that.data.minAngle < that.data.maxAngle) {
            // check range
            if(that.pos.angle < that.data.minAngle || that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          } else {
            // check range
            if(that.pos.angle < that.data.minAngle && that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          }
          return res;
        };

        /**
         * update worked params from that.options structure
         * @param prm {Object} -- changes for that.options
         */
        that.updateParams = function() {
          var isChanged = false;
          if(that._updateParentSize()) {
            isChanged = true;
          }
          that._updateEditableState();
          that._updateRotationLimits();
          that._updateSizeLimits();
          that._updateParentIndent();
          return isChanged;
        };

        that._updateEditableState = function() {
          // prevent editable to view mode
          if(!that.isEditMode) {
            that.options.editable = false;
          }
          // prepare worked parameters
          if(that.options.editable === true || that.options.editable === false) {
            that.data.editable = that.data.movable = that.data.rotatable = that.data.resizable = (that.options.editable === true);
          } else if(typeof(that.options.editable) === "object") {
            that.data.movable = !!that.options.editable.movable;
            that.data.rotatable = !!that.options.editable.rotatable;
            that.data.resizable = !!that.options.editable.resizable;
            that.data.editable = that.data.movable || that.data.rotatable || that.data.resizable;
          }
          // drop focus
          if(that.data.editable === false && $that.hasClass("ut-sticker-focus")) {
            that.blur();
          }
        };

        that._updateRotationLimits = function() {
          if(that.options.styles.rotationLimits.min > 180) {
            that.options.styles.rotationLimits.min = 360 - that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.min < -180) {
            that.options.styles.rotationLimits.min = 360 + that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.max > 180) {
            that.options.styles.rotationLimits.max = 360 - that.options.styles.rotationLimits.max;
          }
          if(that.options.styles.rotationLimits.max < -180) {
            that.options.styles.rotationLimits.max = 360 + that.options.styles.rotationLimits.max;
          }
          that.data.minAngle = parseFloat(that.options.styles.rotationLimits.min) / 180 * Math.PI;
          that.data.maxAngle = parseFloat(that.options.styles.rotationLimits.max) / 180 * Math.PI;
        };

        that._updateSizeLimits = function() {
          that.data.minWidth = that.parseSizeValue(that.options.styles.sizeLimits.minWidth, that.data.parentWidth);
          if(that.data.minWidth === null) {
            that.data.minWidth = 0;
          }
          that.data.minHeight = that.parseSizeValue(that.options.styles.sizeLimits.minHeight, that.data.parentHeight);
          if(that.data.minHeight === null) {
            that.data.minHeight = 0;
          }
          that.data.maxWidth = that.parseSizeValue(that.options.styles.sizeLimits.maxWidth, that.data.parentWidth);
          if(that.data.maxWidth === null) {
            that.data.maxWidth = 0;
          }
          that.data.maxHeight = that.parseSizeValue(that.options.styles.sizeLimits.maxHeight, that.data.parentHeight);
          if(that.data.maxHeight === null) {
            that.data.maxHeight = 0;
          }
        };

        that._updateParentIndent = function() {
          if(typeof(that.options.styles.parentIndent) === "undefined" || that.options.styles.parentIndent === null || that.options.styles.parentIndent === false) {
            return;
          }

          if(typeof(that.options.styles.parentIndent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentWidth, 0);
            that.data.parentIndent.left = that.data.parentIndent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentHeight, 0);
            that.data.parentIndent.top = that.data.parentIndent.bottom = tmp;
            return;
          }

          if(that.options.styles.parentIndent.left !== null) {
            that.data.parentIndent.left = that.parseSizeValue(that.options.styles.parentIndent.left, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.left = null;
          }

          if(that.options.styles.parentIndent.top !== null) {
            that.data.parentIndent.top = that.parseSizeValue(that.options.styles.parentIndent.top, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.top = null;
          }

          if(that.options.styles.parentIndent.right !== null) {
            that.data.parentIndent.right = that.parseSizeValue(that.options.styles.parentIndent.right, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.right = null;
          }

          if(that.options.styles.parentIndent.bottom !== null) {
            that.data.parentIndent.bottom = that.parseSizeValue(that.options.styles.parentIndent.bottom, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.bottom = null;
          }
        };

        /**
         * prepare outdent parameters for work
         * @change that.data.selfOutdent
         * @private
         */
        that._updateSelfOutdent = function() {
          if(typeof(that.options.styles.selfOutdent) === "undefined" || that.options.styles.selfOutdent === null || that.options.styles.selfOutdent === false) {
            return;
          }

          if(typeof(that.options.styles.selfOutdent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.width(), 0);
            that.data.selfOutdent.left = that.data.selfOutdent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.height(), 0);
            that.data.selfOutdent.top = that.data.selfOutdent.bottom = tmp;
          } else {
            that.data.selfOutdent.left = that.parseSizeValue(that.options.styles.selfOutdent.left, $that.width(), 0);
            that.data.selfOutdent.top = that.parseSizeValue(that.options.styles.selfOutdent.top, $that.height(), 0);
            that.data.selfOutdent.right = that.parseSizeValue(that.options.styles.selfOutdent.right, $that.width(), 0);
            that.data.selfOutdent.bottom = that.parseSizeValue(that.options.styles.selfOutdent.bottom, $that.height(), 0);
          }
        };

        that._savePosition = function() {
          if(that.isEditMode && that.data.editable) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = that.pos;
            that.post.save();
          }
        };

        that._getCurrentData = function() {
          return {
            width: that.pos.width * that.data.parentWidth,
            height: that.pos.width/that.pos.ratio * that.data.parentWidth,
            rotation: that.pos.angle * 180 / Math.PI,
            zIndex: that.pos.zIndex
          };
        };

        /********************************************************************************
         * mouse and touch events
         ********************************************************************************/
        var itemWasMoved = false;
        var doubleClickTimeOut = 600;
        var lastClickTime = 0;
        that.onElementClick = function(event) {
          var eventType = events.click;
          var curTime = (new Date()).getTime();
          if((curTime - lastClickTime) < doubleClickTimeOut) {
            eventType = events.dblClick;
          }
          lastClickTime = curTime;
          var isStopEvent = false;
          var isBreakEvent = false;
          if(!that.isEditMode || !that.data.editable || !itemWasMoved) {
            var ev = $.Event(eventType);
            $content.trigger(ev);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        that.onElementMouse = function(type, data) {
          if(!that.isEditMode || !that.data.editable) {
            return true;
          }
          if(type === "down") {
            that.focus(true);
            itemWasMoved = false;
          } else if(type === "move" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.add("ut-sticker-moving");
            } else {
              $that.addClass("ut-sticker-moving");
            }
            that.pos.left += data.offLast.x / that.data.parentWidth;
            that.pos.top += data.offLast.y / that.data.parentHeight;

            // change element position
            if(that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            if(that.validatePosition() === true || !that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            itemWasMoved = true;
          } else if(type === "up" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.remove("ut-sticker-moving");
            } else {
              $that.removeClass("ut-sticker-moving");
            }
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
          }
          return false;
        };

        that.onElementResize = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.rotate) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.resizable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.resizable) {
            var tx = data.offLast.x * Math.cos(that.pos.angle) + data.offLast.y * Math.sin(that.pos.angle);
            var ty = -data.offLast.x * Math.sin(that.pos.angle) + data.offLast.y * Math.cos(that.pos.angle);
            // multiple to 2 cause scale was center
            var sx = tx * 2;
            var sy = ty * 2;
            var ow = that.pos.width * that.data.parentWidth;
            var oh = ow / that.pos.ratio;
            ow += sx;
            oh += sy;
            if(that.options.styles.proportional) {
              that.pos.width = ow / that.data.parentWidth;
            } else {
              that.pos.width = ow / that.data.parentWidth;
              that.pos.ratio = ow / oh;
            }

            // change element position
            that.validateSize();
            that.updateSize();
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
            }
            that._updateSelfOutdent();
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.resizable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that._fullOffsetLeft = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetLeft;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that._fullOffsetTop = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetTop;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that.onElementRotate = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.resize) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.rotatable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.rotatable) {
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            // change element position
            that.updateAngle();
            $content.trigger(events.rotate, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validateSizeInBounds(false) === true) {
              that.validateSize();
              that.updateSize();
              $content.trigger(events.resize, that._getCurrentData());
              if(that.options.styles.useBounds) {
                that._updateBoundsInfo();
                that._updateSelfOutdent();
              }
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.rotatable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that.onElementRotateAndResize = function(type, data) {
          if(type === "down") {
            that.focus(true);
            return false;
          } else if(type === "move") {
            // calc mouse offset by element center
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var cl = Math.sqrt((cx - data.offLast.x)*(cx - data.offLast.x) + (cy - data.offLast.y)*(cy - data.offLast.y)) * 2;
            var nl = Math.sqrt(cx*cx + cy*cy) * 2;
            that.pos.width *= nl/cl;

            /* rotate element */
            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            /* change element position */
            that.updateAngle();
            that.validateSize();
            that.updateSize();
            $content.trigger(events.rotate, that._getCurrentData());
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up") {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
          return true;
        };

        that.onBodyClick = function() {
          if($that.hasClass("ut-sticker-focus") && $(this).closest(".ut-sticker").length <= 0) {
            that.blur();
          }
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that[0].style.display = "none";
          $content[0].style.display = "none";
        };

        that.show = function() {
          $that[0].style.display = "";
          $content[0].style.display = "";
        };

        that.focus = function(isChangeZIndex) {
          if(!that.data.editable || $that.hasClass("ut-sticker-focus")) {
            return;
          }
          var tmp = parentObj.getElementsByClassName("ut-sticker");
          if(tmp && tmp[0]) {
            $(tmp).utSticker("blur");
          }
          $that.addClass("ut-sticker-focus");
          $that.trigger(events.focus, that.options.id);
          if(that.options.styles.topOnFocus && isChangeZIndex) {
            that.pos.zIndex = window.utStickerLastZIndex++;
            $that[0].style.zIndex = that.pos.zIndex;
            $content.trigger(events.change, that._getCurrentData());
          }
        };

        that.blur = function() {
          if(!$that.hasClass("ut-sticker-focus")) {
            return;
          }
          $that.removeClass("ut-sticker-focus");
          $that.trigger(events.blur, that.options.id);
        };

        /**
         * update sticker size and position (need to call when parent size changed)
         */
        that.update = function(pos) {
          var isPosChanged = false;
          if(that.updateParams()) {
            isPosChanged = true;
          }
          that.createButtons();
          if(pos && that.applyNewPosition(pos)) {
            isPosChanged = true;
          }
          that.updateSize();
          that.updatePosition();
          if(!that.options.autoflip) {
            $content.removeClass("ut-sticker-flip");
          }
          that.validateAngle();
          that.updateAngle();
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(that.data.resizable) {
            if(that.validateSize() === true) {
              isPosChanged = true;
              that.updateSize();
            }
          }
          if(that.data.movable) {
            if(that.validatePosition() === true) {
              isPosChanged = true;
              that.updatePosition();
            }
          }
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(isPosChanged) {
            $content.trigger(events.change, that._getCurrentData());
            that._savePosition();
          }
        };

        /**
         * change editable state
         * @param data {boolean|object} -- turn on/off posibility for editable sticker. Can be object with {movable,rotatable,resizable}
         */
        that.editable = function(data) {
          if(typeof(data) === "object") {
            that.options.editable = $.extend(true, {}, data);
          } else {
            that.options.editable = data;
          }
          that._updateEditableState();
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isPosChanged = false;
        that.updateParams();
        that.prepareElement();
        that.createButtons();
        that.preparePosition();
        that.updateSize();
        that.updatePosition();
        that.updateAngle();
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        if(that.data.resizable) {
          if(that.validateSize() === true) {
            that.updateSize();
            isPosChanged = true;
          }
        }
        if(that.data.movable) {
          if(that.validatePosition() === true) {
            that.updatePosition();
            isPosChanged = true;
          }
        }
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        that.initialized = true;
        if(that.post) {
          setTimeout(function(){
            if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
              that._savePosition();
            }
            $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
          },0);
        }
        if(isPosChanged) {
          setTimeout(function(){
            $content.trigger(events.change, that._getCurrentData());
          },0);
          that._savePosition();
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.hide){
          this.utSticker.hide.call(this);
        }
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.show){
          this.utSticker.show.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.focus){
          this.utSticker.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.blur){
          this.utSticker.blur.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.update){
          this.utSticker.update.call(this);
        }
      });
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utSticker && this.utSticker.editable){
          this.utSticker.editable.call(this, data);
        }
      });
      return this;
    },

    remove: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.removeElement){
          this.utSticker.removeElement.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      return methods.remove.apply(this);
    }
  };

  $.fn.utSticker = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utSticker');
    }
    return this;
  };
}(UT, jQuery, window, document, undefined));
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
/* global UT:true */
(function($, window, document, undefined) {
  "use strict";

  var methods = {
    nextPanelToAddImage: -1,
    init: function(options) {
      this.each(function() {
        if(this.utImage) {
          if(typeof(options) === "object") {
            this.utImage.options = $.extend(true, this.utImage.options, options);
            if(options && options.styles && options.styles.linkPosition) {
              this.utImage.options.styles.linkPosition = $.extend(true, {}, options.styles.linkPosition);
            }
            if(options && options.styles && options.styles.menuPosition) {
              this.utImage.options.styles.menuPosition = $.extend(true, {}, options.styles.menuPosition);
            }
            if(options.data) {
              this.utImage.firstTimeImageLoad();
            }
          }

          this.utImage.updateElement();
          this.utImage.createElements();
          this.utImage.resizeContainer();
          return;
        }

        var events = {
          ready: "utImage:ready",
          buttonClick: "utImage:buttonClick",
          mediaBeforeAdd: "utImage:mediaBeforeAdd",
          mediaAdd: "utImage:mediaAdd",
          mediaCrop: "utImage:mediaCrop",
          mediaRemove: "utImage:mediaRemove",
          mediaReady: "utImage:mediaReady",
          change: "utImage:change",
          focus: "utImage:focus",
          blur: "utImage:blur",
          destroy: "utImage:destroy",
          dialogOpen: "utImage:dialogOpen",
          dialogCancel: "utImage:dialogCancel",
          resize: "utImage:resize"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            add:true,
            edit:true,
            remove:true,
            source:false
          },
          type: "background", /* background, image, svg, canvas */
          data: null,
          autoSave: true,
          styles: {
            width: "auto",
            height: false,
            minHeight: undefined,
            maxHeight: undefined,
            minWidth: undefined,
            maxWidth: undefined,
            flexRatio: true,
            autoCrop: true,
            linkPosition: {}, // def: left:0, bottom:0;
            menuPosition: {}, // def: left:15, top:15
            filters: [],
            groupMode: false,
            autoResize: true,
            listenMedia: true,
            svgFilterName: "",
            svgFilterData: "",
            expandPreloader: false
          },
          i18n: {
            addButtonText: "Add image",
            dialogLabel: ""
          },
          dialog: {
            preferedFormat: false
          },
          reuse: false
        };

        var that = {};
        this.utImage = that;
        that.initialized = false;

        var $that = $(this);
        that.options = $.extend(true, defaults, options);
        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isEditMode = false;
        that.data = {
          pictureData: null,
          image: null,
          imageWidth: 0,
          imageHeight: 0,
          scrollTop: 0,
          scrollBottom: 0
        };
        that.view = {
          addButton: null,
          ctrlPanel: null,
          editButton: null,
          removeButton: null
        };

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function() {
              $that.trigger(events.ready, { id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"] });
              if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
                var sz = {
                  width: $that.width(),
                  height: Math.round(that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                  ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
                };
                if(sz.height !== $that.height()) {
                  $that.height(sz.height);
                  $that.trigger(events.resize, sz);
                }
              }
            }, 0);
            that.addMediaListener();
          }
          setTimeout(function() {
            $(".webdoc_expression_wrapper").on("touchmove", that.onTouchMove);
            that.post.on("scroll", that.onPostScroll);
          }, 0);
        });

        that.updateElement = function() {
          if(that.options.styles.groupMode) {
            $that.addClass("ut-image-in-group");
          } else {
            $that.removeClass("ut-image-in-group");
          }

          if($that.attr("id") === "" && that.options.id) {
            that.options.id = "image-" + UT.uuid();
          }
          if(that.options.id !== "") {
            $that.attr("id", that.options.id);
          } else {
            that.options.id = $that.attr("id");
          }
        };

        that.prepareElement = function(){
          $that.addClass("ut-image");
          that.updateElement();

          $that.on("click", function() {
            if(!$that.hasClass("ut-image-focus") || $that.hasClass("ut-image-inscroll")) {
              $that.removeClass("ut-image-inscroll");
              that.focus();
            } else if(that.options.styles.groupMode) { // && $(".ut-image").length <= 1
              that.blur();
            }
          });
        };

        that.createElements = function() {
          if(that.view.addButton) {
            that.view.addButton.remove();
            that.view.addButton = null;
          }
          if(that.view.ctrlPanel) {
            that.view.ctrlPanel.remove();
            that.view.ctrlPanel = null;
          }

          that.updateSourceLink();
          if(!that.options.editable) {
            $that.removeClass("ut-image-edit");
            return;
          }
          $that.addClass("ut-image-edit");

          if(that.options.ui.add) {
            that.view.addButton = $("<div>", {"class":"ut-image-button-add ut-button ut-media-button icon_camera"}).appendTo($that).html(that.options.i18n.addButtonText);
            that.view.addButton.on("click",that.onAddButtonClick);
          }
          if(that.options.ui.edit || that.options.ui.remove) {
            that.view.ctrlPanel = $("<div>", {"class":"ut-image-control-panel"}).appendTo($that);
            if(that.options.ui.edit) {
              that.view.editButton = $("<div>", {"class":"ut-image-button-edit"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.editButton).html('<span class="icon_camera">&nbsp;</span>Edit');
              that.view.editButton.on("click", that.onEditButtonClick);
            }
            if(that.options.ui.remove) {
              that.view.removeButton = $("<div>", {"class":"ut-image-button-remove"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.removeButton).html('<span class="icon_trash"></span>');
              that.view.removeButton.on("click", that.onRemoveButtonClick);
            }
            if(typeof(that.options.styles.menuPosition.left) !== "undefined") {
              that.view.ctrlPanel.css({ "left":parseInt(that.options.styles.menuPosition.left ,10) + "px", "right":"auto" });
            } else if(typeof(that.options.styles.menuPosition.right) !== "undefined") {
              that.view.ctrlPanel.css({ "right":parseInt(that.options.styles.menuPosition.right ,10) + "px", "left":"auto" });
            } else {
              that.view.ctrlPanel.css({ "left":"15px", "right":"auto" });
            }
          }
          that.updateButtonsPosition();
        };

        that._onLinkTouch = function(event) {
          event.stopPropagation();
          if(that.data.srcLink.hasClass("showText")) {
            window.open(that.data.srcLink.attr("data-href"), "_blank");
          }
        };

        that._onImageTouch = function() {
          if(!that.data.srcLink.hasClass('show')) {
            $('.sourceLink').not(that.data.srcLink).removeClass('show').removeClass('showText');
            that.data.srcLink.addClass('show');
          } else {
            that.data.srcLink.removeClass('show').removeClass('showText');
          }
        };

        that._onIconTouch = function(event) {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
            event.stopPropagation();
          }
        };

        that._onImageMouseEnter = function() {
          if(!that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('show');
          }
        };

        that._onImageMouseLeave = function() {
          that.data.srcLink.removeClass('show').removeClass('showText');
        };

        that._onLinkMouseEnter = function() {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
          }
        };

        that._onLinkMouseLeave = function() {
          that.data.srcLink.removeClass('showText');
        };

        that._onLinkMouseClick = function(event) {
          if(that.data.srcLink.hasClass('showText')) {
            window.open(that.data.srcLink.attr('data-href'), '_blank');
          }
          event.stopPropagation();
          event.preventDefault();
        };

        that.updateSourceLink = function() {
          var removeLink = function() {
            if(that.data.srcLink) {
              if(that.isTouch) {
                that.data.srcLink.off('click', that._onLinkTouch);
                $that.find(".ut-image-source-link-icon").off('click', that._onIconTouch);
              } else {
                that.data.srcLink.off('mouseenter', that._onLinkMouseEnter).off('mouseleave', that._onLinkMouseLeave);
                that.data.srcLink.off('click', that._onLinkMouseClick);
              }
              that.data.srcLink.remove();
              that.data.srcLink = null;
            }
            if(that.isTouch) {
              $that.off('click', that._onImageTouch);
            } else {
              $that.off('mouseenter', that._onImageMouseEnter).off('mouseleave', that._onImageMouseLeave);
            }
          };
          removeLink();

          if(that.options.editable || !that.options.ui.source) {
            return;
          }
          if(!that.data.pictureData || !that.data.pictureData.info || !that.data.pictureData.info.source) {
            return;
          }

          var tmp = that.data.pictureData.info.source.match(/\/\/([^\/]+)\//i);
          if(!tmp || !tmp[0]) {
            tmp = that.data.pictureData.info.source.replace(/^http(s)?\:/i, "").match(/^([^\/]+)\//i);
            if(!tmp || !tmp[0]) {
              removeLink();
              return;
            }
          }

          var imgDomainName = (tmp[1] ? tmp[1] : tmp[0]).replace(/(^(\/\/)?www\.|\/)/g, "");
          if(imgDomainName.length <= 0 || imgDomainName.indexOf('urturn.com') !== -1) {
            removeLink();
            return;
          }

          var cLink = that.data.pictureData.info.source;
          if(!cLink.match(/^http\:\/\/|^https\:\/\/|^\/\//i)) {
            cLink = "//" + cLink;
          }

          if(!that.options.styles.linkPosition.direction) {
            if(
              (typeof(that.options.styles.linkPosition.left) !== "undefined" && parseInt(that.options.styles.linkPosition.left, 10) > ($that.width() / 2)) ||
              (typeof(that.options.styles.linkPosition.right) !== "undefined" && parseInt(that.options.styles.linkPosition.right, 10) < ($that.width() / 2))
                ) {
              that.options.styles.linkPosition.direction = "left";
            }
          }

          that.data.srcLink = $("<a>", {"class":"ut-image-source-link", "data-href":cLink}).appendTo($that);
          if(that.options.styles.linkPosition && that.options.styles.linkPosition.direction === "left") {
            that.data.srcLink.html('<span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span><span class="ut-image-source-link-icon icon_link"></span>');
            that.data.srcLink.addClass("left");
          } else {
            that.data.srcLink.html('<span class="ut-image-source-link-icon icon_link"></span><span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span>');
          }

          if(typeof(that.options.styles.linkPosition.top) !== "undefined") {
            that.data.srcLink.css("top", that.options.styles.linkPosition.top);
          } else if(typeof(that.options.styles.linkPosition.bottom) !== "undefined") {
            that.data.srcLink.css("bottom", that.options.styles.linkPosition.bottom);
          } else {
            that.data.srcLink.css("bottom", "0");
          }
          if(typeof(that.options.styles.linkPosition.left) !== "undefined") {
            that.data.srcLink.css("left", that.options.styles.linkPosition.left);
          } else if(typeof(that.options.styles.linkPosition.right) !== "undefined") {
            that.data.srcLink.css("right", that.options.styles.linkPosition.right);
          } else {
            that.data.srcLink.css("left", "0");
          }

          if(that.isTouch) {
            that.data.srcLink.on('click', that._onLinkTouch);
            $that.on('click', that._onImageTouch);
            $that.find(".ut-image-source-link-icon").on('click', that._onIconTouch);
          } else {
            $that.on('mouseenter', that._onImageMouseEnter).on('mouseleave', that._onImageMouseLeave);
            that.data.srcLink.on('mouseenter', that._onLinkMouseEnter).on('mouseleave', that._onLinkMouseLeave);
            that.data.srcLink.on('click', that._onLinkMouseClick);
          }

//          var checkSize =  function() {
//            var obj = $that.find('.ut-image-source-link-text');
//            if (obj.height() > 40) {
//              var text = obj.html();
//              text = text.substring(0, text.length - 1);
//              obj.html(text);
//              checkSize();
//            } else {
//              if (imgDomainName !== obj.html()) {
//                var tmp = obj.html();
//                tmp = tmp.substring(0, tmp.length - 3) + '...';
//                obj.html(tmp);
//              }
//            }
//          };
//          checkSize();
        };

        /**
         * retrieve size object for dialog
         * @returns {}
         */
        that.getSize = function(workData) {
          var options = {};
          if(typeof(workData.styles.width) === "undefined" || workData.styles.width === "auto") {
            options.width = $that.width();
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else if(workData.styles.height !== false) {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(workData.styles.height, 10);
            }
          } else if(workData.styles.width !== false) {
            options.width = parseInt(workData.styles.width, 10);
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else if(workData.styles.height !== false) {
              options.height = parseInt(workData.styles.height, 10);
            }
          }

          if(typeof(workData.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(workData.styles.minHeight, 10);
          }
          if(typeof(workData.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(workData.styles.maxHeight, 10);
          }
          if(typeof(workData.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(workData.styles.minWidth, 10);
          }
          if(typeof(workData.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(workData.styles.maxWidth, 10);
          }
          options.autoCrop = !!workData.styles.autoCrop;
          options.adaptUI = true; //!!workData.adaptUI;
          options.flexRatio = !!workData.styles.flexRatio;
          return options;
        };

        /**
         * processing click on "add" button
         * @param event
         */
        that.onAddButtonClick = function(event) {
          that.focus();
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "edit" button
         * @param event
         */
        that.onEditButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "edit");
          if(!ev.isDefaultPrevented()) {
            that.focus();
            that.recropImage({autoCrop:false});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "remove" button
         */
        that.onRemoveButtonClick = function() {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
//            that.removeImage();
          }
        };

        /**
         * prepare data and call API.dialog
         */
        that.queryImage = function(additionalData) {
          var options = {};
          var curData = $.extend(true, {}, that.options);
          curData = additionalData ? $.extend(true, curData, additionalData) : curData;
          options.size = that.getSize(curData);

          // add other parameters
          if(curData.styles.filters && curData.styles.filters.length > 0) {
            options.applyShaders = $.extend(true, [], curData.styles.filters);
          }

          options = $.extend(true, options, curData.dialog);

          if(curData.i18n.dialogLabel) {
            options.dialogLabel = curData.i18n.dialogLabel;
          }
          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          $that.trigger(events.dialogOpen);
          that.post.dialog('image', options, function(data, error){
            if(error) {
              return;
            }
            if($.isEmptyObject(data) || !data.url) {
              that.hideLoader();
              $that.trigger(events.dialogCancel);
              return;
            }
            that.onImageAdded(data, false);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        /**
         * show overlay with spin over image
         */
        that.showLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            return;
          }
          spin = $('<div class="ut-image-loading"></div>').appendTo($that).html('<div class="icon_spinner"></div>');
          $that.addClass("loading");
        };

        /**
         * hide overlay with spin over image
         */
        that.hideLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            spin.remove();
          }
          $that.removeClass("loading");
        };

        /**
         * build structure with sizes
         * @param imgSize - image size
         * @param contSize - container size
         * @returns {}
         */
        that.getImageSizeData = function(imgSize, contSize){
          return {
            width: imgSize.width,
            height: imgSize.height,
            containerWidth: contSize.width,
            containerHeight: contSize.height,
            desiredContainerWidth: Math.floor(imgSize.width*(contSize.height/imgSize.height)),
            desiredContainerHeight: Math.floor(imgSize.height*(contSize.width/imgSize.width))
          };
        };

        that.__setImage = function(imgData) {
          var tmp;
          if(typeof imgData === "undefined" || imgData === null || imgData === false) {
            if(that.options.type === "background") {
              tmp = $that[0].getAttribute("style") || "";
              tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
              $that[0].setAttribute("style", tmp);
            } else if(that.options.type === "image") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "svg") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "canvas") {
              $that.find(".ut-image-view").remove();
            }
            $that.removeClass("ut-image-full");
          } else if(that.options.type === "background") {
            tmp = $that[0].getAttribute("style") || "";
            tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
            $that[0].setAttribute("style", tmp + 'background-image:url("' + imgData.src + '")');
            $that.addClass("ut-image-full");
          } else if(that.options.type === "image") {
            $that.find(".ut-image-view").remove();
            $(imgData).addClass("ut-image-view").appendTo($that);
            $that.addClass("ut-image-full");
            that.__coverImage();
          } else if(that.options.type === "svg") {
            $that.find(".ut-image-view").remove();
            $that.append('<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + imgData.width + ' ' + imgData.height + '" enable-background="new 0 0 ' + imgData.width + ' ' + imgData.height + '" xml:space="preserve" preserveAspectRatio="none">' +
              '<defs>' + (that.options.styles.svgFilterData ? that.options.styles.svgFilterData : '') + '</defs>' +
              '<image ' + (that.options.styles.svgFilterName ? ('filter="url(#'+that.options.styles.svgFilterName+')" ') : '') + 'class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="' + imgData.width + 'px" height="' + imgData.height + 'px" xlink:href="' + imgData.src + '"/>' +
              '</svg>');
            $that.addClass("ut-image-full");
            that.__coverImage();
          }
        };

        that.__coverImage = function() {
          var obj = $that.find(".ut-image-view");
          if(obj.length <= 0) {
            return;
          }
          var ww = $that.width();
          var hh = $that.height();
          var sc = Math.max(ww/that.data.imageWidth, hh/that.data.imageHeight);
          var dx = (ww - that.data.imageWidth*sc)>>1;
          var dy = (hh - that.data.imageHeight*sc)>>1;
          obj.width((that.data.imageWidth*sc)|0).height((that.data.imageHeight*sc)|0);
          obj.css({"left":(dx|0)+'px', "top":(dy|0)+"px"});
        };

        /**
         * the image was added
         * @param data
         * @param isAfterRecrop
         */
        that.onImageAdded = function(data, isAfterRecrop) {
          if(!data) {
            return;
          }

          if(isAfterRecrop === false) {
            var ev = $.Event(events.mediaBeforeAdd);
            $that.trigger(ev, data);
            if(ev.isDefaultPrevented()) {
              return;
            }
          }

          if(!isAfterRecrop) {
            that.showLoader();
          }

          // loading and apply image
          var tmpImg = new Image();
          tmpImg.onload = function() {
            that.data.image = this;
            that.data.pictureData = data;
            that.options.data = data;
            that.data.imageWidth = tmpImg.width;
            that.data.imageHeight = tmpImg.height;
            that.saveData();

            that.__setImage(tmpImg);

            // inform about new image size
            that.hideLoader();
            that.updateSourceLink();
            var size = that.getImageSizeData({width:that.data.imageWidth, height:that.data.imageHeight}, {width:$that.width(), height:$that.height()});
            size.data = that.data.pictureData;
            if(isAfterRecrop === true || isAfterRecrop === false) {
              $that.trigger(isAfterRecrop ? events.mediaCrop : events.mediaAdd, size);
            }
            if(that.options.styles.autoResize) {
              that.resizeContainer();
            }
            $that.trigger(events.mediaReady, size);
            that.triggerChangeEvent();
          };
          tmpImg.onerror = function() {
            that.hideLoader();
          };
          tmpImg.src = data.url;
        };

        that.resizeContainer = function() {
          if(!that.options.styles.autoResize || !that.data.imageWidth || !that.data.imageHeight) {
            that.__coverImage();
            return;
          }

          // calculate new size
          var sz = {
            width: Math.round($that.width()),
            height: Math.round($that.width() * that.data.imageHeight / that.data.imageWidth),
            ratio: that.data.imageWidth / that.data.imageHeight
          };

          // resize object and dispatch event
          if(sz.width !== $that.width() || sz.height !== $that.height()) {
            $that.height(sz.height);
            that.updateButtonsPosition();
            that.__coverImage();
            $that.trigger(events.resize, sz);
          }
        };

        /**
         * call recrop function for image
         * @param params
         */
        that.recropImage = function(params) {
          if(!that.data.pictureData) {
            return;
          }

          var options = {};

          if(typeof(that.options.styles.width) === "undefined" || that.options.styles.width === "auto" || that.options.styles.width === false) {
            options.width = $that.width();
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(that.options.styles.height, 10);
            }
          } else {
            options.width = parseInt(that.options.styles.width, 10);
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else {
              options.height = parseInt(that.options.styles.height, 10);
            }
          }

          if(typeof(that.options.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(that.options.styles.minHeight, 10);
          }
          if(typeof(that.options.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(that.options.styles.maxHeight, 10);
          }
          if(typeof(that.options.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(that.options.styles.minWidth, 10);
          }
          if(typeof(that.options.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(that.options.styles.maxWidth, 10);
          }
          options.autoCrop = !!that.options.styles.autoCrop;
          options.adaptUI = true; //!!tmpPrm.adaptUI;
          options.flexRatio = !!that.options.styles.flexRatio;

          options = $.extend(true, options, that.options.dialog);
          options = $.extend(true, options, params);

          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          if(options.autoCrop !== true) {
            $that.trigger(events.dialogOpen);
          }
          that.post.dialog('crop',{'image':that.data.pictureData, 'size' : options}, function(data/*, error*/) {
            if($.isEmptyObject(data) || !data.url) {
              if(options.autoCrop !== true) {
                that.hideLoader();
                $that.trigger(events.dialogCancel);
              }
              return;
            }
            that.onImageAdded(data, true);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.removeImage = function() {
          that.__setImage(null);
//          var tmp = $that[0].getAttribute("style") || "";
//          tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
//          $that[0].setAttribute("style", tmp);
//          $that.removeClass("ut-image-full");
          that.data.pictureData = null;
          that.options.data = null;
          that.data.image = null;
          that.data.imageWidth = null;
          that.data.imageHeight = null;
          that.saveData();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
        };

        /**
         * save image data to storage
         */
        that.saveData = function() {
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = that.data.pictureData;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = (that.data.pictureData && that.data.imageHeight ? that.data.imageWidth / that.data.imageHeight : null);
            that.post.save();
          }
        };

        /**
         * load image while component initializing
         */
        that.firstTimeImageLoad = function(withReuse) {
          var storageKey = "utImage_" + that.options.id + "_img";
          if(that.options.data && (typeof that.options.data === "string" || that.options.data.url)) {
            if(typeof(that.options.data) === "string") {
              that.options.data = { url:that.options.data };
            }
            that.onImageAdded(that.options.data);
          } else {
            var tmp = that.post.storage[storageKey];
            if(tmp && tmp.url) {
              that.options.data = tmp;
              that.onImageAdded(that.options.data);
            } else if(withReuse && (that.options.reuse || that.options.styles.reuse)) {
              if(that.post.collection('parent') && that.post.collection('parent')[storageKey]){
                that.options.data = that.post.collection('parent')[storageKey];
                that.onImageAdded(that.options.data);
              }
            } else {
              that.options.data = null;
            }
          }
        };

        that.onTouchMove = function() {
          $that.addClass("ut-image-inscroll");
        };

        /**
         * the post was scrolled
         * @param v {Object} - data with scroll paddings
         */
        that.onPostScroll = function(v) {
          that.data.scrollTop = parseInt(v.scrollTop, 10);
          that.data.scrollBottom = parseInt(v.scrollBottom, 10);
          that.updateButtonsPosition();
          $that.removeClass("ut-image-inscroll");
        };

        /**
         * update "add" and "edit" button position
         */
        that.updateButtonsPosition = function() {
          var fullHeight = $(that.post.node).height();
          var pos = $that.offset();
          pos.height = $that.height();
          pos.bottom = pos.top + pos.height;
          var tmp1 = Math.max(pos.top, that.data.scrollTop) - pos.top;
          var tmp2 = Math.max(fullHeight - pos.bottom, that.data.scrollBottom) - (fullHeight - pos.bottom);
          // to center
          if(that.view.addButton) {
            that.view.addButton.css("top", (tmp1 + (pos.height-tmp1-tmp2)/2) + "px");
          }
          if(that.view.ctrlPanel) {
            var topPos = 0;
            if(typeof(that.options.styles.menuPosition.top) !== "undefined") {
              topPos = (tmp1 + parseInt(that.options.styles.menuPosition.top, 10));
            } else if(typeof(that.options.styles.menuPosition.bottom) !== "undefined") {
              topPos = (pos.height - tmp2 - parseInt(that.options.styles.menuPosition.bottom, 10) - that.view.ctrlPanel.height());
            } else {
              topPos = (tmp1 + 15);
            }
            if(that.view.editButton) {
              if((topPos + that.view.editButton.height() / 2) > (tmp1 + $that.height() - tmp2) / 2) {
                that.view.editButton.addClass("top");
              } else {
                that.view.editButton.removeClass("top");
              }
            }
            that.view.ctrlPanel.css({"top": topPos + "px", "bottom":"auto"});
          }
        };

        that.addMediaListener = function() {
          if(methods.nextPanelToAddImage < 0 && that.options.styles.listenMedia) {
            var onMediaHandler = function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-image");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPanelToAddImage) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utImage && (!allPanels[ww].utImage.data.pictureData || !allPanels[ww].utImage.data.pictureData.url)) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPanelToAddImage++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utImage.onImageAdded.call(tmp, data, false);
              }
            };

            that.post.on('image', onMediaHandler);
            methods.nextPanelToAddImage = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions){
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue) ? noDiff : diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that.css("display", "none");
        };

        that.show = function() {
          $that.css("display", "");
        };

        that.focus = function() {
          if(!that.options.editable || $that.hasClass("ut-image-focus")) {
            return;
          }
          if(that.options.styles.groupMode) {
            $("body").find(".ut-image.ut-image-in-group").utImage("blur");
          }
          $that.addClass("ut-image-focus");
          $that.trigger(events.focus, that.options.id);
        };

        that.blur = function() {
          if(!$that.hasClass("ut-image-focus")) {
            return;
          }
          $that.removeClass("ut-image-focus");
          if(!that.options.editable) {
            return;
          }
          $that.trigger(events.blur, that.options.id);
        };

        that.destroy = function(){
          $that.trigger(events.destroy, that.options.id);
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = null;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = null;
            that.post.save();
          }
          $that.remove();
        };

        that.editable = function(data) {
          that.options.editable = data;
          that.createElements();
          if(!that.options.styles.groupMode) {
            that.focus();
          }
        };

        that.listenMedia =  function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('media');
            that.post.off('image');
            methods.nextPanelToAddImage = -1;
          }
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isSetFocus = (jQuery(".ut-image").length <= 0);
        that.prepareElement();
        that.createElements();
        if(!that.options.styles.groupMode || isSetFocus) {
          that.focus();
        }
        that.firstTimeImageLoad(true);

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"]});
            if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
              var sz = {
                width: $that.width(),
                height: Math.round($that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
              };
              if(sz.height !== $that.height()) {
                $that.height(sz.height);
                $that.trigger(events.resize, sz);
              }
            }
          }, 0);
          that.addMediaListener();
        }
        that.oldOptions = $.extend(true, {}, that.options);
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utImage && this.utImage.show){
          this.utImage.show.call(this);
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hide){
          this.utImage.hide.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utImage && this.utImage.focus){
          this.utImage.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utImage && this.utImage.blur){
          this.utImage.blur.call(this);
        }
      });
      return this;
    },

    update: function(newParams) {
      methods.init.call(this, newParams);
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utImage && this.utImage.removeImage){
          this.utImage.removeImage.call(this);
        }
      });
      return this;
    },

    remove: function() {
      return methods.destroy.apply(this);
    },

    destroy: function() {
      this.each(function() {
        if(this.utImage && this.utImage.destroy){
          this.utImage.destroy.call(this);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.pictureData;
        }
      }
      return res;
    },

    image: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.image;
        }
      }
      return res;
    },

    ratio: function() {
      var res = 0;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.imageHeight > 0 ? (this[0].utImage.data.imageWidth/this[0].utImage.data.imageHeight) : 0;
        }
      }
      return res;
    },

    dialog: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.queryImage.call(this[0], data);
        }
      }
      return this;
    },

    crop: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.recropImage.call(this[0], data);
        }
      }
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.editable.call(this, data);
        }
      });
      return this;
    },

    listenMedia: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.listenMedia.call(this, data);
        }
      });
      return this;
    },

    showLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.showLoader){
          this.utImage.showLoader.call(this);
        }
      });
      return this;
    },

    hideLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hideLoader){
          this.utImage.hideLoader.call(this);
        }
      });
      return this;
    }
  };

  $.fn.utImage = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utImage');
    }
    return this;
  };
})(jQuery, window, document, undefined);

/*
 * This source code is licensed under version 3 of the AGPL.
 * Copyright (c) 2013 by webdoc SA
 * Addendum to the license AGPL-3:
 *
 * Can be used only in the context of urturn service such as creation of Expression,
 * improving the tools to create Expressions.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
  "use strict";
  var methods = {
    nextPlayerToAddSound: -1,

    init: function(options) {
      this.each(function() {
        var $that = $(this);
        var that = {};
        this.utAudio = that;

        var events = {
          ready: "utAudio:ready",
          change: "utAudio:change",
          buttonClick: "utAudio:buttonClick",
          mediaAdd: "utAudio:mediaAdd",
          mediaRemove: "utAudio:mediaRemove",
          mediaReady: "utAudio:mediaReady",
          timeUpdate: "utAudio:timeUpdate",
          play: "utAudio:play",
          pause: "utAudio:pause",
          stop: "utAudio:stop",
          finish: "utAudio:finish",
          seek: "utAudio:seek",
          error: "utAudio:error",
          dialogOpen: "utAudio:dialogOpen",
          dialogCancel: "utAudio:dialogCancel"
        };

        var defaults = {
          data: undefined,
          skin: 'bottom-over',
          id: false,
          ui: {
            play:    true,
            progress:true,
            time:    true,
            title:   true,
            source:  true,
            artwork: true
          },
          styles: {
            autoPause: true,
            listenMedia: true
          },
          editable: true,
          i18n: {
            add:         "add sound",
            change:      "",
            error:       "Error occurred",
            dialogLabel: undefined
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready){
          UT.Expression.ready(function(post){
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.sckey   = 'T8Yki6U2061gLUkWvLA';
        that.doNotMakeAnimationFlag = false;

        that.eventNS   = '';
        that.storageNS = 'utAudio_';
        that.stateNS   = "ut-audio-state";
        that.editableNS= "ut-audio-editable";
        that.uiNS      = "ut-audio-ui";
        that.modeNS    = "ut-audio-mode";
        that.skinNS    = "ut-audio-skin";
        that.serviceNS = "ut-audio-service";
        that.aspectNS  = "ut-audio-aspect";
        that.sizeNS    = "ut-audio-size";
        that.touchNS   = "ut-audio-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            play:    v,
            progress:v,
            time:    v,
            title:   v,
            source:  v,
            artwork: v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddSound < 0 && that.options.styles.listenMedia) {
            that.post.on('sound',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-audio");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddSound) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utAudio && allPanels[ww].utAudio.options && !allPanels[ww].utAudio.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddSound++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utAudio.options.data = data;
                tmp.utAudio.update();
              }
            });
            methods.nextPlayerToAddSound = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions) {
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue)?noDiff:diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, diff.newValue, diff.oldValue);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        that.requestSoundcloudAboutAppData = function(url, callback) {
          var apiUrl = (document.location.protocol === 'https:' || (/^h ttps/i).test(url) ? 'https' : 'http') + '://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + that.sckey + '&callback=?';
          $.getJSON(apiUrl, function(data) {
            callback.call(this, data);
          });
        };

        that.requestItunesAboutAppData = function(url,callback) {
          var id = false;
          var parts = url.split('i=');
          if(parts[1]){
            id = parseInt(parts[1].split('&')[0].split('?')[0].split(':')[0],10);
          }

          var serchInStore = function(id, country, successCallback, errorCallback){
            var apiUrl = (document.location.protocol === 'https:' || (/^https/i).test(url) ? 'https' : 'http') + '://itunes.apple.com/lookup?media=music&country=' + country + '&id=' + id + '&callback=?';
            $.getJSON(apiUrl, function(data) {
              if(data && data.results && data.results[0]){
                successCallback.call(this, data.results[0]);
              } else {
                errorCallback.call(this, country);
              }
            });
          };

          var canNotFind = function(country){
            that.setState('error');
            if(console && console.warn){
              console.warn("utAaudio can't find the url=" + url + " with id=" + id + " in " + country + " itunes music store");
            }
          };

          var canFind = function(data){
            callback.call(this,data);
          };

          //here we search in UK and US stores

          serchInStore(id,'US',canFind,function(country){
            canNotFind(country);
            serchInStore(id,'GB',canFind,function(country){
              canNotFind(country);
            });
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? "true" : "false"),
            (that.currents.serviceData?(that.serviceNS + "-" + that.currents.serviceData.service_name) : ""),
            that.skinNS     + '-' + that.options.skin,
            that.modeNS     + '-' +(that.post.context.player ? "player" : "editor"),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch ? "true" : "false"),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that.setPlayPos = function(ms, animationFlagSencitive) {
          if(that.doNotMakeAnimationFlag && animationFlagSencitive) {
            return false;
          }

          if(ms < 0 || !that.currents.serviceData) {
            return false;
          }

          if(ms > that.currents.serviceData.duration) {
            ms = that.currents.serviceData.duration;
          }

          if(that.ui.progress){
            that.ui.progress.find('.' + that.uiNS + '-progress-playing').css("width", ((ms / that.currents.serviceData.duration) * 100) + "%");
          }

          var timeInSeconds = Math.round(ms / 1000);
          if(ms > 0 || ms === -1){
            $that.trigger(events.timeUpdate, timeInSeconds);
          }

          if(that.currents.serviceData && that.currents.serviceData.duration) {
            var ts = '<span class="'+that.uiNS+'-progress-time-current">'+that.formatTime(ms) + '</span><span class="'+that.uiNS+'-progress-time-left">' + that.formatTime(that.currents.serviceData.duration) + '</span>';
            if(that.ui.time){
              that.ui.time.html(ts);
            }
          } else {
            if(that.ui.time){
              that.ui.time.html("");
            }
          }

          that.doNotMakeAnimationFlag = true;
          setTimeout(function(){
            if(that){
              that.doNotMakeAnimationFlag = false;
            }
          }, 1000);
          return true;
        };

        that.formatTime = function(ms) {
          var hms = {
            h: Math.floor(ms / (60 * 60 * 1000)),
            m: Math.floor((ms / 60000) % 60),
            s: Math.floor((ms / 1000) % 60)
          }, tc = [];
          if (hms.h > 0) {
            tc.push(hms.h);
          }
          tc.push((hms.m < 10 && hms.h > 0 ? '0' + hms.m : hms.m));
          tc.push((hms.s < 10 ? '0' + hms.s : hms.s));
          return tc.join(':');
        };

        that.updateUiContent = function() {
          var sed = that.currents.serviceData || {};

          if(that.ui.artwork && sed.artwork_url){
            var img = new window.Image();
            img.onload = function(){
              that.ui.artwork.css("backgroundImage", "url(" + sed.artwork_url + ")");
            };
            img.src = sed.artwork_url;
          }

          if(that.ui.play){
            that.ui.play
            .html('<span class="icon_spinner '+that.uiNS+'-seek-icon"></span><span class="icon_play '+that.uiNS+'-play-icon"></span><span class="icon_pause '+that.uiNS+'-pause-icon"></span>')
            .on('click',function() {
              if(that.currents.state !== 'launch' && that.currents.state !== 'pause'){
                that.utPause();
              } else {
                that.utPlay();
              }
            })
            .on('touchend',function(){})
            .on('touchstart',function(){});
          }

          if(that.ui.title){
            that.ui.title
            .html(sed.title || '')
            .off('click').on('click', function (e) {
              e.stopPropagation();
            });
          }

          if(that.ui.progress){
            that.ui.progress
            .html('<span class="'+that.uiNS+'-progress-playing"></span><span class="'+that.uiNS+'-progress-marker"><span class="'+that.uiNS+'-progress-marker-time"></span><span class="'+that.uiNS+'-progress-time">');
          }

          if(!that.isTouch && that.ui.progress){

            that.ui.progress
            .off('mouseenter')
            .on('mouseenter', function(){
              if(that.currents.state === 'play' || that.currents.state === 'pause'){
                that.ui.progress.find('.'+that.uiNS+'-progress-marker').addClass(that.uiNS+'-progress-marker-visible');
              }
            })
            .off('mouseleave')
            .on('mouseleave', function(){
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').removeClass(that.uiNS+'-progress-marker-visible');
            })
            .off('mousemove')
            .on('mousemove', function(e){
              var pos = e.pageX - that.ui.progress.offset().left;
              var time = that.currents.serviceData.duration/that.ui.progress.width() * pos;
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').css('left',pos + 'px');
              that.ui.progress.find('.'+that.uiNS+'-progress-marker-time').html(that.formatTime(time));
            });
          }

          var _seekPlay = function(e) {
            var oo = that.ui.progress.offset();
            var px = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.pageX ? e.originalEvent.pageX : (e.originalEvent.touches && e.originalEvent.touches[0] && e.originalEvent.touches[0].pageX ? e.originalEvent.touches[0].pageX : 0));
            var pos = (px - parseInt(oo.left, 10))/that.ui.progress.width();
            if(that.currents.state === 'play' || that.currents.state === 'pause'){
              $that.utAudioEngine("seek", pos);
            }
          };

          if(that.ui.progress){
            that.ui.progress.on("touchstart mousedown", function(e) {
              _seekPlay(e);
            });
          }

          if(that.ui.source){
            that.ui.source
            .html('<span class="icon_'+sed.service_name +' '+that.uiNS+'-source-icon"></span>')
            .prop('target','_blank')
            .prop('title','listen on '+sed.service_name);
          }

          if(that.post.context.player && that.ui.source){
            that.ui.source.prop('href',sed.source);
          }

          that.setPlayPos(0);
        };

        that.getServiceName = function(){
          if(that.options.data && that.options.data.service) {
            return that.options.data.service;
          } else {
            if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('soundcloud') !== -1) {
              return 'soundcloud';
            } else if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('itunes.apple') !== -1) {
              return 'itunes';
            } else {
              var error = 'Something went wrong with defining service name that you want to play';
              console.error(error, that.options.data);
              that.setState('error', error);
              return false;
            }
          }
        };

        that.formatServiceData = function(data) {
          if (that.getServiceName() === 'soundcloud') {
            that.currents.serviceData = {
              title:       data.title,
              source:      data.permalink_url,
              artwork_url: (data.artwork_url ? data.artwork_url : '').replace(/\-large\./ig, "-t500x500."),
              duration:    data.duration
            };
          } else if(that.getServiceName() === 'itunes') {
            that.currents.serviceData = {
              title:       data.artistName + ' - ' + data.trackName,
              source:      data.trackViewUrl,
              artwork_url: (data.artworkUrl100 ? data.artworkUrl100 : '').replace("100x100","600x600"),
              duration:    30000
            };
          }
          that.currents.serviceData.service_name = that.getServiceName();
        };

        that.requestServiceData = function(callback) {
          var errorTimeOut = setTimeout(function(){
            if(that && (!that.currents || !that.currents.serviceData)){
              that.setState('error', "We can't get data to play this track in 15 sec");
            }
          }, 15000);
          if(that.options.data.appData){
            clearTimeout(errorTimeOut);
            callback(that.options.data.appData);
          } else if (that.getServiceName() === 'soundcloud') {
            that.requestSoundcloudAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          } else if (that.getServiceName() === 'itunes') {
            that.requestItunesAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          }
        };

        that.setupServiceDataIntoPlayer = function(data){
          var type, url;
          if (that.getServiceName() === 'soundcloud') {
            var uri = data.stream_url;// ? data.stream_url : data.uri;
            url = uri + (/\?/.test(uri) ? '&' : '?') + 'consumer_key=' + that.sckey;
            type = "mp3";
          } else {
            url = data.previewUrl;
            type = "m4a";
          }

          that.formatServiceData(data);

          that.utAudioEngineOptions = {
            duration: that.currents.serviceData && that.currents.serviceData.duration ? that.currents.serviceData.duration : false,
            url: url,
            type: type,
            autoPause: that.options.styles.autoPause,
            onReady: function() {
              that.setPlayPos(0);
            },
            onPlay: function() {
              that.setState('play');
              $that.trigger(events.play);
            },
            onPause: function() {
              that.setState('pause');
              $that.trigger(events.pause);
            },
            onStop: function() {
              that.setState('launch');
              $that.trigger(events.stop);
              that.setPlayPos(0);
            },
            onFinish: function() {
              that.setState('launch');
              $that.trigger(events.finish);
              that.setPlayPos(0);
            },
            onSeekStart: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "empty") {
                that.setState('seek');
                $that.trigger(events.seek);
              }
            },
            onSeekEnd: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "empty") {
                that.setState("play");
              }
            },
            onTimeUpdate: function(pos) {
              that.setPlayPos(pos, true);
            },
            onError: function(message) {
              $that.trigger(events.error, message);
              that.setState('error');
            }
          };

          that.updateUiContent();

          if($that.utAudioEngine) {
            that.setState('launch');
            $that.utAudioEngine(that.utAudioEngineOptions);
            setTimeout(function() {
              $that.trigger(events.mediaReady, that.currents.serviceData);
              that.triggerChangeEvent();
            }, 10);
          } else {
            that.setState("error", "Sound Player !!! The library not found.");
          }
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            sourceEmbedData: null,
            state: 'loading'
          };

          $that.addClass("ut-audio");

          var storage_data = that.post.storage[that.storageNS+that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utAudio: Please specify an id of your audio container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($('[id="'+that.currents.id+'"]').length > 1){
            console.error('utAudio: Your audio container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          if($that.utAudioEngine) {
            that.utStop();
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute"){
            $that.css('position','relative');
            if(console && console.warn) {
              console.warn('Your container (id='+that.currents.id+') css position was set as "relative" as requirement of utAudio component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').append($('<div>').html(that.options.i18n.error)).appendTo(that.ui.container);
          that.ui.loading   = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-error-icon"></div>').appendTo(that.ui.container);
          if(that.options.ui.artwork)  { that.ui.artwork  = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.title)    { that.ui.title    = $('<div class="'+that.uiNS+'-title">'        ).appendTo(that.ui.container);}
          if(that.options.ui.play)     { that.ui.play     = $('<div class="'+that.uiNS+'-play">'         ).appendTo(that.ui.container);}
          if(that.options.ui.progress) { that.ui.progress = $('<div class="'+that.uiNS+'-progress">'     ).appendTo(that.ui.container);}
          if(that.options.ui.time)     { that.ui.time     = $('<div class="'+that.uiNS+'-time">'         ).appendTo(that.ui.container);}
          if(that.options.ui.source)   { that.ui.source   = $('<a class="'+that.uiNS+'-source">'         ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_sound ut-media-button ut-button"></a>')
                                .html(that.options.i18n.add)
                                .appendTo(that.ui.container)
                                .on('click', that.onAddClick);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>')
                                .html(that.options.i18n.change)
                                .appendTo(that.ui.container)
                                .on('click', that.onRemoveClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post) {
            that.post.on('pause',that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.setState("loading");
            that.requestServiceData(that.setupServiceDataIntoPlayer);
          } else {
            that.setState("empty");
          }
        };

        that.onAddClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            event.stopPropagation();
            event.preventDefault();
            that.utDialog({});
//            $that.trigger(events.mediaRemove);
//            that.utEmpty();
          }
        };

        that.utEmpty = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          that.options.data = null;
          that.update();
        };

        that.utPlay = function(v) {
          if($that.utAudioEngine) {
            $that.utAudioEngine("play", v);
          }
        };

        that.utPause = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("pause");
          }
        };

        that.utStop = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("stop");
          }
          that.setPlayPos(-1);
        };

        that.utVolume = function(v) {
          if($that.utAudioEngine) {
            $that.utAudioEngine("volume", v);
          }
        };

        that.utDestroy = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.empty();
          that = null;
        };

        that.utUpdate = function() {
          that.update();
        };

        that.utDialog = function(opt) {
          var options = {
            inputTypes: ['search'],
            label: that.options.i18n.dialogLabel
          };
          if(!$.isEmptyObject(opt)) {
            options = $.extend(true, options, opt);
          }

          $that.trigger(events.dialogOpen);
          that.post.dialog("sound", options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function(){
            $that.trigger(events.dialogCancel);
          });
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('sound');
            methods.nextPlayerToAddSound = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);
        that.update();

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utEmpty.call(this);
        }
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPlay.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utStop.call(this);
        }
      });
      return this;
    },

    volume: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utVolume.call(this,v);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utAudio && this.utAudio.utUpdate){
          this.utAudio.utUpdate.call(this);
        }
      });
      return this;
    },

    remove: function() {
      methods.destroy.apply(this, arguments);
    },

    destroy: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDialog.call(this, options);
        }
      });
      return this;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utAudio = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudio');
    }
    return this;
  };
})(window.$ || window.Zepto || window.jq);

/*
 * This source code is licensed under version 3 of the AGPL.
 * Copyright (c) 2013 by webdoc SA
 * Addendum to the license AGPL-3:
 *
 * Can be used only in the context of urturn service such as creation of Expression,
 * improving the tools to create Expressions.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        var defaults = {
          path: "http://ds4kgpk6gzsw2.cloudfront.net/expression/lib/urturn-expression-api/0.9.2/components/jquery.ut-audio/swf/",
          url: null,
          type: "mp3",
          duration: false,
          startBuffering: (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true),
          autoPlay: false,
          debug: false,
          autoPause: true,
          onReady:      function(){},
          onPlay:       function(){},
          onPause:      function(){},
          onStop:       function(){},
          onFinish:     function(){},
          onTimeUpdate: function(){},
          onSeekStart:  function(){},
          onSeekEnd:    function(){},
          onError:      function(){}
        };

        var $that = $(this);
        var that = {};
        this.utAudioEngine = that;
        that.options = $.extend(true, defaults, options);

        that.trackDuration = that.options.duration ? that.options.duration : 0 ;

        that.flagPlayerInitializing = false;
        that.flagPlayerInited = false;
        that.flagLoadedData = false;
        that.flagPlaying = false;

        that.globalUtAudioPauseEvent = "globalUtAudioPauseEvent";
        that.uid = Math.ceil((Math.random() * 1000000000)) + new Date().getTime();

        that.player = $("<div style='opacity: 0;'></div>").appendTo($that);
        /********************************************************************************
         * control functions
         ********************************************************************************/
        that.doOnCanPlay = function(){};
        that.doOnReady = function(){};

        that.initPlayer = function() {
          that.player.jPlayer({
            supplied: "mp3,m4a",
            swfPath: that.options.path,
            errorAlerts: false,
            warningAlerts: false,
            preload: true,//that.options.startBuffering,
            ready: function(e) {
              //console.log("jPlayer:ready");
              that.environment = {
                flash:e.jPlayer.flash.used,
                html:e.jPlayer.html.used
              };
              that.flagPlayerReady = true;
              that.loadTrack(that.options.url);
              if(that.environment.flash){
                that.player.jPlayer('play');
              } else {
                that.doOnCanPlay = function(){
                  that.player.jPlayer('play');
                };
              }
              that.options.onReady();
            },
            loadeddata: function() {
              that.flagLoadedData = true;
              //console.log("jPlayer:loadeddata");
            },
            progress:function(){
              //console.log(JSON.stringify(v.jPlayer));
            },
            canplay:function(){
              that.flagCanPlay = true;
              //console.log("jPlayer:canplay");
              if(that.flagPlaying) { //this
                setTimeout(function(){
                  that.doOnCanPlay(); // speciallly for ios
                }, 100);
              }
              that.options.onSeekEnd();
            },
            canplaythrough: function() {
              //console.log("jPlayer:canplaythrough");
            },
            seeking:function(){
              //console.log("jPlayer:seekStart");
              that.options.onSeekStart();

            },
            seeked:function(){
              //console.log("jPlayer:seekEnd");
              that.options.onSeekEnd();
            },
            play: function() {
              //console.log("jPlayer:play");
              that.flagPlaying = true;
              that.options.onPlay();
            },
            pause: function(e) {
              //console.log("jPlayer:pause");
              that.flagPlaying = false;
              if(e.jPlayer.status.currentTime === 0) {
                that.options.onStop();
              } else {
                that.options.onPause();
              }
            },
            ended: function() {
              //console.log("jPlayer:ended");
              that.flagPlaying = false;
              that.options.onFinish();
            },
            timeupdate: function(e){
              var time = e.jPlayer.status;
              if(that.trackDuration > 0) {
                var relative = that.trackDuration * 1000 > 0 ? (time.currentTime / that.trackDuration) : 0;
                that.options.onTimeUpdate(time.currentTime * 1000, relative, that.trackDuration * 1000);
              }
            },
            error: function(e) {
              //console.log("jPlayer:error",e);
              that.flagPlaying = false;
              that.options.onError('error',e);
            }
          });
          that.flagPlayerInited = true;
        };

        that.play = function(v) {
          if(!that.flagPlayerInited) {
            that.options.onSeekStart();
            that.initPlayer();
          }
          if(that.flagPlayerReady){
            if(that.environment.flash){
              that.player.jPlayer('play',v);
            } else {
              if(that.flagCanPlay){
                that.player.jPlayer('play',v);
              }
            }
          }
          that.flagPlaying = true;
          $('body').trigger(that.globalUtAudioPauseEvent, that.uid);
        };

        $('body').on(that.globalUtAudioPauseEvent, function(e, uid){
          if(that.uid === uid || !that.options.autoPause) {
            return;
          }
          that.pause();
        });

        that.pause = function() {
          that.flagPlaying = false;
          //that.options.onPause();
          if(that.flagSetMedia){
            that.player.jPlayer('pause');
          }
        };

        that.stop = function() {
          that.flagPlaying = false;
          if(that.flagPlayerInited){
            that.player.jPlayer('stop');
          }
        };

        that.volume = function(v) {
          that.player.jPlayer('volume',v);
        };

        that.seek = function(pos) {
          var time =that.trackDuration ? (pos * that.trackDuration/1000) : 0;
          setTimeout(function(){ that.player.jPlayer('play',time);}, 100);
        };

        that.loadTrack = function(url) {
          if(that.options.type === "m4a") {
            that.player.jPlayer("setMedia", {m4a:url});
          } else {
            that.player.jPlayer("setMedia", {mp3:url});
          }
          that.flagSetMedia = true;
        };

        that.killallhumans = function (){
          that.player.jPlayer("destroy");
        };

        /********************************************************************************
         * init player
         ********************************************************************************/
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.play) {
          this.utAudioEngine.play.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.pause) {
          this.utAudioEngine.pause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.stop) {
          this.utAudioEngine.stop.call(this);
        }
      });
      return this;
    },

    seek: function (pos) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.seek) {
          this.utAudioEngine.seek.call(this,  pos);
        }
      });
      return this;
    },

    volume: function (v) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.volume) {
          this.utAudioEngine.volume.call(this, v);
        }
      });
      return this;
    },

    // loadTrack: function(url) {
    //   this.each(function () {
    //     if(this.utAudioEngine && this.utAudioEngine.loadTrack) {
    //       this.utAudioEngine.loadTrack.call(this, url);
    //     }
    //   });
    //   return this;
    // },

    killallhumans: function(data) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.killallhumans) {
          this.utAudioEngine.killallhumans.call(this, data);
        }
      });
      return this;
    }
  };

  $.fn.utAudioEngine = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudioEngine');
    }
    return this;
  };

})(window.$ || window.Zepto || window.jq);

/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2013 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.4.0
 * Date: 5th June 2013
 */
 
(function(b,f){"function"===typeof define&&define.amd?define(["jquery"],f):b.jQuery?f(b.jQuery):f(b.Zepto)})(this,function(b,f){b.fn.jPlayer=function(a){var c="string"===typeof a,d=Array.prototype.slice.call(arguments,1),e=this;a=!c&&d.length?b.extend.apply(null,[!0,a].concat(d)):a;if(c&&"_"===a.charAt(0))return e;c?this.each(function(){var c=b(this).data("jPlayer"),h=c&&b.isFunction(c[a])?c[a].apply(c,d):c;if(h!==c&&h!==f)return e=h,!1}):this.each(function(){var c=b(this).data("jPlayer");c?c.option(a||
{}):b(this).data("jPlayer",new b.jPlayer(a,this))});return e};b.jPlayer=function(a,c){if(arguments.length){this.element=b(c);this.options=b.extend(!0,{},this.options,a);var d=this;this.element.bind("remove.jPlayer",function(){d.destroy()});this._init()}};"function"!==typeof b.fn.stop&&(b.fn.stop=function(){});b.jPlayer.emulateMethods="load play pause";b.jPlayer.emulateStatus="src readyState networkState currentTime duration paused ended playbackRate";b.jPlayer.emulateOptions="muted volume";b.jPlayer.reservedEvent=
"ready flashreset resize repeat error warning";b.jPlayer.event={};b.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "),function(){b.jPlayer.event[this]="jPlayer_"+this});b.jPlayer.htmlEvent="loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough ratechange".split(" ");
b.jPlayer.pause=function(){b.each(b.jPlayer.prototype.instances,function(a,c){c.data("jPlayer").status.srcSet&&c.jPlayer("pause")})};b.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""};var l=function(){this.init()};l.prototype={init:function(){this.options={timeFormat:b.jPlayer.timeFormat}},time:function(a){var c=new Date(1E3*(a&&"number"===typeof a?a:0)),b=c.getUTCHours();a=this.options.timeFormat.showHour?c.getUTCMinutes():c.getUTCMinutes()+
60*b;c=this.options.timeFormat.showMin?c.getUTCSeconds():c.getUTCSeconds()+60*a;b=this.options.timeFormat.padHour&&10>b?"0"+b:b;a=this.options.timeFormat.padMin&&10>a?"0"+a:a;c=this.options.timeFormat.padSec&&10>c?"0"+c:c;b=""+(this.options.timeFormat.showHour?b+this.options.timeFormat.sepHour:"");b+=this.options.timeFormat.showMin?a+this.options.timeFormat.sepMin:"";return b+=this.options.timeFormat.showSec?c+this.options.timeFormat.sepSec:""}};var m=new l;b.jPlayer.convertTime=function(a){return m.time(a)};
b.jPlayer.uaBrowser=function(a){a=a.toLowerCase();var b=/(opera)(?:.*version)?[ \/]([\w.]+)/,d=/(msie) ([\w.]+)/,e=/(mozilla)(?:.*? rv:([\w.]+))?/;a=/(webkit)[ \/]([\w.]+)/.exec(a)||b.exec(a)||d.exec(a)||0>a.indexOf("compatible")&&e.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};b.jPlayer.uaPlatform=function(a){var b=a.toLowerCase(),d=/(android)/,e=/(mobile)/;a=/(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b)||[];b=/(ipad|playbook)/.exec(b)||!e.exec(b)&&d.exec(b)||
[];a[1]&&(a[1]=a[1].replace(/\s/g,"_"));return{platform:a[1]||"",tablet:b[1]||""}};b.jPlayer.browser={};b.jPlayer.platform={};var j=b.jPlayer.uaBrowser(navigator.userAgent);j.browser&&(b.jPlayer.browser[j.browser]=!0,b.jPlayer.browser.version=j.version);j=b.jPlayer.uaPlatform(navigator.userAgent);j.platform&&(b.jPlayer.platform[j.platform]=!0,b.jPlayer.platform.mobile=!j.tablet,b.jPlayer.platform.tablet=!!j.tablet);b.jPlayer.getDocMode=function(){var a;b.jPlayer.browser.msie&&(document.documentMode?
a=document.documentMode:(a=5,document.compatMode&&"CSS1Compat"===document.compatMode&&(a=7)));return a};b.jPlayer.browser.documentMode=b.jPlayer.getDocMode();b.jPlayer.nativeFeatures={init:function(){var a=document,b=a.createElement("video"),d={w3c:"fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "),moz:"mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "),
webkit:" webkitCurrentFullScreenElement webkitRequestFullScreen webkitCancelFullScreen webkitfullscreenchange ".split(" "),webkitVideo:"webkitSupportsFullscreen webkitDisplayingFullscreen webkitEnterFullscreen webkitExitFullscreen  ".split(" ")},e=["w3c","moz","webkit","webkitVideo"],g,h;this.fullscreen=b={support:{w3c:!!a[d.w3c[0]],moz:!!a[d.moz[0]],webkit:"function"===typeof a[d.webkit[3]],webkitVideo:"function"===typeof b[d.webkitVideo[2]]},used:{}};g=0;for(h=e.length;g<h;g++){var f=e[g];if(b.support[f]){b.spec=
f;b.used[f]=!0;break}}if(b.spec){var k=d[b.spec];b.api={fullscreenEnabled:!0,fullscreenElement:function(b){b=b?b:a;return b[k[1]]},requestFullscreen:function(a){return a[k[2]]()},exitFullscreen:function(b){b=b?b:a;return b[k[3]]()}};b.event={fullscreenchange:k[4],fullscreenerror:k[5]}}else b.api={fullscreenEnabled:!1,fullscreenElement:function(){return null},requestFullscreen:function(){},exitFullscreen:function(){}},b.event={}}};b.jPlayer.nativeFeatures.init();b.jPlayer.focus=null;b.jPlayer.keyIgnoreElementNames=
"INPUT TEXTAREA";var n=function(a){var c=b.jPlayer.focus,d;c&&(b.each(b.jPlayer.keyIgnoreElementNames.split(/\s+/g),function(b,c){if(a.target.nodeName.toUpperCase()===c.toUpperCase())return d=!0,!1}),d||b.each(c.options.keyBindings,function(d,g){if(g&&a.which===g.key&&b.isFunction(g.fn))return a.preventDefault(),g.fn(c),!1}))};b.jPlayer.keys=function(a){b(document.documentElement).unbind("keydown.jPlayer");a&&b(document.documentElement).bind("keydown.jPlayer",n)};b.jPlayer.keys(!0);b.jPlayer.prototype=
{count:0,version:{script:"2.4.0",needFlash:"2.4.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:0.8,muted:!1,wmode:"opaque",backgroundColor:"#000000",cssSelectorAncestor:"#jp_container_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",volumeMax:".jp-volume-max",
currentTime:".jp-current-time",duration:".jp-duration",fullScreen:".jp-full-screen",restoreScreen:".jp-restore-screen",repeat:".jp-repeat",repeatOff:".jp-repeat-off",gui:".jp-gui",noSolution:".jp-no-solution"},smoothPlayBar:!1,fullScreen:!1,fullWindow:!1,autohide:{restored:!1,full:!0,fadeIn:200,fadeOut:600,hold:1E3},loop:!1,repeat:function(a){a.jPlayer.options.loop?b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended+".jPlayer.jPlayerRepeat",function(){b(this).jPlayer("play")}):b(this).unbind(".jPlayerRepeat")},
nativeVideoControls:{},noFullWindow:{msie:/msie [0-6]\./,ipad:/ipad.*?os [0-4]\./,iphone:/iphone/,ipod:/ipod/,android_pad:/android [0-3]\.(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/},noVolume:{ipad:/ipad/,iphone:/iphone/,ipod:/ipod/,android_pad:/android(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/,playbook:/playbook/},timeFormat:{},
keyEnabled:!1,audioFullScreen:!1,keyBindings:{play:{key:32,fn:function(a){a.status.paused?a.play():a.pause()}},fullScreen:{key:13,fn:function(a){(a.status.video||a.options.audioFullScreen)&&a._setOption("fullScreen",!a.options.fullScreen)}},muted:{key:8,fn:function(a){a._muted(!a.options.muted)}},volumeUp:{key:38,fn:function(a){a.volume(a.options.volume+0.1)}},volumeDown:{key:40,fn:function(a){a.volume(a.options.volume-0.1)}}},verticalVolume:!1,idPrefix:"jp",noConflict:"jQuery",emulateHtml:!1,errorAlerts:!1,
warningAlerts:!1},optionsAudio:{size:{width:"0px",height:"0px",cssClass:""},sizeFull:{width:"0px",height:"0px",cssClass:""}},optionsVideo:{size:{width:"480px",height:"270px",cssClass:"jp-video-270p"},sizeFull:{width:"100%",height:"100%",cssClass:"jp-video-full"}},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0,videoWidth:0,videoHeight:0,readyState:0,
networkState:0,playbackRate:1,ended:0},internal:{ready:!1},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},fla:{codec:"audio/x-flv",flashCanPlay:!0,media:"audio"},
rtmpa:{codec:'audio/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"},flv:{codec:"video/x-flv",flashCanPlay:!0,media:"video"},rtmpv:{codec:'video/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"video"}},_init:function(){var a=this;this.element.empty();this.status=
b.extend({},this.status);this.internal=b.extend({},this.internal);this.options.timeFormat=b.extend({},b.jPlayer.timeFormat,this.options.timeFormat);this.internal.cmdsIgnored=b.jPlayer.platform.ipad||b.jPlayer.platform.iphone||b.jPlayer.platform.ipod;this.internal.domNode=this.element.get(0);this.options.keyEnabled&&!b.jPlayer.focus&&(b.jPlayer.focus=this);this.formats=[];this.solutions=[];this.require={};this.htmlElement={};this.html={};this.html.audio={};this.html.video={};this.flash={};this.css=
{};this.css.cs={};this.css.jq={};this.ancestorJq=[];this.options.volume=this._limitValue(this.options.volume,0,1);b.each(this.options.supplied.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.format[e]){var f=!1;b.each(a.formats,function(a,b){if(e===b)return f=!0,!1});f||a.formats.push(e)}});b.each(this.options.solution.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.solution[e]){var f=!1;b.each(a.solutions,function(a,b){if(e===b)return f=!0,
!1});f||a.solutions.push(e)}});this.internal.instance="jp_"+this.count;this.instances[this.internal.instance]=this.element;this.element.attr("id")||this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count);this.internal.self=b.extend({},{id:this.element.attr("id"),jq:this.element});this.internal.audio=b.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:f});this.internal.video=b.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:f});this.internal.flash=b.extend({},{id:this.options.idPrefix+
"_flash_"+this.count,jq:f,swf:this.options.swfPath+(".swf"!==this.options.swfPath.toLowerCase().slice(-4)?(this.options.swfPath&&"/"!==this.options.swfPath.slice(-1)?"/":"")+"Jplayer.swf":"")});this.internal.poster=b.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:f});b.each(b.jPlayer.event,function(b,c){a.options[b]!==f&&(a.element.bind(c+".jPlayer",a.options[b]),a.options[b]=f)});this.require.audio=!1;this.require.video=!1;b.each(this.formats,function(b,c){a.require[a.format[c].media]=
!0});this.options=this.require.video?b.extend(!0,{},this.optionsVideo,this.options):b.extend(!0,{},this.optionsAudio,this.options);this._setSize();this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this.status.noVolume=this._uaBlocklist(this.options.noVolume);b.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled&&this._fullscreenAddEventListeners();this._restrictNativeVideoControls();this.htmlElement.poster=
document.createElement("img");this.htmlElement.poster.id=this.internal.poster.id;this.htmlElement.poster.onload=function(){(!a.status.video||a.status.waitForPlay)&&a.internal.poster.jq.show()};this.element.append(this.htmlElement.poster);this.internal.poster.jq=b("#"+this.internal.poster.id);this.internal.poster.jq.css({width:this.status.width,height:this.status.height});this.internal.poster.jq.hide();this.internal.poster.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)});this.html.audio.available=
!1;this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType&&this._testCanPlayType(this.htmlElement.audio));this.html.video.available=!1;this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType&&this._testCanPlayType(this.htmlElement.video));
this.flash.available=this._checkForFlash(10.1);this.html.canPlay={};this.flash.canPlay={};b.each(this.formats,function(b,c){a.html.canPlay[c]=a.html[a.format[c].media].available&&""!==a.htmlElement[a.format[c].media].canPlayType(a.format[c].codec);a.flash.canPlay[c]=a.format[c].flashCanPlay&&a.flash.available});this.html.desired=!1;this.flash.desired=!1;b.each(this.solutions,function(c,d){if(0===c)a[d].desired=!0;else{var e=!1,f=!1;b.each(a.formats,function(b,c){a[a.solutions[0]].canPlay[c]&&("video"===
a.format[c].media?f=!0:e=!0)});a[d].desired=a.require.audio&&!e||a.require.video&&!f}});this.html.support={};this.flash.support={};b.each(this.formats,function(b,c){a.html.support[c]=a.html.canPlay[c]&&a.html.desired;a.flash.support[c]=a.flash.canPlay[c]&&a.flash.desired});this.html.used=!1;this.flash.used=!1;b.each(this.solutions,function(c,d){b.each(a.formats,function(b,c){if(a[d].support[c])return a[d].used=!0,!1})});this._resetActive();this._resetGate();this._cssSelectorAncestor(this.options.cssSelectorAncestor);
!this.html.used&&!this.flash.used?(this._error({type:b.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SOLUTION,hint:b.jPlayer.errorHint.NO_SOLUTION}),this.css.jq.noSolution.length&&this.css.jq.noSolution.show()):this.css.jq.noSolution.length&&this.css.jq.noSolution.hide();if(this.flash.used){var c,d="jQuery="+encodeURI(this.options.noConflict)+"&id="+encodeURI(this.internal.self.id)+"&vol="+this.options.volume+
"&muted="+this.options.muted;if(b.jPlayer.browser.msie&&(9>Number(b.jPlayer.browser.version)||9>b.jPlayer.browser.documentMode)){d=['<param name="movie" value="'+this.internal.flash.swf+'" />','<param name="FlashVars" value="'+d+'" />','<param name="allowScriptAccess" value="always" />','<param name="bgcolor" value="'+this.options.backgroundColor+'" />','<param name="wmode" value="'+this.options.wmode+'" />'];c=document.createElement('<object id="'+this.internal.flash.id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
for(var e=0;e<d.length;e++)c.appendChild(document.createElement(d[e]))}else e=function(a,b,c){var d=document.createElement("param");d.setAttribute("name",b);d.setAttribute("value",c);a.appendChild(d)},c=document.createElement("object"),c.setAttribute("id",this.internal.flash.id),c.setAttribute("name",this.internal.flash.id),c.setAttribute("data",this.internal.flash.swf),c.setAttribute("type","application/x-shockwave-flash"),c.setAttribute("width","1"),c.setAttribute("height","1"),c.setAttribute("tabindex",
"-1"),e(c,"flashvars",d),e(c,"allowscriptaccess","always"),e(c,"bgcolor",this.options.backgroundColor),e(c,"wmode",this.options.wmode);this.element.append(c);this.internal.flash.jq=b(c)}this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=b("#"+this.internal.audio.id)),this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),
this.internal.video.jq=b("#"+this.internal.video.id),this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):this.internal.video.jq.css({width:"0px",height:"0px"}),this.internal.video.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)})));this.options.emulateHtml&&this._emulateHtmlBridge();this.html.used&&!this.flash.used&&setTimeout(function(){a.internal.ready=!0;a.version.flash="n/a";a._trigger(b.jPlayer.event.repeat);a._trigger(b.jPlayer.event.ready)},
100);this._updateNativeVideoControls();this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();b.jPlayer.prototype.count++},destroy:function(){this.clearMedia();this._removeUiClass();this.css.jq.currentTime.length&&this.css.jq.currentTime.text("");this.css.jq.duration.length&&this.css.jq.duration.text("");b.each(this.css.jq,function(a,b){b.length&&b.unbind(".jPlayer")});this.internal.poster.jq.unbind(".jPlayer");this.internal.video.jq&&this.internal.video.jq.unbind(".jPlayer");this._fullscreenRemoveEventListeners();
this===b.jPlayer.focus&&(b.jPlayer.focus=null);this.options.emulateHtml&&this._destroyHtmlBridge();this.element.removeData("jPlayer");this.element.unbind(".jPlayer");this.element.empty();delete this.instances[this.internal.instance]},enable:function(){},disable:function(){},_testCanPlayType:function(a){try{return a.canPlayType(this.format.mp3.codec),!0}catch(b){return!1}},_uaBlocklist:function(a){var c=navigator.userAgent.toLowerCase(),d=!1;b.each(a,function(a,b){if(b&&b.test(c))return d=!0,!1});
return d},_restrictNativeVideoControls:function(){this.require.audio&&this.status.nativeVideoControls&&(this.status.nativeVideoControls=!1,this.status.noFullWindow=!0)},_updateNativeVideoControls:function(){this.html.video.available&&this.html.used&&(this.htmlElement.video.controls=this.status.nativeVideoControls,this._updateAutohide(),this.status.nativeVideoControls&&this.require.video?(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})):
this.status.waitForPlay&&this.status.video&&(this.internal.poster.jq.show(),this.internal.video.jq.css({width:"0px",height:"0px"})))},_addHtmlEventListeners:function(a,c){var d=this;a.preload=this.options.preload;a.muted=this.options.muted;a.volume=this.options.volume;a.addEventListener("progress",function(){c.gate&&(d.internal.cmdsIgnored&&0<this.readyState&&(d.internal.cmdsIgnored=!1),d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.progress))},!1);a.addEventListener("timeupdate",
function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.timeupdate))},!1);a.addEventListener("durationchange",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.durationchange))},!1);a.addEventListener("play",function(){c.gate&&(d._updateButtons(!0),d._html_checkWaitForPlay(),d._trigger(b.jPlayer.event.play))},!1);a.addEventListener("playing",function(){c.gate&&(d._updateButtons(!0),d._seeked(),d._trigger(b.jPlayer.event.playing))},
!1);a.addEventListener("pause",function(){c.gate&&(d._updateButtons(!1),d._trigger(b.jPlayer.event.pause))},!1);a.addEventListener("waiting",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.waiting))},!1);a.addEventListener("seeking",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.seeking))},!1);a.addEventListener("seeked",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.seeked))},!1);a.addEventListener("volumechange",function(){c.gate&&(d.options.volume=a.volume,
d.options.muted=a.muted,d._updateMute(),d._updateVolume(),d._trigger(b.jPlayer.event.volumechange))},!1);a.addEventListener("suspend",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.suspend))},!1);a.addEventListener("ended",function(){c.gate&&(b.jPlayer.browser.webkit||(d.htmlElement.media.currentTime=0),d.htmlElement.media.pause(),d._updateButtons(!1),d._getHtmlStatus(a,!0),d._updateInterface(),d._trigger(b.jPlayer.event.ended))},!1);a.addEventListener("error",function(){c.gate&&(d._updateButtons(!1),
d._seeked(),d.status.srcSet&&(clearTimeout(d.internal.htmlDlyCmdId),d.status.waitForLoad=!0,d.status.waitForPlay=!0,d.status.video&&!d.status.nativeVideoControls&&d.internal.video.jq.css({width:"0px",height:"0px"}),d._validString(d.status.media.poster)&&!d.status.nativeVideoControls&&d.internal.poster.jq.show(),d.css.jq.videoPlay.length&&d.css.jq.videoPlay.show(),d._error({type:b.jPlayer.error.URL,context:d.status.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL})))},!1);b.each(b.jPlayer.htmlEvent,
function(e,g){a.addEventListener(this,function(){c.gate&&d._trigger(b.jPlayer.event[g])},!1)})},_getHtmlStatus:function(a,b){var d=0,e=0,g=0,f=0;isFinite(a.duration)&&(this.status.duration=a.duration);d=a.currentTime;e=0<this.status.duration?100*d/this.status.duration:0;"object"===typeof a.seekable&&0<a.seekable.length?(g=0<this.status.duration?100*a.seekable.end(a.seekable.length-1)/this.status.duration:100,f=0<this.status.duration?100*a.currentTime/a.seekable.end(a.seekable.length-1):0):(g=100,
f=e);b&&(e=f=d=0);this.status.seekPercent=g;this.status.currentPercentRelative=f;this.status.currentPercentAbsolute=e;this.status.currentTime=d;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=a.readyState;this.status.networkState=a.networkState;this.status.playbackRate=a.playbackRate;this.status.ended=a.ended},_resetStatus:function(){this.status=b.extend({},this.status,b.jPlayer.prototype.status)},_trigger:function(a,c,d){a=b.Event(a);a.jPlayer={};
a.jPlayer.version=b.extend({},this.version);a.jPlayer.options=b.extend(!0,{},this.options);a.jPlayer.status=b.extend(!0,{},this.status);a.jPlayer.html=b.extend(!0,{},this.html);a.jPlayer.flash=b.extend(!0,{},this.flash);c&&(a.jPlayer.error=b.extend({},c));d&&(a.jPlayer.warning=b.extend({},d));this.element.trigger(a)},jPlayerFlashEvent:function(a,c){if(a===b.jPlayer.event.ready)if(this.internal.ready){if(this.flash.gate){if(this.status.srcSet){var d=this.status.currentTime,e=this.status.paused;this.setMedia(this.status.media);
0<d&&(e?this.pause(d):this.play(d))}this._trigger(b.jPlayer.event.flashreset)}}else this.internal.ready=!0,this.internal.flash.jq.css({width:"0px",height:"0px"}),this.version.flash=c.version,this.version.needFlash!==this.version.flash&&this._error({type:b.jPlayer.error.VERSION,context:this.version.flash,message:b.jPlayer.errorMsg.VERSION+this.version.flash,hint:b.jPlayer.errorHint.VERSION}),this._trigger(b.jPlayer.event.repeat),this._trigger(a);if(this.flash.gate)switch(a){case b.jPlayer.event.progress:this._getFlashStatus(c);
this._updateInterface();this._trigger(a);break;case b.jPlayer.event.timeupdate:this._getFlashStatus(c);this._updateInterface();this._trigger(a);break;case b.jPlayer.event.play:this._seeked();this._updateButtons(!0);this._trigger(a);break;case b.jPlayer.event.pause:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.ended:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.click:this._trigger(a);break;case b.jPlayer.event.error:this.status.waitForLoad=!0;this.status.waitForPlay=
!0;this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._validString(this.status.media.poster)&&this.internal.poster.jq.show();this.css.jq.videoPlay.length&&this.status.video&&this.css.jq.videoPlay.show();this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media);this._updateButtons(!1);this._error({type:b.jPlayer.error.URL,context:c.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL});break;case b.jPlayer.event.seeking:this._seeking();
this._trigger(a);break;case b.jPlayer.event.seeked:this._seeked();this._trigger(a);break;case b.jPlayer.event.ready:break;default:this._trigger(a)}return!1},_getFlashStatus:function(a){this.status.seekPercent=a.seekPercent;this.status.currentPercentRelative=a.currentPercentRelative;this.status.currentPercentAbsolute=a.currentPercentAbsolute;this.status.currentTime=a.currentTime;this.status.duration=a.duration;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=
4;this.status.networkState=0;this.status.playbackRate=1;this.status.ended=!1},_updateButtons:function(a){a===f?a=!this.status.paused:this.status.paused=!a;this.css.jq.play.length&&this.css.jq.pause.length&&(a?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()));this.css.jq.restoreScreen.length&&this.css.jq.fullScreen.length&&(this.status.noFullWindow?(this.css.jq.fullScreen.hide(),this.css.jq.restoreScreen.hide()):this.options.fullWindow?(this.css.jq.fullScreen.hide(),
this.css.jq.restoreScreen.show()):(this.css.jq.fullScreen.show(),this.css.jq.restoreScreen.hide()));this.css.jq.repeat.length&&this.css.jq.repeatOff.length&&(this.options.loop?(this.css.jq.repeat.hide(),this.css.jq.repeatOff.show()):(this.css.jq.repeat.show(),this.css.jq.repeatOff.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%");this.css.jq.playBar.length&&(this.options.smoothPlayBar?this.css.jq.playBar.stop().animate({width:this.status.currentPercentAbsolute+
"%"},250,"linear"):this.css.jq.playBar.width(this.status.currentPercentRelative+"%"));this.css.jq.currentTime.length&&this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));this.css.jq.duration.length&&this.css.jq.duration.text(this._convertTime(this.status.duration))},_convertTime:l.prototype.time,_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},
_resetGate:function(){this.html.audio.gate=!1;this.html.video.gate=!1;this.flash.gate=!1},_resetActive:function(){this.html.active=!1;this.flash.active=!1},setMedia:function(a){var c=this,d=!1,e=this.status.media.poster!==a.poster;this._resetMedia();this._resetGate();this._resetActive();b.each(this.formats,function(e,f){var j="video"===c.format[f].media;b.each(c.solutions,function(b,e){if(c[e].support[f]&&c._validString(a[f])){var g="html"===e;j?(g?(c.html.video.gate=!0,c._html_setVideo(a),c.html.active=
!0):(c.flash.gate=!0,c._flash_setVideo(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.show(),c.status.video=!0):(g?(c.html.audio.gate=!0,c._html_setAudio(a),c.html.active=!0):(c.flash.gate=!0,c._flash_setAudio(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.hide(),c.status.video=!1);d=!0;return!1}});if(d)return!1});if(d){if((!this.status.nativeVideoControls||!this.html.video.gate)&&this._validString(a.poster))e?this.htmlElement.poster.src=a.poster:this.internal.poster.jq.show();
this.status.srcSet=!0;this.status.media=b.extend({},a);this._updateButtons(!1);this._updateInterface()}else this._error({type:b.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SUPPORT,hint:b.jPlayer.errorHint.NO_SUPPORT})},_resetMedia:function(){this._resetStatus();this._updateButtons(!1);this._updateInterface();this._seeked();this.internal.poster.jq.hide();clearTimeout(this.internal.htmlDlyCmdId);this.html.active?this._html_resetMedia():this.flash.active&&
this._flash_resetMedia()},clearMedia:function(){this._resetMedia();this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia();this._resetGate();this._resetActive()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},focus:function(){this.options.keyEnabled&&(b.jPlayer.focus=this)},play:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?(this.focus(),this.html.active?this._html_play(a):
this.flash.active&&this._flash_play(a)):this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?this.html.active?this._html_pause(a):this.flash.active&&this._flash_pause(a):this._urlNotSetError("pause")},pauseOthers:function(){var a=this;b.each(this.instances,function(b,d){a.element!==d&&d.data("jPlayer").status.srcSet&&d.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&
this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(a){a=this._limitValue(a,0,100);this.status.srcSet?this.html.active?this._html_playHead(a):this.flash.active&&this._flash_playHead(a):this._urlNotSetError("playHead")},_muted:function(a){this.options.muted=a;this.html.used&&this._html_mute(a);this.flash.used&&this._flash_mute(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateMute(a),this._updateVolume(this.options.volume),this._trigger(b.jPlayer.event.volumechange))},
mute:function(a){a=a===f?!0:!!a;this._muted(a)},unmute:function(a){a=a===f?!0:!!a;this._muted(!a)},_updateMute:function(a){a===f&&(a=this.options.muted);this.css.jq.mute.length&&this.css.jq.unmute.length&&(this.status.noVolume?(this.css.jq.mute.hide(),this.css.jq.unmute.hide()):a?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(a){a=this._limitValue(a,0,1);this.options.volume=a;this.html.used&&this._html_volume(a);this.flash.used&&
this._flash_volume(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateVolume(a),this._trigger(b.jPlayer.event.volumechange))},volumeBar:function(a){if(this.css.jq.volumeBar.length){var c=b(a.currentTarget),d=c.offset(),e=a.pageX-d.left,g=c.width();a=c.height()-a.pageY+d.top;c=c.height();this.options.verticalVolume?this.volume(a/c):this.volume(e/g)}this.options.muted&&this._muted(!1)},volumeBarValue:function(){},_updateVolume:function(a){a===f&&(a=this.options.volume);a=this.options.muted?
0:a;this.status.noVolume?(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.hide(),this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.hide(),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.hide()):(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.show(),this.css.jq.volumeBarValue.length&&(this.css.jq.volumeBarValue.show(),this.css.jq.volumeBarValue[this.options.verticalVolume?"height":"width"](100*a+"%")),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.show())},volumeMax:function(){this.volume(1);
this.options.muted&&this._muted(!1)},_cssSelectorAncestor:function(a){var c=this;this.options.cssSelectorAncestor=a;this._removeUiClass();this.ancestorJq=a?b(a):[];a&&1!==this.ancestorJq.length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.ancestorJq.length+" found for cssSelectorAncestor.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT});this._addUiClass();b.each(this.options.cssSelector,function(a,b){c._cssSelector(a,b)});
this._updateInterface();this._updateButtons();this._updateAutohide();this._updateVolume();this._updateMute()},_cssSelector:function(a,c){var d=this;"string"===typeof c?b.jPlayer.prototype.options.cssSelector[a]?(this.css.jq[a]&&this.css.jq[a].length&&this.css.jq[a].unbind(".jPlayer"),this.options.cssSelector[a]=c,this.css.cs[a]=this.options.cssSelectorAncestor+" "+c,this.css.jq[a]=c?b(this.css.cs[a]):[],this.css.jq[a].length&&this.css.jq[a].bind("click.jPlayer",function(c){c.preventDefault();d[a](c);
b(this).blur()}),c&&1!==this.css.jq[a].length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[a],message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[a].length+" found for "+a+" method.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_METHOD,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:b.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_STRING,context:c,
message:b.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:b.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(a){if(this.css.jq.seekBar.length){var c=b(a.currentTarget),d=c.offset();a=a.pageX-d.left;c=c.width();this.playHead(100*a/c)}},playBar:function(){},repeat:function(){this._loop(!0)},repeatOff:function(){this._loop(!1)},_loop:function(a){this.options.loop!==a&&(this.options.loop=a,this._updateButtons(),this._trigger(b.jPlayer.event.repeat))},currentTime:function(){},duration:function(){},
gui:function(){},noSolution:function(){},option:function(a,c){var d=a;if(0===arguments.length)return b.extend(!0,{},this.options);if("string"===typeof a){var e=a.split(".");if(c===f){for(var d=b.extend(!0,{},this.options),g=0;g<e.length;g++)if(d[e[g]]!==f)d=d[e[g]];else return this._warning({type:b.jPlayer.warning.OPTION_KEY,context:a,message:b.jPlayer.warningMsg.OPTION_KEY,hint:b.jPlayer.warningHint.OPTION_KEY}),f;return d}for(var g=d={},h=0;h<e.length;h++)h<e.length-1?(g[e[h]]={},g=g[e[h]]):g[e[h]]=
c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,c){var d=this;switch(a){case "volume":this.volume(c);break;case "muted":this._muted(c);break;case "cssSelectorAncestor":this._cssSelectorAncestor(c);break;case "cssSelector":b.each(c,function(a,b){d._cssSelector(a,b)});break;case "fullScreen":if(this.options[a]!==c){var e=b.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;if(!e||e&&!this.status.waitForPlay)e||
(this.options[a]=c),c?this._requestFullscreen():this._exitFullscreen(),e||this._setOption("fullWindow",c)}break;case "fullWindow":this.options[a]!==c&&(this._removeUiClass(),this.options[a]=c,this._refreshSize());break;case "size":!this.options.fullWindow&&this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "sizeFull":this.options.fullWindow&&this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=
b.extend({},this.options[a],c);this._refreshSize();break;case "autohide":this.options[a]=b.extend({},this.options[a],c);this._updateAutohide();break;case "loop":this._loop(c);break;case "nativeVideoControls":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this._restrictNativeVideoControls();this._updateNativeVideoControls();break;case "noFullWindow":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=
this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this._restrictNativeVideoControls();this._updateButtons();break;case "noVolume":this.options[a]=b.extend({},this.options[a],c);this.status.noVolume=this._uaBlocklist(this.options.noVolume);this._updateVolume();this._updateMute();break;case "emulateHtml":this.options[a]!==c&&((this.options[a]=c)?this._emulateHtmlBridge():this._destroyHtmlBridge());break;case "timeFormat":this.options[a]=
b.extend({},this.options[a],c);break;case "keyEnabled":this.options[a]=c;!c&&this===b.jPlayer.focus&&(b.jPlayer.focus=null);break;case "keyBindings":this.options[a]=b.extend(!0,{},this.options[a],c);break;case "audioFullScreen":this.options[a]=c}return this},_refreshSize:function(){this._setSize();this._addUiClass();this._updateSize();this._updateButtons();this._updateAutohide();this._trigger(b.jPlayer.event.resize)},_setSize:function(){this.options.fullWindow?(this.status.width=this.options.sizeFull.width,
this.status.height=this.options.sizeFull.height,this.status.cssClass=this.options.sizeFull.cssClass):(this.status.width=this.options.size.width,this.status.height=this.options.size.height,this.status.cssClass=this.options.size.cssClass);this.element.css({width:this.status.width,height:this.status.height})},_addUiClass:function(){this.ancestorJq.length&&this.ancestorJq.addClass(this.status.cssClass)},_removeUiClass:function(){this.ancestorJq.length&&this.ancestorJq.removeClass(this.status.cssClass)},
_updateSize:function(){this.internal.poster.jq.css({width:this.status.width,height:this.status.height});!this.status.waitForPlay&&this.html.active&&this.status.video||this.html.video.available&&this.html.used&&this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):!this.status.waitForPlay&&(this.flash.active&&this.status.video)&&this.internal.flash.jq.css({width:this.status.width,height:this.status.height})},_updateAutohide:function(){var a=
this,b=function(){a.css.jq.gui.fadeIn(a.options.autohide.fadeIn,function(){clearTimeout(a.internal.autohideId);a.internal.autohideId=setTimeout(function(){a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)},a.options.autohide.hold)})};this.css.jq.gui.length&&(this.css.jq.gui.stop(!0,!0),clearTimeout(this.internal.autohideId),this.element.unbind(".jPlayerAutohide"),this.css.jq.gui.unbind(".jPlayerAutohide"),this.status.nativeVideoControls?this.css.jq.gui.hide():this.options.fullWindow&&this.options.autohide.full||
!this.options.fullWindow&&this.options.autohide.restored?(this.element.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.hide()):this.css.jq.gui.show())},fullScreen:function(){this._setOption("fullScreen",!0)},restoreScreen:function(){this._setOption("fullScreen",!1)},_fullscreenAddEventListeners:function(){var a=this,c=b.jPlayer.nativeFeatures.fullscreen;c.api.fullscreenEnabled&&c.event.fullscreenchange&&("function"!==typeof this.internal.fullscreenchangeHandler&&
(this.internal.fullscreenchangeHandler=function(){a._fullscreenchange()}),document.addEventListener(c.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1))},_fullscreenRemoveEventListeners:function(){var a=b.jPlayer.nativeFeatures.fullscreen;this.internal.fullscreenchangeHandler&&document.addEventListener(a.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1)},_fullscreenchange:function(){this.options.fullScreen&&!b.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()&&
this._setOption("fullScreen",!1)},_requestFullscreen:function(){var a=this.ancestorJq.length?this.ancestorJq[0]:this.element[0],c=b.jPlayer.nativeFeatures.fullscreen;c.used.webkitVideo&&(a=this.htmlElement.video);c.api.fullscreenEnabled&&c.api.requestFullscreen(a)},_exitFullscreen:function(){var a=b.jPlayer.nativeFeatures.fullscreen,c;a.used.webkitVideo&&(c=this.htmlElement.video);a.api.fullscreenEnabled&&a.api.exitFullscreen(c)},_html_initMedia:function(a){var c=b(this.htmlElement.media).empty();
b.each(a.track||[],function(a,b){var g=document.createElement("track");g.setAttribute("kind",b.kind?b.kind:"");g.setAttribute("src",b.src?b.src:"");g.setAttribute("srclang",b.srclang?b.srclang:"");g.setAttribute("label",b.label?b.label:"");b.def&&g.setAttribute("default",b.def);c.append(g)});this.htmlElement.media.src=this.status.src;"none"!==this.options.preload&&this._html_load();this._trigger(b.jPlayer.event.timeupdate)},_html_setFormat:function(a){var c=this;b.each(this.formats,function(b,e){if(c.html.support[e]&&
a[e])return c.status.src=a[e],c.status.format[e]=!0,c.status.formatType=e,!1})},_html_setAudio:function(a){this._html_setFormat(a);this.htmlElement.media=this.htmlElement.audio;this._html_initMedia(a)},_html_setVideo:function(a){this._html_setFormat(a);this.status.nativeVideoControls&&(this.htmlElement.video.poster=this._validString(a.poster)?a.poster:"");this.htmlElement.media=this.htmlElement.video;this._html_initMedia(a)},_html_resetMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===
this.internal.video.id&&!this.status.nativeVideoControls&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause())},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.src="about:blank",this.htmlElement.media.load())},_html_load:function(){this.status.waitForLoad&&(this.status.waitForLoad=!1,this.htmlElement.media.load());clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(a){var b=this,d=this.htmlElement.media;this._html_load();if(isNaN(a))d.play();
else{this.internal.cmdsIgnored&&d.play();try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a,d.play();else throw 1;}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.play(a)},250);return}}this._html_checkWaitForPlay()},_html_pause:function(a){var b=this,d=this.htmlElement.media;0<a?this._html_load():clearTimeout(this.internal.htmlDlyCmdId);d.pause();if(!isNaN(a))try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a;else throw 1;
}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.pause(a)},250);return}0<a&&this._html_checkWaitForPlay()},_html_playHead:function(a){var b=this,d=this.htmlElement.media;this._html_load();try{if("object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a*d.seekable.end(d.seekable.length-1)/100;else if(0<d.duration&&!isNaN(d.duration))d.currentTime=a*d.duration/100;else throw"e";}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.playHead(a)},250);return}this.status.waitForLoad||
this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_volume:function(a){this.html.audio.available&&(this.htmlElement.audio.volume=a);this.html.video.available&&(this.htmlElement.video.volume=a)},_html_mute:function(a){this.html.audio.available&&
(this.htmlElement.audio.muted=a);this.html.video.available&&(this.htmlElement.video.muted=a)},_flash_setAudio:function(a){var c=this;try{b.each(this.formats,function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4a":case "fla":c._getMovie().fl_setAudio_m4a(a[d]);break;case "mp3":c._getMovie().fl_setAudio_mp3(a[d]);break;case "rtmpa":c._getMovie().fl_setAudio_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),
this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_setVideo:function(a){var c=this;try{b.each(this.formats,function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4v":case "flv":c._getMovie().fl_setVideo_m4v(a[d]);break;case "rtmpv":c._getMovie().fl_setVideo_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_resetMedia:function(){this.internal.flash.jq.css({width:"0px",
height:"0px"});this._flash_pause(NaN)},_flash_clearMedia:function(){try{this._getMovie().fl_clearMedia()}catch(a){this._flashError(a)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(a){this._flashError(a)}this.status.waitForLoad=!1},_flash_play:function(a){try{this._getMovie().fl_play(a)}catch(b){this._flashError(b)}this.status.waitForLoad=!1;this._flash_checkWaitForPlay()},_flash_pause:function(a){try{this._getMovie().fl_pause(a)}catch(b){this._flashError(b)}0<a&&(this.status.waitForLoad=
!1,this._flash_checkWaitForPlay())},_flash_playHead:function(a){try{this._getMovie().fl_play_head(a)}catch(b){this._flashError(b)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(a){try{this._getMovie().fl_volume(a)}catch(b){this._flashError(b)}},
_flash_mute:function(a){try{this._getMovie().fl_mute(a)}catch(b){this._flashError(b)}},_getMovie:function(){return document[this.internal.flash.id]},_getFlashPluginVersion:function(){var a=0,b;if(window.ActiveXObject)try{if(b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){var d=b.GetVariable("$version");d&&(d=d.split(" ")[1].split(","),a=parseInt(d[0],10)+"."+parseInt(d[1],10))}}catch(e){}else navigator.plugins&&0<navigator.mimeTypes.length&&(b=navigator.plugins["Shockwave Flash"])&&(a=navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,
"$1"));return 1*a},_checkForFlash:function(a){var b=!1;this._getFlashPluginVersion()>=a&&(b=!0);return b},_validString:function(a){return a&&"string"===typeof a},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_urlNotSetError:function(a){this._error({type:b.jPlayer.error.URL_NOT_SET,context:a,message:b.jPlayer.errorMsg.URL_NOT_SET,hint:b.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(a){var c;c=this.internal.ready?"FLASH_DISABLED":"FLASH";this._error({type:b.jPlayer.error[c],context:this.internal.flash.swf,
message:b.jPlayer.errorMsg[c]+a.message,hint:b.jPlayer.errorHint[c]});this.internal.flash.jq.css({width:"1px",height:"1px"})},_error:function(a){this._trigger(b.jPlayer.event.error,a);this.options.errorAlerts&&this._alert("Error!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_warning:function(a){this._trigger(b.jPlayer.event.warning,f,a);this.options.warningAlerts&&this._alert("Warning!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+
a.context)},_alert:function(a){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+a)},_emulateHtmlBridge:function(){var a=this;b.each(b.jPlayer.emulateMethods.split(/\s+/g),function(b,d){a.internal.domNode[d]=function(b){a[d](b)}});b.each(b.jPlayer.event,function(c,d){var e=!0;b.each(b.jPlayer.reservedEvent.split(/\s+/g),function(a,b){if(b===c)return e=!1});e&&a.element.bind(d+".jPlayer.jPlayerHtml",function(){a._emulateHtmlUpdate();var b=document.createEvent("Event");b.initEvent(c,
!1,!0);a.internal.domNode.dispatchEvent(b)})})},_emulateHtmlUpdate:function(){var a=this;b.each(b.jPlayer.emulateStatus.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.status[d]});b.each(b.jPlayer.emulateOptions.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.options[d]})},_destroyHtmlBridge:function(){var a=this;this.element.unbind(".jPlayerHtml");b.each((b.jPlayer.emulateMethods+" "+b.jPlayer.emulateStatus+" "+b.jPlayer.emulateOptions).split(/\s+/g),function(b,d){delete a.internal.domNode[d]})}};
b.jPlayer.error={FLASH:"e_flash",FLASH_DISABLED:"e_flash_disabled",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"};b.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",FLASH_DISABLED:"jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+b.jPlayer.prototype.version.script+" needs Jplayer.swf version "+b.jPlayer.prototype.version.needFlash+" but found "};b.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",FLASH_DISABLED:"Check that you have not display:none; the jPlayer entity or any ancestor.",
NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."};b.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"};b.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of css selectors found did not equal one: ",
CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."};b.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}});
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
(function ($) {
  "use strict";

  var methods = {
    nextPlayerToAddVideo: -1,

    init: function(opts) {
      this.each(function () {
        var $that = $(this);
        var that = {};
        this.utVideo = that;

        var events = {
          ready: "utVideo:ready",
          buttonClick: "utVideo:buttonClick",
          mediaAdd: "utVideo:mediaAdd",
          mediaRemove: "utVideo:mediaRemove",
          mediaReady: "utVideo:mediaReady",
          play: "utVideo:play",
          pause: "utVideo:pause",
          stop: "utVideo:stop",
          finish: "utVideo:finish",
          destroy: "utVideo:destroy",
          change: "utVideo:change",
          error: "utVideo:error",
          dialogOpen: "utVideo:dialogOpen",
          dialogCancel: "utVideo:dialogCancel"
        };

        var defaults = {
          id: false,
          data: undefined,
          editable: true,
          ui:{
            artwork:   true,
            loading:   true,
            play:      true,
            title:     true,
            source:    true,
            playing:   true
          },
          styles: {
            skin:'default',
            autoPause: true,
            listenMedia: true
          },
          i18n: {
            add:          "add video",
            change:       "",
            error:        "Error occurred",
            dialogLabel:  undefined
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready) {
          UT.Expression.ready(function(post) {
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.options = $.extend(true, defaults, opts);
        that.canplay = false;

        that.eventNS   = 'utVideo:';
        that.storageNS = 'utVideo_';
        that.stateNS   = "ut-video-state";
        that.editableNS= "ut-video-editable";
        that.uiNS      = "ut-video-ui";
        that.modeNS    = "ut-video-mode";
        that.skinNS    = "ut-video-skin";
        that.serviceNS = "ut-video-service";
        that.aspectNS  = "ut-video-aspect";
        that.sizeNS    = "ut-video-size";
        that.touchNS   = "ut-video-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            artwork:  v,
            loading:  v,
            play:     v,
            title:    v,
            source:   v,
            playing:  v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddVideo < 0 && that.options.styles.listenMedia) {
            that.post.on('video',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-video");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddVideo) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utVideo && allPanels[ww].utVideo.options && !allPanels[ww].utVideo.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddVideo++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utVideo.options.data = data;
                tmp.utVideo.update();
              }
            });
            methods.nextPlayerToAddVideo = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions){
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue)?noDiff:diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /************************************************************/
        /* video.embedProcessor start
        /************************************************************/
        var embedProcessor = {
          debug:false,
          defaultWorker:'embedly',
          getVideoPlayerParameters:function (url, appData, options, callback) {
            var param = {};
            if (url.indexOf('youtu.be/') !== -1) {
              url = '//youtube.com?v=' + url.split('youtu.be/')[1];
            } // fix for short youtube url format

            param.url = url;
            param.appData = appData;
            param.source = this._getSourceNameByUrl(url);
            param.options = options;
            param.autoplay = true;

            if (!this._sources[param.source]) {
              param.worker = this.defaultWorker;
            } else {
              param.worker = this._sources[param.source].worker;
            }

            this._workers[param.worker](param, options, callback);
          },

          embedVideoByParameters:function (param, options) {
            if (param.url && param.status) {
              if (this._sources[param.source] && this._sources[param.source].embedVideo && typeof(this._sources[param.source].embedVideo) === 'function') {
                this._sources[param.source].embedVideo(param, options);
              } else {
                that.ui.video.html(param.html);
              }
            }
          },

          _sources:{
            'youtube':{
              urlPart:'youtube.com',
              worker:'youtube',
              getVideoId:function (url) {
                var id = '';
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('v=') !== -1) {
                  id = url.split('v=')[1].split('&')[0];
                } else if (url.indexOf('video_ids=') !== -1) {
                  var ids = url.split('video_ids=')[1].split('%2C');
                  var index = (url.indexOf('index=') !== -1) ? url.split('index=')[1].split('&')[0] : 0;
                  id = ids[index].split('&')[0];
                } else if (url.indexOf('v%3D') !== -1) {
                  id = url.split('v%3D')[1].split('&')[0];
                } else {
                  var urlParts = url.split('/');
                  id = urlParts[urlParts.length - 1];
                }
                return id;
              },

              prepareEmbedCode:function (param) {
                param.id = this.getVideoId(param.url);
                return param;
              },

              embedVideo:function (param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                $('<div id="' + id + '" width="100%" height="100%" frameborder="0"></div>').appendTo(container);
                function initYTPlayer() {
                  window.youtubeApiReady = true;

                  that.onPlayerReady = function(event) {
                    player.addEventListener('onStateChange', that.onPlayerStateChange);
                    event.target.playVideo();
                  };

                  that.onPlayerStateChange = function(event) {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                      that.pauseOtherPlayers();
                      $that.trigger(events.play);
                    }

                    if (event.data === window.YT.PlayerState.ENDED) {
                      that.utStop();
                      player.stopVideo();
                      player.destroy();
                      player = null;
                      $that.trigger(events.finish);
                    }

                    if (event.data === window.YT.PlayerState.PAUSED) {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    }

//                    if (event.data === window.YT.PlayerState.BUFFERING) {}
                  };


                  var playerVars = that.options.ui.playing?null:{controls:0,showinfo:0};

                  var player = new window.YT.Player(id, {
                    height:'100%',
                    width:'100%',
                    videoId: param.id,
                    playerVars: playerVars,
                    events:{'onReady':that.onPlayerReady}
                  });

                  container.off('continueAfterPause pauseVideo')
                  .on('continueAfterPause',function () {
                    player.playVideo();
                  }).on('pauseVideo', function () {
                    player.pauseVideo();
                  });
                }

                if (!window.youtubeApiReady) {
                  var tag = document.createElement('script');
                  tag.src = "//www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                } else {
                  initYTPlayer();
                }

                window.onYouTubeIframeAPIReady = function () {
                  initYTPlayer();
                };

              }
            },

            'vimeo':{
              urlPart:'vimeo.com',
              worker:'vimeo',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('vimeo.com/')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode: function(param) {
                return param;
              },

              embedVideo: function(param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                var iframe = $('<iframe id="' + id + '" width="100%" height="100%" frameborder="0"></iframe>').appendTo(container)[0];
                iframe.src = '//player.vimeo.com/video/' + this.getVideoId(param.url) + (param.autoplay ? '?autoplay=1' : '') + ' &api=1&player_id=' + id;
                function ready(playerID) {
                  window.Froogaloop(playerID).addEvent('play', function () {
                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                  });

                  window.Froogaloop(playerID).addEvent('finish', function () {
                    $that.trigger(events.finish);
                    that.utStop();
                  });

                  window.Froogaloop(playerID).addEvent('pause', function () {  //paleyerId
                    $that.trigger(events.pause);
                    that.setState("pause");
                  });

                  container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                    window.Froogaloop(playerID).api('play');
                  }).on('pauseVideo', function () {
                    window.Froogaloop(playerID).api('pause');
                  });
                }

                window.Froogaloop(iframe).addEvent('ready', ready);
              }
            },

            'dailymotion':{
              getVideoId:function (url) {
                var id;
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('request=%2F') !== -1) {
                  id = url.split('request=%2F')[1].split('video%2F')[1].split('_')[0];
                } else {
                  id = url.substr(url.lastIndexOf("/") + 1, url.length).split('_')[0];
                }
                return id;
              },
              urlPart:'dailymotion.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<iframe frameborder="0" width="100%" height="100%" src="//www.dailymotion.com/embed/video/' + id + (param.autoplay ? '?autoPlay=1' : '') + '"></iframe>';
                return param;
              },
              embedVideo:function (param) {
                var container = that.ui.video.empty();
                // This code loads the Dailymotion Javascript SDK asynchronously.
                (function () {
                  var e = document.createElement('script');
                  e.async = true;
                  e.src = document.location.protocol + '//api.dmcdn.net/all.js';
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(e, s);
                }());

                // This function init the player once the SDK is loaded
                var self = this;
                var initDM = function () {
                  var id = 'video-ui-'+that.currents.id;
                  container.prop('id',id);
                  var player = window.DM.player(id, {video:self.getVideoId(param.url), width:"100%", height:"100%", params:{autoplay:1}});

                  player.addEventListener("apiready", function (e) {
                    var prevE = e;
                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                    e.target.addEventListener("ended", function () {
                      $that.trigger(events.finish);
                      that.utStop();
                    });

                    e.target.addEventListener("pause", function () {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    });

                    container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                      prevE.target.play();
                    }).on('pauseVideo', function () {
                      prevE.target.pause();
                    });
                  });
                };

                window.dmAsyncInit = function () {
                  initDM();
                };

              }
            },

            // 'm4v':{
            //   urlPart:'.m4v',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",
            //   jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       };
            //     })();
            //   },
            //   initJWPlayer: function(containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            // 'facebook':{
            //   urlPart:'fbcdn.net',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",      jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       }
            //     })();
            //   },
            //   initJWPlayer:function (containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            'metacafe':{
              urlPart:'metacafe.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashVars="playerVars=showStats=' + (param.details ? 'yes' : 'no') + '|' + ((param.autoplay) ? 'autoPlay=yes|' : '') + '"');
                return param;
              }
            },

            'myspace':{
              urlPart:'myspace.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/media\/embed.aspx\/(.*?)"/ig, 'media/embed.aspx/$1' + (param.autoplay ? ',ap=1' : '') + '"');
                return param;
              }
            },

            'veoh':{
              urlPart:'veoh.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/videoAutoPlay=(.*?)&/ig, 'videoAutoPlay=' + param.autoplay + '&');
                return param;
              }
            },

            'liveleak':{
              urlPart:'liveleak.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (param.autoplay ? 'flashvars="autostart=true"' : ''));
                return param;
              }
            },

            'viddler':{
              urlPart:'viddler.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (param.autoplay ? 'flashvars="autoplay=t"' : ''));
                return param;
              }
            },

            'blip':{
              urlPart:'blip.tv',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/src="(.*?)"/ig, 'src="$1?' + (param.autoplay ? 'autostart=true' : '') + '"');
                return param;
              }
            },

            'crackle':{
              urlPart:'crackle.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (param.autoplay ? 'flashvars="autoplay=true"' : ''));
                return param;
              }
            },

            'ustream':{
              urlPart:'ustream.tv',
              worker:'ustream',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/autoplay=(.*?)&/ig, 'autoplay=' + (param.autoplay ? 'true' : 'false') + '&');
                return param;
              }
            },

            'revver':{
              urlPart:'revver.com',
              worker:'noworker',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<embed src="//flash.revver.com/player/1.0/player.swf" flashvars="mediaId=' + id + '" width="100%" height="100%" type="application/x-shockwave-flash" ></embed>';
                return param;
              }
            },

            'google':{
              urlPart:'video.google.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashvars="playerMode=' + param.gskins + (param.autoplay ? '&autoPlay=true' : '') + (param.loop ? '&loop=true' : ''));
                param.html = param.html.replace('&hl=en&fs=true', '');
                return param;
              }
            },

            'megavideo':{
              urlPart:'megavideo.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('v=')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object wmode="transparent" width="100%" height="100%"><param name="movie" value="//www.megavideo.com/v/' + id + '"/><param name="allowFullScreen" value="true"/><param name="wmode" value="transparent"/><embed wmode="transparent" src="//www.megavideo.com/v/' + id + '" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%"></embed></object>';
                return param;
              }
            },

            'joost':{
              urlPart:'joost.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('container_info=') !== -1) {
                  return url.split('container_info=')[1].split('/')[0].split('&')[0];
                } else if (url.indexOf('joost.com/') !== -1) {
                  return url.split('joost.com/')[1].split('/')[0].split('&')[0];
                }
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object width="100%" height="100%"><param name="movie" value="//www.joost.com/embed/' + id + (param.autoplay ? '?autoplay=true' : '') + '"></param><param name="allowFullScreen" value="true"/><param name="allowNetworking" value="all"/><param name="allowScriptAccess" value="always"/><embed src="//www.joost.com/embed/' + id + (param.autoplay ? '?autoplay=true' : '') + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" allownetworking="all" width="100%" height="100%"></embed></object>';
                return param;
              }
            }
          },

          _workers:{
            /**
             ** Youtube worker
             */
            'youtube':function (param, options, callback) {
              embedProcessor.log(param.worker + " started with parameters = ", param);
              var parser = function(data) {
                if (data) {
                  param.status = true;
                  param.duration = (data.media$group.yt$duration) ? parseInt(data.media$group.yt$duration.seconds,10) : 0;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  var thumbs = data["media$group"]["media$thumbnail"];
                  var selThumb = null;
                  if (thumbs && thumbs.length > 0){
                    for (var qq = 0; qq < thumbs.length; qq++){
                      if (!selThumb || selThumb.width < thumbs[qq].width){
                        selThumb = thumbs[qq];
                      }
                    }
                  }
                  param.thumbnail_url = selThumb ? selThumb.url : false;
                  param.favicon_url = "//www.youtube.com/favicon.ico";
                  param.service_name = "YouTube";
                  param.provider_url = "//youtube.com";
                  param.html = false;
                  param.views = ((data["yt$statistics"] && data["yt$statistics"].viewCount) ? data["yt$statistics"].viewCount : 0);
                  param.title = data.title ? data.title["$t"] : "";
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){
                parser(param.appData);
              } else {
                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = "//gdata.youtube.com/feeds/api/videos/" + videoId + "?alt=json-in-script&v=2&&callback=?";
                $.getJSON(api_url, function (data) {
                  parser(data.entry);
                });
              }
            },
            /**
             ** Vimeo worker
             */
            'vimeo':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);

              var parser = function(data){
                if (data) {
                  param.status = true;
                  param.duration = data.duration;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  param.thumbnail_url = data.thumbnail_large || ((data.thumbnails && data.thumbnails.thumbnail && data.thumbnails.thumbnail[2])?data.thumbnails.thumbnail[2]._content:'');
                  param.favicon_url = '//vimeo.com/favicon.ico';
                  param.service_name = 'Vimeo';
                  param.provider_url = '//vimeo.com';
                  param.title = data.title || '';
                  param.html = false;
                  param.views = data.stats_number_of_plays;
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){

                parser(param.appData);
              } else {

                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = '//vimeo.com/api/v2/video/' + videoId + '.json?&callback=?';

                $.getJSON(api_url, function (data) {
                  parser(data[0]);
                });
              }
            },
            /**
             ** Embed.ly supported sites worker
             */
            'embedly':function (param, options, callback) {
              // dailymotion make call toservice every time einsted of vidmeo and youtube
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              var sourceUrl = encodeURIComponent(param.url);
              var api_url = '//api.embed.ly/1/oembed?key=c6544dc839bd11e088ae4040f9f86dcd&url=' + sourceUrl + '&autoplay=1&callback=?';
              $.getJSON(api_url, function (data) {
                if(data && data.html) {
                  param.status = true;
                  param.duration = false;
                  param.duration_formatted = false;
                  param.thumbnail_url = data.thumbnail_url ? data.thumbnail_url : '';
                  param.favicon_url = data.favicon_url;
                  if (param.source === 'dailymotion') {
                    param.favicon_url = '//favicon.yandex.net/favicon/dailymotion.com';
                  }
                  param.service_name = data.provider_name;
                  param.provider_url = data.provider_url;
                  param.html = data.html;
                  param.title = data.title || '';
                  param.views = false;
                  if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                    param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                  }
                  param = embedProcessor._paramEmbedCodeNormalizer(param);
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              });
            },
            /**
             ** ustream worker
             */

            'ustream':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              if (param.url.match(/\/channel\//) === null) {
                var video_id = param.url.split('/').pop();
                var api_url = '//api.ustream.tv/json/video/' + video_id + '/getInfo?key=CA8D42389DA4266B9489912DE63A817F&callback=?';
                $.getJSON(api_url, function (data) {
                  if (data) {
                    param.status = true;
                    param.duration = data.lengthInSecond;
                    param.duration_formatted = false;
                    param.thumbnail_url = data.imageUrl.medium || data.imageUrl.small || '';
                    param.title = data.title || '';
                    param.description = data.description || '';
                    param.rating = data.rating || '';
                    param.numberOf = data.numberOf || '';
                    param.html = data.embedTag;
                    if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                      param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                    }
                    param = embedProcessor._paramEmbedCodeNormalizer(param);
                  } else {
                    param.status = false;
                  }
                  embedProcessor.log(param.worker + ' receive parameters = ', param);
                  callback(param);
                });
              } else {
                this.embedly(param, options, callback);
              }
            },

            /**
             ** m4v worker
             */
            'm4v':function (param, options, callback) {
              var videoUrl = param.url;
              var thumbUrl = "m4v";
              var title = "Video";
              if (videoUrl.indexOf("#")) {
                var ii = videoUrl.match(/##webdoc,([^,]*)?,(.*)/ig);
                if (ii && ii.length > 0) {
                  ii = ii[0].split(",");
                  title = decodeURIComponent(ii[1]);
                  thumbUrl = decodeURIComponent(ii[2]);
                }
                videoUrl = videoUrl.substr(videoUrl.indexOf("#"));
              }
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = thumbUrl;
              param.favicon_url = '';
              param.service_name = 'm4v';
              param.provider_url = 'm4v';
              param.html = false;
              param.service_name = '';
              param.provider_url = videoUrl;
              param.title = title;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            },
            /**
             ** Without any API worker
             */
            'noworker':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = false;
              param.favicon_url = '';
              param.service_name = '';
              param.provider_url = '';
              param.html = false;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            }
          },

          _getSourceNameByUrl:function (url) {
            for (var currentSource in this._sources) {
              if (url.indexOf(this._sources[currentSource].urlPart) !== -1) {
                return currentSource;
              }
            }
            return false;
          },

          _paramEmbedCodeNormalizer:function (param) {
            if (param.html) {
              param.html = param.html
                .replace(/width="(.*?)"/ig, "width='100%'")
                .replace(/height="(.*?)"/ig, "height='100%'")
                .replace(/width=(.*?)px/ig, "width='100%'")
                .replace(/height=(.*?)px/ig, "height='100%'")
                .replace('><embed', "><param name='wmode' value='transparent'/><embed ")
                .replace('<embed', "<embed wmode='transparent'")
                .replace('<object', "<object wmode='transparent'");
            }
            return param;
          },

          _timeConverter:function (time) {
            var minutes = 0;
            var seconds = 0;
            minutes = Math.floor(time / 60);
            seconds = Math.floor(time - minutes * 60);
            time = minutes + ":" + (seconds === 0 ? "00" : (seconds > 9 ? seconds : '0' + seconds));
            return time;
          },

          log:function (m1, m2, m3, m4, m5, m6, m7, m8) {
            if (this.debug) {
              console.log(' :::::: video.embedProcessor::debug::message --- >', m1 || '', m2 || '', m3 || '', m4 || '', m5 || '', m6 || '', m7 || '', m8 || '');
            }
          }
        };

        that.pauseOtherPlayers = function() {
          if(!that.options.styles.autoPause) {
            return;
          }
          var list = $(".ut-video");
          $.each(list, function(i, v) {
            if(v !== $that[0]) {
              $(v).utVideo("pause");
            }
          });
        };

        /************************************************************/
        /* video.embedProcessor end
        /************************************************************/

        that.updatePreViewVideoData = function() {
          var sed = that.currents.sourceEmbedData || {};

          if(that.ui.artwork){
            that.ui.artwork
            .css("backgroundImage", "url(" + sed.thumbnail_url + ")");
          }

          if(that.ui.play){

            that.ui.play.off("click")
            .html('<span class="icon_play '+that.uiNS+'-play-icon"></span>')
            .on("click", function (){
              that.utPlay();
            });
          }

          if(that.ui.title){
            that.ui.title.html(sed.title || '')
            .on('click', function (e) {
              e.stopPropagation();
            });
          }

          if(that.ui.source){
            that.ui.source
            .prop('href',sed.url)
            .prop('target','_blank')
            .prop('title','Watch on '+sed.service_name)

            .on('click', function (e) {
              e.stopPropagation();
            });

            if(sed.source === 'youtube' || sed.source === 'vimeo' || sed.source === 'dailymotion'){
              that.ui.source.html('<span class="icon_'+sed.source+' '+that.uiNS+'-source-icon"></span>');
            } else {
              that.ui.source.html(sed.favicon_url ? '<img src="' + sed.favicon_url + '" border=0 />' : '');
            }
          }

          /* auto-start */
          if(that.options.autoPlay) {
            that.utPlay();
          }

          that.currents.videoDataReceived = true;
        };

        that.processEmbedData = function(sourceEmbedData) {
          if(that._embedVideoByDataTO) {
            clearTimeout(that._embedVideoByDataTO);
            that._embedVideoByDataTO = 0;
          }
          that.currents.sourceEmbedData = sourceEmbedData;
          if(sourceEmbedData.source) {
            that.updatePreViewVideoData();
            setTimeout(function() {
              that.canplay = true;
              $that.trigger(events.mediaReady, sourceEmbedData);
              that.triggerChangeEvent();
            }, 10);
            that.setState('launch');
          } else {
            $that.trigger(events.error, [false, "sorry: utVideo can not play this source of video"]);
            that.setState('error');
          }
        };

        that.utDestroy = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.destroy);
          that.ui.container.remove();
          that = null;
        };

        that.utChange = function(data) {
          that.options.data = data;
          that.update();
        };

        that.utPlay = function() {
          if(!that.canplay) {return;}
          if(that.currents.state === 'pause') {
            that.ui.video.trigger('continueAfterPause');
          } else {
            that.setState("video");
            embedProcessor.embedVideoByParameters(that.currents.sourceEmbedData, that.options);
          }
        };

        that.utPause = function() {
          that.ui.video.trigger('pauseVideo');
        };

        that.utStop = function() {
          that.ui.video.find('iframe').prop('src','');
          that.ui.video.empty();
          $that.trigger(events.stop);
          that.setState('launch');
        };

        that.utUpdate = function() {
          that.update();
        };

        that.utDialog = function(opt) {
          var options = {
            inputTypes: ['search'],
            label: that.options.i18n.dialogLabel
          };
          if(!$.isEmptyObject(opt)) {
            options = $.extend(true, options, opt);
          }

          $that.trigger(events.dialogOpen);
          that.post.dialog('video', options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function() {
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? 'true' : 'false'),
            (that.currents.serviceData?(that.serviceNS + '-' + that.currents.serviceData.service_name):''),
            that.skinNS     + '-' + that.options.styles.skin,
            that.modeNS     + '-' +(that.post.context.player?'player':'editor'),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch?'true':'false'),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that._embedVideoByDataTO = 0;
        that.embedVideoByData = function(data) {
          that._embedVideoByDataTO = 0;
          that.setState("loading");
          that._embedVideoByDataTO = setTimeout(function () {
            if(!that.currents.videoDataReceived && that.currents.state !== 'error' && that.options.data) {
              $that.trigger(events.error, [false, 'sorry: utVideo can not embed this video']);
              that.setState('error');
            }
          }, 15000);
          embedProcessor.getVideoPlayerParameters(data.url, data.appData || false, {}, that.processEmbedData);
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            videoDataReceived: false,
            sourceEmbedData: null,
            state: null
          };

          $that.addClass("ut-video");

          var storage_data = that.post.storage[that.storageNS + that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utVideo: Please specify an id of your video container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($("#" + that.currents.id).length > 1) {
            console.error('utVideo: Your video container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          /* hack for firefox flash video */
          if (/Firefox[\/\s](\d+\.\d+)/.test(window.navigator.userAgent)) {
            $that.parents().each(function(){
              if ($(this).css('transform') !== "none" || $(this).css('-moz-transform') !== "none") {
                $(this).css({
                  '-moz-transform': 'none',
                  'transform': 'none'
                });
                if(console && console.warn) {
                  console.warn('WARNING!!! css property translate for firefox removed in order to avoid problems with FLASH');
                }
              }
            });
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute") {
            $that.css('position', 'relative');
            if(console && console.warn) {
              console.warn('Your container (id=' + that.currents.id + ') css position was set as "relative" as requirement of utVideo component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.video     = $('<div class="'+that.uiNS+'-video"></div>'  ).appendTo(that.ui.container);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').append($('<div>').html(that.options.i18n.error)).appendTo( that.ui.container);
          if(that.options.ui.artwork) {that.ui.artwork = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.loading) {that.ui.loading = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-loading-icon"></div>').appendTo(that.ui.container);}
          if(that.options.ui.play)    {that.ui.play    = $('<div class="'+that.uiNS+'-play">'         ).appendTo(that.ui.container);}
          if(that.options.ui.title)   {that.ui.title   = $('<h1  class="'+that.uiNS+'-title"></h1>'   ).appendTo(that.ui.container);}
          if(that.options.ui.source)  {that.ui.source  = $('<a   class="'+that.uiNS+'-source"></a>'   ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_video ut-media-button ut-button"></a>').html(that.options.i18n.add).appendTo(that.ui.container);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>').html(that.options.i18n.edit).appendTo(that.ui.container);

            that.ui.add.on('click', that.onAddButtonClick);
            that.ui.remove.on('click', that.onRemoveButtonClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post){
            that.post.on('pause', that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.embedVideoByData(that.options.data);
          } else {
            that.setState("empty");
          }
        };

        that.onAddButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
//            that.removeVideo();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.removeVideo = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
          that.update();
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('video');
            methods.nextPlayerToAddVideo = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);
        that.update();

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    play: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPlay && this.utVideo.canplay) {
          this.utVideo.utPlay.call(this);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPause && this.utVideo.canplay) {
          this.utVideo.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utStop && this.utVideo.canplay){
          this.utVideo.utStop.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utUpdate){
          this.utVideo.utUpdate.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDestroy){
          this.utVideo.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDialog){
          this.utVideo.utDialog.call(this,options);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0 && this[0].utVideo && this[0].utVideo.options) {
        res = this[0].utVideo.options.data;
      }
      return res;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utVideo) {
          this.utVideo.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utVideo = function (method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utVideo');
    }
    return this;
  };
})(window.$ || window.Zepto || window.jq);

var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
!1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();

/*global UT: true, jQuery: true, navigator: true, fontdetect: true */
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
;(function($) {
  "use strict";
  /**
   * Enhace the given domNode to make it an editable text field
   *
   * It can be fluid in size, adapt to his container, limit the
   * number of characters, and be mixed with an ut-image
   *
   * Data(the text) will be stored in that object in the collection:
   * - ut-text_[element.id]
   */

  function UtText(element, options) {
    options = $.extend({}, $.fn.utText.defaults, options);

    var el            = element,
      $el             = $(el),
      namespace       = 'utText',
      storageKey      = namespace+el.id,
      post            = options.post || {},
      storage         = post.storage,
      mode            = post.context,
      maxFontSize     = parseInt(options.maxFontSize,10) || null,
      minFontSize     = parseInt(options.minFontSize,10) || null,
      isUtimage       = $el.data('utImage'),
      isIosApp        = /(urturn)/i.test(navigator.userAgent),
      isIE            = /(msie)/i.test(navigator.userAgent),
      $contentDomNode,timer,$countdownDomNode,imageHeight,fontName,isFontLoaded;

    function init() {
      $contentDomNode = $('<div>').addClass('ut-text-content');

      // redifine mix/max font size if we are on mobile or other device
      if (options.fixedSize && $(post.node).width() < 576 && maxFontSize && minFontSize) {
        maxFontSize = Math.round($(post.node).width()/576*maxFontSize);
        minFontSize = Math.round($(post.node).width()/576*minFontSize);
      }

      $el
      .addClass('ut-text')
      .append($contentDomNode);

      checkFont();

      if (!options.fixedSize) {
        $el.addClass('ut-text-flex');
      } else {
        $el.addClass('ut-text-fixed');
      }

      if (mode && mode.editor === true) {
        $contentDomNode
        .attr('contentEditable',true)
        .attr('spellcheck',false);
        if (options.tabIndex) {
          $contentDomNode.attr('tabIndex',options.tabIndex);
        }
        bindEvents();
      }
      if (storage && storage[storageKey]) {
        if (mode && mode.player === true) {
          $contentDomNode.html(post.autoLink(storage[storageKey]));
        } else {
          $contentDomNode.text(storage[storageKey]);
        }
        $contentDomNode.attr('data-div-placeholder-content', 'true');
      }

      if (options.chars && mode && mode.editor === true) {
        $countdownDomNode = $('<div>').addClass('ut-text-countdown ut-action-button ut-small-button ut-button');
        $el.append($countdownDomNode);
        updateCharactersCounter();
      }
      
      if (isUtimage) {
        imageHeight = $el.height();
        $el.css({ backgroundSize: 'cover' });
      }

      if(options.reuse) {
        reuse();
      }

      if (options.fixedSize && maxFontSize && minFontSize) {
        adaptFontSize();
        post.on('resize', function() {
          adaptFontSize();
        });
      }

      if (charsCount() === 0) {
        $contentDomNode.html('<br/>');
      }

      trigger('ready');
    }

    /* 
      - check if font is loaded, and load it if not
    */
    function checkFont() {
      fontName      = fontdetect.whichFont($contentDomNode[0]);
      isFontLoaded  = fontdetect.isFontLoaded(fontName);

      if (!isFontLoaded) {
        $el.append(jQuery('<div/>').css('fontFamily',fontName).addClass('ut-font-detect'));
        fontdetect.onFontLoaded(fontName, function(){
          isFontLoaded = true;
          $('.ut-font-detect',$el).remove();
        }, function(){
          isFontLoaded = false;
          $('.ut-font-detect',$el).remove();
        }, {msInterval: 100, msTimeout: 10000});
      }
    }

    function trigger(name, data){
      $el.trigger(namespace+':'+name, data);
    }

    /*
      - Listen to events on the contenteditable field
      - use native text dialog if we are in the iOS app
      - handle copy-paste text
    */
    function bindEvents() {
      /* here is the meat and potates */
      $contentDomNode.attr('data-placeholder',options.placeholder);

      if (isIosApp) {
        $contentDomNode.on('touchstart',function() {
          post.dialog('text',{'value':cleanUpData(), 'max':options.chars || null, 'multiline':true}, function(text){
            $contentDomNode.html(text).trigger('input');
            trigger('mobileInput',text);
            if (text.length >= 1) {
              $contentDomNode.attr('data-div-placeholder-content', 'true');
            }
            adaptAndSave();
          });
        });
      } else {
        $contentDomNode.on('paste keypress keydown input',function(e) {
          if (mode && mode.editor === true) {
            if ($contentDomNode[0].textContent && charsCount() >= 1) {
              $contentDomNode.attr('data-div-placeholder-content', 'true');
            } else {
              $contentDomNode.removeAttr('data-div-placeholder-content');
            }
          }

          if (e.type === 'paste') {
            formatPaste();
          }

          if(e.which === 13 && isIE) {
            e.preventDefault();
          }

          //list of functional/control keys that you want to allow always
          var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

          if( $.inArray(e.keyCode, keys) === -1) {
            if (options.chars && charsCount() >= options.chars && !e.metaKey) {
              e.preventDefault();
              e.stopPropagation();
            }
          }

          if(timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(adaptAndSave, 50);

        });
      }
    }

    /*
      Either the post, the font, or the ut-image object can adapt the height
      The font in the case we have a fixed element size
      The post when the size is free and as more as we type
      The ut-image when it's present, the image grow as we type
    */
    function sizeChange() {
      if (options.fixedSize) {
        adaptFontSize();
      } else {
        if (isUtimage) {
          adaptImageHeight();
        } else {
          adaptPostHeight();
        }
      }

      if (options.chars && mode && mode.editor === true) {
        updateCharactersCounter();
      }
    }

    function adaptImageHeight() {
      if ($contentDomNode.outerHeight()+10 > imageHeight) {
        $el.height($contentDomNode.outerHeight()+10);
      } else {
        $el.height(imageHeight);
      }
    }

    function adaptPostHeight() {
      post.size({'height':$('.webdoc_expression_wrapper').outerHeight()});
    }

    function adaptFontSize() {
      $el.textfill({
        debug: false,
        maxFontPixels: maxFontSize,
        minFontPixels: minFontSize,
        innerTag: '.ut-text-content'
      });
    }

    /* Adapt size and save */
    function adaptAndSave() {
      sizeChange();
      saveData();
    }

    /* Save the text in collection */
    function saveData() {
      storage[storageKey] = cleanUpData();
      post.save();

      trigger('save',cleanUpData());
    }

    function charsCount() {
      return $contentDomNode.text().replace(/<[^>]*>/g, "").length;
    }

    /* in the case we have a character limitation, display and update the counter */
    function updateCharactersCounter() {
      var remaining = options.chars - charsCount();
      if (remaining === 0) {
        $countdownDomNode.addClass('ut-text-countdown-max');
      } else {
        $countdownDomNode.removeClass('ut-text-countdown-max');
      }
      $countdownDomNode.text(remaining + ' / ' + options.chars);
    }

    /* Clean up the data that come from copy, paste, etc... before saving */
    function cleanUpData(){
      var v = $contentDomNode.html().replace(/<br\s*\/?>/mg,"\n");
      v = v.replace(/<div>/gi,"\n").replace(/<\/div>/gi,'');
      v = v.replace(/(<([^>]+)>)/ig,'');
      return $.trim(v.replace(/&nbsp;/ig,''));
    }

    function formatPaste() {
      setTimeout(function() {
        if(options.chars && charsCount() >= options.chars) {
          $contentDomNode.text(cleanUpData().substr(0, options.chars));
        } else {
          $contentDomNode.text(cleanUpData());
        }
      }, 50);
    }

    /* Reuse data from the parent post */
    function reuse() {
      if(!storage[storageKey] && post.collection('parent') && post.collection('parent')[storageKey]){
        $contentDomNode.html(post.collection('parent')[storageKey]);
        $contentDomNode.attr('data-div-placeholder-content', 'true');
        saveData();
      }
    }

    function destroy() {
      $el.each(function() {
        $el.trigger('destroy');
        $el
          .removeData('utText')
          .removeClass('ut-text ut-text-editable ut-text-placeholder')
          .remove('.ut-text-content');
        $contentDomNode.off();
      });
    }

    init();

    return {
      options:        options,
      destroy:        destroy,
      sizeChange:     sizeChange,
      adaptFontSize:  adaptFontSize,
      getText:        cleanUpData,
      saveText:       saveData
    };
  }

  $.fn.utText = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'utText') && typeof $.data(this, 'utText')[methodName] === 'function') {
          returnVal = $.data(this, 'utText')[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.utText');
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'utText')) {
          if((!options || !options.post) && UT && UT.Expression && UT.Expression.ready){
            UT.Expression.ready(function(post){
              if (!options) {
                options = {};
              }
              options.post = post;
            });
          }
          $.data(this, 'utText', new UtText(this, options));
        }
      });
    }
  };

  $.expr[':'].utText = function(el) {
    return $(el).hasClass('ut-text');
  };

  $.fn.utText.defaults = {
    placeholder: 'Enter some text',
    fixedSize: false,
    chars: false,
    maxFontSize: false,
    minFontSize: false,
    reuse: false,
    tabIndex: false
  };

})(jQuery);