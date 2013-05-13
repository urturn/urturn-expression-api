UT.Expression.ready(function(post){
  describe('UT.Post.size()', function(){
    it('retrieve size informations', function(){
      post.size({height: 50}, function(done){
        var size = post.size();
        expect(size.height).to.eql(50);
        expect(size.width).to.be.greaterThan(0);
        done();
      });
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
