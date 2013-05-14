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

  describe("Post", function(){
    beforeEach(function(){
      this.node = TestHelpers.createExpressionDOM();
    });
    afterEach(function(){
      if(this.node){
        document.body.removeChild(this.node);
      }
      dropListeners();
      UT.Expression._reset();
    });
    describe("collection()", function(){
      it("retrieve a collection given its name", function(){
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
        expect(this.post.collection('default')).to.eql(this.post.storage);
        expect(this.post.collection('testAnotherOne').name).to.eql('testAnotherOne');
      });
    });

    describe("valid", function() {
      it("default state is false", function(){
        setupExpression(this);
        expect(this.post).to.be.ok();
        expect(this.post.valid()).to.be(false);
      });

      it("state can be set to true", function(){
        setupExpression(this);
        expect(this.post).to.be.ok();
        expect(this.post.valid(true)).to.eql(true);
        expect(this.post.valid()).to.eql(true);
        expect(this.post.valid(true)).to.eql(true);
        expect(this.post.valid()).to.eql(true);
      });

      it("state can be set back to false", function(){
        setupExpression(this);
        expect(this.post).to.be.ok();
        expect(this.post.valid(true)).to.eql(true);
        expect(this.post.valid(false)).to.eql(false);
        expect(this.post.valid()).to.eql(false);
      });
    });

    describe("parent collection", function() {
      it("retrieve same data as storage", function(){
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
        expect(col.anObject).to.be.ok();
        expect(col.anObject.plain).to.eql('object');
        expect(col.aString).to.eql('aString');
        expect(col.aNullValue).to.be(null);
        expect(true).to.eql(col.aBoolean);
        expect(2.4).to.eql(col.aNumber);
        expect([1, 'test', {plain: 'object'}]).to.eql(col.anArray);
        // XXX need to test the image
      });
      it("isNull when no parent data", function(){
        setupExpression(this, {parentData: null});
        expect(this.post.collection('parent')).to.be(null);
      });
    });

    describe("dialog/text", function() {
      it("using option hash", function(done){
        setupExpression(this);
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.textInput'){
            expect(message.args[0]).to.eql('default');
            expect(message.args[1]).to.eql(15);
            expect(message.args[2]).to.eql(true);
            expect(callback).to.be.ok();
            callback('hello');
          }
        });
        this.post.dialog('text', {
          value: 'default',
          max: 15,
          multiline: true
        }, function(data){
          expect(data).to.eql('hello');
          done();
        });
      });
      it("using a single callback", function(done){
        setupExpression(this);
        listenToMessage(function(message, callback){
          callback('hello');
        });
        this.post.dialog('text', function(data){
          expect(data).to.eql('hello');
          done();
        });
      });
    });

    describe("save()", function() {
      it("save all collections", function(done){
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
                expect(message.args[1].anObject.hello).to.eql('world');
              } else if (message.args[0] == 'testAnotherOne'){
                testAnotherOneSaved = true;
                expect(message.args[1].aValue.value).to.eql('Hello World');
              } else {
                expect().fail('cannot guess arguments', message);
              }
            }
          } catch (e){
            done(e);
          }
          if(defaultSaved && testAnotherOneSaved){
            done();
          }
        });
        this.post.collection('testAnotherOne').aValue = 'Hello World';
        this.post.collection('default').anObject = {hello: 'world'};
        this.post.save();
      });
    });
    describe("DEPRECATED resize()", function() {
      beforeEach(function(){
        this.assertHeightMessage = function(expected, done){
          listenToMessage(function(message){
            if(message.methodName == 'container.resizeHeight'){
              try {
                if(expected !== null){
                  expect(message.args[0]).to.eql(expected);
                }
                done();
              } catch(e) {
                done(e);
              }
            }
          });
        };
        setupExpression(this);
      });
      it("with 'auto'", function(done){
        var div = document.createElement('div');
        div.style.height = "233px";
        expect(this.post.node).to.be.ok();
        this.post.node.appendChild(div);
        if(TEST_ENV=='unit'){
          this.assertHeightMessage(233, done);
        } else {
          this.assertHeightMessage(null, done);
        }
        this.post.resize('auto');
      });
      it("with height in pixel", function(done){
        this.assertHeightMessage(532, done);
        this.post.resize(532);
      });
      it("with height in object", function(done){
        this.assertHeightMessage(345, done);
        this.post.resize({height: 345});
      });
      it("with a string height in object", function(done){
        this.assertHeightMessage(123, done);
        this.post.resize({height: '123px'});
      });
    });

    describe("size()", function() {
      beforeEach(function(){
        this.assertHeightMessage = function(expected, done){
          listenToMessage(function(message){
            if(message.methodName == 'container.resizeHeight'){
              try {
                if(expected !== null){
                  expect(message.args[0]).to.eql(expected);
                }
                done();
              } catch(e) {
                done(e);
              }
            }
          });
        };
        setupExpression(this);
      });
      it("with 'auto'", function(done){
        var div = document.createElement('div');
        div.style.height = "233px";
        expect(this.post.node).to.be.ok();
        this.post.node.appendChild(div);
        if(TEST_ENV=='unit'){
          this.assertHeightMessage(233, done);
        } else {
          this.assertHeightMessage(null, done);
        }
        this.post.size('auto');
      });
      it("with height in pixel", function(done){
        this.assertHeightMessage(532, done);
        this.post.size(532);
      });
      it("with height in object", function(done){
        this.assertHeightMessage(345, done);
        this.post.size({height: 345});
      });
      it("with a string height in object", function(done){
        this.assertHeightMessage(123, done);
        this.post.size({height: '123px'});
      });
      it("calls the callback with the new size", function(done){
        this.post.size(333, function(event){
          expect(event.height).to.be.greaterThan(0);
          expect(event.width).to.be.greaterThan(0);
          done();
        });
        listenToMessage(function(message, callback){
          if(message.methodName == 'container.resizeHeight'){
            callback();
          }
        });
      });
      it("retrieve size without arguments", function(done){
        var size = this.post.size(done);
        expect(size.constructor).to.be(UT.ResizeEvent);
      });
    });

    describe("note property", function() {
      it("set to a new string", function(done){
        setupExpression(this);
        listenToMessage(function(message){
          if(message.methodName == 'document.setNote'){
            try {
              expect(message.args[0]).to.eql('Hello World');
              done();
            } catch(e) {
              done(e);
            }
          }
        });
        this.post.note = "Hello World";
      });
      it("set to null", function(done){
        setupExpression(this);
        listenToMessage(function(message){
          if(message.methodName == 'document.setNote'){
            try {
              expect(message.args[0]).to.eql(null);
              done();
            } catch(e) {
              done(e);
            }
          }
        });
        this.post.note = null;
      });
    });
    describe("queueUp()", function() {
      beforeEach(function(){
        setupExpression(this);
      });
      it('can retrieve the number in the queue', function(done){
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.queueUp'){
            try {
              expect(message.args[0]).to.eql('XYZ');
              callback(1);
            } catch(e) {
              done(e);
            }
          }
        });
        this.post.queueUp('XYZ', function(number){
          try {
            expect(number).to.eql(1);
            done();
          } catch(e) {
            done(e);
          }
        });
      });
      it('subsequent call will retrieve the same number', function(done){
        var count = 0;
        var post = this.post;
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.queueUp'){
            try {
              expect(message.args[0]).to.eql('XYZ');
              count ++;
              callback(122);
            } catch (e) {
              done(e);
            }
          }
        });
        post.queueUp('XYZ', function(number){
          try {
            expect(number).to.eql(122);
            expect(count).to.eql(1);
            post.queueUp('XYZ', function(number){
              try {
                expect(number).to.eql(122);
                expect(count).to.eql(1); // did not call the API again.
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
      it('ask ticket in two different queue', function(done){
        var count = 0;
        var post = this.post;
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.queueUp'){
            try {
              count ++;
              callback( (message.args[0] == 'A'? 45 : 42) );
            } catch (e) {
              done(e);
            }
          }
        });
        post.queueUp('A', function(number){
          try {
            expect(number).to.eql(45);
            expect(count).to.eql(1);
            post.queueUp('B', function(number){
              try {
                expect(number).to.eql(42);
                expect(count).to.eql(2); // did not call the API again.
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
    describe("users()", function() {
      beforeEach(function(){
        this.uuid = UT.uuid();
        setupExpression(this, {currentUserId: this.uuid});
        this.currentUserCallback = function(message, callback){
          if(message.methodName == 'document.getUserData'){
            try {
              expect(message.args.length).to.eql(0);
              callback({uuid: this.uuid, username: 'testme', avatar: 'http://avatar.com'});
            } catch(e) {
              expect().fail(e);
            }
          }
        };
        this.oneItemCallback = function(message, callback){
          if(message.methodName == 'document.users'){
            try {
              expect(message.args.length).to.eql(1);
              expect(message.args[0].length).to.eql(1);
              callback([{uuid: this.uuid, username: 'testme', avatar: 'http://avatar.com'}]);
            } catch(e) {
              console.log(e);
              expect().fail(e);
            }
          }
        };
      });
      it("current", function(done){
        listenToMessage(this.currentUserCallback);
        this.post.users('current', function(user){
          try {
            expect(user.constructor).to.eql(UT.User);
            done();
          } catch(e) {
            done(e);
          }
        });
      });
      it("with one item", function(done) {
        var item = {_key: this.uuid, value: '22', _type: 'custom'};
        listenToMessage(this.oneItemCallback);
        this.post.users(item, function(user, theItem){
          try {
            expect(user).to.be.ok();
            expect(user.constructor).to.eql(UT.User);
            expect(theItem).to.eql(item);
            done();
          } catch(e) {
            done(e);
          }
        });
      });

      it("many items retrieve many users", function(done) {
        var ids = [UT.uuid(), UT.uuid()];
        var items = [{_key: ids[0]}, {_key: ids[1]}];
        listenToMessage(function(message, callback){
          if(message.methodName == 'document.users'){
            try {
              expect(message.args.length).to.eql(1);
              expect(message.args[0].length).to.eql(2);
              expect(message.args[0][0]).to.eql(ids[0]);
              expect(message.args[0][1]).to.eql(ids[1]);
              callback([{uuid: ids[1], username: 'testme', avatar: 'http://avatar.com/me'},
                {uuid: ids[0], username: 'testit', avatar: 'http://avatar.com/it'}]);
            } catch(e) {
              console.log('error in callback', e);
            }
          }
        });
        this.post.users(items, function(users, theItems){
          try {
            expect(users.length).to.eql(2);
            expect(ids[0]).to.eql(users[0].uuid);
            expect(ids[1]).to.eql(users[1].uuid);
            expect(users[1].uuid).to.eql(items[1]._key);
            expect(users[0].uuid).to.eql(items[0]._key);
            expect(items[0]).to.eql(theItems[0]);
            expect(items[1]).to.eql(theItems[1]);
            done();
          } catch(e) {
            console.log('error', e);
          }
        });
      });
      it("isOwner(user) and isCurrentUser(user)", function(){
        var currentUser = new UT.User({uuid: UT.uuid(), username: 'a'});
        var postUser = new UT.User({uuid: UT.uuid(), username: 'a'});
        setupExpression(this, {currentUserId: currentUser.uuid, postUserId: postUser.uuid});
        expect(this.post.isOwner(currentUser)).to.be(false);
        expect(this.post.isCurrentUser(postUser)).to.be(false);
        expect(this.post.isOwner(postUser)).to.be.ok();
        expect(this.post.isCurrentUser(currentUser)).to.be.ok();
      });
      if(TEST_ENV !== 'integration'){
        it("missing user for one item", function(done){
          listenToMessage(function(message, callback){
            if(message.methodName == 'document.users'){
              expect(message.args.length).to.eql(1);
              expect(message.args[0].length).to.eql(1);
              expect(message.args[0][1]).to.eql(this.uuid);
              callback([]);
            }
          });
          this.post.users({_key: this.uuid}, function(user, item){
            expect(user).to.be(null);
            expect(item).to.be(null);
            done();
          });
        });

        it("many items with missing users", function(done) {
          var ids = [UT.uuid(), UT.uuid()];
          var items = [{_key: ids[0]}, {_key: ids[1]}];
          listenToMessage(function(message, callback){
            if(message.methodName == 'document.users'){
              try {
                expect(message.args.length).to.eql(1);
                expect(2).to.eql(message.args[0].length);
                callback([{uuid: ids[1], username: 'testme', avatar: 'http://avatar.com/me'}]);
                done();
              } catch(e) {
                done(e);
              }
            }
          });
          this.post.users(items, function(users, theItems){
            expect(1).to.eql(users.length);
            expect(1).to.eql(theItems.length);
            expect(ids[1]).to.eql(users[0].uuid);
            expect(theItems[0]).to.eql(items[1]);
            expect(theItems[0]).to.eql(items[1]);
          });
        });
      }
    });
  });
})();