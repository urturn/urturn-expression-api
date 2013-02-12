buster.testCase("post#readyToPost", {
  setUp: function(done){
    UT.Expression._reset();

    var self = this;
    var readyFunc = function(post){
      post.unbind('ready', readyFunc);
      done();
    };
    
    UT.Expression.ready(readyFunc);
    this.post = UT.Expression._getInstance();
    this.post._ready({
      expToken: 'aaaa-aaaa-aaaaaa-aaaaaaaaa',
      mode: 'editor',
      documentURL: '/posts/bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentId: 'bbbb-bbbb-bbbbbbb-bbbbbbbb',
      documentPrivacy: 'public',
      collections: [{
        name: 'default',
        items: []
      }],
      currentUserId: 'cccc-cccc-cccccc-cccccccc',
      host: 'http://uuuu.com',
      assetPath: 'http://assets.aaaaa.com',
      note : 'some',
      scrollValues: {}
    });
  },

  tearDown: function(){

  },

  "default state is false": function(){
    buster.assert.defined(this.post);
    buster.assert.equals(this.post.readyToPost(), false);
  },

  "state can be set to true": function(){
    buster.assert.defined(this.post);
    buster.assert.equals(this.post.readyToPost(true), true);
    buster.assert.equals(this.post.readyToPost(), true);
    buster.assert.equals(this.post.readyToPost(true), true);
    buster.assert.equals(this.post.readyToPost(), true);
  },

  "state can be set back to false": function(){
    buster.assert.defined(this.post);
    buster.assert.equals(this.post.readyToPost(true), true);
    buster.assert.equals(this.post.readyToPost(false), false);
    buster.assert.equals(this.post.readyToPost(), false);
  }
});