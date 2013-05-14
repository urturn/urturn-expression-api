UT.Expression.ready(function(post){
  describe('UT.Post.scroll()', function(){
    it('should return scroll informations', function(){
      var value = post.scroll();
      expect(value).to.be.ok();
      expect(value.scrollTop).to.eql(0);
      expect(value.scrollBottom).to.be.greaterThan(0);
    });
    it('let you set a new size', function(done){
      var cb = function(size){
        var w = post.size().width;
        expect(size.height).to.eql(233);
        expect(size.width).to.eql(w);
        post.off('resize', cb);
        done();
      };
      post.on('resize', cb);
      post.resize({height: 233});
    });
  });
});
