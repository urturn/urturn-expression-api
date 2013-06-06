; (function(UT, window, document, undefined){
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
    return '0.0.0';
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
      readyListeners[i].apply(postInstance, [postInstance]);
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
      default:
        if(window.console && console.log){
          console.log('Unkown event ' + msg.type);
        }
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