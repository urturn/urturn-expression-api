UT.Expression.extendExpression('document', function(expression){
  return {
    getDocumentURL: function() {
      return expression.getState('documentURL');
    },

    getDocumentPrivacy: function() {
      return expression.getState('documentPrivacy');
    }
  };
});