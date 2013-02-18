(function(){
  var messageListeners = [];
  var dropListeners = function(){
    messageListeners.forEach(function(func){
      window.parent.removeEventListener('message', func, false);
    });
    messageListeners = [];
  };

  var listenToMessage = function(callback){
    var func = function(event){
      if(callback){
        var data;
        try {
          data = JSON.parse(event.data);
        } catch (ex){
        }
        if(data){
          callback(data, function(result){
            window.postMessage(JSON.stringify({
              type: 'callback',
              callbackId: data.callbackId,
              result: Array.prototype.slice.call(arguments)
            }), '*');
          });
        }
      }
    };
    messageListeners.push(func);
    window.parent.addEventListener('message', func, false);
  };

  var setupExpression = function (context, done){
    UT.Expression._reset();

    var readyFunc = function(post){
      post.unbind('ready', readyFunc);
    };

    // Eat the initialized state change postMessage
    listenToMessage(function(data){
      if(data.methodName == 'changeCurrentState' && data.args[0] == 'initialized'){
        done();
      }
    });

    UT.Expression.ready(readyFunc);
    
    context.post = UT.Expression._getInstance();
    context.post._ready({
      expToken: 'aaaa-aaaa-aaaaaa-aaaaaaaaa',
      mode: 'editor',
      documentURL: '/posts/bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentId: 'bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentPrivacy: 'public',
      collections: [{
        name: 'default',
        items: []
      }],
      currentUserId: 'cccc-cccc-cccccc-cccccccc',
      host: 'http://uuuu.com',
      assetPath: 'http://assets.aaaaa.com',
      note : 'some',
      scrollValues: {}
    });
  };

  buster.testCase("Post", {
    setUp: function(done){
      setupExpression(this, done);
    },
    tearDown: function(){
      dropListeners();
    },

    "readyToPost": {
      "default state is false": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.readyToPost(), false);
      },

      "state can be set to true": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.readyToPost(true), true);
        buster.assert.equals(this.post.readyToPost(), true);
        buster.assert.equals(this.post.readyToPost(true), true);
        buster.assert.equals(this.post.readyToPost(), true);
      },

      "state can be set back to false": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.readyToPost(true), true);
        buster.assert.equals(this.post.readyToPost(false), false);
        buster.assert.equals(this.post.readyToPost(), false);
      }
    },

    "textInput": {
      "DEPRECATED: using defaultValue and max": function(done){
        buster.assert.defined(this.post);
        listenToMessage(function(message, callback){
          buster.assert.equals(message.type, 'ExpAPICall');
          buster.assert.equals(message.methodName, 'document.textInput');
          buster.assert.equals(message.args[0], 'default');
          buster.assert.equals(message.args[1], 15);
          buster.assert.defined(callback);
          callback('0123456789ABCDE');
        });
        this.post.textInput('default', 15, function(data){
          buster.assert.equals(data, '0123456789ABCDE');
          done();
        });
      },
      "using option hash": function(done){
        listenToMessage(function(message, callback){
          buster.assert.equals(message.args[0], 'default');
          buster.assert.equals(message.args[1], 15);
          buster.assert.equals(message.args[2], true);
          callback('hello');
        });
        this.post.textInput({
          value: 'default',
          max: 15,
          multiline: true
        }, function(data){
          buster.assert.equals(data, 'hello');
          done();
        });
      },
      "using a single callback": function(done){
        listenToMessage(function(message, callback){
          callback('hello');
        });
        this.post.textInput(function(data){
          buster.assert.equals(data, 'hello');
          done();
        });
      }
    }
  });
})();