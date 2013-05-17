UT.Expression.ready(function(post) {
  if(post.context.editor){
    var fixtures = {
      obj: {
        _key: 'obj',
        custom: 1
      },
      number: 3,
      str: 'Hello'
    };
    after(function(){
      for(var k in fixtures){
        post.storage[k] = fixtures[k];
      }
      post.save();
    });

    if(post.collection('parent')){
      describe('UT.Post.collections("parent")', function(){
        var parentData;
        beforeEach(function() {
          parentData = post.collection('parent');
        });
        it("should contains a custom object", function(){
          expect(parentData.obj.custom).to.eql(fixtures.obj.custom);
        });
        it("should contains a number", function(){
          expect(parentData.number).to.be(fixtures.number);
        });
        it("should contains a string", function(){
          expect(parentData.str).to.be(fixtures.str);
        });
      });
    }
  }
});