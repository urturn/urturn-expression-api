it('receive a post instance on ready event', function(done){
  UT.Expression.ready(function(post){
    strictEqual(post.constructor, UT.Post);
    done();
  });
});