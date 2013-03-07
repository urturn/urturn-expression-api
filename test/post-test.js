(function(){
  var messageListeners = [];
  var dropListeners = function(){
    messageListeners.forEach(function(func){
      window.parent.removeEventListener('message', func, false);
    });
    messageListeners = [];
  };

  var assert = buster.assert;
  var refute = buster.refute;

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

  // options can contain states
  var setupExpression = function (context, options){
    options = options || {};
    UT.Expression._reset();
    UT.Expression._dispatch({
      type: 'ready',
      options: {
        expToken: options.expToken || 'aaaa-aaaa-aaaaaa-aaaaaaaaa',
        mode: options.mode || 'editor',
        documentURL: options.documentURL || '/posts/bbbb-bbbb-bbbbbbb-bbbbbbbb',
        documentId: options.documentId || 'bbbb-bbbb-bbbbbbb-bbbbbbbb',
        documentPrivacy: options.documentPrivacy || 'public',
        collections: options.collections || [{
          name: 'default',
          items: [],
          count: 0
        }],
        currentUserId: options.currentUserId || 'cccc-cccc-cccccc-cccccccc',
        host: options.host || 'http://uuuu.com',
        assetPath: options.assetPath || 'http://assets.aaaaa.com',
        note : options.note || 'some',
        scrollValues: options.scrollValues || {},
        parentData: options.parentData || null
      }
    });

    context.post = UT.Expression._postInstance();
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

    "parentData": {
      "retrieve same data as storage": function(){
        setupExpression(this, {
          parentData: {
            aString: {
              _type: 'literal',
              value: 'aString'
            },
            aNullValue: {
              _type: 'literal',
              value: null
            },
            aNumber: {
              _type: 'literal',
              value: 2.4
            },
            aBoolean: {
              _type: 'literal',
              value: true
            },
            anArray: {
              _type: 'literal',
              value: [1, 'test', {plain: 'object'}]
            },
            anImage: {
              _type: 'image',
              url: 'http://www.image.tes/pix.jpg'
            },
            anObject: {
              plain: 'object'
            }
          }
        });
        assert(this.post.parentData.anObject);
        assert.equals(this.post.parentData.anObject.plain, 'object');
        assert.equals(this.post.parentData.aString, 'aString');
        assert.isNull(this.post.parentData.aNullValue);
        assert.equals(true, this.post.parentData.aBoolean);
        assert.equals(2.4, this.post.parentData.aNumber);
        assert.equals([1, 'test', {plain: 'object'}], this.post.parentData.anArray);
        // XXX need to test the image
      },
      "isNull when no parent data": function(){
        setupExpression(this, {parentData: null});
        assert.isNull(this.post.parentData);
      }
    },

    "dialog/test": {
      "using option hash": function(done){
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.textInput'){
            buster.assert.equals(message.args[0], 'default');
            buster.assert.equals(message.args[1], 15);
            buster.assert.equals(message.args[2], true);
            callback('hello');
          }
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