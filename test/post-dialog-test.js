(function(){
  "use strict";
  describe("Post.dialog", function() {
    beforeEach(TestHelpers.initExpressionEnv);
    afterEach(TestHelpers.resetExpressionEnv);

    describe("text", function() {
      it("accepts an option hash", function(done){
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage('document.textInput', function(message, callback){
          expect(message.args[0]).to.eql('default');
          expect(message.args[1]).to.eql(15);
          expect(message.args[2]).to.eql(true);
          expect(callback).to.be.ok();
          callback('hello');
        });
        this.post.dialog('text', {
          value: 'default',
          max: 15,
          multiline: true
        }, function(data){
          expect(data).to.eql('hello');
          done();
        });
      });
      it("accept a single callback", function(done){
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage(function(message, callback){
          callback('hello');
        });
        this.post.dialog('text', function(data){
          expect(data).to.eql('hello');
          done();
        });
      });
    });
   

    describe("image", function() {
      beforeEach(function(){
        var self = this;
        TestHelpers.setupExpression(this, {mode: 'edit'});
        TestHelpers.listenToMessage('medias.openImageChooser', function(message, callback){
          expect(callback).to.be.ok();
          self.expectMessage(message, callback);
        });
      });
      afterEach(function(){
        this.expectMessage = null;
      });
      describe('with no args', function() {
        it("send a medias.openImageChooser message", function(done){
          this.expectMessage = function(message, callback){
            expect(message.methodName).to.be('medias.openImageChooser');
            done();
          };
          this.post.dialog('image');
        });
      });
      describe('with args', function() {
        it('accept a label arg', function(done) {
          this.expectMessage = function(message, callback){
            expect(message.args[0]).to.be.eql({
              label: 'Test'
            });
            done();
          };
          this.post.dialog('image', {
            label: 'Test'
          });
        });
      });
    });

    describe("sound", function() {
      beforeEach(function(){
        var self = this;
        TestHelpers.setupExpression(this, {mode: 'edit'});
        TestHelpers.listenToMessage('medias.openSoundChooser', function(message, callback){
          expect(callback).to.be.ok();
          self.expectMessage(message, callback);
        });
      });
      afterEach(function(){
        this.expectMessage = null;
      });
      describe('with no args', function() {
        it("send a medias.openSoundChooser message", function(done){
          this.expectMessage = function(message, callback){
            expect(message.methodName).to.be('medias.openSoundChooser');
            done();
          };
          this.post.dialog('sound');
        });
      });
      describe('with args', function() {
        it('accept a label arg', function(done) {
          this.expectMessage = function(message, callback){
            expect(message.args[0]).to.be.eql({
              label: 'Test'
            });
            done();
          };
          this.post.dialog('sound', {
            label: 'Test'
          });
        });
      });
    });

    describe("video", function() {
      beforeEach(function(){
        var self = this;
        TestHelpers.setupExpression(this, {mode: 'edit'});
        TestHelpers.listenToMessage('medias.openVideoChooser', function(message, callback){
          expect(callback).to.be.ok();
          self.expectMessage(message, callback);
        });
      });
      afterEach(function(){
        this.expectMessage = null;
      });
      describe('with no args', function() {
        it("send a medias.openVideoChooser message", function(done){
          this.expectMessage = function(message, callback){
            expect(message.methodName).to.be('medias.openVideoChooser');
            done();
          };
          this.post.dialog('video');
        });
      });
      describe('with args', function() {
        it('accept a label arg', function(done) {
          this.expectMessage = function(message, callback){
            expect(message.args[0]).to.be.eql({
              label: 'Test'
            });
            done();
          };
          this.post.dialog('video', {
            label: 'Test'
          });
        });
      });
    });

    describe("users", function() {
      it("takes an option hash", function(done) {
        var ids = [UT.uuid(), UT.uuid(), UT.uuid(), UT.uuid()];
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage('dialog.users', function(message, callback){
          expect(message.args[0]).to.eql({
            users: ids
          });
          callback();
        });
        this.post.dialog('users', {
          users: ids
        }, function() {
          done();
        });
      });

      it("accept a label argument", function(done) {
        var ids = [UT.uuid(), UT.uuid(), UT.uuid(), UT.uuid()];
        var label = 'Test';
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage('dialog.users', function(message, callback){
          expect(message.args[0]).to.eql({
            users: ids,
            label: label
          });
          callback();
        });
        this.post.dialog('users', {
          users: ids,
          label: label
        }, function() {
          done();
        });
      });

      it("accept a title argument as synonym of label", function(done) {
        var ids = [UT.uuid(), UT.uuid(), UT.uuid(), UT.uuid()];
        var label = 'Test';
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage('dialog.users', function(message, callback){
          expect(message.args[0]).to.eql({
            users: ids,
            label: label
          });
          callback();
        });
        this.post.dialog('users', {
          users: ids,
          title: label
        }, function() {
          done();
        });
      });

      it('callback immediately if not in player mode', function(done) {
        TestHelpers.setupExpression(this, {mode: 'edit'});
        var ids = [UT.uuid(), UT.uuid(), UT.uuid(), UT.uuid()];
        expect(this.post.context.player).to.be(false);
        TestHelpers.listenToMessage('dialog.users', function(){
          done('Should not send a message');
        });
        this.post.dialog('users', {users: ids}, function(){
          done();
        });
      });

      it('callback immediately if no options are specified', function(done) {
        TestHelpers.setupExpression(this, {mode: 'view'});
        expect(this.post.context.player).to.be(true);
        TestHelpers.listenToMessage('dialog.users', function(){
          done('Should not send a message');
        });
        this.post.dialog('users', function(){
          done();
        });
      });

      it('displays nothing and callback immediately if users is empty', function(done) {
        TestHelpers.setupExpression(this, {mode: 'view'});
        expect(this.post.context.player).to.be(true);
        TestHelpers.listenToMessage('dialog.users', function(){
          done('Should not send a message');
        });
        this.post.dialog('users', {users: []}, function(){
          done();
        });
      });

      it('displays nothing and callback immediately if users options is not given', function(done) {
        TestHelpers.setupExpression(this, {mode: 'view'});
        expect(this.post.context.player).to.be(true);
        this.post.dialog('users', {}, function(){
          done();
        });
      });

      it('supports to be called without a callback', function() {
        TestHelpers.setupExpression(this, {mode: 'view'});
        this.post.dialog('users', {});
      });

      it('accepts a list of items as well', function(done) {
        var ids = [UT.uuid(), UT.uuid()];
        TestHelpers.setupExpression(this, {mode: 'view'});
        TestHelpers.listenToMessage('dialog.users', function(message, callback){
          expect(message.args[0]).to.eql({
            users: ids
          });
          done();
        });
        this.post.dialog('users', {items: [
          {
            _key: ids[0],
            value: 'Text'
          },
          {
            _key: ids[1],
            value: 'Text'
          }
        ]});
      });
    });

    describe("suggestRotation", function() {
      beforeEach(function(){
        var self = this;
        TestHelpers.setupExpression(this, {mode: 'edit'});
        TestHelpers.listenToMessage('dialog.suggestRotation', function(message, callback){
          self.expectMessage(message);
        });
      });
      afterEach(function(){
        this.expectMessage = null;
      });
      describe('with no args', function() {
        it("send a dialog.suggestRotation message", function(done){
          this.expectMessage = function(message){
            expect(message.methodName).to.be('dialog.suggestRotation');
            done();
          };
          this.post.notification('suggestRotation');
        });
      });
    });

  });
}());