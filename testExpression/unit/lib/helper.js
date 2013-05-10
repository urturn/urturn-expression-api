function it(spec, fn){
  UT.Expression.ready(function(post){
    function done(failureMessage){
      if(failureMessage){
        ok(false, failureMessage);
      }
      post.resize({height: post.node.querySelector('#qunit').offsetHeight});
      start();
    }
    asyncTest(spec, function(){
      try {
        fn(done, post);
      } catch (e) {
        done(e);
      }
    });
  });
}