buster.spec.expose();

describe('CollectionStore', function(){
  var collections;
  var document_id;
  var dataDelegate;
  beforeEach(function(){
    document_id = '123456-1234-1234-12345678';
    dataDelegate = new CollectionDataDelegate();
    collections = new UT.CollectionStore({document_id: document_id, data: [fixtures.collectionData.myCollection(UT.uuid()), fixtures.collectionData.data()], delegate: dataDelegate, currentUserId: UT.uuid()});
  });

  describe('#get', function(){
    it('retrieves a collection', function(){
      var collection = collections.get('my-collection');
      expect(collection).toBeDefined();
      expect(collection.name).toBe('my-collection');
    });
  });
});