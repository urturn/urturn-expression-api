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
        parentData: options.parentData || null,
        postUserId: options.postUserId || UT.uuid(),
        expressionUserId: options.expressionUserId || UT.uuid()
      }
    });

    context.post = UT.Expression._postInstance();
  };

  buster.testCase("Post", {
    setUp: function(){
      this.node = createExpressionDOM();
    },
    tearDown: function(){
      if(this.node){
        document.body.removeChild(this.node);
      }
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
    },
    "resize()": {
      setUp: function(){
        this.assertHeightMessage = function(expected, done){
          listenToMessage(function(message){
            if(message.methodName == 'container.resizeHeight'){
              try {
                assert.equals(message.args[0], expected);
                done();
              } catch(e) {
                done(e);
              }
            }
          });
        };
        setupExpression(this);
      },
      "with 'auto'": function(done){
        var div = document.createElement('div');
        div.style.height = "233px";
        refute.isNull(this.post.node);
        this.post.node.appendChild(div);
        this.assertHeightMessage(233, done);
        this.post.resize('auto');
      },
      "with height in pixel": function(done){
        this.assertHeightMessage(532, done);
        this.post.resize(532);
      },
      "with height in object": function(done){
        this.assertHeightMessage(345, done);
        this.post.resize({height: 345});
      },
      "with a string height in object": function(done){
        this.assertHeightMessage(123, done);
        this.post.resize({height: '123px'});
      }
    },
    "note property": {
      "set to a new string": function(done){
        setupExpression(this);
        listenToMessage(function(message){
          if(message.methodName == 'document.setNote'){
            try {
              assert.equals(message.args[0], 'Hello World');
              done();
            } catch(e) {
              done(e);
            }
          }
        });
        this.post.note = "Hello World";
      },
      "set to null": function(done){
        setupExpression(this);
        listenToMessage(function(message){
          if(message.methodName == 'document.setNote'){
            try {
              assert.equals(message.args[0], null);
              done();
            } catch(e) {
              done(e);
            }
          }
        });
        this.post.note = null;
      }
    },
    "counter()": {
      setUp: function(){
        setupExpression(this);
      },
      'can retrieve a ticket in counter': function(done){
        listenToMessage(1);
        this.post.counter('XYZ', function(number){
          assert.equals(number, 1);
          done();
        });
      }
    },
    "users()": {
      setUp: function(){
        this.uuid = UT.uuid();
        setupExpression(this, {currentUserId: this.uuid});
        this.currentUserCallback = function(message, callback){
          if(message.methodName == 'document.getUserData'){
            try {
              assert.equals(message.args.length, 0);
              callback({uuid: this.uuid, username: 'testme', avatar: 'http://avatar.com'});
            } catch(e) {
              console.log(e);
              buster.fail(e);
            }
          }
        };
        this.oneItemCallback = function(message, callback){
          if(message.methodName == 'document.users'){
            try {
              assert.equals(message.args.length, 1);
              assert.equals(message.args[0].length, 1);
              callback([{uuid: this.uuid, username: 'testme', avatar: 'http://avatar.com'}]);
            } catch(e) {
              console.log(e);
              buster.fail(e);
            }
          }
        };
      },
      "current": function(done){
        listenToMessage(this.currentUserCallback);
        this.post.users('current', function(user){
          try {
            assert.equals(user.constructor, UT.User);
            done();
          } catch(e) {
            console.log(e);
          }
        });
      },
      "with one item": function(done) {
        var item = {_key: this.uuid, value: '22', _type: 'custom'};
        listenToMessage(this.oneItemCallback);
        this.post.users(item, function(user, theItem){
          try {
            refute.isNull(user);
            assert.equals(user.constructor, UT.User);
            assert.equals(theItem, item);
            done();
          } catch(e) {
            console.log(e);
          }
        });
      },
      "missing user for one item": function(done){
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.users'){
            assert.equals(message.args.length, 1);
            assert.equals(message.args[0].length, 1);
            assert.equals(message.args[0][1], this.uuid);
            callback([]);
          }
        });
        this.post.users({_key: this.uuid}, function(user, item){
          assert.isNull(user);
          assert.isNull(item);
          done();
        });
      },
      "many items retrieve many users": function(done) {
        var ids = [UT.uuid(), UT.uuid()];
        var items = [{_key: ids[0]}, {_key: ids[1]}];
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.users'){
            try {
              assert.equals(message.args.length, 1);
              assert.equals(message.args[0].length, 2);
              assert.equals(message.args[0][0], ids[0]);
              assert.equals(message.args[0][1], ids[1]);
              callback([{uuid: ids[1], username: 'testme', avatar: 'http://avatar.com/me'},
                {uuid: ids[0], username: 'testit', avatar: 'http://avatar.com/it'}]);
            } catch(e) {
              console.log('error in callback', e);
            }
          }
        });
        this.post.users(items, function(users, theItems){
          try {
            assert.equals(users.length, 2);
            assert.equals(ids[0], users[0].uuid);
            assert.equals(ids[1], users[1].uuid);
            assert.equals(users[1].uuid, items[1]._key);
            assert.equals(users[0].uuid, items[0]._key);
            assert.equals(items[0], theItems[0]);
            assert.equals(items[1], theItems[1]);
            done();
          } catch(e) {
            console.log('error', e);
          }
        });
      },
      "many items with missing users": function(done) {
        var ids = [UT.uuid(), UT.uuid()];
        var items = [{_key: ids[0]}, {_key: ids[1]}];
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.users'){
            try {
              assert.equals(message.args.length, 1);
              assert.equals(2, message.args[0].length);
              callback([{uuid: ids[1], username: 'testme', avatar: 'http://avatar.com/me'}]);
              done();
            } catch(e) {
              console.log(e);
            }
          }
        });
        this.post.users(items, function(users, theItems){
          assert.equals(1, users.length);
          assert.equals(1, items.length);
          assert.equals(ids[1], users[0].uuid);
          assert.equals(users[0], items[1]);
          assert.equals(theItems[0], items[1]);
        });
      },
      "isOwner(user) and isCurrentUser(user)":  function(){
        var currentUser = new UT.User({uuid: UT.uuid(), username: 'a'});
        var postUser = new UT.User({uuid: UT.uuid(), username: 'a'});
        setupExpression(this, {currentUserId: currentUser.uuid, postUserId: postUser.uuid});
        refute(this.post.isOwner(currentUser));
        refute(this.post.isCurrentUser(postUser));
        assert(this.post.isOwner(postUser));
        assert(this.post.isCurrentUser(currentUser));
      }
    }
  });
})();