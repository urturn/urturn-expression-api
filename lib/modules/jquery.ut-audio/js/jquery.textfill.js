/**
 * @preserve  textfill
 * @name      jquery.textfill.js
 * @author    Russ Painter
 * @author    Yu-Jie Lin
 * @version   0.4.0
 * @date      2013-08-16
 * @copyright (c) 2012-2013 Yu-Jie Lin
 * @copyright (c) 2009 Russ Painter
 * @license   MIT License
 * @homepage  https://github.com/jquery-textfill/jquery-textfill
 * @example   http://jquery-textfill.github.io/jquery-textfill/index.html
*/
; (function($) {
  /**
  * Resizes an inner element's font so that the inner element completely fills the outer element.
  * @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')
  * @return All outer elements processed
  */
  $.fn.textfill = function(options) {
    var defaults = {
      debug: false,
      maxFontPixels: 40,
      minFontPixels: 4,
      innerTag: 'span',
      widthOnly: false,
      success: null,          // callback when a resizing is done
      callback: null,         // callback when a resizing is done (deprecated, use success)
      fail: null,             // callback when a resizing is failed
      complete: null,         // callback when all is done
      explicitWidth: null,
      explicitHeight: null
    };
    var Opts = $.extend(defaults, options);

    function _sizing(prefix, ourText, func, max, maxHeight, maxWidth, minFontPixels, maxFontPixels) {
      while (minFontPixels < maxFontPixels - 1) {
        var fontSize = Math.floor((minFontPixels + maxFontPixels) / 2)
        ourText.css('font-size', fontSize);
        if (func.call(ourText) <= max) {
          minFontPixels = fontSize;
          if (func.call(ourText) == max) {
            break;
          }
        } else {
          maxFontPixels = fontSize;
        }
      }
      ourText.css('font-size', maxFontPixels);
      if (func.call(ourText) <= max) {
        minFontPixels = maxFontPixels;
      }
      return minFontPixels;
    }

    this.each(function() {
      var ourText = $(Opts.innerTag + ':visible:first', this);
      // Use explicit dimensions when specified
      var maxHeight = Opts.explicitHeight || $(this).height();
      var maxWidth = Opts.explicitWidth || $(this).width();
      var oldFontSize = ourText.css('font-size');
      var fontSize;
      var minFontPixels = Opts.minFontPixels;
      var maxFontPixels = Opts.maxFontPixels <= 0 ? maxHeight : Opts.maxFontPixels;
      var HfontSize = undefined;

      if (!Opts.widthOnly) {
        HfontSize = _sizing('H', ourText, $.fn.height, maxHeight, maxHeight, maxWidth, minFontPixels, maxFontPixels);
      }
      var WfontSize = _sizing('W', ourText, $.fn.width, maxWidth, maxHeight, maxWidth, minFontPixels, maxFontPixels);

      if (Opts.widthOnly) {
        ourText.css('font-size', WfontSize);
      } else {
        ourText.css('font-size', Math.min(HfontSize, WfontSize));
      }

      if (ourText.width()  > maxWidth 
      || (ourText.height() > maxHeight && !Opts.widthOnly)
      ) {
        ourText.css('font-size', oldFontSize);
        if (Opts.fail) {
          Opts.fail(this);
        }
      } else if (Opts.success) {
        Opts.success(this);
      } else if (Opts.callback) {
        // call callback on each result
        Opts.callback(this);
      }
    });

    // call complete when all is complete
    if (Opts.complete) Opts.complete(this);

    return this;
  };
})(window.jQuery);
