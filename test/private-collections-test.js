buster.spec.expose();

describe('Collection', function(){

  var dataDelegate;
  var data;
  var emptyData;
  var currentUserId;
  var collection;
  var anItem;
  var document_id;

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

  describe('fit HTML5 storage interface', function(){
    describe('#length', function(){
      beforeEach(function(){
        collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
      });

      it('can be empty', function(){
        expect(collection.length).toBe(0) ;
      }) ;

      it('can have a length', function(){
        collection.setItem('a', {comment: '12'}) ;
        expect(collection.length).toBe(1) ;
        collection.setItem('b', {comment: '14'}) ;
        expect(collection.length).toBe(2) ;
      });
    });

    describe('#key', function(){
      it('return null when index is to high', function() {
        expect(collection.key(10)).toBeNull() ;
      });

      it('return the key name', function() {
        expect(collection.name).toBe('default') ;
        expect(collection.length).toBe(data.items.length) ;
        expect(collection.key(0)).toBe('my-image') ;
      });
    });
    describe('#getItem', function() {
      it('let you retrieve an item', function(){
        expect(collection.getItem('my-image')).toBeDefined();
        expect(collection.getItem('my-image').url).toBe('http://urturn.com/logo.png');
      });

      it('let you use the [] syntax', function() {
        expect(collection['my-image']).toBeDefined();
        expect(collection['my-image']).toBe(collection['my-image']);
      });

      it('let you use the [] syntax on literal object', function() {
        var collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: currentUserId});
        expect(collection.ratio).toBeDefined();
      });
    });

    describe('#setItem', function() {
      it('inserts a new item', function(){
        collection.setItem('item', {comment: 'rulez'}) ;
        expect(collection.length).toBe(data.items.length + 1) ;
      }) ;

      it('updates an existing item', function() {
        collection.setItem('my-image', {comment: 'rulez'}) ;
        expect(collection.length).toBe(data.items.length) ;
        expect(collection.getItem('my-image').comment).toBe('rulez') ;
      }) ;

      it('removes an undefined item', function() {
        expect(collection.getItem('my-image')).toBeDefined();
        collection.setItem('my-image', undefined);
        expect(collection.length).toBe(data.items.length - 1);
        expect(collection.getItem('my-image')).not.toBeDefined();
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message.items['my-image']).toBeDefined();
        expect(message.items['my-image']).toBeNull();
      });

      it('removes a null item', function() {
        expect(collection.getItem('my-image')).toBeDefined() ;
        collection.setItem('my-image', null) ;
        expect(collection.length).toBe(data.items.length - 1) ;
        expect(collection.getItem('my-image')).not.toBeDefined() ;
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message.items['my-image']).toBeDefined();
        expect(message.items['my-image']).toBeNull();
      });

      it('do nothing if item is undefined and did not exists', function(){
        collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
        collection.setItem('a', 2);
        collection.setItem('val', undefined);
        expect(collection.length).toBe(1);

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).toBeDefined();
        expect(message.items.val).not.toBeDefined();
      });

      it('do nothing if item is null', function(){
        collection = new UT.Collection({document_id: document_id, data: emptyData, delegate: dataDelegate, currentUserId: 'abc'});
        collection.setItem('a', 2);
        expect(collection.length).toBe(1);
        collection.setItem('val', null);
        expect(collection.length).toBe(1);

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).toBeDefined();
        expect(message.items.val).not.toBeDefined();
      });

      it('accept dotted syntax', function() {
        collection.dotSyntax = {comment:'My Object'};
        expect(collection.getItem('dotSyntax')).toBeDefined() ;
        expect(collection.getItem('dotSyntax').comment).toBe('My Object') ;
        collection.save();
        expect(collection.getItem('dotSyntax').comment).toBe('My Object') ;
        expect(collection.getItem('dotSyntax').dotSyntax).not.toBeDefined();
      }) ;
    });
  });

  describe('#getCurrentData', function(){
    it('retrieve the same data as given if no operations occured', function(){
      expect(collection.getCurrentData).toBeDefined();
      var newData = collection.getCurrentData();
      expect(newData).toBeDefined();
      expect(newData.name).toEqual(data.name);
      expect(newData.count).toEqual(data.count);
      expect(newData.operations).toEqual([]);
      expect(newData.items.length).toEqual(data.items.length);
    });
  });

  describe('sanitization', function(){
    beforeEach(function(){
      collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: 'abc'});
      this.doTestWithValue = function(value){
        collection.val = value;
        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message).toBeDefined();
        var val = message.items.val;
        expect(val).not.toBeNull();
        return val;
      };
      this.testLiteralValue = function(value){
        var val = this.doTestWithValue(value);
        expect(val._key).toBe('val');
        expect(val._type).toBe('literal');
        expect(val.value).toEqual(value);
        return val;
      };
    });
    it('sanitize anonymous object with a marshall function', function(){
      collection.val = {a:2, marshall: function(){return {a:2};}};
      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      val = message.items.val;
      expect(val).not.toBeNull();
      expect(val.marshall).not.toBeDefined();
      expect(val.a).toEqual(2);
    });
    describe('literal values', function(){
      it('keep empty arrays', function(){
        this.testLiteralValue([]);
      });
      it('serialize arrays', function(){
        this.testLiteralValue([{a:2}]);
      });
      it('keep numbers', function(){
        this.testLiteralValue(2);
        this.testLiteralValue(4.232321312312);
        this.testLiteralValue(-1432.12);
      });
      it('keep string', function(){
        this.testLiteralValue('éàdfQR""*ç∞”⁄‹”⁄');
      });
      it('keep falsy value', function(){
        this.testLiteralValue(false);
        this.testLiteralValue(0);
      });
      it('let marshallable objects as it', function(){
        var k = function(){
          this.marshall = function(){
            return {m:true};
          };
        };
        var expected = new k();
        var val = this.doTestWithValue(expected);
        expect(val).toMatch({m:true});
      });
      it('throw away function', function(){
        var val = function(){};
        try{
          var result = this.testLiteralValue(val);
          expect(false).toBe(true);
        } catch(ex){
          expect(ex.message).toEqual('ArgumentError cannot serialize function');
          // ok
        }
      });
    });
  });

  describe('#save', function(){
    it('let you save item after setItem', function(){
      expect(dataDelegate.operations.length).toBe(0);
      collection.setItem('i2', anItem);
      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message).not.toBeNull();
      expect(message.name).toBe(collection.name);
      expect(message.items.i2.note).toBe(anItem.note);
    });

    it('let you save image', function(){
      var url = 'http://www.xyz.cz';
      var image = new UT.Image({url: url});
      expect(image.url).toBe(url);

      collection.setItem('img', image);
      var act = collection.getItem('img');
      expect(act.url).toBe(url);
      expect(act.marshall).toBeDefined();

      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message.name).toBe(collection.name);
      var img = message.items.img;
      expect(img).toBeDefined();
      expect(typeof img).toBe('object');
      expect(img._type).toBe('image');
      for(var k in img){
        if(typeof img[k] === 'function'){
          throw new Error(k + " is a function and should not be there");
        }
      }
    });

    it('let you save sound', function(){
      var url = 'http://www.xyz.cz';
      var sound = new UT.Sound({url: url});
      expect(sound.url).toBe(url);

      collection.setItem('img', sound);
      var act = collection.getItem('img');
      expect(act.url).toBe(url);
      expect(act.marshall).toBeDefined();

      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message.name).toBe(collection.name);
      var img = message.items.img;
      expect(img).toBeDefined();
      expect(img.url).toBe(url);
      expect(img._type).toBe('sound');
      for(var k in img){
        if(typeof img[k] === 'function'){
          throw new Error(k + " is a function and should not be there");
        }
      }
    });

    it('let you save video', function(){
      var url = 'http://www.xyz.cz';
      var video = new UT.Video({url: url});
      expect(video.url).toBe(url);

      collection.setItem('img', video);
      var act = collection.getItem('img');
      expect(act.url).toBe(url);
      expect(act.marshall).toBeDefined();

      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message.name).toBe(collection.name);
      var img = message.items.img;
      expect(img).toBeDefined();
      expect(img.url).toBe(url);
      expect(img._type).toBe('video');
      for(var k in img){
        if(typeof img[k] === 'function'){
          throw new Error(k + " is a function and should not be there");
        }
      }
    });

    it('let you save modified item after []=', function(){
      expect(dataDelegate.operations.length).toBe(0);
      collection.i2 = anItem;
      collection.save();
      var message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message).not.toBeNull();
      expect(message.name).toBe(collection.name);
      expect(message.items.i2.note).toBe(anItem.note);

      expect(dataDelegate.operations.length).toBe(0);
      collection.save();
      expect(dataDelegate.operations.length).toBe(0);

      collection.i2 = anItem;
      collection.save() ;
      message = dataDelegate.operations.pop();
      expect(message).toBeDefined();
      expect(message).not.toBeNull();
      expect(message.name).toBe(collection.name);
      expect(message.items.i2.note).toBe(anItem.note);
    });
  });
});