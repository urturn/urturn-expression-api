TestHelpers.setupExpression = function (context, options){
  options = options || {};
  UT.Expression._dispatch({
    type: 'ready',
    options: {
      expToken: options.expToken || 'aaaa-aaaa-aaaaaa-aaaaaaaaa',
      mode: options.mode || 'edit',
      documentURL: options.documentURL || '/posts/bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentId: options.documentId || 'bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentPrivacy: options.documentPrivacy || 'public',
      collections: options.collections || [{
        name: 'default',
        items: [],
        count: 0
      }],
      apiVersion: options.apiVersion || '1.2.0',
      version: options.version || '1.0.0',
      currentUserId: options.currentUserId || 'cccc-cccc-cccccc-cccccccc',
      host: options.host || 'http://uuuu.com',
      assetPath: options.assetPath || 'http://assets.aaaaa.com',
      note : options.note || 'some',
      scrollValues: options.scrollValues || {},
      parentData: options.parentData || null,
      postUserId: options.postUserId || UT.uuid(),
      expressionUserId: options.expressionUserId || UT.uuid()
    }
  });
  context.post = UT.Expression._postInstance();
};

TestHelpers.messageListeners = [];

TestHelpers.dropListeners = function(){
  TestHelpers.messageListeners.forEach(function(func){
    window.parent.removeEventListener('message', func, false);
  });
  TestHelpers.messageListeners = [];
};

TestHelpers.listenToMessage = function(methodName, callback){
  if(typeof methodName == 'function'){
    callback = methodName;
    methodName = null;
  }
  var func = function(event){
    if(callback){
      var data;
      data = JSON.parse(event.data);
      if(data){
        if(methodName && methodName !== data.methodName){
          return;
        }
        callback(data, function(result){
          window.postMessage(JSON.stringify({
            type: 'callback',
            callbackId: data.callbackId,
            result: Array.prototype.slice.call(arguments)
          }), '*');
        });
      }
    } else {
      throw new Error('no callback specified');
    }
  };
  TestHelpers.messageListeners.push(func);
  window.parent.addEventListener('message', func, false);
};

TestHelpers.initExpressionEnv = function() {
  this.node = TestHelpers.createExpressionDOM();
};

TestHelpers.resetExpressionEnv = function(){
  if(this.node){
    document.body.removeChild(this.node);
  }
  TestHelpers.dropListeners();
  UT.Expression._reset();
};