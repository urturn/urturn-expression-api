UT.Expression.ready(function(post){
  describe("UT.Post.users()", function() {
    it("might add one to number of use and number of post", function(done){
      post.users('current', function(user){
        if(post.context.editor){
          post.storage.numberOfPost = user.numberOfPost;
          post.storage.numberOfUse = user.numberOfUse;
          post.save();
        } else {
          if(post.isOwner(user)){
            expect(post.storage.numberOfPost).to.be(user.numberOfPost - 1);
            expect(post.storage.numberOfUse).to.be(user.numberOfUse - 1);
          }
        }
        done();
      });
    });

    it("might retrieve current user", function(done){
      post.users('current', function(user){
        expect(user.constructor).to.eql(UT.User);
        expect(typeof user.numberOfPost).to.be('number');
        expect(typeof user.numberOfUse).to.be('number');
        done();
      });
    });

    it("retrieve one user for one item", function(done) {
      var userUuid = UT.uuid();
      var item = {_key: userUuid, value: '22', _type: 'custom'};
      post.users(item, function(user, theItem) {
        expect(item).to.be(theItem);
        expect(user.uuid).to.be(userUuid);
        expect(user.username).to.be.ok();
        done();
      });
    });

    it("retrieve an array of user for an array of items", function(done) {
      var items = [{_key: UT.uuid(), value: '22', _type: 'custom'}, {_key: UT.uuid(), value: '23', _type: 'custom'}];
      post.users(items, function(users, someItems) {
        expect(someItems.length).to.be(2);
        expect(someItems[0]).to.be(items[0]);
        expect(someItems[1]).to.be(items[1]);
        expect(users.length).to.be(2);
        expect(users[0].uuid).to.be(items[0]._key);
        expect(users[1].uuid).to.be(items[1]._key);
        done();
      });
    });
  });
});