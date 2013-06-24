UT.Expression.ready(function(post){
  describe('UT.Post.size()', function(){
    var cbs;
    beforeEach(function(done){
      post.size(25, function(){
        done();
      });
      cbs = [];
    });
    afterEach(function(){
      cbs.forEach(function(cb){
        post.off('resize', cb);
      });
    });

    it('trigger a resize event', function(done){
      var cb = function(){
        var size = post.size();
        try {
          expect(size.height).to.eql(50);
          expect(size.width).to.be.greaterThan(0);
          done();
        } catch(error) {
          done(error);
        }
      };
      cbs.push(cb);
      post.on('resize', cb);
      post.size({height: 50});
    });

    it('let you set a new size', function(done){
      var cb = function(size){
        var w = post.size().width;
        expect(size.height).to.eql(233);
        expect(size.width).to.eql(w);
        done();
      };
      cbs.push(cb);
      post.on('resize', cb);
      post.size({height: 233});
    });

    it('gives the new size to the resize event', function(done){
      post.size(200, function(event){
        expect(event.height).to.be(200);
        done();
      });
    });

    if(post.context.editor){
      it('triggers a scroll event if scroll position changed', function(done){
        var cb = function(event){
          expect(event.scrollTop).to.be(0);
          post.off('scroll', cb);
          done();
        };
        post.on('scroll', cb);
        post.size({height: 5000});
      });
    }

    it('gives the callback a resize event or retrieve the size if no callback', function(done){
      var p = post.size(function(event){
        expect(event.constructor).to.be(UT.ResizeEvent);

        size = post.size();
        expect(event.height).to.be(size.height);
        expect(event.width).to.be(size.width);
        done();
      });
      expect(p).to.be(post);
    });
  });
});
