// Editor expression script

Test.prototype.enableEditing = function() {
  this.chooseImageButton = this.expression.getElement().querySelector('button.choose_image');
  this.nameEditor = this.expression.getElement().querySelector('input.name_editor');

  // open image dialog when user click on the button.
  this.chooseImageButton.addEventListener('click', this.bindChooseImage());

  // redefine displayImage() to open image dialog when user click on the image.
  var playerDisplayImage = this.displayImage;
  this.displayImage = function(imageResource) {
    playerDisplayImage.call(this, imageResource);
    this.editorDisplayImage();
  };
  if(this.img){
    this.editorDisplayImage();
  }

  var self = this;
  // display text in editor
  self.nameEditor.value = this.expression.storage.getItem('myName', "");

  // save text on post
  this.expression.post(function(doPostCallback){
    self.expression.storage.setItem('myName', self.nameEditor.value);
    self.expression.storage.save();
    doPostCallback();
  });
};

Test.prototype.bindChooseImage = function() {
  var self = this;
  return function(event) {
    self.expression.medias.imageDialog(function(imageResource){
      // Directly save image upon selection
      self.expression.storage.setItem('picture', imageResource);
      self.displayImage(imageResource);
      self.expression.readyToPost(true);
    });
  };
};

Test.prototype.editorDisplayImage = function() {
  this.img.addEventListener('click', this.bindChooseImage());
  this.chooseImageButton.className += ' hidden';
};
