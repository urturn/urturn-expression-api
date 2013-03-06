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

  var setupExpression = function (context){
    UT.Expression._reset();
    UT.Expression._dispatch({
      type: 'ready',
      options: {
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
      }
    });

    context.post = UT.Expression._postInstance();
    buster.assert(context.post);
  };

  buster.testCase("Post", {
    setUp: function(){
      setupExpression(this);
    },
    tearDown: function(){
      dropListeners();
      UT.Expression._reset();
    },

    "valid": {
      "default state is false": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(), false);
      },

      "state can be set to true": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(), true);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(), true);
      },

      "state can be set back to false": function(){
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(false), false);
        buster.assert.equals(this.post.valid(), false);
      }
    },

    "dialog/test": {
      "using option hash": function(done){
        listenToMessage(function(message, callback){
          buster.assert.equals(message.args[0], 'default');
          buster.assert.equals(message.args[1], 15);
          buster.assert.equals(message.args[2], true);
          callback('hello');
        });
        this.post.dialog('text', {
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
        this.post.dialog('text', function(data){
          buster.assert.equals(data, 'hello');
          done();
        });
      }
    }
  });
})();