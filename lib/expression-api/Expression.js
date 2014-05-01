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

  UT.Expression._checkOptIn = function() {
    if (postInstance.isNativeApp() && states.need_optin) {
      var divAgreement = document.createElement('div');
      divAgreement.style.width = '100%';
      divAgreement.style.height = '100%';
      divAgreement.id = 'divAgreement';
      divAgreement.style.position = 'absolute';
      divAgreement.style.top = '0px';
      divAgreement.style.left = '0px';
      divAgreement.style.padding = '20px';


      divAgreement.style.zIndex = 100000;


      var popupAgreement = document.createElement('div');

      popupAgreement.style.width = '100%';
      popupAgreement.style.height = '100%';
      popupAgreement.style.padding = '10px';
      popupAgreement.style.borderRadius = '5px';
      popupAgreement.style.backgroundColor = '#ffffff';
      popupAgreement.style.border = '#b1a9a9 1px solid';
      popupAgreement.style.boxShadow = '0px 0px 5px #888';

      divAgreement.appendChild(popupAgreement);

      var header =  document.createElement('h2');
      header.style.textAlign = 'center';
      header.style.color = '#867e7e';
      header.innerHTML = i18n.get('terms');
      popupAgreement.appendChild(header);
      
      var text = document.createElement('div');
      text.style.overflowY = 'scroll';
      text.style.maxHeight = '220px';
      text.style.color = '#867e7e';
      text.style.font = "12px 'Helvetica Neue', helvetica, arial, sans-serif;";
      text.style.fontSize = "12px";
      text.style.padding = '10px';
     // text.style.textAlign = 'justify';
      text.innerHTML = states.optin_message;
      popupAgreement.appendChild(text);

      var button = document.createElement('div');
      button.style.width = '200px';
      button.style.backgroundColor = '#86b978';
      button.style.color = '#faf7f7';
      button.innerHTML = i18n.get('agree');
      button.style.font = "25px 'Helvetica Neue', helvetica, arial, sans-serif;";
      button.style.margin = 'auto';
      button.id = '#buttonAgree';
      button.style.padding = '10px';
      button.style.marginTop = '10px';
      button.style.display = 'block';
      button.style.textAlign = 'center';
      button.style.borderRadius = '5px';

      button.addEventListener('touchstart', function() {
        document.getElementById('divAgreement').style.display = 'none';
      });

      button.addEventListener('touch', function() {
        document.getElementById('divAgreement').style.display = 'none';
      });

      button.addEventListener('click', function() {
        document.getElementById('divAgreement').style.display = 'none';
      });

      popupAgreement.appendChild(button);

      document.body.appendChild(divAgreement);
    }
  };


  /**
   * Retrieve the API version of the current expression
   */
  UT.Expression.apiVersion = function() {
    return states && states.apiVersion || '0.0.0';
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
    
    UT.Expression._checkOptIn();
    
    postInstance.track('expression - loaded', {});
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