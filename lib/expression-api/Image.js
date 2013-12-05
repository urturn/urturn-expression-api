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
  * }
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

  this.marshall = function() {
    this.descriptor._type = 'image';
    return this.descriptor;
  };

  /**
   * Instantiate an Image instance
   * since: 0.9.0
   */
  this.node = function(callback) {
    var img = new Image();
    img.onload = function() {
      callback.call(img, img);
    };
    // Added in 1.2.12
    img.onerror = function() {
      callback.call(img, null, new Error("Unable to load image"));
    };
    img.src = this.url;
  };

  /**
   * Callback will receive a SVG element containing the image.
   * since: 1.2.12
   */
  this.svg = function(callback) {
    if (this._isSVG()) {
      var container = document.createElement('div');
      container.innerHTML = this._svgText();
      callback(container.children[0]);
      return;
    }

    var self = this;
    this.node(function(img) {
      var svg = self._buildSVG(self.url, img);
      callback.call(svg, svg);
    });
  };

  // Private methods
  // LOOK AWAY!

  // Build an svg node from an URL and a loaded Image element.
  this._buildSVG = function(url, img) {
    var svgNSURL = "http://www.w3.org/2000/svg";
    var xmlnsNSURL = "http://www.w3.org/2000/xmlns/";
    var xlinkNSURL = "http://www.w3.org/1999/xlink";
    var svg = document.createElementNS(svgNSURL, "svg");
    svg.setAttribute('width', img.width);
    svg.setAttribute('height', img.height);
    svg.setAttributeNS(xmlnsNSURL, "xmlns:xlink", xlinkNSURL);
    svg.setAttributeNS(xmlnsNSURL, "xmlns", svgNSURL);
    var svgImage = document.createElementNS(svgNSURL, 'image');
    svgImage.setAttributeNS(xlinkNSURL, 'xlink:href', url);
    svgImage.setAttribute('x', 0);
    svgImage.setAttribute('y', 0);
    svgImage.setAttribute('width', img.width);
    svgImage.setAttribute('height', img.height);
    svg.appendChild(svgImage);
    return svg;
  };

  // return true if the image source is some kind of SVG.
  this._isSVG = function() {
    return this.url && !!this.url.match(/data\:image\/svg\+xml;/);
  };

  // return the svg raw source as a string.
  //
  // You must ensure this is a SVG based image first.
  this._svgText = function() {
    return this.url.substring(19); // 19: string length.
  };

  // Accessed through UT.Post interface within Urturn API
  // supported signature:
  // - {string} that represent an URL
  // - {object} that contains `{string}url` key
  // - {object} that contains `{string|SVGElement}svg` key
  // in case of an object, `{object}info` and `{object}center`
  // are optional arguments.
  this.init = function(imageDescriptor) {
    if (!imageDescriptor) {
      return;
    }
    if (typeof(imageDescriptor) == 'string') {
      this.url = imageDescriptor;
      this.descriptor = {};
      this.descriptor.url = imageDescriptor;
      this.descriptor._type = 'image';
    }
    else {
      if (imageDescriptor.url) {
        this.url = imageDescriptor.url;
      } else if (imageDescriptor.svg) {
        // build using svg text or element
        if (typeof imageDescriptor.svg !== 'string') {
          var container = document.createElement('div');
          container.appendChild(imageDescriptor.svg);
          imageDescriptor.svg = container.innerHTML;
        }
        this.url = 'data:image/svg+xml;utf8,' + imageDescriptor.svg;
        imageDescriptor.svg = null;
      }

      // general descriptor and info
      this.descriptor = imageDescriptor;
      this.info = imageDescriptor.info;

      // crop center
      if (imageDescriptor.center) {
        this.info.crop = imageDescriptor.center;
      }
    }
  };

  this.descriptor = {};
  if(imageDescriptor){
    this.init(imageDescriptor);
  }
};
