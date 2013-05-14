UT.Expression.ready(function(post){
  describe('UT.Post.size()', function(){

    it('retrieve size informations', function(done){
      var cb = function(){
        console.log('resized A');
        var size = post.size();
        expect(size.height).to.eql(50);
        expect(size.width).to.be.greaterThan(0);
        post.off('resize', cb);
        done();
      };
      post.on('resize', cb);
      post.size({height: 50});
    });

    it('let you set a new size', function(done){
      var cb = function(size){
        console.log('resized B');
        var w = post.size().width;
        expect(size.height).to.eql(233);
        expect(size.width).to.eql(w);
        post.off('resize', cb);
        done();
      };
      post.on('resize', cb);
      post.size({height: 233});
    });

    it('call a callback with a resize event while reading', function(done){
      var size1, size2;
      post.size(function(event){
        expect(event).to.be.ok();
        var size1 = {width: event.width, height: event.height};
        expect(size1).to.eql(size2);
        done();
      });
    });
  });
});
