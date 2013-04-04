(function(){
  "use strict";
  var dataDelegate;
  var data;
  var emptyData;
  var currentUserId;
  var collection;
  var anItem;
  var document_id;

  var publicFixture = function(theData){
    theData = theData || data;
    return new UT.PublicCollection({document_id: document_id, data: theData, delegate: dataDelegate, currentUserId: currentUserId});
  };

  buster.testCase('PublicCollection', {
    setUp: function(){
      currentUserId = UT.uuid();
      data = fixtures.collectionData.myCollection(currentUserId);
      emptyData = fixtures.collectionData.empty();
      dataDelegate = new CollectionDataDelegate();
      document_id = UT.uuid();

      collection = publicFixture();
      anItem = {comment: 'hello world', note: 3};
    },
    '#average': {
      'retrieve average on a specific field': function(){
        expect(collection).toBeDefined();
        expect(collection.average('note')).toBe(4.25);
        expect(collection.average('inexistant')).not.toBeDefined();
      },

      'is updated when data are added': function(){
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).toBe(4.0);
      },

      'is maintained when data are re-added': function(){
        collection.setUserItem({note: 3.5});
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).toBe(4.0);
      },

      'support removing the first element': function(){
        collection = publicFixture({
          // name of the colleciton
          name: 'emptyCollection',
          count: 0,
          public: true,
          items: [],
          operations: [{ operation: "average", field: "note", average: -1, average_count: 0 }],
          definition: {fields: [{name: 'note', type: 'number', operations: ['average']}]}
        });
        expect(collection.count()).toBe(0);
        expect(collection.average('note')).toBe(-1);
        collection.setUserItem({note: 4.2});
        expect(collection.average('note')).toEqual(4.2);
        collection.setUserItem(null);
        expect(collection.average('note')).toEqual(-1);
        expect(collection.getCurrentData().operations[0].average_count).toEqual(0);
        expect(collection.getCurrentData().operations[0].average).toEqual(-1);
      },

      'support updating the first element': function(){
        collection = publicFixture({
          // name of the colleciton
          name: 'emptyCollection',
          count: 0,
          public: true,
          items: [],
          operations: [{ operation: "average", field: "note", average: -1, average_count: 0 }],
          definition: {fields: [{name: 'note', type: 'number', operations: ['average']}]}
        });
        expect(collection.count()).toBe(0);
        expect(collection.average('note')).toBe(-1);
        collection.setUserItem({note: 4.2});
        expect(collection.average('note')).toEqual(4.2);
        collection.setUserItem({note: 3.2});
        expect(collection.average('note')).toEqual(3.2);
        expect(collection.getCurrentData().operations[0].average_count).toEqual(1);
        expect(collection.getCurrentData().operations[0].average).toEqual(3.2);
      },

      'support updates when value change by reference': function(){
        collection.setUserItem({note: 1});
        var baseAverage = collection.average('note');
        var ref = {note: baseAverage + 1};
        collection.setUserItem(ref);
        expect(collection.average('note')).not.toEqual(baseAverage);
        ref.note = 1;
        collection.setUserItem(ref);
        expect(collection.average('note')).toEqual(baseAverage);
      },

      'can be empty': function(){
        expect(collection.average('emptyField')).toBe(-1);
        collection.setUserItem({emptyField: 12});
        expect(collection.average('emptyField')).toBe(12);
      }
    },

    '#count': {
      'returns the number of record without arguments': function(){
        expect(collection.count()).toBe(data.count);
      },

      'returns the count of record that setted a properties': function(){
        expect(collection.count('love_it')).toBe(5);
        expect(collection.count('leave_it')).toBe(3);
      },
      'updates after insert': function(){
        data.items = [];
        collection = publicFixture(data);

        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem({love_it: 'a'});
        expect(collection.count('love_it')).toBe(love_it + 1);
        expect(collection.count('leave_it')).toBe(leave_it);
      },

      'updates after update': function(){
        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem({leave_it: true});
        expect(collection.count('love_it')).toBe(love_it - 1);
        expect(collection.count('leave_it')).toBe(leave_it + 1);
      },

      'updates after delete': function(){
        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem(undefined);
        expect(collection.count('love_it')).toBe(love_it - 1);
      }
    },

    '#sum': {
      'updates on insert': function(){
        data.items = [];
        collection = publicFixture(data);
        var sum = collection.sum('spentMoney');
        collection.setUserItem({spentMoney: 22});
        expect(collection.sum('spentMoney')).toBe(sum + 22);
      },

      'updates on update': function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getUserItem();
        collection.setUserItem({spentMoney: 12});
        expect(collection.sum('spentMoney')).toBe(sum - item.spentMoney + 12);
      },

      'updates on delete': function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getUserItem();
        collection.setUserItem(undefined);
        expect(collection.sum('spentMoney')).toBe(sum - item.spentMoney);
      }
    },

    '#setUserItem': {
      'let you add an item': function(){
        expect(collection).toBeDefined();
        collection.setUserItem(anItem);
      },

      'throw an exception if the item contains wrong values in some field': function(){
        var values = ['wrong', {i:1}];
        try {
          collection.setUserItem({note: 'wrong'});
          fail('Should throw an exception');
        } catch (e){
          expect(e.message).toBe('TypeError');
        }
      },

      'define the key to the user id': function(){
        var item = {note: 4} ;
        var result = collection.setUserItem(item);
        expect(result).toBeDefined();
        expect(result.note).toBe(4);
        var result2 = collection.setUserItem({note: 5});
        var result3 = collection.getUserItem();
        expect(result3.note).toBe(result2.note);

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message.items[currentUserId]).toBeDefined();
        expect(message.items[currentUserId].note).toBe(5);
      },

      'effects on average': {
        'supports adding an item': function(){
          collection.setUserItem({note: 3.5});
          expect(collection.average('note')).toBe(4.0);
        },
        'supports updating an item': function(){
          collection.setUserItem({note: 5.5});
          expect(collection.average('note')).toBe(5.0);
        },
        'supports updating without the field': function(){
          collection.setUserItem({comment: 'ciao'});
          expect(collection.average('note')).toBe(4.5);
        },
        'supports deleting an item': function(){
          expect(collection.average('note')).toBe(4.25);
          expect(collection.count('note')).toBe(2);
          expect(collection.getUserItem().note).toBe(4.0);
          collection.setUserItem(null);
          expect(collection.average('note')).toBe(4.5);
        }
      }
    },

    '#getCurrentData': {
      'retrieve the same data as given if no operations occured': function(){
        expect(collection.getCurrentData).toBeDefined();
        var newData = collection.getCurrentData();
        expect(newData).toBeDefined();
        expect(newData.name).toEqual(data.name);
        expect(newData.count).toEqual(data.count);
        expect(newData.operations).toEqual(data.operations);
        expect(newData.items.length).toEqual(data.items.length);
      },

      'retrieve updated data after addition': function(){
        data.items = [];
        collection = publicFixture(data);
        expect(collection.getCurrentData).toBeDefined();
        var oldAverage = collection.average('note');
        collection.setUserItem({note: 6});
        var newAverage = collection.average('note');
        var newData = collection.getCurrentData();
        expect(newAverage).not.toEqual(oldAverage);
        expect(newData.operations).not.toEqual(data.operations);
        expect(newData.items.length).not.toEqual(data.items.length);
      }
    },

    'find recent': {
      'retrieve default items': function(done){
        collection.find(function(items){
          expect(items).toBeDefined();
          var item = items[0];
          expect(item).toBeDefined();
          done();
        });
        expect(dataDelegate.operations.length).toEqual(1);
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).toEqual({filters:{recent: true}});
        expect(op.name).toEqual(collection.name);
        expect(op.callback).toBeDefined();
        op.callback(result);
      },

      'retrieve most recent items': function(){
        collection.find('recent', function(items){});
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).toEqual({filters:{recent: true}});
        expect(op.name).toEqual(collection.name);
        expect(op.callback).toBeDefined();
        op.callback(result);
      },

      'retrieve friends items': function(){
        collection.find('friends', function(items){});
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).toEqual({filters:{friends: true}});
        expect(op.name).toEqual(collection.name);
        expect(op.callback).toBeDefined();
        op.callback(result);
      },

      'throw an error if no callback': function(){
        expect(function(){collection.find();}).toThrow('Error');
        expect(function(){collection.find('recent');}).toThrow('Error');
        expect(function(){collection.find();}).toThrow('Error');
        expect(function(){collection.find('recent', 'bis');}).toThrow('Error');
      },

      'throw an error with unknown filters': function(){
        expect(function(){collection.find('x', function(){});}).toThrow('Error');
      }
    }
  });
})();