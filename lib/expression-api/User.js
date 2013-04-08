; (function(){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this._id = userDescriptor.userId;
    this.avatar = function(){
      return userDescriptor.avatar;
    };
  };

  UT.User.prototype.marshall = function(){
    return { _type: 'user', userId: this._id };
  };
})();