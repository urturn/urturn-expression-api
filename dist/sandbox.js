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
/**
 * valid options keys: data, delegate, currentUserId
 */
UT.Collection = function(options) {
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
    var sanItem = sanitizeItem(key, item);
    var oldItem = this.getItem(key);

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
    this.length = keys.length;
    return item;
  };

  var getItem = this.getItem = function(key, defaultValue) {
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
    return '<Collection @name="' + this.name + '">';
  };

  this.save = function() {
    bindNewKeys.apply(this);
    var itemsToSave = {};
    if(dirtyKeys.length > 0) {
      for(var i = 0; i < dirtyKeys.length; i++) {
        itemsToSave[dirtyKeys[i]] = UT.Collection.marshallItem(items[dirtyKeys[i]]);
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
      keys, dirtyKeys, boundKeys, count;

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
    this.name = data.name;
    count = data.count;
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
    if(boundKeys.indexOf(key) == -1 && !UT.Collection.isReservedKey(key)){
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
      if(!UT.Collection.isReservedKey(key) && boundKeys.indexOf(key) == -1) {
        setItem.call(this, key, this[key]);
        bindItem.call(this, key, this[key]);
      }
    }
  };
  initialize.call(this, options);
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
  } else if(item) {
    return item;
  } else {
    return null; // item to delete
  }
};

UT.Collection.sanitizeItem = function(key, item) {
  if(item === undefined || item === null) { // Will delete the item
    return;
  }
  if(item && item.marshall){
    item._key = key;
    return item; // This item know how to marshall properly
  }

  if(typeof item === 'function'){
    throw new Error("ArgumentError cannot serialize function");
  }

  // Convert built-in type to literal object.
  if(typeof(item) !== 'object' || [].constructor === item.constructor) {
    item = {
      _type: 'literal',
      value: item
    };
  }

  var sanitizedItem = {};
  sanitizedItem = item;
  sanitizedItem._key = key;
  if(item.constructor !== {}.constructor){
    throw new Error("Unserialisable object");
  }
  return sanitizedItem;
};
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

; (function(){
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
    this.setUserItem = function(item) {
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

    this.getUserItem = function(item) {
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
              throw new Error('TypeError', 'Unkown type ' + fd.type);
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

      userItem._key = currentUserId;
      newData.items.push(userItem);
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
})();
