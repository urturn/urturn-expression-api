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

  describe('PublicCollection', function() {
    beforeEach(function(){
      currentUserId = UT.uuid();
      data = fixtures.collectionData.myCollection(currentUserId);
      emptyData = fixtures.collectionData.empty();
      dataDelegate = new CollectionDataDelegate();
      document_id = UT.uuid();

      collection = publicFixture();
      anItem = {comment: 'hello world', note: 3};
    });

    describe('#average', function(){
      it('retrieve average on a specific field', function(){
        expect(collection).to.be.ok();
        expect(collection.average('note')).to.be(4.25);
        expect(collection.average('inexistant')).not.to.be.ok();
      });

      it('is updated when data are added', function(){
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).to.be(4.0);
      });

      it('is maintained when data are re-added', function(){
        collection.setUserItem({note: 3.5});
        collection.setUserItem({note: 3.5});
        expect(collection.average('note')).to.be(4.0);
      });

      it('support removing the first element', function(){
        collection = publicFixture({
          // name of the colleciton
          name: 'emptyCollection',
          count: 0,
          public: true,
          items: [],
          operations: [{ operation: "average", field: "note", average: -1, average_count: 0 }],
          definition: {fields: [{name: 'note', type: 'number', operations: ['average']}]}
        });
        expect(collection.count()).to.be(0);
        expect(collection.average('note')).to.be(-1);
        collection.setUserItem({note: 4.2});
        expect(collection.average('note')).to.eql(4.2);
        collection.setUserItem(null);
        expect(collection.average('note')).to.eql(-1);
        expect(collection.getCurrentData().operations[0].average_count).to.eql(0);
        expect(collection.getCurrentData().operations[0].average).to.eql(-1);
      });

      it('support updating the first element', function(){
        collection = publicFixture({
          // name of the colleciton
          name: 'emptyCollection',
          count: 0,
          public: true,
          items: [],
          operations: [{ operation: "average", field: "note", average: -1, average_count: 0 }],
          definition: {fields: [{name: 'note', type: 'number', operations: ['average']}]}
        });
        expect(collection.count()).to.be(0);
        expect(collection.average('note')).to.be(-1);
        collection.setUserItem({note: 4.2});
        expect(collection.average('note')).to.eql(4.2);
        collection.setUserItem({note: 3.2});
        expect(collection.average('note')).to.eql(3.2);
        expect(collection.getCurrentData().operations[0].average_count).to.eql(1);
        expect(collection.getCurrentData().operations[0].average).to.eql(3.2);
      });

      it('support updates when value change by reference', function(){
        collection.setUserItem({note: 1});
        var baseAverage = collection.average('note');
        var ref = {note: baseAverage + 1};
        collection.setUserItem(ref);
        expect(collection.average('note')).not.to.eql(baseAverage);
        ref.note = 1;
        collection.setUserItem(ref);
        expect(collection.average('note')).to.eql(baseAverage);
      });

      it('can be empty', function(){
        expect(collection.average('emptyField')).to.be(-1);
        collection.setUserItem({emptyField: 12});
        expect(collection.average('emptyField')).to.be(12);
      });
    });

    describe('#count', function() {
      it('returns the number of record without arguments', function(){
        expect(collection.count()).to.be(data.count);
      });

      it('returns the count of record that setted a properties', function(){
        expect(collection.count('love_it')).to.be(5);
        expect(collection.count('leave_it')).to.be(3);
      });
      it('updates after insert', function(){
        data.items = [];
        collection = publicFixture(data);

        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem({love_it: 'a'});
        expect(collection.count('love_it')).to.be(love_it + 1);
        expect(collection.count('leave_it')).to.be(leave_it);
      });

      it('updates after update', function(){
        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem({leave_it: true});
        expect(collection.count('love_it')).to.be(love_it - 1);
        expect(collection.count('leave_it')).to.be(leave_it + 1);
      });

      it('updates after delete', function(){
        var count = collection.count();
        var love_it = collection.count('love_it');
        var leave_it = collection.count('leave_it');

        collection.setUserItem(undefined);
        expect(collection.count('love_it')).to.be(love_it - 1);
      });
    });

    describe('#sum', function() {
      it('updates on insert', function(){
        data.items = [];
        collection = publicFixture(data);
        var sum = collection.sum('spentMoney');
        collection.setUserItem({spentMoney: 22});
        expect(collection.sum('spentMoney')).to.be(sum + 22);
      });

      it('updates on update', function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getUserItem();
        collection.setUserItem({spentMoney: 12});
        expect(collection.sum('spentMoney')).to.be(sum - item.spentMoney + 12);
      });

      it('updates on delete', function(){
        var sum = collection.sum('spentMoney');
        var item = collection.getUserItem();
        collection.setUserItem(undefined);
        expect(collection.sum('spentMoney')).to.be(sum - item.spentMoney);
      });
    });

    describe('#setUserItem', function() {
      it('let you add an item', function(){
        expect(collection).to.be.ok();
        collection.setUserItem(anItem);
      });

      it('throw an exception if the item contains wrong values in some field', function(){
        var values = ['wrong', {i:1}];
        try {
          collection.setUserItem({note: 'wrong'});
          fail('Should throw an exception');
        } catch (e){
          expect(e.message).to.be('TypeError');
        }
      });

      it('define the key to the user id', function(){
        var item = {note: 4} ;
        var result = collection.setUserItem(item);
        expect(result).to.be.ok();
        expect(result.note).to.be(4);
        var result2 = collection.setUserItem({note: 5});
        var result3 = collection.getUserItem();
        expect(result3.note).to.be(result2.note);

        collection.save();
        var message = dataDelegate.operations.pop();
        expect(message.items[currentUserId]).to.be.ok();
        expect(message.items[currentUserId].note).to.be(5);
      });

      describe('effects on average', function() {
        it('supports adding an item', function(){
          collection.setUserItem({note: 3.5});
          expect(collection.average('note')).to.be(4.0);
        });
        it('supports updating an item', function(){
          collection.setUserItem({note: 5.5});
          expect(collection.average('note')).to.be(5.0);
        });
        it('supports updating without the field', function(){
          collection.setUserItem({comment: 'ciao'});
          expect(collection.average('note')).to.be(4.5);
        });
        it('supports deleting an item', function(){
          expect(collection.average('note')).to.be(4.25);
          expect(collection.count('note')).to.be(2);
          expect(collection.getUserItem().note).to.be(4.0);
          collection.setUserItem(null);
          expect(collection.average('note')).to.be(4.5);
        });
      });
    });

    describe('#getCurrentData', function() {
      it('retrieve the same data as given if no operations occured', function(){
        expect(collection.getCurrentData).to.be.ok();
        var newData = collection.getCurrentData();
        expect(newData).to.be.ok();
        expect(newData.name).to.eql(data.name);
        expect(newData.count).to.eql(data.count);
        expect(newData.operations).to.eql(data.operations);
        expect(newData.items.length).to.eql(data.items.length);
      });

      it('retrieve updated data after addition', function(){
        data.items = [];
        collection = publicFixture(data);
        expect(collection.getCurrentData).to.be.ok();
        var oldAverage = collection.average('note');
        collection.setUserItem({note: 6});
        var newAverage = collection.average('note');
        var newData = collection.getCurrentData();
        expect(newAverage).not.to.eql(oldAverage);
        expect(newData.operations).not.to.eql(data.operations);
        expect(newData.items.length).not.to.eql(data.items.length);
      });
    });

    describe('find recent', function() {
      it('retrieve default items', function(done){
        collection.find(function(items){
          expect(items).to.be.ok();
          var item = items[0];
          expect(item).to.be.ok();
          done();
        });
        expect(dataDelegate.operations.length).to.eql(1);
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).to.eql({filters:{recent: true}});
        expect(op.name).to.eql(collection.name);
        expect(op.callback).to.be.ok();
        op.callback(result);
      });

      it('retrieve most recent items', function(){
        collection.find('recent', function(items){});
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).to.eql({filters:{recent: true}});
        expect(op.name).to.eql(collection.name);
        expect(op.callback).to.be.ok();
        op.callback(result);
      });

      it('retrieve friends items', function(){
        collection.find('friends', function(items){});
        var op = dataDelegate.operations.pop();
        var result = [{}];
        expect(op.options).to.eql({filters:{friends: true}});
        expect(op.name).to.eql(collection.name);
        expect(op.callback).to.be.ok();
        op.callback(result);
      });

      it('throw an error if no callback', function(){
        expect(function(){collection.find();}).to.throwException('Error');
        expect(function(){collection.find('recent');}).to.throwException('Error');
        expect(function(){collection.find();}).to.throwException('Error');
        expect(function(){collection.find('recent', 'bis');}).to.throwException('Error');
      });

      it('throw an error with unknown filters', function(){
        expect(function(){collection.find('x', function(){});}).to.throwException('Error');
      });
    });
  });
})();