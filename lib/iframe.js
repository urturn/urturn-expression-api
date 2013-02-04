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

UT.Expression._getInstance();