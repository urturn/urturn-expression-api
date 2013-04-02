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