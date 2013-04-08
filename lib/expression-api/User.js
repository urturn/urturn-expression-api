; (function(){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this.uuid = userDescriptor.uuid;
    this.avatar = function(){
      return userDescriptor.avatar;
    };
  };

  UT.User.prototype.marshall = function(){
    return { _type: 'user', uuid: this.uuid };
  };
})();