(function(){
  "use strict";

  describe('UT.User', function() {
    beforeEach(function() {
      this.uuid = UT.uuid();
      this.username = 'testme';
      this.avatar = 'http://cloud/avatar.jpg';
      this.user = new UT.User({uuid: this.uuid, username: this.username, avatar: this.avatar});
    });
    it('created from json', function() {
      expect(this.user.username).to.eql(this.username);
      expect(this.user.avatar()).to.eql(this.avatar);
      expect(this.user.uuid).to.eql(this.uuid);
    });
    it('cannot be created from nothing', function() {
      expect(function(){ new UT.User(); }).to.throwException('TypeError');
    });
    it('marshalling', function() {
      expect(this.user.marshall()).to.eql({_type: 'user', uuid: this.uuid});
    });
  });
})();