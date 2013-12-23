(function(){
  "use strict";

  describe('UT.User', function() {
    beforeEach(function() {
      this.uuid = UT.uuid();
      this.username = 'testme';
      this.avatar = 'http://cloud/avatar.jpg';
      this.defaultData = {uuid: this.uuid, username: this.username, avatar: this.avatar};
      this.user = new UT.User(this.defaultData);
    });
    it('created from json', function() {
      expect(this.user.username).to.eql(this.username);
      expect(this.user.avatar()).to.eql(this.avatar);
      expect(this.user.uuid).to.eql(this.uuid);
    });
    it('cannot be created from nothing', function() {
      expect(function(){ new UT.User(); }).to.throwException('TypeError');
    });
    it('migth contains numberOfPost', function(){
      this.defaultData.numberOfPost = 100;
      var u = new UT.User(this.defaultData);
      expect(u.numberOfPost).to.be(100);
    });
    it('migth contains numberOfUse', function(){
      this.defaultData.numberOfUse = 50;
      var u = new UT.User(this.defaultData);
      expect(u.numberOfUse).to.be(50);
    });
    it('marshalling', function() {
      expect(this.user.toJSON()).to.eql({_type: 'user', uuid: this.uuid});
    });
  });
})();