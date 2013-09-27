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
