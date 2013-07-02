/**
 * This file let you describe your javascript library. The convention
 * is to puts all your code in the camelcased version of your expression system name.
 *
 * /!\ Your expression might be loaded multiple time in the
 * same page so you should always limit your DOM queries to expression.getElement().
 */

var Test = function(post){
  this.post = post;
};

Test.prototype = {
  bindEvents: function(){
    var onEventLog = function(name){
      this.post.on(name, function(){
        console.log('received on("'+name+'") with arguments ', arguments, 'on', this);
      });
    }.bind(this);
    onEventLog('resize');
    onEventLog('scroll');
    onEventLog('publish');
    onEventLog('media');
  }
};

UT.Expression.ready(function(post){
  $('.btn-users-empty').on('click', function(){
    post.dialog('users', {users: []}, function(){
      console.log('users dialog called without users.');
    });
  });

  $('.btn-users-current').on('click', function(){
    post.users('current', function(user){
      post.dialog('users', {users: [user.uuid]}, function(){
        console.log('users dialog called with current user uuid');
      });
    });
  });
});