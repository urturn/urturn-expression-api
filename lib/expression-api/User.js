; (function(){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this.avatar = userDescriptor.avatar;
    this._id = userDescriptor.userId;
  };

  UT.User.prototype.marshall = function(){
    return { _type: 'user', userId: this._id };
  };
})();