module('Expression informations');
expTest( "UT.Expression.apiVersion", function(post, done){
  equal(UT.Expression.apiVersion(), '0.8.0-alpha', 'API version match');
  done();
} );

module('Post Size');
expTest( 'Get Size informations', function(post, done){
  var size = post.size();
  console.log('height', window.innerHeight);
  ok(size.height > 0, "height is greater than 0");
  ok(size.width > 0, "width is greater than 0");
  done();
});

expTest( 'Post resize', function(post, done){
  post.resize({height: 233});
  var width = post.size().width;
  var cb = function(size){
    equal(size.height, 233, 'Correct height is retrieved');
    equal(size.width, width, 'Width did not changed');
    post.off('resize', cb);
    done();
  };
  post.on('resize', cb);
} );

asyncTest('end', function(){
  UT.Expression.ready(function(post){
    setTimeout(function(){
      post.size(document.height);
      ok('done');
      start();
    }, 100);
  });
});

function expTest(name, testFunc) {
  asyncTest(name, function(){
    UT.Expression.ready( function(post) {
      try {
        testFunc(post, function(error) {
          if(error){
            ok(false, error);
          }
          start();
        });
      } catch(e) {
        ok(false, e);
        start();
      }
    });
  });
}