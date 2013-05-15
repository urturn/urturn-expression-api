UT.Expression.ready(function(post){
  var div = document.createElement('div');
  div.id = 'mocha';
  document.body.appendChild(div);

  mocha
    // .globals(['Wombat', 'Apple']) // acceptable globals
    .run(function(){
      var h = div.offsetHeight;
      post.size({
        height: h
      });
      post.valid(true);
      post.node.style.display = 'none';
    });
});