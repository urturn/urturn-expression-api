buster.spec.expose();

describe('collections', function(){
  var dataDelegate;
  var data, emptyCollectionData, storageCollectionData;
  var currentUserId;

  beforeEach(function(){
    currentUserId = '4b78196c-d84f-4131-ae00-fcce5ac1a9cc';
    storageCollectionData = {
      name: 'default',
      items: [
      {
        _type: 'image',
        _key: 'my-image',
        _user_id: '4b78196c-d84f-4131-ae00-fcce5ac1a9cc',
        media_id: 'xxxx-aaaa-vvvv-cccc',
        url: 'http://urturn.com/logo.png'
      },
      {
        __type: 'literal',
        _key: 'ratio',
        value: 9.233342342
      }
      ]
    };
    storageCollectionData.count = storageCollectionData.items.length;

    data = {
      // name of the colleciton
      name: 'my-collection',
      count: 453000,
      items: [{
        _type: "custom",
        _key: "my-item",
        _user_id: "4b78196c-d84f-4131-ae00-fcce5ac1a9cc",
        note: 4
      },{
        _type: "custom",
        _key: "my-appreciation",
        _user_id: "4b78196c-d84f-4131-ae00-fcce5ac1a9cc",
        love_it: true
      },{
        _type: "custom",
        _key: "my-sum",
        _user_id: "4b78196c-d84f-4131-ae00-fcce5ac1a9cc",
        spentMoney: 98.20
      }],
      // operations on field
      operations: [
        {
          operation: "average",
          field: "note",
          average: 4.25,
          average_count: 2
        },{
          operation: "count",
          field: "note",
          count: 2
        },{
          operation: "count",
          field: "leave_it",
          count: 3
        },{
          operation: "count",
          field: "love_it",
          count: 5
        },{
          operation: "sum",
          field: "spentMoney",
          sum: 1233.30
        },{
          operation: "average",
          field: "emptyField",
          average: -1,
          average_count: 0
        },{
          operation: "sum",
          field: "emptyField",
          sum: 0
        }
      ],
      definition: {
        fields: [
          {name: 'note', type: 'number', operations: ['average', 'count']},
          {name: 'love_it', type: 'boolean', operations: ['count']},
          {name: 'leave_it', type: 'boolean', operations: ['count']},
          {name: 'comment', type: 'string'},
          {name: 'spentMoney', type: 'number', operations: ['sum']},
          {name: 'emptyField', type: 'number', operations: ['sum', 'average']}
        ]
      }
    };

    emptyCollectionData = {
      name: 'empty-collection',
      count: 0,
      definition: {
        fields: [
          {name: 'comment', type: 'string'}
        ]
      }
    };

    dataDelegate = {
      operations: [],
      save: function(collectionName, items) {
        this.operations.push({name: collectionName, items: items});
      }
    } ;
  });

  describe('CollectionStore', function(){
    var collections, document_id;
    beforeEach(function(){
      document_id = '123456-1234-1234-12345678';
      collections = new UT.CollectionStore({document_id: document_id, data: [data], delegate: dataDelegate, currentUserId: 'abc'});
    });

    describe('#get', function(){
      it('retrieves a collection', function(){
        var collection = collections.get('my-collection');
        expect(collection).toBeDefined();
        expect(collection.name).toBe('my-collection');
      });
    });
  });

  describe('Collection', function(){
    var collection, anItem, document_id;

    beforeEach(function(){
      postedMessages = [];
      document_id = '123456-1234-1234-12345678';

      collection = new UT.Collection({document_id: document_id, data: data, delegate: dataDelegate, currentUserId: 'abc'});
      anItem = {comment: 'hello world', note: 3};
    });

    describe('fit HTML5 storage interface', function(){
      describe('#length', function(){
        beforeEach(function(){
          collection = new UT.Collection({document_id: document_id, data: emptyCollectionData, delegate: dataDelegate, currentUserId: 'abc'});
        });

        it('can be empty', function(){
          expect(collection.length).toBe(0) ;
        }) ;

        it('can have a length', function(){
          collection.setItem('a', {toto: 12}) ;
          expect(collection.length).toBe(1) ;
          collection.setItem('b', {toto: 14}) ;
          expect(collection.length).toBe(2) ;
        });
      });

      describe('#key', function(){
        it('return null when index is to high', function() {
          expect(collection.key(10)).toBeNull() ;
        });

        it('return the key name', function() {
          expect(collection.name).toBe('my-collection') ;
          expect(collection.length).toBe(data.items.length) ;
          expect(collection.key(0)).toBe('my-item') ;
        });
      });
      describe('#getItem', function() {
        it('let you retrieve an item', function(){
          expect(collection.getItem('my-item')).toBeDefined();
          expect(collection.getItem('my-item').note).toBe(4);
        });

        it('let you use the [] syntax', function() {
          expect(collection['my-item']).toBeDefined();
          expect(collection['my-item']).toBe(collection['my-item']);
        });

        it('let you use the [] syntax on literal object', function() {
          var collection = new UT.Collection({document_id: document_id, data: storageCollectionData, delegate: dataDelegate, currentUserId: currentUserId});
          expect(collection.ratio).toBeDefined();
        });
      });

      describe('#setItem', function() {
        it('inserts a new item', function(){
          collection.setItem('item', {comment: 'rulez'}) ;
          expect(collection.length).toBe(data.items.length + 1) ;
        }) ;

        it('updates an existing item', function() {
          collection.setItem('my-item', {comment: 'rulez'}) ;
          expect(collection.length).toBe(data.items.length) ;
          expect(collection.getItem('my-item').comment).toBe('rulez') ;
        }) ;

        it('removes an item', function() {
          expect(collection.getItem('my-item')).toBeDefined() ;
          collection.setItem('my-item', null) ;
          expect(collection.length).toBe(data.items.length - 1) ;
          expect(collection.getItem('my-item')).not.toBeDefined() ;
        }) ;

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
        expect(newData.operations).toEqual(data.operations);
        expect(newData.items.length).toEqual(data.items.length);
      });

      it('retrieve updated data after addition', function(){
        expect(collection.getCurrentData).toBeDefined();
        var oldAverage = collection.average('note');
        collection.setItem('another-item', {note: 6});
        var newAverage = collection.average('note');
        var newData = collection.getCurrentData();
        expect(newAverage).not.toEqual(oldAverage);
        expect(newData.operations).not.toEqual(data.operations);
        expect(newData.items.length).not.toEqual(data.items.length);
      });
    });

    describe('#average', function(){
      it('retrieve average on a specific field', function(){
        expect(collection).toBeDefined();
        expect(collection.average('note')).toBe(4.25);
        expect(collection.average('inexistant')).not.toBeDefined();
      });

      it('is updated when data are added', function(){
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).toBe(4.0);
      });

      it('is maintained when data are re-added', function(){
        collection.setUserItem({note: 3.5});
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).toBe(4.0);
      });

      it('can be empty', function(){
        expect(collection.average('emptyField')).toBe(-1);
        collection.setUserItem({emptyField: 12});
        expect(collection.average('emptyField')).toBe(12);
      });
    });

    describe('#count', function(){
      it('returns the number of record without arguments', function(){
        expect(collection.count()).toBe(data.count);
      });

      it('returns the count of record that setted a properties', function(){
        expect(collection.count('love_it')).toBe(5);
        expect(collection.count('leave_it')).toBe(3);
      });
      it('updates after insert', function(){
        count = collection.count();
        love_it = collection.count('love_it');
        leave_it = collection.count('leave_it');

        collection.setItem('i1', {love_it: 'a'});
        expect(collection.count('love_it')).toBe(love_it + 1);
        expect(collection.count('leave_it')).toBe(leave_it);

        collection.setItem('i2', {leave_it: true});
        expect(collection.count('love_it')).toBe(love_it + 1);
        expect(collection.count('leave_it')).toBe(leave_it + 1);

        collection.setItem('i3', {love_it: -1, leave_it: 2});
        expect(collection.count('love_it')).toBe(love_it + 2);
        expect(collection.count('leave_it')).toBe(leave_it + 2);

        collection.setItem('i4', {love_it: null, leave_it: undefined});
        expect(collection.count('love_it')).toBe(love_it + 2);
        expect(collection.count('leave_it')).toBe(leave_it + 2);
      });

      it('updates after update', function(){
        count = collection.count();
        love_it = collection.count('love_it');
        leave_it = collection.count('leave_it');

        collection.setItem('my-appreciation', {leave_it: true});
        expect(collection.count('love_it')).toBe(love_it - 1);
        expect(collection.count('leave_it')).toBe(leave_it + 1);
      });

      it('updates after delete', function(){
        count = collection.count();
        love_it = collection.count('love_it');
        leave_it = collection.count('leave_it');

        collection.setItem('my-appreciation', null);
        expect(collection.count('love_it')).toBe(love_it - 1);
      });
    });

    describe('#sum', function(){
      it('updates on insert', function(){
        var sum = collection.sum('spentMoney');
        collection.setItem('i1', {spentMoney: 22});
        expect(collection.sum('spentMoney')).toBe(sum + 22);
      });

      it('updates on update', function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getItem('my-sum');
        collection.setItem('my-sum', {spentMoney: 12});
        expect(collection.sum('spentMoney')).toBe(sum - item.spentMoney + 12);
      });

      it('updates on delete', function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getItem('my-sum');
        collection.setItem('my-sum', null);
        expect(collection.sum('spentMoney')).toBe(sum - item.spentMoney);
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

    describe('#setUserItem', function(){
      it('let you add an item', function(){
        expect(collection).toBeDefined();
        collection.setUserItem(anItem);
      });

      it('throw an exception if the item contains wrong values in some field', function(){
        var values = ['wrong', {i:1}];
        try {
          collection.setUserItem({note: 'wrong'});
          fail('Should throw an exception');
        } catch (e){
          expect(e.message).toBe('TypeError');
        }
      });

      it('define the key to the user id', function(){
        var item = {note: 4} ;
        result = collection.setUserItem(item);
        expect(result).toBeDefined();
        expect(result.note).toBe(4);
        expect(result._key).toBeDefined();

        result2 = collection.setUserItem({note: 5});
        expect(result2._key).toBe(result._key);

        result3 = collection.getUserItem();
        expect(result3.note).toBe(result2.note);
        expect(result3._key).toBe(result2._key);
      });

      describe('effects on average', function(){
        it('supports adding an item', function(){
          collection.setUserItem({note: 3.5});
          expect(collection.average('note')).toBe(4.0);
        });
        it('supports updating an item', function(){
          collection.setItem('my-item', {note: 5.5});
          expect(collection.average('note')).toBe(5.0);
        });
        it('supports updating without the field', function(){
          collection.setItem('my-item', {comment: 'ciao'});
          expect(collection.average('note')).toBe(4.5);
        });
        it('supports deleting an item', function(){
          collection.setItem('some', {note: 3.5});
          expect(collection.average('note')).toBe(4.0);
          collection.setItem('some', null);
          expect(collection.average('note')).toBe(4.25);
        });
      });
    });
  });
});