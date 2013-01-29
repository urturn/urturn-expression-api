//= require ../core
//= require ../item-collection
//= require ../item-collection-store
//= require ../container
//= require ../medias
//= require ../document
//= require ../url
//= require webdoc/common/uuid

// Define collections
UT.Expression.extendExpression('collections', function(expression) {
  var documentId = expression.getState('documentId');
  var collections = expression.getState('collections');
  var currentUserId = expression.getState('currentUserId');
  if(documentId && collections) {
    var collectionStore = new UT.CollectionStore({
      data: collections,
      currentUserId: currentUserId,
      delegate: {
        save: function(name, items, callback) {
          UT.Expression._callAPI('collections.save', [name, items], callback);
        },
        authenticate: function(callback) {
          UT.Expression._callAPI('authenticate');
        }
      }
    });
    expression.storage = collectionStore.get('default');
    return collectionStore;
  }
});
