describe('UT.Expression', function() {
  beforeEach(function() {
    this.node = TestHelpers.createExpressionDOM();
  });
  afterEach(function() {
    UT.Expression._reset();
  });
  describe('ready callback', function() {
    it('has a ready event that is called with an instance of expression', function(done){
      var readyFunc = function(expression_instance){
        try {
          expect(expression_instance).to.be.ok();
          expect(expression_instance.fire).to.be.ok();
          expression_instance.off('ready', readyFunc);
          done();
        } catch (e) {
          done(e);
        }
      };
      UT.Expression.ready(readyFunc);
      UT.Expression._dispatch({type: 'ready', options: {collections:[]}});
      var expression = UT.Expression._postInstance();
      expect(expression).to.be.ok();
      expression.fire('ready', expression);
    });
  });
});