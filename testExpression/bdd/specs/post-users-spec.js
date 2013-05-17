UT.Expression.ready(function(p) {
  describe("UT.Post.users()", function() {
    var currentUser, post, isAnonymous;
    var skipAnonymous = function skipAnonymous() {
      if (currentUser == 'Anonymous') {
        fail('Skip: user is anonymous');
      }
    };

    it.player = function (name, test){
      (p.context.player ? it : it.skip)(name, test);
    };

    before(function(done) {
      // Define post and current user
      UT.Expression.ready(function(p){
        post = p;
        post.users('current', function(user) {
          currentUser = user;
          isAnonymous = (currentUser.username == 'Anonymous');
          // Set value for player test if needed
          if(post.context.editor) {
            post.storage.numberOfPost = currentUser.numberOfPost;
            post.storage.numberOfUse = currentUser.numberOfUse;
            post.save();
          }
          done();
        });
      });
    });

    it.player("increments numberOfPost counter of the post's owner", function(){
      if(! post.isOwner(currentUser)){
        console.log('Skipped: increments counter of the post s owner');
        return;
      }
      expect(currentUser.numberOfPost).to.be.greaterThan(post.storage.numberOfPost);
    });

    it.player("increments numberOfUse counter of the post's owner", function(){
      if(! post.isOwner(currentUser)){
        console.log('Skipped: increments counter of the post s owner');
        return;
      }
      expect(currentUser.numberOfUse).to.be.greaterThan(post.storage.numberOfUse);
    });

    it("might retrieve current user", function(done){
      skipAnonymous();
      expect(currentUser.constructor).to.eql(UT.User);
      expect(typeof currentUser.numberOfPost).to.be('number');
      expect(typeof currentUser.numberOfUse).to.be('number');
      done();
    });

    it("retrieve one user for one item", function(done) {
      skipAnonymous();
      var userUuid = currentUser.uuid;
      var item = {_key: userUuid, value: '22', _type: 'custom'};
      post.users(item, function(user, theItem) {
        expect(item).to.be(theItem);
        expect(user.uuid).to.be(userUuid);
        expect(user.username).to.be.ok();
        done();
      });
    });

    it("retrieve an array of user for an array of items", function(done) {
      skipAnonymous();
      var items = [{_key: currentUser.uuid, value: '22', _type: 'custom'}];
      post.users(items, function(users, someItems) {
        expect(someItems.length).to.be(1);
        expect(someItems[0]).to.be(items[0]);
        expect(users.length).to.be(1);
        expect(users[0].uuid).to.be(items[0]._key);
        done();
      });
    });
  });
});