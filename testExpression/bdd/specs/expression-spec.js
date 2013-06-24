describe('UT.Expression', function() {
  describe('apiVersion()', function(){
    it('returns the current API Version', function(){
      expect(UT.Expression.apiVersion()).to.match(/[0-9]+\.[0-9]+\.[0-9]+(\-a-z0-9+)?/);
    });
  });
});