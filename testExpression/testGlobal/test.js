/**
 * This file let you describe your javascript library. The convention
 * is to puts all your code in the camelcased version of your expression system name.
 *
 * /!\ Your expression might be loaded multiple time in the
 * same page so you should always limit your DOM queries to expression.getElement().
 */

var Test = function(expression){
  this.expression = expression;
  this.imageWrapper = expression.getElement().querySelector('div.picture');
  this.nameWrapper = expression.getElement().querySelector('span.name');
  
  var self = this;
  // display the image.
  self.displayImage(this.expression.storage.getItem('picture'));
  
  // display the name.
  if(self.nameWrapper){
    self.nameWrapper.innerHTML = this.expression.storage.getItem('myName');
  }
  self.expression.container.autoResize();
};

Test.prototype.displayImage = function(imageResource) {
  if(!imageResource){
    return;
  }
  if (!this.img) {
    this.img = document.createElement('img');
    this.imageWrapper.appendChild(this.img);
    var self = this;
    this.img.addEventListener('load', function(event){
      self.expression.container.autoResize();
    });
  }
  this.img.src = imageResource.url;
};
