it('queueUp a number', function(done, post) {
  var result = -1;
  post.queueUp('XYZ', function(number){
    result = number;
    ok(number > -1, "The number is queued");

    post.queueUp('XYZ', function(number){
      equal(number, result);
      post.queueUp('Another One', function(number){
        ok(number != result, "another queue, another number");
        done();
      });
    });
  });
});

/*
it('scroll to specific position', function(done, post) {
  post.resize(2000);
  post.scroll({top: 200}, function(scrollEvent){
    equal(scrollEvent.scrollTop, 200);
    equal(post.node.offsetTop, 200);
    done();
  });
});
*/