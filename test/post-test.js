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
        data = JSON.parse(event.data);
        if(data){
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
    messageListeners.push(func);
    window.parent.addEventListener('message', func, false);
  };

  // options can contain states
  var setupExpression = function (context, options){
    options = options || {};
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
    tearDown: function(){
      dropListeners();
      UT.Expression._reset();
    },

    "collection()": {
      "retrieve a collection given its name": function(){
        setupExpression(this, {
          collections: [{
            name: 'default',
            items: [],
            count: 0
          },{
            name: 'testAnotherOne',
            items: [],
            count: 0
          }]
        });
        assert.equals(this.post.collection('default'), this.post.storage);
        assert.equals(this.post.collection('testAnotherOne').name, 'testAnotherOne');
      }
    },

    "valid": {
      "default state is false": function(){
        setupExpression(this);
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(), false);
      },

      "state can be set to true": function(){
        setupExpression(this);
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(), true);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(), true);
      },

      "state can be set back to false": function(){
        setupExpression(this);
        buster.assert.defined(this.post);
        buster.assert.equals(this.post.valid(true), true);
        buster.assert.equals(this.post.valid(false), false);
        buster.assert.equals(this.post.valid(), false);
      }
    },

    "parent collection": {
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
        var col = this.post.collection('parent');
        assert(col.anObject);
        assert.equals(col.anObject.plain, 'object');
        assert.equals(col.aString, 'aString');
        assert.isNull(col.aNullValue);
        assert.equals(true, col.aBoolean);
        assert.equals(2.4, col.aNumber);
        assert.equals([1, 'test', {plain: 'object'}], col.anArray);
        // XXX need to test the image
      },
      "isNull when no parent data": function(){
        setupExpression(this, {parentData: null});
        assert.isNull(this.post.collection('parent'));
      }
    },

    "dialog/text": {
      "using option hash": function(done){
        setupExpression(this);
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
        setupExpression(this);
        listenToMessage(function(message, callback){
          callback('hello');
        });
        this.post.dialog('text', function(data){
          buster.assert.equals(data, 'hello');
          done();
        });
      }
    },
    "save()": {
      "save all collections": function(done){
        setupExpression(this, {
          collections: [{
            name: 'default',
            items: [],
            count: 0
          },{
            name: 'testAnotherOne',
            items: [],
            count: 0
          }]
        });
        var defaultSaved, testAnotherOneSaved;
        listenToMessage(function(message, callback){
          try {
            if(message.methodName == 'collections.save'){
              if(message.args[0] == 'default'){
                defaultSaved = true;
                assert.equals(message.args[1].anObject.hello, 'world');
              } else if (message.args[0] == 'testAnotherOne'){
                testAnotherOneSaved = true;
                assert.equals(message.args[1].aValue.value, 'Hello World');
              } else {
                buster.fail('cannot guess arguments', message);
              }
            }
          } catch (e){
            done(e);
          }
          if(defaultSaved && testAnotherOneSaved){
            assert(true);
            done();
          }
        });
        this.post.collection('testAnotherOne').aValue = 'Hello World';
        this.post.collection('default').anObject = {hello: 'world'};
        this.post.save();
      }
    }
  });
})();