function loadFilterUTImage() {
  (function() {
    "use strict";

    window.filterUTImageData = function(post, data, filterData, callback) {
      if(!filterData || !filterData.parameters) {
        if(callback) {
          var tmp = new Image();
          tmp.onload = function() {
            callback($("<div>").css("background-image", "url(" + data.url + ")"), {w:this.width, h:this.height,d:data});
          };
          tmp.src = data.url;
        }
        return;
      }

      var getSaturationColorMatrix = function(s){
        s *= 1;
        var lumR = 0.3086;
        var lumG = 0.6094;
        var lumB = 0.0820;
        var sr = (1 - s) * lumR;
        var sg = (1 - s) * lumG;
        var sb = (1 - s) * lumB;
        var colorMatrix = [
          sr+s, sg,    sb,    0,   0,
          sr,   sg+s,  sb,    0,   0,
          sr,   sg,    sb+s,  0,   0,
          0,    0,     0,     1,   0
          //0,    0,     0,     0,   1
        ];
        return colorMatrix.join(' ');
      };

      var recalculateFilterStr = function(filter){
        var filterValues = {
          saturation: 0,
          gammaR:     0,
          gammaG:     0,
          gammaB:     0,
          vignette:   0
        };
        if(filter && filter.parameters) {
          filterValues = {
            saturation: getSaturationColorMatrix(filter.parameters.saturation),
            
            gammaR:     filter.parameters.gammaR,
            gammaG:     filter.parameters.gammaG,
            gammaB:     filter.parameters.gammaB,

            amplitudeR: filter.parameters.amplitudeR || 1.0,
            amplitudeG: filter.parameters.amplitudeG || 1.0,
            amplitudeB: filter.parameters.amplitudeB || 1.0,
          

            exponentR: filter.parameters.exponentR || 1.0,
            exponentG: filter.parameters.exponentG || 1.0,
            exponentB: filter.parameters.exponentB || 1.0,
          

            vignette:   filter.parameters.vignette
          };
        }
        var filtersStr =
          '<filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">' +
            '<feColorMatrix id="saturation-0" result="flt1" values="'+ filterValues.saturation+'"/>' +
            '<feComponentTransfer in="flt1" result="flt2">' +
            '<feFuncR type="gamma" id="redChannel-0"   amplitude="' + filterValues.amplitudeR + '" exponent="' + filterValues.exponentR + '" offset="'+ filterValues.gammaR+'"/>' +
            '<feFuncG type="gamma" id="greenChannel-0" amplitude="' + filterValues.amplitudeG + '" exponent="' + filterValues.exponentG + '" offset="'+ filterValues.gammaG+'"/>' +
            '<feFuncB type="gamma" id="blueChannel-0"  amplitude="' + filterValues.amplitudeB + '" exponent="' + filterValues.exponentB + '" offset="'+ filterValues.gammaB+'"/>' +
            '</feComponentTransfer>' +
            '</filter>';
        return filtersStr;
      };

      var onImageLoaded = function() {
        var ww = this.width;
        var hh = this.height;
        var flt = recalculateFilterStr(filterData);
        var svgText = '<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + ww + ' ' + hh + '" enable-background="new 0 0 ' + ww + ' ' + hh + '" xml:space="preserve" preserveAspectRatio="none">' +
          '<defs>' + flt + '</defs>' +
          '<image filter="url(#blackAndWhite)" class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="' + ww + 'px" height="' + hh + 'px" xlink:href="{file}"/>' +
          '<g><radialGradient id="MyGradient"><stop offset="10%" stop-color="#000000" stop-opacity="0" /><stop offset="100%" stop-color="#000000" stop-opacity="'+filterData.parameters.vignette+'" id="vignette" /></radialGradient><ellipse fill="url(#MyGradient)" cx="50%" cy="50%" rx="100%" ry="100%"/></ellipse></g>' +
          '</svg>';

        data.svg(svgText.replace("{file}",""), 'image[xlink:href]');
        data.svg(function(svg, err) {
          post.save();
        });

        var isSupportFilter = !!(typeof(window.SVGFEColorMatrixElement) !== "undefined" && SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE === 2);
        if(isSupportFilter) {
          callback($(svgText.replace("{file}", data.url)), {w:ww, h:hh,d:data});
        } else {
          // Saturation is Parameter - 1 for filter SDK! 
          data.filter(
            [{
              filter: 'saturation',
              parameters: {
                strength: 1 - filterData.parameters.saturation
              }
            }, {
              filter: 'gammaRGB',
              parameters: {
                amplitudeR: filterData.parameters.amplitudeR,
                exponentR: filterData.parameters.exponentR,
                offsetR: filterData.parameters.gammaR,
                amplitudeG: filterData.parameters.amplitudeG,
                exponentG: filterData.parameters.exponentG,
                offsetG: filterData.parameters.gammaG,
                amplitudeB: filterData.parameters.amplitudeB,
                exponentB: filterData.parameters.exponentB,
                offsetB: filterData.parameters.gammaB
              }
            }, {
              filter: "vignette",
              parameters: {
                size: filterData.parameters.vignette/2,
                amount: 0.14,
                centerX: 0.5,
                centerY: 0.5,
                r: 0,
                g: 0,
                b: 0
              }
            }], function(filteredImageData) {
              setTimeout(function() {
                callback($("<div>").css("background-image", "url(" + filteredImageData.url + ")"), {w:ww, h:hh,d:data});
              }, 0);
            }
          );
        }
      };

      var img = new Image();
      img.onload = onImageLoaded;
      img.src = data.url;
    };

    window.filterUTImageDataView = function(data, callback) {
      var img = new Image();
      img.onload = function() {
        if(data.rasterUrl) {
          callback({obj:$("<div>").css("background-image", "url(" + this.src + ")"), w:this.width, h:this.height});
        } else if(data.svgTemplate && data.svgCssSelector) {
          var svg = data.svgTemplate.replace('<image ', '<image xlink:href="'+this.src+'" ');
          callback({obj:$(svg), w:this.width, h:this.height});
        } else {
          callback({obj:$("<div>").css("background-image", "url(" + this.src + ")"), w:this.width, h:this.height});
        }
      };
      img.src = data.rasterUrl || data.url;
    };
  })();
}