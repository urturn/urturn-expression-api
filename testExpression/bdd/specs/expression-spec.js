describe('UT.Expression', function() {
  describe('apiVersion()', function(){
    it('returns the current API Version', function(){
      expect(UT.Expression.apiVersion()).to.eql('0.8.0-alpha');
    });
  });
});