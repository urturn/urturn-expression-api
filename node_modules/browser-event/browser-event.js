(function(module, document){
  "use strict";

  /**
   * Trigger an event on a DOM element using the default options
   * for the given event name, overriden by the passed options if any.
   */
  module.trigger = function trigger (element, name, options) {
    return element.dispatchEvent(createEvent(name, options));
  };

  var MOUSE_EVENT_TEMPLATE = {
    // canBubble: whether or not the event can bubble. Sets the value of event.bubbles.
    bubbles: true,
    // cancelable: whether or not the event's default action can be prevented. Sets the value of event.cancelable.
    cancelable: true,
    // view: the Event's AbstractView. You should pass the window object here. Sets the value of event.view.
    view: window,
    // detail: the Event's mouse click count. Sets the value of event.detail.
    detail: 1,
    // screenX: the Event's screen x coordinate. Sets the value of event.screenX.
    screenX: 0,
    // screenY: the Event's screen y coordinate. Sets the value of event.screenY.
    screenY: 0,
    // clientX: the Event's client x coordinate. Sets the value of event.clientX.
    clientX: 0,
    // clientY: the Event's client y coordinate. Sets the value of event.clientY.
    clientY: 0,
    // ctrlKey: whether or not control key was depressed during the Event. Sets the value of event.ctrlKey.
    ctrlKey: false,
    // altKey: whether or not alt key was depressed during the Event. Sets the value of event.altKey.
    altKey: false,
    // shiftKey: whether or not shift key was depressed during the Event. Sets the value of event.shiftKey.
    shiftKey: false,
    // metaKey: whether or not meta key was depressed during the Event. Sets the value of event.metaKey.
    metaKey: false,
    // button: the Event's mouse event.button.
    button: 0,
    // relatedTarget: the Event's related EventTarget. Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
    relatedTarget: null
  };

  var defaultProperties = {
    click: MOUSE_EVENT_TEMPLATE,
    mouseover: MOUSE_EVENT_TEMPLATE,
    mouseout: MOUSE_EVENT_TEMPLATE,
    mousedown: MOUSE_EVENT_TEMPLATE,
    mousemove: merge(MOUSE_EVENT_TEMPLATE, {cancelable: false}),
    mouseup: MOUSE_EVENT_TEMPLATE,
    contextmenu: MOUSE_EVENT_TEMPLATE,
    dblclick: merge(MOUSE_EVENT_TEMPLATE, {detail: 2}),
    mouseenter: merge(MOUSE_EVENT_TEMPLATE, {bubbles: false}),
    mouseleave: merge(MOUSE_EVENT_TEMPLATE, {bubbles: false}),
    show: merge(MOUSE_EVENT_TEMPLATE, {bubbles: false, cancelable: false})
  };

  /**
   * Create an event given its name and options
   */
  function createEvent (name, options) {
    var event;
    if (!defaultProperties[name]) {
      throw new Error('Unknown Event: ' + name);
    }
    try {
      event = new window[eventTypeMapping[name]](name, properties(name, options));
    } catch (e) {
      if(e instanceof TypeError) {
        // In case the constructor does not support MouseEvent as a constructor
        var mapping = deprecatedConstructorMapping[eventTypeMapping[name]];
        event = mapping.init(document.createEvent(mapping.type), name, properties(name, options));
      } else {
        throw e;
      }
    }
    return event;
  }

  function merge () {
    var target = {};
    for(var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      if (source) {
        for (var name in source) {
          target[name] = source[name];
        }
      }
    }
    return target;
  }

  // Retrieve the default properties merged with options
  // for the given event name.
  function properties(name, options) {
    return merge(defaultProperties[name], options);
  }

  // This map to deprecated constructor
  // document.createEvent(type).initXYZEvent(type, p1, ..., pn)
  var deprecatedConstructorMapping = {
    'MouseEvent': {
      type: 'MouseEvents',
      init: function(event, name, p){
        event.initMouseEvent(name,
          p.bubbles, p.cancelable, p.view, p.detail,
          p.screenX, p.screenY, p.clientX, p.clientY,
          p.ctrlKey, p.altKey, p.shiftKey, p.metaKey,
          p.button, p.relatedTarget);
        return event;
      }
    }
  };

  // Maps event type to general category of DOM events.
  // eg. click -> MouseEvents
  var eventTypeMapping = {
    // Mouse Events:
    // click, mousedown, mouseup, mouseover, mousemove, mouseout
    click: 'MouseEvent',
    mousedown: 'MouseEvent',
    mouseover: 'MouseEvent',
    mousemove: 'MouseEvent',
    mouseout: 'MouseEvent',
    mouseup: 'MouseEvent',
    contextmenu: 'MouseEvent',
    dblclick: 'MouseEvent',
    mouseenter: 'MouseEvent',
    mouseleave: 'MouseEvent',
    show: 'MouseEvent'
  };
}(window, document));
