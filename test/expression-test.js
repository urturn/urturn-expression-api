
buster.testCase('UT.Expression', {
  setUp: function(){
    this.node = createExpressionDOM();
  },
  tearDown: function(){
    UT.Expression._reset();
  },
  'ready callback': {
    'has a ready event that is called with an instance of expression': function(done){
      var readyFunc = function(expression_instance){
        try {
          buster.assert(expression_instance);
          buster.assert(expression_instance.fire);
          expression_instance.off('ready', readyFunc);
          done();
        } catch (e) {
          done(e);
        }
      };
      UT.Expression.ready(readyFunc);
      UT.Expression._dispatch({type: 'ready', options: {collections:[]}});
      var expression = UT.Expression._postInstance();
      buster.assert(expression);
      expression.fire('ready', expression);
    }
  }
});