/**
* An image object return by create('image');
* Use it to manipulate an image (crop, filter, ...)
* @param {object} imageDescriptor an object return by internal sdk
*/
UT.Image = function() {
  /**
  * The url of the media
  * @type {String}
  */
  this.url = "";

  /**
  * A set of metadata about this item
  * - source
  * - crop
  * @type {Object}
  */
  this.info = {};

  /**
  * A string containing the type of this media,
  * Aka "image" here
  * @type {String}
  */
  this.type = 'image';

  /**
  * Crop an image
  * @param {Object}   options  a hash of options :
  * {
  *  x : source X,
  *  y : source Y,
  *  w : source width,
  *  h : source height,
  *  width : dest Width,
  *  height : dest Height
  * 
  * @param  {Function}   callback   The function called once image has been croped
  * @return {void}                Return nothing
  */
  this.crop = function(options , callback) {
   UT.Expression._callAPI('medias.recrop', [{
     size : options,
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.bind(this));
  };

  /**
  * Autocrop the image to specified ratio
  * @param  {int}       width      desired width of image
  * @param  {int}       height    desired height of image
  * @param  {function}   callback   callback called when image has been croped
  * @return {void}       
  */
  this.autocrop = function(width, height, callback) {
   UT.Expression._callAPI('medias.crop', [{
     size : {
       width : width,
       height : height,
       auto : true
     },
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.bind(this));
  };

  /**
  * Apply Filters to an Image
  * @param  {Array}     filters    An array of filter to apply to image
  * @param  {Function} callback  The function called once image has been filterd
  * @return {void}                Return nothing
  */
  this.filter = function(filters, callback) {
   UT.Expression._callAPI('medias.applyFilter', [{
     filter : filters,
     image : this.descriptor
   }],
   function(imageDescriptor) {
     this.init(imageDescriptor);
     callback.call(this, this);
   }.bind(this));
  };

  /**
  * Make this image editable.
  * You can use it inside a CANVAS without tainted it!
  * @return {String} A data:url of this image. Can be used inside a canvas;
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
  this.editable = function(callback) {
   UT.Expression._callAPI(
     'medias.getEditableImage',
     [this.url],
     function(editableImageUrl) {
       this.url = editableImageUrl;
       callback.call(this, this);
     }.bind(this)
   );
  };

  /**
   * Return a JSON vesion of this object
   * @return {String} A json string containing document datas
   */
  this.toJSON = function() {
    return JSON.stringify(this.descriptor);
  }

  // Private methods
  // LOOK AWAY!
  // Use to bind this interface with Urturn API
  this.init = function(imageDescriptor) {
   this.url = imageDescriptor.url;
   this.descriptor = imageDescriptor;
   this.info = imageDescriptor.info;
   if (imageDescriptor.center) {
     this.info.crop = imageDescriptor.center;
   }
  };

  this.descriptor = {};
};
