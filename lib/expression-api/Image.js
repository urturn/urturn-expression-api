/**
 * An image object return by create('image');
 * Use it to manipulate an image (crop, filter, ...)
 * @param {object} imageDescriptor an object return by internal sdk
 */
UT.Image = function(imageDescriptor) {
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
	this.info = {}

	/**
	 * A string containing the type of this media,
	 * Aka "image" here
	 * @type {String}
	 */
	this.type = 'image';

	/**
	 * Crop an image
	 * @param  {Object}   options  a hash of options :
	 * Supported options : 
	 * {Int} 	width 		: the width of the crop
	 * {Int} 	height 		: the height of the crop
	 * {Bool} flexRatio : if set to true, user will be able to modify crop ratio 
	 * {Bool} auto 			: if set to true, the crop interface will not be displayed
	 * @param  {Function} callback 	The function called once image has been croped
	 * @return {void}            		Return nothing
	 */
	this.crop = function(options , callback) {
		UT.Expression._callAPI('medias.crop', [{
	      size : options,
	      image : desriptor
	    }],
	    function(imageDescriptor) {
	    	_buildImage.bind(this)(imageDescriptor);
	      callback.call(this, this);
	  }.bind(this));
	};

	/**
	 * Apply Filters to an Image
	 * @param  {Array} 		filters  	An array of filter to apply to image
	 * @param  {Function} callback	The function called once image has been filterd
	 * @return {void}            		Return nothing
	 */
	this.filter = function(filters, callback) {
    UT.Expression._callAPI('medias.applyFilter', [{
        filter : filters,
        image : desriptor
      }],
      function(imageDescriptor) {
      	_buildImage.bind(this)(imageDescriptor);
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
    }.bind(this));
	}

	// Private methods
	// LOOK AWAY!
	// Use to bind this interface with Urturn API
	function _buildImage(imageDescriptor) {
		this.url = imageDescriptor.url;
		desriptor = imageDescriptor;
		this.info = imageDescriptor.info;
		if (imageDescriptor.center) {
			this.info.crop = imageDescriptor.center;
		}
	}
	var desriptor = {};
	// init !
	_buildImage.bind(this)(imageDescriptor);
}
