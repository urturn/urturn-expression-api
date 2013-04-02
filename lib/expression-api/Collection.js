/**
 * valid options keys: data, delegate, currentUserId
 */
UT.Collection = function(options) {
  // PUBLIC Properties
  this.length = 0; // loded items count
  this.name = null;

  // PUBLIC Methods

  // Add or updated an item binded to a specific key
  var setItem = function(key, item) {
    if(!key) {
      throw new Error("InvalidKey", key);
    }
    if(privateKeys.indexOf(key) != -1) {
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
      keys, dirtyKeys, boundKeys, count,
      privateKeys = ['refresh', 'setItem', 'getItem', 'count', 'sum', 'key', 'getUserItem', 'setUserItem', 'average', 'toString', 'size', 'length', 'length', 'name', 'save', 'fieldDefs', 'sanitizedItem', 'getCurrentData'];

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