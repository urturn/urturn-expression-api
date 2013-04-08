(function(){
  "use strict";

  buster.testCase('UT.User', {
    'setUp': function() {
      this.userId = UT.uuid();
      this.username = 'testme';
      this.avatar = 'http://cloud/avatar.jpg';
      this.user = new UT.User({userId: this.userId, username: this.username, avatar: this.avatar});
    },
    'created from json': function() {
      buster.assert.equals(this.user.username, this.username);
      buster.assert.equals(this.user.avatar(), this.avatar);
      buster.assert.equals(this.user._id, this.userId);
    },
    'cannot be created from nothing': function() {
      buster.assert.exception(function(){ new UT.User(); }, 'TypeError');
    },
    'marshalling': function() {
      buster.assert.equals(this.user.marshall(), {_type: 'user', userId: this.userId});
    }
  });
})();