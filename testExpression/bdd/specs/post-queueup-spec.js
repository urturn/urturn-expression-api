UT.Expression.ready(function(post){
  describe("queueUp()", function() {
    it('retrieve a number from the queue', function(done){
      post.queueUp('XYZ', function(number){
        expect(number).to.be.greaterThan(0);
        done();
      });
    });
    it('subsequent call will retrieve the same number', function(done){
      post.queueUp('XYZ', function(number){
        expect(number).to.be.greaterThan(0);
        post.queueUp('XYZ', function(n){
          expect(n).to.eql(number);
          done();
        });
        if(post.context.editor){
          post.storage.number = number;
        }
        post.save();
      });
    });
    if(post.context.player){
      it('retrieves different number in player if called again', function(){
        post.queueUp('XYZ', function(n){
          expect(n).not.eql(post.storage.number);
        });
      });
    }
    it('two different queue migth retrieve different numbers', function(done){
      post.queueUp('XYZ', function(number){
        expect(number).to.be.greaterThan(0);
        post.queueUp('XYZ', function(n){
          expect(n).to.eql(number);
          done();
        });
      });
    });
  });
});
