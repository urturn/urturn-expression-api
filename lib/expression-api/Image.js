(function(document, undefined) {
  var RE_CSS_INJECTION_SELECTOR = /^((?:[\w\s#,.<>]|(?:\[[\w\:]+\=[\w\:'"]+\]))*)(?:\[([\w\:]+)\])?$/;
  var RE_DATA_URL_SVG = /data\:image\/svg\+xml;/;
  var SVG_NS_URL = "http://www.w3.org/2000/svg";
  var XMLNS_NS_URL = "http://www.w3.org/2000/xmlns/";
  var XLINK_NS_URL = "http://www.w3.org/1999/xlink";

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
     * In case the UT.Image has a filter or a svgTemplate,
     * a rasterized version might be created by our server to
     * be used in place of the current image + filters.
     */
    this.rasterUrl = null;

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
     * Apply Filters to an Image and retrieve a new UT.Image instance.
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
      if (this.svgTemplate) {
        this.descriptor.svgTemplate = this._svgTemplateString();
        this.descriptor.svgCssSelector = this.svgCssSelector;
      }
      return this.descriptor;
    };

    var _loadImage = function(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback.call(this, img);
      };
      // Added in 1.2.12
      img.onerror = function() {
        callback.call(this, null, new Error("Unable to load image"));
      };
      img.src = url;
    };

    /**
     * Asynchronous function that retrieve a DOM Element to display
     * the picture.
     *
     * @param optional {String}type one of ('img'|'svg'|'canvas')
     * @param {function}callback receive (element, error)
     *
     * since 1.2.12
     *
     * Until 1.2.12, node accepted only the callback parameter
     * and always pass its an Image Element.
     * Instantiate an Image instance
     * since: 0.9.0
     */
    this.node = function(type, callback) {
      if (!callback) {
        callback = type;
        type = 'img';
      }
      try {
        return {
          img: function(callback) {
            if (this.rasterUrl) {
              _loadImage(this.rasterUrl, callback);
            } else if (this.svgTemplate) {
              callback(null, new Error('No Raster Image'));
            } else {
              _loadImage(this.url, callback);
            }
          },
          svg: function(callback) {
            this.svg(callback);
          }
        }[type].call(this, callback);
      }
      catch (ex) {
        callback(null, new Error('Invalid node type given: ' + type));
      }
    };

    /**
     * This method has two signatures:
     * - svg({function}callback)
     * - svg({string}template, {string}injectionCssSelector)
     * - svg({SVGElement}template, {string}injectionCssSelector)
     * It return this for chaining.
     * since: 1.2.12
     */
    this.svg = function() {
      var self = this;

      // Build an svg image tag.
      var _buildSVGImage = function(url, img) {
        var svgImage = document.createElementNS(SVG_NS_URL, 'image');
        svgImage.setAttributeNS(XLINK_NS_URL, 'xlink:href', url);
        svgImage.setAttribute('x', 0);
        svgImage.setAttribute('y', 0);
        svgImage.setAttribute('width', img.width);
        svgImage.setAttribute('height', img.height);
        return svgImage;
      };

      // return true if the image source is some kind of SVG.
      var _isSvgUrl = function() {
        return self.url && !!self.url.match(RE_DATA_URL_SVG);
      };

      // return the svg raw source as a string.
      //
      // You must ensure this is a SVG based image first.
      var _svgTextFromUrl = function() {
        return self.url.substring(19); // 19: string length.
      };

      /**
       * svg(callback):
       * Callback will be passed (svgElement, err) arguments.
       *
       * If no SVG tempalte has been set beforehand, svgElement will be null
       * and err.message will be 'No SVG Template'.
       *
       * If svgElement is an actual node, it will be retrieved by reference rather
       * than copied.
       */
      var _getSVG = function(callback) {
        var container = document.createElement('div');
        if (_isSvgUrl()) { // SVG Data URL to SVG Element
          container.innerHTML = _svgTextFromUrl();
          callback(container.children[0]);
          return;
        } else {
          _loadImage.call(self, self.url, function(img, err) {
            if (err) {
              return callback.call(self, null, err);
            }
            var svg;
            if (self.svgTemplate) { // SVG Text Template to SVG Element
              if (typeof self.svgTemplate === 'string') {
                container = document.createElement('div');
                container.innerHTML = self.svgTemplate;
                self.svgTemplate = container.children[0];
              }
              svg = self.svgTemplate;
              self._injectImage(svg);
              callback.call(self, svg);
            } else {
              callback.call(self, null, new Error('No SVG Template'));
            }
          });
        }
      };

      /**
       * SVG(template, cssSelector) define a new SVG template for this node,
       * where the cssSelector point either to a DOM Element or a DOM Attribute.
       * If the selector points to an element, an image tag will be injected inside ;
       * If the selector points to an attribute, the image URL will be injected in that attribute.
       */
      var _setSVG = function(template, cssSelector) {
        self.svgTemplate = template;
        self.svgCssSelector = cssSelector || 'image[xlink:href]';
        if (typeof self.svgTemplate !== 'string') {
          self._injectImage(self.svgTemplate);
        }
      };

      if (arguments[0] && typeof arguments[0] === 'function' ) {
        _getSVG.apply(this, arguments);
      } else {
        _setSVG.apply(this, arguments);
      }

      return this;
    };

    this._svgTemplateString = function() {
      if (typeof this.svgTemplate === 'string') {
        return this.svgTemplate;
      } else {
        var pn = this.svgTemplate.parentNode;
        c = document.createElement('div');
        this._removeInjectedImage(this.svgTemplate);
        c.appendChild(this.svgTemplate);
        var source = c.innerHTML;
        this._injectImage(this.svgTemplate);
        return source;
      }
    };

    this._injectImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            element.setAttribute(attribute, this.url);
          } else {
            element.appendChild(_buildImage(this.url));
          }
        }
      }
    };

    this._removeInjectedImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            element.removeAttribute(attribute, this.url);
          } else {
            element.removeChild(element.querySelector('image[xlink:href="'+this.url+'"]'));
          }
        }
      }
    };



    // Private methods
    // LOOK AWAY!

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
        if (imageDescriptor.svgTemplate) {
          this.svg(imageDescriptor.svgTemplate, imageDescriptor.svgCssSelector || 'image[xlink:href]');
        }
        this.rasterUrl = imageDescriptor.rasterUrl;

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

}(document));