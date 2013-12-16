(function(){
  var dataDelegate;
  var data;
  var emptyData;
  var currentUserId;
  var collection;
  var anItem;
  var document_id;

  describe('Collection', function(){
    beforeEach(function(){
      currentUserId = UT.uuid();
      data = fixtures.collectionData.data();
      emptyData = fixtures.collectionData.empty();
      dataDelegate = new CollectionDataDelegate();

      postedMessages = [];
      document_id = UT.uuid();

      collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: currentUserId});
      anItem = {comment: 'hello world', note: 3};
    });

    describe('fit HTML5 storage interface', function() {
      describe('#length', function() {
        beforeEach(function(){
          collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
        });

        it('can be empty', function(){
          expect(collection.length).to.be(0) ;
        });

        it('can have a length', function(){
          collection.setItem('a', {comment: '12'}) ;
          expect(collection.length).to.be(1) ;
          collection.setItem('b', {comment: '14'}) ;
          expect(collection.length).to.be(2) ;
        });
      });
      describe('#key', function() {
        it('return null when index is to high', function() {
          expect(collection.key(10)).to.be(null) ;
        });
        it('return the key name', function() {
          expect(collection.name).to.be('default') ;
          expect(collection.length).to.be(data.items.length) ;
          expect(collection.key(0)).to.be('my-image') ;
        });
      });
      describe('#getItem', function() {
        it('let you retrieve an item', function() {
          expect(collection.getItem('my-image')).to.be.ok();
          expect(collection.getItem('my-image').url).to.be('http://urturn.com/logo.png');
        });
        it('let you use the [] syntax', function() {
          expect(collection['my-image']).to.be.ok();
          expect(collection['my-image']).to.be(collection['my-image']);
        });
        it('let you use the [] syntax on literal object', function() {
          var collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: currentUserId});
          expect(collection.ratio).to.be.ok();
        });
      });
      describe('#setItem', function() {
        it('inserts a new item', function() {
          collection.setItem('item', {comment: 'rulez'}) ;
          expect(collection.length).to.be(data.items.length + 1) ;
        });
        it('updates an existing item', function() {
          collection.setItem('my-image', {comment: 'rulez'}) ;
          expect(collection.length).to.be(data.items.length) ;
          expect(collection.getItem('my-image').comment).to.be('rulez') ;
        });
        it('removes an undefined item', function() {
          expect(collection.getItem('my-image')).to.be.ok();
          collection.setItem('my-image', undefined);
          expect(collection.length).to.be(data.items.length - 1);
          expect(collection.getItem('my-image')).not.to.be.ok();
          collection.save();
          var message = dataDelegate.operations.pop();
          expect(message.items['my-image']).to.be(null);
        });
        it('removes a null item', function() {
          expect(collection.getItem('my-image')).to.be.ok() ;
          collection.setItem('my-image', null) ;
          expect(collection.length).to.be(data.items.length - 1) ;
          expect(collection.getItem('my-image')).not.to.be.ok() ;
          collection.save();
          var message = dataDelegate.operations.pop();
          expect(message.items['my-image']).to.be(null);
        });
        it('do nothing if item is undefined and did not exists', function() {
          collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
          collection.setItem('a', 2);
          collection.setItem('val', undefined);
          expect(collection.length).to.be(1);

          collection.save();
          var message = dataDelegate.operations.pop();
          expect(message).to.be.ok();
          expect(message.items.val).not.to.be.ok();
        });
        it('do nothing if item is null', function() {
          collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
          collection.setItem('a', 2);
          expect(collection.length).to.be(1);
          collection.setItem('val', null);
          expect(collection.length).to.be(1);

          collection.save();
          var message = dataDelegate.operations.pop();
          expect(message).to.be.ok();
          expect(message.items.val).not.to.be.ok();
        });
        it('accept dotted syntax', function() {
          collection.dotSyntax = {comment:'My Object'};
          expect(collection.getItem('dotSyntax')).to.be.ok() ;
          expect(collection.getItem('dotSyntax').comment).to.be('My Object') ;
          collection.save();
          expect(collection.getItem('dotSyntax').comment).to.be('My Object') ;
          expect(collection.getItem('dotSyntax').dotSyntax).not.to.be.ok();
        });
        it('detect object with a _dirty key has keys to update', function() {
          var marshallCalled = 0;
          var item = {
            marshall: function(){
              console.log('SAVE');
              marshallCalled ++;
              return {};
            }
          };
          collection.setItem('tt', item);
          collection.save();
          expect(marshallCalled).to.be(1);

          collection.save();
          expect(marshallCalled).to.be(1);
          item.bob = 'test';
          collection.save();
          expect(marshallCalled).to.be(1);

          item._dirty = true;
          collection.save();
          expect(item._dirty).to.be(undefined);
          expect(marshallCalled).to.be(2);
          expect(item._dirty).not.to.be.ok();
        });
      });
    });

    describe('#getCurrentData', function() {
      it('retrieve the same data as given if no operations occured', function() {
        expect(collection.getCurrentData).to.be.ok();
        var newData = collection.getCurrentData();
        expect(newData).to.be.ok();
        expect(newData.name).to.eql(data.name);
        expect(newData.count).to.eql(data.count);
        expect(newData.operations).to.eql([]);
        expect(newData.items.length).to.eql(data.items.length);
      });
    });
    describe('sanitization', function() {
      beforeEach(function(){
        collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: 'abc'});
        this.doTestWithValue = function(value){
          collection.val = value;
          collection.save();
          var message = dataDelegate.operations.pop();
          expect(message).to.be.ok();
          var val = message.items.val;
          expect(val).not.to.be(null);
          return val;
        };
        this.testLiteralValue = function(value){
          var val = this.doTestWithValue(value);
          expect(val._key).to.be('val');
          expect(val._type).to.be('literal');
          expect(val.value).to.eql(value);
          return val;
        };
      });
      it('sanitize anonymous object with a marshall function', function() {
        collection.val = {a:2, marshall: function(){return {a:2};}};
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        val = message.items.val;
        expect(val).not.to.be(null);
        expect(val.marshall).not.to.be.ok();
        expect(val.a).to.eql(2);
      });
      describe('literal values', function() {
        it('keep empty arrays', function() {
          this.testLiteralValue([]);
        });
        it('serialize arrays', function() {
          this.testLiteralValue([{a:2}]);
        });
        it('keep numbers', function() {
          this.testLiteralValue(2);
          this.testLiteralValue(4.232321312312);
          this.testLiteralValue(-1432.12);
        });
        it('keep string', function() {
          this.testLiteralValue('éàdfQR""*ç∞”⁄‹”⁄');
        });
        it('keep falsy value', function() {
          this.testLiteralValue(false);
          this.testLiteralValue(0);
        });
        it('let marshallable objects as it', function() {
          var k = function(){
            this.marshall = function(){
              return {m:true};
            };
          };
          var expected = new k();
          var val = this.doTestWithValue(expected);
          expect(val.m).to.be(true);
        });
        it('throw away function', function() {
          var val = function(){};
          try{
            var result = this.testLiteralValue(val);
            expect(false).to.be(true);
          } catch(ex){
            expect(ex.message).to.eql('ArgumentError cannot serialize function');
            // ok
          }
        });
      });
    });
    describe('#save', function() {
      it('let you save item after setItem', function() {
        expect(dataDelegate.operations.length).to.be(0);
        collection.setItem('i2', anItem);
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message).not.to.be(null);
        expect(message.name).to.be(collection.name);
        expect(message.items.i2.note).to.be(anItem.note);
      });
      it('let you save image', function() {
        var url = 'http://www.xyz.cz';
        var image = new UT.Image({url: url});
        expect(image.url).to.be(url);

        collection.setItem('img', image);
        var act = collection.getItem('img');
        expect(act.url).to.be(url);
        expect(act.marshall).to.be.ok();

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message.name).to.be(collection.name);
        var img = message.items.img;
        expect(img).to.be.ok();
        expect(typeof img).to.be('object');
        expect(img._type).to.be('image');
        for(var k in img){
          if(typeof img[k] === 'function'){
            throw new Error(k + " is a function and should not be there");
          }
        }
      });
      it('let you save sound', function() {
        var url = 'http://www.xyz.cz';
        var sound = new UT.Sound({url: url});
        expect(sound.url).to.be(url);

        collection.setItem('img', sound);
        var act = collection.getItem('img');
        expect(act.url).to.be(url);
        expect(act.marshall).to.be.ok();

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message.name).to.be(collection.name);
        var img = message.items.img;
        expect(img).to.be.ok();
        expect(img.url).to.be(url);
        expect(img._type).to.be('sound');
        for(var k in img){
          if(typeof img[k] === 'function'){
            throw new Error(k + " is a function and should not be there");
          }
        }
      });
      it('let you save video', function() {
        var url = 'http://www.xyz.cz';
        var video = new UT.Video({url: url});
        expect(video.url).to.be(url);

        collection.setItem('img', video);
        var act = collection.getItem('img');
        expect(act.url).to.be(url);
        expect(act.marshall).to.be.ok();

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message.name).to.be(collection.name);
        var img = message.items.img;
        expect(img).to.be.ok();
        expect(img.url).to.be(url);
        expect(img._type).to.be('video');
        for(var k in img){
          if(typeof img[k] === 'function'){
            throw new Error(k + " is a function and should not be there");
          }
        }
      });
      it('let you save modified item after []=', function() {
        expect(dataDelegate.operations.length).to.be(0);
        collection.i2 = anItem;
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message).not.to.be(null);
        expect(message.name).to.be(collection.name);
        expect(message.items.i2.note).to.be(anItem.note);

        expect(dataDelegate.operations.length).to.be(0);
        collection.save();
        expect(dataDelegate.operations.length).to.be(0);

        collection.i2 = anItem;
        collection.save() ;
        message = dataDelegate.operations.pop();
        expect(message).to.be.ok();
        expect(message).not.to.be(null);
        expect(message.name).to.be(collection.name);
        expect(message.items.i2.note).to.be(anItem.note);
      });
    });
  });
})();