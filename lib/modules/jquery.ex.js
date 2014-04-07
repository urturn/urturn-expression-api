/*jshint -W065 */

function loadJqueryEx () {
  (function($) {
    // fix for IE if window.console not defined
    if(!window.console) {
      window.console = {};
      if(!window.console.log) {
        window.console.log = function(){};
      }
      if(!window.console.error) {
        window.console.error = function(){};
      }
    }

    if(!$.isMouseLeave) {
      $.isMouseLeave = function(e) {
        if(e.type != "mouseout") return false;
        if(!e.toElement || !e.currentTarget) return true;
        return !(e.currentTarget === e.toElement || e.currentTarget.contains(e.toElement));
      };
    }
    if(!$.fn.fullWidth) {
      $.fn.fullWidth = function() {
        return parseFloat(this.css("width")) + parseFloat(this.css("paddingLeft")) 
          + parseInt(this.css("paddingRight"))
          + parseFloat(this.css("borderLeftWidth")) + parseInt(this.css("borderRightWidth"));
      };
    }
    if(!$.fn.fullHeight) {
      $.fn.fullHeight = function() {
        return parseFloat(this.css("height"))
          + parseFloat(this.css("paddingTop")) + parseInt(this.css("paddingBottom"))
          + parseFloat(this.css("borderTopWidth")) + parseInt(this.css("borderBottomWidth"));
      };
    }
    if(!$.fn.posLeft) {
      $.fn.posLeft = function(n) {
        if(typeof(n) == "undefined") return parseFloat(this.css("left"));
        this.css("left", parseFloat(n) + "px");
        return this;
      };
    }
    if(!$.fn.posTop) {
      $.fn.posTop = function(n) {
        if(typeof(n) == "undefined") return parseFloat(this.css("top"));
        this.css("top", parseFloat(n) + "px");
        return this;
      };
    }

    if(!$.fn.scrollWidth) {
      $.fn.scrollWidth = function() {
        return (this[0] ? this[0].scrollWidth : 0);
      };
    }

    if(!$.fn.scrollHeight) {
      $.fn.scrollHeight = function() {
        return (this[0] ? this[0].scrollHeight : 0);
      };
    }

    if(!$.fn.clientWidth) {
      $.fn.clientWidth = function() {
        return (this[0] ? this[0].clientWidth : 0);
      };
    }

    if(!$.fn.clientHeight) {
      $.fn.clientHeight = function() {
        return (this[0] ? this[0].clientHeight : 0);
      };
    }

    if(!$.fn.getBounds) {
      $.fn.getBounds = function(transformObject, refObject) {
        var bounds = {
          left: Number.POSITIVE_INFINITY,
          top: Number.POSITIVE_INFINITY,
          right: Number.NEGATIVE_INFINITY,
          bottom: Number.NEGATIVE_INFINITY,
          width: Number.NaN,
          height: Number.NaN
        };
        if(this.length <= 0) {
          return { left:0,top:0,right:0,bottom:0,width:0,height:0 };
        }
        if(typeof(transformObject) == "undefined" || transformObject === null || transformObject === false) transformObject = this;

        var dx = 0;
        var dy = 0;
        var item,wdt,hgt,trData;
        for(var qq = 0; qq < this.length; qq++) {
          var obj = $(this[qq]);
          var off = obj.offset();
          off.left += dx;
          off.top += dy;
          var ww = obj.width();
          var hh = obj.height();
          if(obj.css("boxSizing") == "border-box" || obj.css("WebkitBoxSizing") == "border-box" || obj.css("OBoxSizing") == "border-box" || obj.css("msBoxSizing") == "border-box" || obj.css("MozBoxSizing") == "border-box") {
            ww += parseInt(obj.css("borderLeftWidth")) + parseInt(obj.css("borderRightWidth")) + parseInt(obj.css("paddingLeft")) + parseInt(obj.css("paddingRight"));
            hh += parseInt(obj.css("borderTopWidth")) + parseInt(obj.css("borderBottomWidth")) + parseInt(obj.css("paddingTop")) + parseInt(obj.css("paddingBottom"));
          }

          var dd = $(transformObject).css("transform");
          /* 'none' -- opera fix */
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("OTtransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("msTransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("MozTransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("WebkitTransform");
          if(dd && dd != "none") trData = dd.match(/matrix\([0-9e\.\,\s\+\-]+\)/);
          if(trData) {
            if(trData[0]) trData = trData[0];
            if(trData) trData = trData.substr(7,dd.length - 8);
            if(trData) trData = trData.split(",");
            if(trData) {
              wdt = Math.abs(ww*parseFloat(trData[0])) + Math.abs(hh*parseFloat(trData[1]));
              hgt = Math.abs(ww*parseFloat(trData[2])) + Math.abs(hh*parseFloat(trData[3]));
            } else {
              wdt = ww;
              hgt = hh;
            }
          } else {
            //rotateZ(0.706688234676948rad)
            trData = dd.match(/rotateZ\(([0-9\.\+\-]+)rad\)/);
            if(trData && trData[1]) {
              wdt = Math.abs(ww*Math.cos(parseFloat(trData[1]))) + Math.abs(hh*Math.sin(parseFloat(trData[1])));
              hgt = Math.abs(ww*Math.sin(parseFloat(trData[1]))) + Math.abs(hh*Math.cos(parseFloat(trData[1])));
            } else {
              wdt = ww;
              hgt = hh;
            }
          }

          // calculate object with full width and height
          off.right = off.left + wdt;
          off.bottom = off.top + hgt;
          if(bounds.left > off.left)     bounds.left = off.left;
          if(bounds.top > off.top)       bounds.top = off.top;
          if(bounds.right < off.right)   bounds.right = off.right;
          if(bounds.bottom < off.bottom) bounds.bottom = off.bottom;
        }
        bounds.width = bounds.right - bounds.left;
        bounds.height = bounds.bottom - bounds.top;
        if(refObject) {
          var rooff = $(refObject).offset();
          bounds.left -= rooff.left;
          bounds.right -= rooff.left;
          bounds.top -= rooff.top;
          bounds.bottom -= rooff.top;
        }
        return bounds;
      };
    }

    if(!$.isHidden) {
      $.isHidden = function(elem) {
        var width = elem.offsetWidth, height = elem.offsetHeight;
        return (width === 0 && height === 0) || (((elem.style && elem.style.display) || $(elem).css("display")) === "none");
      };
    }
    if(!$.isVisible) {
      $.isVisible = function(elem) {
        return !$.isHidden(elem);
      };
    }

    if(!$.fn.filterByVisible) {
      $.fn.filterByVisible = function(){
        var res = $([]);
        for(var qq = 0; qq < this.length; qq++) {
          if($.isVisible(this[qq])) res.push(this[qq]);
        }
        return res;
      };
    }

    /********************************************************************************
     * updated version on on("click", ...) for mobile
     ********************************************************************************/
    if(!$.fn.onExClick) {
      $.fn.onExClick = function(callback) {
        if(!$.browser.mobile) {
          if(callback) this.on("click", callback);
          else this.off("click");
        } else {
          var _touchMove = function(){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
          };
          var _touchEnd = function(e){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
            if (callback) {
              callback.call(this, e);
            }
          };
          var _touchCancel = function(e){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
          };
          var _touchStart = function() {
            this.addEventListener("touchmove", _touchMove, false);
            this.addEventListener("touchend", _touchEnd, false);
            this.addEventListener("touchcancel", _touchCancel, false);
          };
          if(callback) {
            this.each(function(){
              this.addEventListener("touchstart", _touchStart, true);
            });
          } else {
            this.each(function(){
              this.removeEventListener("touchstart", _touchStart);
            });
          }
        }
      };
    }

    /********************************************************************************
     * user's browser detect
     ********************************************************************************/
    jQuery.browser = {
      browserName: "",
      browserVersion: 0,
      mozilla: false,
      webkit: false,
      msie: false,
      safari: false,
      opera: false,
      iPhone: false,
      iPod: false,
      iPad: false,
      Android: false,
      mobile: false,
      urMobileApp: false,
      isTouchDevice: false,

      detect: function() {
        var browserCheck = false;
        var brData = [
          {"name":"Chrome","key":"Chrome","ver":"Chrome/", "check":6},
          {"name":"Firefox","key":"Firefox","ver":"Firefox/", "check":4},
          {"name":"Opera","key":"Opera","ver":"Version/", "check":10.6},
          {"name":"MSIE","key":"MSIE","ver":"MSIE ", "check":9},
          {"name":"Safari","key":"Safari","ver":"Version/", "check":5}];

        // detect browser
        var qq,ww;
        for(qq = 0; brData[qq] !== null; qq++) {
          if(navigator.userAgent.indexOf(brData[qq].key) != -1) {
            this.browserName = brData[qq].name;
            this.msie = (this.browserName == "MSIE");
            this.mozilla = (this.browserName == "Firefox");
            this.safari = (this.browserName == "Safari");
            this.webkit = (this.browserName == "Chrome" || this.safari);
            this.opera = (this.browserName == "Opera");
            ww = navigator.userAgent.indexOf(brData[qq].ver);
            if(ww >= 0) this.browserVersion = parseFloat(navigator.userAgent.substr(ww + brData[qq].ver.length)); //.match(/[0-9]+\.[0-9]+/)
            if(this.browserVersion >= brData[qq].check) browserCheck = true;
            break;
          }
        }

        // check for urturn mobile app
        this.urMobileApp = /(urturn)/i.test(navigator.userAgent);

        // check for mobile device
        this.iPhone = (navigator.userAgent.toLowerCase().indexOf('iphone') != -1);
        this.iPod = (navigator.userAgent.toLowerCase().indexOf('ipod') != -1);
        this.iPad = (navigator.userAgent.toLowerCase().indexOf('ipad') != -1);
        this.Android = (navigator.userAgent.toLowerCase().indexOf('android') != -1);
        var mobile = (navigator.userAgent.toLowerCase().indexOf('mobile') != -1);
        this.isTouchDevice = 'ontouchstart' in document.documentElement;
        this.mobile = !!(this.iPhone || this.iPod || this.iPad || this.Android || mobile || this.isTouchDevice || this.urMobileApp);
      }
    };
    jQuery.browser.detect();

    if(!$.fn.alterClass) {

      $.fn.alterClass = function ( removals, additions ) {

        var self = this;

        if ( removals.indexOf( '*' ) === -1 ) {
          self.removeClass( removals );
          return !additions ? self : self.addClass( additions );
        }

        var patt = new RegExp( '\\s' +
          removals.
          replace( /\*/g, '[A-Za-z0-9-_]+' ).
          split( ' ' ).
          join( '\\s|\\s' ) +
          '\\s', 'g' );

        self.each( function ( i, it ) {
          var cn = ' ' + it.className + ' ';
          while ( patt.test( cn ) ) {
            cn = cn.replace( patt, ' ' );
          }
          it.className = cn.trim();
        });

        return !additions ? self : self.addClass( additions );
      };
    }

    if(!$.fn.has3d) {
      $.fn.has3d = function () {

        var el = document.createElement('p'),
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        for(var t in transforms){
            if( el.style[t] !== undefined ){
                el.style[t] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");

      };
    }

  })(window.jq || window.Zepto || window.jQuery);
}
