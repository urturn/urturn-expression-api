; (function(){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this.avatar = function(){
      return userDescriptor.avatar;
    };
    // Might not be set
    this.uuid = userDescriptor.uuid;
    this.numberOfPost = userDescriptor.numberOfPost;
    this.numberOfUse = userDescriptor.numberOfUse;
  };

  UT.User.prototype.marshall = function(){
    return { _type: 'user', uuid: this.uuid };
  };
})();