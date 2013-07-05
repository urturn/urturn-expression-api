describe('UT.Expression', function() {
  beforeEach(function() {
    this.node = TestHelpers.createExpressionDOM();
  });
  afterEach(function() {
    TestHelpers.resetExpressionEnv();
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
          if(expression_instance) {
            expression_instance.off('ready', readyFunc);
          }
          done(e);
        }
      };
      UT.Expression.ready(readyFunc);
      UT.Expression._dispatch({type: 'ready', options: {collections:[]}});
      var post = UT.Expression._postInstance();
      expect(post).to.be.ok();
    });
  });
  describe('apiVersion()', function(){
    it('returns the static API Version before UT.ready', function() {
      expect(UT.Expression.apiVersion()).to.eql('0.0.0');
    });
    it('still return the static API Version after UT.ready', function() {
      TestHelpers.setupExpression(this, {apiVersion: '1.2.3'});
      expect(UT.Expression.apiVersion()).to.be('0.0.0');
    });
  });
  describe('version()', function(){
    it('returns null if expression is not ready', function() {
      expect(UT.Expression.version()).to.be(null);
    });

    it('returns the expression version if expression is ready', function() {
      TestHelpers.setupExpression(this, {version: '1.2.3'});
      expect(UT.Expression.version()).to.be('1.2.3');
    });
  });
});