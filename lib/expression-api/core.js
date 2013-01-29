/**
 * Namespace of the Webdoc public API.
 */
var UT = {}
  , WD = UT
  ;

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
    return expression
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
      var msg;
      // webdoc will always set json data so we parse it
      try {
          msgObj = JSON.parse(msg);
      }
      catch (exception) {
          if (console && console.error) {
              console.error("receive invalid message", msg, exception.message) ;
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
          throw "Extension " + ext.name + " is already defined."
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
