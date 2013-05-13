UT.Expression.ready(function(post){
  describe("queueUp()", function() {
    beforeEach(function(){
      setupExpression(this);
    });
    it('can retrieve the number in the queue', function(done){
      listenToMessage(function(message){
        if(message.methodName == 'document.queueUp'){
          try {
            expect(message.args[0]).to.eql('XYZ');
            callback(1);
          } catch(e) {
            done();
          }
        }
      });
      this.post.queueUp('XYZ', function(number){
        try {
          expect(number).to.eql(1);
        } catch(e) {
          done();
        }
      });
    });
    it('subsequent call will retrieve the same number', function(done){
      var count = 0;
      var post = this.post;
      listenToMessage(function(message, callback){
        if(message.methodName == 'document.queueUp'){
          try {
            expect(message.args[0]).to.eql('XYZ');
            count ++;
            callback(122);
          } catch (e) {
            done();
          }
        }
      });
      post.queueUp('XYZ', function(number){
        try {
          expect(number).to.eql(122);
          expect(count).to.eql(1);
          post.queueUp('XYZ', function(number){
            try {
              expect(number).to.eql(122);
              expect(count).to.eql(1); // did not call the API again.
              done();
            } catch (e) {
              done();
            }
          });
        } catch (e) {
          done();
        }
      });
    });
    it('ask ticket in two different queue', function(done){
      var count = 0;
      var post = this.post;
      listenToMessage(function(message, callback){
        if(message.methodName == 'document.queueUp'){
          try {
            count ++;
            callback( (message.args[0] == 'A'? 45 : 42) );
          } catch (e) {
            done();
          }
        }
      });
      post.queueUp('A', function(number){
        try {
          expect(number).to.eql(45);
          expect(count).to.eql(1);
          post.queueUp('B', function(number){
            try {
              expect(number).to.eql(42);
              expect(count).to.eql(2); // did not call the API again.
              done();
            } catch (e) {
              done();
            }
          });
        } catch (e) {
          done();
        }
      });
    });
  });
});
