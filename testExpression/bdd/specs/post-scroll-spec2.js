UT.Expression.ready(function(post){
  describe.only('UT.Post.scroll()', function(){
    function resize(height, done){
      var scope = {};
      scope.fn = function(evt){
        expect(scope.resized).to.be.ok();
        post.off('scroll', scope.fn);
        done();
      };
      post.size(height, function(event){
        post.on('scroll', scope.fn);
        scope.resized = true;
      });
    }

    beforeEach(function(done){
      resize(5, done);
    });

    it('retrieve scroll informations', function(done){
      var result = post.scroll();
      expect(result.scrollTop).to.eql(0);
      expect(result.scrollBottom).to.eql(0);

      resize(5000, function(){
        result = post.scroll();
        expect(result.scrollTop).to.eql(0);
        expect(result.scrollBottom).to.be.greaterThan(0);
        done();
      });
    });

    it('pass the scroll informations to a callback and return the post', function(done){
      var result = post.scroll(function(event){
        expect(event.scrollTop).to.eql(0);
        expect(event.scrollBottom).to.eql(0);

        resize(5000, function(){
          result = post.scroll(function(event){
            expect(event.scrollTop).to.eql(0);
            expect(event.scrollBottom).to.be.greaterThan(0);
            done();
          });
          expect(result).to.be(post);
        });
      });
      expect(result).to.be(post);
    });

    it('let you scroll to a specific position', function(done){
      resize(5000, function(){
        post.scroll({bottom:0}, function(event){
          expect(event.scrollBottom).to.be(0);
          expect(event.scrollTop).to.be.greaterThan(0);
          done();
        });
      });
    });
  });
});
