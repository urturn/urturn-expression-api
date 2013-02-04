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
