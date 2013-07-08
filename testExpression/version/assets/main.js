UT.Expression.ready(function(post){
  $('#api-version').html(UT.Expression.apiVersion());
  $('#expression-version').html(UT.Expression.version());
  console.log($('.content').height());
  post.size($('.content').get(0).offsetHeight);
  post.valid(true);
});
