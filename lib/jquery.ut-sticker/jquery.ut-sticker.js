/* This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
/* global UT:true */
(function( UT, $, window, document, undefined ) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        if(this.utSticker) {
          if(typeof(options) === "object") {
            this.utSticker.options = $.extend(true, this.utSticker.options, options);
          }
          if(this.utSticker.update) {
            this.utSticker.update.call(this, options && options.styles && options.styles.pos ? options.styles.pos : null);
          }
          return;
        }
        var events = {
          ready: "utSticker:ready",
          change: "utSticker:change",
          rotate: "utSticker:rotate",
          resize: "utSticker:resize",
          move: "utSticker:move",
          buttonClick: "utSticker:buttonClick",
          destroy: "utSticker:destroy",
          click: "utSticker:click",
          dblClick: "utSticker:dblClick",
          focus: "utSticker:focus",
          blur: "utSticker:blur"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            edit: false,
            resize: null,
            rotate: null,
            remove: true
            //custom: "class1"
          },
          styles: {
            proportional: true,
            autoflip: true,
            useBounds: true,
            pos: {
              width: undefined, //'30%',
              ratio: undefined, //1,
              height: undefined,
              cx: undefined, //'50%', // x-pos from center
              cy: undefined, //'50%', // y-pos from center
              left: undefined,
              right: undefined,
              top: undefined,
              bottom: undefined,
              rotation: 0,
              zIndex: undefined
            },
            parentIndent: {
              top: null,
              left: null,
              bottom: null,
              right: null
            },
            selfOutdent: {
              top: '0%',
              left: '0%',
              bottom: '0%',
              right: '0%'
            },
            sizeLimits: {
              minWidth: '10%',
              minHeight: '10%',
              maxWidth: '90%',
              maxHeight: '90%'
            },
            rotationLimits: {
              min: '-180',
              max: '180'
            },
            rotationSnap: {
              base: 90,
              precision: 3
            },
            topOnFocus: true,
            preventAutoRemove: false,
            preventEventsBubble: true // prevent default and stop propogation for click events on item and buttons
          },
          i18n: {
            edit: "edit",
            resize: "resize",
            rotate: "rotate",
            remove: "remove"
          }
        };

        var that = {};
        this.utSticker = that;
        that.initialized = false;
        var bound = this.getBoundingClientRect();

        var defWidth = parseInt(bound.width, 10);
        var defHeight = parseInt(bound.height, 10);
        var parentObj = this.parentNode;
        var $content = $(this);
        var $that = $("<div>").appendTo(parentObj);
        $content.detach();
        $that.append($content);
        $that[0].utSticker = this.utSticker;

        if(options && options.style && !options.styles) {
          console.warn("utSticker :: The 'styles' parameter not found, but 'style' present.");
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isMSIE = window.navigator.userAgent.indexOf("MSIE") !== -1;
        that.data = {
          editable: true,
          // (updated width parent size)
          parentWidth: 0,
          parentHeight: 0,
          // (updated every time when sticker change size or position)
          curBounds: {},
          movable: false,
          rotatable: false,
          resizable: false,
          // rotation regions
          minAngle: -Math.PI,
          maxAngle: Math.PI,
          // (updated width parent size, px)
          parentIndent: {},
          // min and max sizes (updated width parent size, px)
          minWidth: 0,
          minHeight: 0,
          maxWidth: 10000,
          maxHeight: 10000,
          // (updated with sticker size, based on size or bounds, px)
          selfOutdent: {}
        };
        that.view = {};
        that.pos = {};
        that.post = null;
        that.isEditMode = false;
        if(typeof(window.utStickerLastZIndex) === "undefined") {
          window.utStickerLastZIndex = 10;
        }

        var testStyles = window.getComputedStyle(document.body, null);

        var transformStyle = "transform";
        if(typeof(testStyles.webkitTransform) !== "undefined") {
          transformStyle = "webkitTransform";
        } else if(typeof(testStyles.MozTransform) !== "undefined") {
          transformStyle = "MozTransform";
        } else if(typeof(testStyles.msTransform) !== "undefined") {
          transformStyle = "msTransform";
        } else if(typeof(testStyles.OTransform) !== "undefined") {
          transformStyle = "OTransform";
        }

        var mouseStart = that.isTouch ? "touchstart" : "mousedown";
        var mouseMove = that.isTouch ? "touchmove" : "mousemove";
        var mouseEnd = that.isTouch ? "touchend touchcancel" : "mouseup mouseleave";

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function(){
              if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
                that._savePosition();
              }
              $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
            },0);
          }
        });

        that._updateParentSize = function() {
          var parentStyles = window.getComputedStyle(parentObj, null);

          if(parentStyles.position === "static") {
            parentObj.style.position = "relative";
          }
          var isChanged = false;
          var ww = parseInt(parentStyles.width, 10);
          var hh = parseInt(parentStyles.height, 10);
          if(ww && ww > 0 && ww !== that.data.parentWidth) {
            that.data.parentWidth = ww;
            isChanged = true;
          }
          if(hh && hh > 0 && hh !== that.data.parentHeight) {
            that.data.parentHeight = hh;
            isChanged = true;
          }
          if(ww === 0 || hh === 0) {
            console.warn("utSticker :: parent size has zero value");
          }
          return isChanged;
        };

        that.catchEvents = function(obj, callback) {
          var mStart = {};
          var mLast = {};
          var path = 0;
          var $body = $("body");
          var onDown = function(e) {
            path = 0;
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            mStart = { x:mx, y:my };
            mLast = { x:mx, y:my };
            $body.on(mouseMove, onMove);
            $body.on(mouseEnd, onUp);
            if(callback) {
              if(callback.call(obj, "down", {x:mx, y:my, offStart:{x:0, y:0}, offLast:{x:0, y:0}}) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
          };
          var onUp = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            if(callback) {
              if(callback.call(obj, "up", {
                x: mx,
                y: my,
                offStart: {
                  x: mx - mStart.x,
                  y: my - mStart.y
                },
                offLast:{
                  x: mx - mLast.x,
                  y: my - mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            if(path < 3 && that.options.styles.preventEventsBubble && that.isTouch) {
              obj.trigger("click");
            }
            mLast = { x:mx, y:my };
            $body.off(mouseMove, onMove);
            $body.off(mouseEnd, onUp);
          };
          var onMove = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            path += Math.abs(mx-mLast.x) + Math.abs(my-mLast.y);
            if(callback) {
              if(callback.call(obj, "move", {
                x: mx,
                y: my,
                offStart: {
                  x: mx-mStart.x,
                  y: my-mStart.y
                },
                offLast:{
                  x: mx-mLast.x,
                  y: my-mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            mLast = { x:mx, y:my };
          };
          obj.on(mouseStart, onDown);
        };

        /********************************************************************************
         * sticker buttons
         ********************************************************************************/
        that.createButtons = function() {
          // get or create remove button
          $that.find(".ut-sticker-button").remove();
          that.view.remove = null;
          that.view.edit = null;
          that.view.rotate = null;
          that.view.resize = null;

          if(that.options.ui.remove) {
            that.view.remove = $("<a>").addClass("ut-sticker-button ut-sticker-button-remove icon_delete")
              .attr("data-bkey", "remove")
              .attr("title", that.options.i18n.remove)
              .appendTo($that);
            that.view.remove.on(mouseStart, that.onButtonDown);
            that.view.remove.on(mouseEnd, that.onButtonUp);
            that.view.remove.on("click", that.onButtonClick);
          }

          if(that.options.ui.edit) {
            that.view.edit = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-edit icon_edit")
              .attr("data-bkey", "edit")
              .attr("title", that.options.i18n.edit).appendTo($that);
            that.view.edit.on(mouseStart, that.onButtonDown);
            that.view.edit.on(mouseEnd, that.onButtonUp);
            that.view.edit.on("click", that.onButtonClick);
          }

          that.options.ui.rotate = that.data.rotatable ? that.options.ui.rotate : false;
          that.options.ui.resize = that.data.resizable ? that.options.ui.resize : false;

          if(that.options.ui.rotate === null) {
            if(that.options.styles.proportional) {
              that.options.ui.rotate = !that.options.ui.resize;
            } else {
              that.options.ui.rotate = true;
            }
          }
          if(that.options.ui.resize === null) {
            if(that.options.styles.proportional) {
              that.options.ui.resize = !that.options.ui.rotate;
            } else {
              that.options.ui.resize = true;
            }
          }

          // get or create rotate button
          if(that.options.ui.rotate) {
            that.view.rotate = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-rotate icon_rotate")
              .attr("title", that.options.i18n.rotate)
              .appendTo($that);
            that.catchEvents(that.view.rotate, that.onElementRotate);
          }

          // get or create remove button
          if(that.options.ui.resize) {
            that.view.resize = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-resize icon_fullscreen")
              .attr("title", that.options.i18n.resize)
              .appendTo($that);
            that.catchEvents(that.view.resize, that.onElementResize);
          }

          if((that.view.rotate && !that.view.resize) || (!that.view.rotate && that.view.resize)) {
            $that.addClass("ut-sticker-one-scale-size-button");
          } else {
            $that.removeClass("ut-sticker-one-scale-size-button");
          }

          for(var qq in that.options.ui) {
            if(that.options.ui[qq]) {
              if(qq === "edit" || qq === "resize" || qq === "rotate" || qq === "remove") {
                continue;
              }
              var className = that.options.ui[qq];
              var tmp = $("<a>").addClass("ut-sticker-button ut-sticker-button-custom " + className);
              if(that.options.i18n[qq]) {
                tmp.attr("title", that.options.i18n[qq]);
              }
              tmp.appendTo($that);
              tmp.attr("data-bkey", qq);
              tmp.on(mouseStart, that.onButtonDown);
              tmp.on(mouseEnd, that.onButtonUp);
              tmp.on("click", that.onButtonClick);
            }
          }
        };

        that.onButtonDown = function(e) {
          that.preventButtonEvents = $(this).attr("data-bkey");
          e.stopPropagation();
        };

        that.onButtonUp = function(e) {
          if(that.preventButtonEvents !== $(this).attr("data-bkey")) {
            return;
          }
          e.stopPropagation();
        };

        that.onButtonClick = function(event) {
          var id = $(this).attr("data-bkey");
          var isStopEvent = false;
          var isBreakEvent = false;
          if(id === "remove" && !that.options.styles.preventAutoRemove) {
            that.removeElement();
          } else {
            var ev = $.Event(events.buttonClick);
            $content.trigger(ev, id);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        /********************************************************************************
         * prepare element
         ********************************************************************************/
        that.prepareElement = function() {
          $that.addClass("ut-sticker");
          if(that.isMSIE) {
            $that.addClass("msie");
          }

          $that[0].style.position = "absolute";
          $content.addClass("ut-sticker-content");

          if($content[0].getAttribute("id") === "" && that.options.id) {
            that.options.id = "sticker-" + UT.uuid();
            console.warn("utSticker :: element ID not found, generating new:", that.options.id);
          }
          if(that.options.id !== "") {
            $content[0].setAttribute("id", that.options.id);
          } else {
            that.options.id = $content[0].getAttribute("id");
          }

          $content[0].style.width = "100%";
          $content[0].style.height = "100%";

          if(that.isEditMode) {
            $that.addClass("ut-sticker-edit");
          }

          // attach events for move sticker and blur
          that.catchEvents($that, that.onElementMouse);
          // "click" event to ut-sticker-content
          $that.on("click", that.onElementClick);
          $("body").on(mouseStart, that.onBodyClick);
        };

        that.parseSizeValue = function(sss, size, def) {
          var tmp;
          tmp = sss.toString().match(/([+\-]?[0-9]*(\.[0-9]+)?)(px|%)?/i);
          if(tmp && (typeof(tmp[3]) === "undefined" || tmp[3] === null || tmp[3] === "px")) {
            return parseFloat(tmp[1]);
          } else if(tmp && tmp[3] === "%") {
            return parseFloat(tmp[1]) / 100 * size;
          }
          return (typeof(def) !== "undefined" ? def : null);
        };

        that.preparePosition = function() {
          that.pos = that.post.storage["utSticker_" + that.options.id + "_pos"] || {};
          var width = 0;
          var height = 0;

          if(typeof(that.pos.width) === "undefined" &&
            typeof(that.pos.ratio) === "undefined" &&
            (typeof(that.options.styles.pos.width) === "undefined" || that.options.styles.pos.width === null || that.options.styles.pos.width === false || that.options.styles.pos.width === "auto") &&
            (typeof(that.options.styles.pos.ratio) === "undefined" || that.options.styles.pos.ratio === null || that.options.styles.pos.ratio === false || that.options.styles.pos.ratio === "auto") &&
            (typeof(that.options.styles.pos.height) === "undefined" || that.options.styles.pos.height === null || that.options.styles.pos.height === false || that.options.styles.pos.height === "auto") &&
            defWidth && defHeight) {
            width = defWidth;
            height = defHeight;
            that.pos.width = width / that.data.parentWidth;
            that.pos.ratio = width / height;
          } else {
            // check width
            if(typeof(that.pos.width) === "undefined") {
              width = that.parseSizeValue(that.options.styles.pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
              that.pos.width = width / that.data.parentWidth;
            } else {
              width = that.pos.width * that.data.parentWidth;
            }

            // check height
            if(typeof(that.pos.ratio) === "undefined") {
              if(that.options.styles.pos.ratio === "auto" || that.options.styles.pos.height === "auto") {
                that.pos.ratio = defWidth / defHeight;
              } else {
                if(typeof(that.options.styles.pos.ratio) !== "undefined" && that.options.styles.pos.ratio !== null && that.options.styles.pos.ratio !== false && that.options.styles.pos.ratio !== "auto") {
                  that.pos.ratio = parseFloat(that.options.styles.pos.ratio);
                  height = width / that.pos.ratio;
                } else if(typeof(that.options.styles.pos.height) !== "undefined" && that.options.styles.pos.height !== null && that.options.styles.pos.height !== false && that.options.styles.pos.height !== "auto") {
                  height = that.parseSizeValue(that.options.styles.pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
                  that.pos.ratio = width / height;
                } else {
                  height = width;
                  that.pos.ratio = width / height;
                }
              }
            }
          }

          // check left
          if(typeof(that.pos.left) === "undefined") {
            if(typeof(that.options.styles.pos.cx) !== "undefined" && that.options.styles.pos.cx !== null && that.options.styles.pos.cx !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            } else if(typeof(that.options.styles.pos.left) !== "undefined" && that.options.styles.pos.left !== null && that.options.styles.pos.left !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left += width / 2;
            } else if(typeof(that.options.styles.pos.right) !== "undefined" && that.options.styles.pos.right !== null && that.options.styles.pos.right !== false) {
              that.pos.left = that.data.parentWidth - that.parseSizeValue(that.options.styles.pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left -= width / 2;
            } else {
              that.pos.left = 0.5 * that.data.parentWidth;
            }
            that.pos.left = that.pos.left / that.data.parentWidth;
          }

          // check top
          if(typeof(that.pos.top) === "undefined") {
            if(typeof(that.options.styles.pos.cy) !== "undefined" && that.options.styles.pos.cy !== null && that.options.styles.pos.cy !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            } else if(typeof(that.options.styles.pos.top) !== "undefined" && that.options.styles.pos.top !== null && that.options.styles.pos.top !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top += height / 2;
            } else if(typeof(that.options.styles.pos.bottom) !== "undefined" && that.options.styles.pos.bottom !== null && that.options.styles.pos.bottom !== false) {
              that.pos.top = that.data.parentHeight - that.parseSizeValue(that.options.styles.pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top -= height / 2;
            } else {
              that.pos.top = 0.5 * that.data.parentHeight;
            }
            that.pos.top = that.pos.top / that.data.parentHeight;
          }

          // check angle
          if(typeof(that.pos.angle) === "undefined") {
            if(typeof(that.options.styles.pos.rotation) === "undefined") {
              that.pos.angle = 0;
            } else {
              that.pos.angle = parseFloat(that.options.styles.pos.rotation) / 180 * Math.PI;
            }
          }

          // check zIndex
          if(typeof(that.pos.zIndex) === "undefined") {
            if(typeof(that.options.styles.pos.zIndex) === "undefined") {
              that.pos.zIndex = window.utStickerLastZIndex++;
            } else {
              that.pos.zIndex = parseInt(that.options.styles.pos.zIndex, 10);
            }
          }
          if(window.utStickerLastZIndex <= that.pos.zIndex) {
            window.utStickerLastZIndex = that.pos.zIndex + 1;
          }
        };

        that.applyNewPosition = function(pos) {
          var width, height, isChanged = false;
          if(typeof(pos.width) !== "undefined" && pos.width !== null && pos.width !== false && pos.width !== "auto") {
            width = that.parseSizeValue(pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
            that.pos.width = width / that.data.parentWidth;
            isChanged = true;
          } else {
            width = that.pos.width * that.data.parentWidth;
          }

          if(typeof(pos.ratio) !== "undefined" && pos.ratio !== null && pos.ratio !== false && pos.ratio !== "auto") {
            that.pos.ratio = parseFloat(pos.ratio);
            height = width / that.pos.ratio;
            isChanged = true;
          } else if(typeof(pos.height) !== "undefined" && pos.height !== null && pos.height !== false && pos.height !== "auto") {
            height = that.parseSizeValue(pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
            that.pos.ratio = width / height;
            isChanged = true;
          } else {
            height = width * that.data.parentWidth;
          }

          if(typeof(pos.cx) !== "undefined" && pos.cx !== null && pos.cx !== false) {
            that.pos.left = that.parseSizeValue(pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.left) !== "undefined" && pos.left !== null && pos.left !== false) {
            that.pos.left = that.parseSizeValue(pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left += width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.right) !== "undefined" && pos.right !== null && pos.right !== false) {
            that.pos.left = that.data.parentWidth - that.parseSizeValue(pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left -= width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          }

          if(typeof(pos.cy) !== "undefined" && pos.cy !== null && pos.cy !== false) {
            that.pos.top = that.parseSizeValue(pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.top) !== "undefined" && pos.top !== null && pos.top !== false) {
            that.pos.top = that.parseSizeValue(pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top += height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.bottom) !== "undefined" && pos.bottom !== null && pos.bottom !== false) {
            that.pos.top = that.data.parentHeight - that.parseSizeValue(pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top -= height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          }

          // check angle
          if(typeof(pos.rotation) !== "undefined" && pos.rotation !== null && pos.rotation !== false) {
            that.pos.angle = parseFloat(pos.rotation) / 180 * Math.PI;
            isChanged = true;
          }

          // check zIndex
          if(typeof(pos.zIndex) !== "undefined" && pos.zIndex !== null && pos.zIndex !== false) {
            that.pos.zIndex = parseInt(pos.zIndex, 10);
            isChanged = true;
          }
          return isChanged;
        };

        that.removeElement = function() {
          $content.trigger(events.destroy, that.options.id);
          $that.remove();
          if(that.post) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = null;
            that.post.save();
          }
        };

        /********************************************************************************
         * update element position, size, e.t.c.
         ********************************************************************************/
        that.updateAngleForSnap = function(ang) {
          var bb = parseFloat(that.options.styles.rotationSnap.base) / 180 * Math.PI;
          var pr = parseFloat(that.options.styles.rotationSnap.precision) / 180 * Math.PI;
          var da = that.pos.angle - Math.round(that.pos.angle/bb) * bb;
          if(Math.abs(da) < pr) {
            return Math.round(that.pos.angle/bb) * bb;
          }
          return ang;
        };

        that.updateAngle = function() {
          // update only rotation by css-transform
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          var tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
          if(that.isMSIE) {
            tmpVal = "rotate("+viewAngle+"rad)";
          }
          var obj = $that[0];
          obj.style[transformStyle] = tmpVal;

          that.updateButtonsAngle();
          if(that.options.styles.autoflip) {
            that.updateContentAngle();
          }
        };

        that.updateContentAngle = function() {
          var aa = that.updateAngleForSnap(that.pos.angle);
          aa=(aa / ( 2 * Math.PI) - Math.floor(aa / (2 * Math.PI))) * (2 * Math.PI);
          if(Math.abs(aa) > (Math.PI / 2) && Math.abs(aa) < (3 * Math.PI / 2)) {
            if($content[0].classList) {
              $content[0].classList.add("ut-sticker-flip");
            } else {
              $content.addClass("ut-sticker-flip");
            }
          } else {
            if($content[0].classList) {
              $content[0].classList.remove("ut-sticker-flip");
            } else {
              $content.removeClass("ut-sticker-flip");
            }
          }
        };

        that.updateButtonsAngle = function() {
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          viewAngle *= -1;
          var qq, obj, tmpVal, tmp = $that[0].getElementsByClassName("ut-sticker-button");
          if(tmp && tmp.length > 0) {
            tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
            if(that.isMSIE) {
              tmpVal = "rotate("+viewAngle+"rad)";
            }
            for(qq = 0; qq < tmp.length; ++qq) {
              obj = tmp[qq];
              obj.style[transformStyle] = tmpVal;
            }
          }
        };

        /**
         * change element size (and margins)
         */
        that.updateSize = function() {
          $that[0].style.width = Math.round(that.pos.width * that.data.parentWidth) + "px";
          $that[0].style.height = Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth) + "px";
          $that[0].style.marginLeft = -Math.round(that.pos.width * that.data.parentWidth / 2) + "px";
          $that[0].style.marginTop = -Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth / 2) + "px";
        };

        /**
         * change element position
         */
        that.updatePosition = function() {
          $that[0].style.left = Math.round(that.pos.left * that.data.parentWidth) + "px";
          $that[0].style.top = Math.round(that.pos.top * that.data.parentHeight) + "px";
          $that[0].style.zIndex = that.pos.zIndex;
        };

        that.getBounds = function(obj, transformObject, refObject) {
          var _obj = obj.jquery ? obj[0] : obj;
          var data = _obj.getBoundingClientRect();
          if(!data) {
            return { left:0, top:0, right:0, bottom:0, width:0, height:0 };
          }

          if(refObject) {
            refObject = refObject.jquery ? refObject[0] : refObject;
            var offset = refObject.getBoundingClientRect();
            return {
              left: data.left - offset.left,
              top: data.top - offset.top,
              right: data.left - offset.left + data.width,
              bottom: data.top - offset.top + data.height,
              width: data.width,
              height: data.height
            };
          }
          return {
            left: data.left,
            top: data.top,
            right: data.left + data.width,
            bottom: data.top + data.height,
            width: data.width,
            height: data.height
          };
        };

        /**
         * update item's bounds data (that.data.curBounds)
         * @warning DOM Element repainting by browser
         * @private
         */
        that._updateBoundsInfo = function() {
          if(!that.options.styles.useBounds) {
            return;
          }
          that.data.curBounds = that.getBounds($that, false, parentObj);
        };

        /********************************************************************************
         * validate object size by bounds rect
         * @change that.pos
         * @return {Boolean} -- 'true' is position updated, 'false' - if position not changed
         ********************************************************************************/
        that.validateSizeInBounds = function(allowUpdate) {
          var asc = Math.min(that.data.parentWidth/that.data.curBounds.width, that.data.parentHeight/that.data.curBounds.height);
          if(asc < 1) {
            if(allowUpdate !== false) {
              that.pos.width *= asc;
            }
            return true;
          }
          return false;
        };

        /**
         * check element size for min and max
         * using info from that.pos
         * @change that.pos
         * @returns {boolean} -- true if size was changed
         */
        that.validateSize = function() {
          var res = that.validateSizeInBounds();

          // size in px
          var ww = that.pos.width * that.data.parentWidth;
          var hh = ww / that.pos.ratio;

          var nww = Math.min(Math.max(that.data.minWidth, ww), that.data.maxWidth);
          var nhh = Math.min(Math.max(that.data.minHeight, hh), that.data.maxHeight);

          if(nww === ww && nhh === hh) {
            return res || false;
          }

          if(that.options.styles.proportional) {
            if((nww / that.pos.ratio) > nhh) {
              nww = nhh * that.pos.ratio;
            }
            that.pos.width = nww / that.data.parentWidth;
          } else {
            that.pos.ratio = nww / nhh;
            that.pos.width = nww / that.data.parentWidth;
          }
          return true;
        };

        /**
         * check element position by parentIndent and selfOutdent
         * using info from that.pos or that.data.curBounds
         * @change that.pos
         * @returns {boolean} -- true if position was changed
         */
        that.validatePosition = function() {
          var updatePos = false;

          // without using bounds
          if(!that.options.styles.useBounds) {
            var ww = that.pos.width * that.data.parentWidth;
            var hh = ww / that.pos.ratio;
            var ll = that.pos.left * that.data.parentWidth;
            var tt = that.pos.top * that.data.parentHeight;

            if(that.data.parentIndent.left !== null) {
              if((ll - ww / 2) < that.data.parentIndent.left - that.data.selfOutdent.left) {
                ll = that.data.parentIndent.left - that.data.selfOutdent.left + ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.top !== null) {
              if((tt - hh / 2) < that.data.parentIndent.top - that.data.selfOutdent.top) {
                tt = that.data.parentIndent.top - that.data.selfOutdent.top + hh / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.right !== null) {
              if((ll + ww / 2) > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
                ll = (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right) - ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.bottom !== null) {
              if((tt + hh / 2) > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
                tt = (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom) - hh / 2;
                updatePos = true;
              }
            }

            if(updatePos) {
              that.pos.left = ll / that.data.parentWidth;
              that.pos.top = tt / that.data.parentHeight;
            }
            return updatePos;
          }

          // check position
          if(that.data.parentIndent.left !== null) {
            if(that.data.curBounds.left < that.data.parentIndent.left - that.data.selfOutdent.left) {
              that.pos.left += (that.data.parentIndent.left - that.data.selfOutdent.left - that.data.curBounds.left) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.top !== null) {
            if(that.data.curBounds.top < that.data.parentIndent.top - that.data.selfOutdent.top) {
              that.pos.top += (that.data.parentIndent.top - that.data.selfOutdent.top - that.data.curBounds.top) / that.data.parentHeight;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.right !== null) {
            if(that.data.curBounds.right > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
              that.pos.left -= (that.data.curBounds.right - (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.bottom !== null) {
            if(that.data.curBounds.bottom > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
              that.pos.top -= (that.data.curBounds.bottom - (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) / that.data.parentHeight;
              updatePos = true;
            }
          }
          return updatePos;
        };

        /**
         * check element angle
         * @change that.pos
         */
        that.validateAngle = function() {
          var res = false;
          var amin, amax;
          if(that.data.minAngle < that.data.maxAngle) {
            // check range
            if(that.pos.angle < that.data.minAngle || that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          } else {
            // check range
            if(that.pos.angle < that.data.minAngle && that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          }
          return res;
        };

        /**
         * update worked params from that.options structure
         * @param prm {Object} -- changes for that.options
         */
        that.updateParams = function() {
          var isChanged = false;
          if(that._updateParentSize()) {
            isChanged = true;
          }
          that._updateEditableState();
          that._updateRotationLimits();
          that._updateSizeLimits();
          that._updateParentIndent();
          return isChanged;
        };

        that._updateEditableState = function() {
          // prevent editable to view mode
          if(!that.isEditMode) {
            that.options.editable = false;
          }
          // prepare worked parameters
          if(that.options.editable === true || that.options.editable === false) {
            that.data.editable = that.data.movable = that.data.rotatable = that.data.resizable = (that.options.editable === true);
          } else if(typeof(that.options.editable) === "object") {
            that.data.movable = !!that.options.editable.movable;
            that.data.rotatable = !!that.options.editable.rotatable;
            that.data.resizable = !!that.options.editable.resizable;
            that.data.editable = that.data.movable || that.data.rotatable || that.data.resizable;
          }
          // drop focus
          if(that.data.editable === false && $that.hasClass("ut-sticker-focus")) {
            that.blur();
          }
        };

        that._updateRotationLimits = function() {
          if(that.options.styles.rotationLimits.min > 180) {
            that.options.styles.rotationLimits.min = 360 - that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.min < -180) {
            that.options.styles.rotationLimits.min = 360 + that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.max > 180) {
            that.options.styles.rotationLimits.max = 360 - that.options.styles.rotationLimits.max;
          }
          if(that.options.styles.rotationLimits.max < -180) {
            that.options.styles.rotationLimits.max = 360 + that.options.styles.rotationLimits.max;
          }
          that.data.minAngle = parseFloat(that.options.styles.rotationLimits.min) / 180 * Math.PI;
          that.data.maxAngle = parseFloat(that.options.styles.rotationLimits.max) / 180 * Math.PI;
        };

        that._updateSizeLimits = function() {
          that.data.minWidth = that.parseSizeValue(that.options.styles.sizeLimits.minWidth, that.data.parentWidth);
          if(that.data.minWidth === null) {
            that.data.minWidth = 0;
          }
          that.data.minHeight = that.parseSizeValue(that.options.styles.sizeLimits.minHeight, that.data.parentHeight);
          if(that.data.minHeight === null) {
            that.data.minHeight = 0;
          }
          that.data.maxWidth = that.parseSizeValue(that.options.styles.sizeLimits.maxWidth, that.data.parentWidth);
          if(that.data.maxWidth === null) {
            that.data.maxWidth = 0;
          }
          that.data.maxHeight = that.parseSizeValue(that.options.styles.sizeLimits.maxHeight, that.data.parentHeight);
          if(that.data.maxHeight === null) {
            that.data.maxHeight = 0;
          }
        };

        that._updateParentIndent = function() {
          if(typeof(that.options.styles.parentIndent) === "undefined" || that.options.styles.parentIndent === null || that.options.styles.parentIndent === false) {
            return;
          }

          if(typeof(that.options.styles.parentIndent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentWidth, 0);
            that.data.parentIndent.left = that.data.parentIndent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentHeight, 0);
            that.data.parentIndent.top = that.data.parentIndent.bottom = tmp;
            return;
          }

          if(that.options.styles.parentIndent.left !== null) {
            that.data.parentIndent.left = that.parseSizeValue(that.options.styles.parentIndent.left, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.left = null;
          }

          if(that.options.styles.parentIndent.top !== null) {
            that.data.parentIndent.top = that.parseSizeValue(that.options.styles.parentIndent.top, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.top = null;
          }

          if(that.options.styles.parentIndent.right !== null) {
            that.data.parentIndent.right = that.parseSizeValue(that.options.styles.parentIndent.right, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.right = null;
          }

          if(that.options.styles.parentIndent.bottom !== null) {
            that.data.parentIndent.bottom = that.parseSizeValue(that.options.styles.parentIndent.bottom, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.bottom = null;
          }
        };

        /**
         * prepare outdent parameters for work
         * @change that.data.selfOutdent
         * @private
         */
        that._updateSelfOutdent = function() {
          if(typeof(that.options.styles.selfOutdent) === "undefined" || that.options.styles.selfOutdent === null || that.options.styles.selfOutdent === false) {
            return;
          }

          if(typeof(that.options.styles.selfOutdent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.width(), 0);
            that.data.selfOutdent.left = that.data.selfOutdent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.height(), 0);
            that.data.selfOutdent.top = that.data.selfOutdent.bottom = tmp;
          } else {
            that.data.selfOutdent.left = that.parseSizeValue(that.options.styles.selfOutdent.left, $that.width(), 0);
            that.data.selfOutdent.top = that.parseSizeValue(that.options.styles.selfOutdent.top, $that.height(), 0);
            that.data.selfOutdent.right = that.parseSizeValue(that.options.styles.selfOutdent.right, $that.width(), 0);
            that.data.selfOutdent.bottom = that.parseSizeValue(that.options.styles.selfOutdent.bottom, $that.height(), 0);
          }
        };

        that._savePosition = function() {
          if(that.isEditMode && that.data.editable) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = that.pos;
            that.post.save();
          }
        };

        that._getCurrentData = function() {
          return {
            width: that.pos.width * that.data.parentWidth,
            height: that.pos.width/that.pos.ratio * that.data.parentWidth,
            rotation: that.pos.angle * 180 / Math.PI,
            zIndex: that.pos.zIndex
          };
        };

        /********************************************************************************
         * mouse and touch events
         ********************************************************************************/
        var itemWasMoved = false;
        var doubleClickTimeOut = 600;
        var lastClickTime = 0;
        that.onElementClick = function(event) {
          var eventType = events.click;
          var curTime = (new Date()).getTime();
          if((curTime - lastClickTime) < doubleClickTimeOut) {
            eventType = events.dblClick;
          }
          lastClickTime = curTime;
          var isStopEvent = false;
          var isBreakEvent = false;
          if(!that.isEditMode || !that.data.editable || !itemWasMoved) {
            var ev = $.Event(eventType);
            $content.trigger(ev);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        that.onElementMouse = function(type, data) {
          if(!that.isEditMode || !that.data.editable) {
            return true;
          }
          if(type === "down") {
            that.focus(true);
            itemWasMoved = false;
          } else if(type === "move" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.add("ut-sticker-moving");
            } else {
              $that.addClass("ut-sticker-moving");
            }
            that.pos.left += data.offLast.x / that.data.parentWidth;
            that.pos.top += data.offLast.y / that.data.parentHeight;

            // change element position
            if(that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            if(that.validatePosition() === true || !that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            itemWasMoved = true;
          } else if(type === "up" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.remove("ut-sticker-moving");
            } else {
              $that.removeClass("ut-sticker-moving");
            }
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
          }
          return false;
        };

        that.onElementResize = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.rotate) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.resizable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.resizable) {
            var tx = data.offLast.x * Math.cos(that.pos.angle) + data.offLast.y * Math.sin(that.pos.angle);
            var ty = -data.offLast.x * Math.sin(that.pos.angle) + data.offLast.y * Math.cos(that.pos.angle);
            // multiple to 2 cause scale was center
            var sx = tx * 2;
            var sy = ty * 2;
            var ow = that.pos.width * that.data.parentWidth;
            var oh = ow / that.pos.ratio;
            ow += sx;
            oh += sy;
            if(that.options.styles.proportional) {
              that.pos.width = ow / that.data.parentWidth;
            } else {
              that.pos.width = ow / that.data.parentWidth;
              that.pos.ratio = ow / oh;
            }

            // change element position
            that.validateSize();
            that.updateSize();
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
            }
            that._updateSelfOutdent();
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.resizable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that._fullOffsetLeft = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetLeft;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that._fullOffsetTop = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetTop;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that.onElementRotate = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.resize) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.rotatable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.rotatable) {
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            // change element position
            that.updateAngle();
            $content.trigger(events.rotate, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validateSizeInBounds(false) === true) {
              that.validateSize();
              that.updateSize();
              $content.trigger(events.resize, that._getCurrentData());
              if(that.options.styles.useBounds) {
                that._updateBoundsInfo();
                that._updateSelfOutdent();
              }
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.rotatable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that.onElementRotateAndResize = function(type, data) {
          if(type === "down") {
            that.focus(true);
            return false;
          } else if(type === "move") {
            // calc mouse offset by element center
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var cl = Math.sqrt((cx - data.offLast.x)*(cx - data.offLast.x) + (cy - data.offLast.y)*(cy - data.offLast.y)) * 2;
            var nl = Math.sqrt(cx*cx + cy*cy) * 2;
            that.pos.width *= nl/cl;

            /* rotate element */
            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            /* change element position */
            that.updateAngle();
            that.validateSize();
            that.updateSize();
            $content.trigger(events.rotate, that._getCurrentData());
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up") {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
          return true;
        };

        that.onBodyClick = function() {
          if($that.hasClass("ut-sticker-focus") && $(this).closest(".ut-sticker").length <= 0) {
            that.blur();
          }
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that[0].style.display = "none";
          $content[0].style.display = "none";
        };

        that.show = function() {
          $that[0].style.display = "";
          $content[0].style.display = "";
        };

        that.focus = function(isChangeZIndex) {
          if(!that.data.editable || $that.hasClass("ut-sticker-focus")) {
            return;
          }
          var tmp = parentObj.getElementsByClassName("ut-sticker");
          if(tmp && tmp[0]) {
            $(tmp).utSticker("blur");
          }
          $that.addClass("ut-sticker-focus");
          $that.trigger(events.focus, that.options.id);
          if(that.options.styles.topOnFocus && isChangeZIndex) {
            that.pos.zIndex = window.utStickerLastZIndex++;
            $that[0].style.zIndex = that.pos.zIndex;
            $content.trigger(events.change, that._getCurrentData());
          }
        };

        that.blur = function() {
          if(!$that.hasClass("ut-sticker-focus")) {
            return;
          }
          $that.removeClass("ut-sticker-focus");
          $that.trigger(events.blur, that.options.id);
        };

        /**
         * update sticker size and position (need to call when parent size changed)
         */
        that.update = function(pos) {
          var isPosChanged = false;
          if(that.updateParams()) {
            isPosChanged = true;
          }
          that.createButtons();
          if(pos && that.applyNewPosition(pos)) {
            isPosChanged = true;
          }
          that.updateSize();
          that.updatePosition();
          if(!that.options.autoflip) {
            $content.removeClass("ut-sticker-flip");
          }
          that.validateAngle();
          that.updateAngle();
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(that.data.resizable) {
            if(that.validateSize() === true) {
              isPosChanged = true;
              that.updateSize();
            }
          }
          if(that.data.movable) {
            if(that.validatePosition() === true) {
              isPosChanged = true;
              that.updatePosition();
            }
          }
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(isPosChanged) {
            $content.trigger(events.change, that._getCurrentData());
            that._savePosition();
          }
        };

        /**
         * change editable state
         * @param data {boolean|object} -- turn on/off posibility for editable sticker. Can be object with {movable,rotatable,resizable}
         */
        that.editable = function(data) {
          if(typeof(data) === "object") {
            that.options.editable = $.extend(true, {}, data);
          } else {
            that.options.editable = data;
          }
          that._updateEditableState();
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isPosChanged = false;
        that.updateParams();
        that.prepareElement();
        that.createButtons();
        that.preparePosition();
        that.updateSize();
        that.updatePosition();
        that.updateAngle();
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        if(that.data.resizable) {
          if(that.validateSize() === true) {
            that.updateSize();
            isPosChanged = true;
          }
        }
        if(that.data.movable) {
          if(that.validatePosition() === true) {
            that.updatePosition();
            isPosChanged = true;
          }
        }
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        that.initialized = true;
        if(that.post) {
          setTimeout(function(){
            if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
              that._savePosition();
            }
            $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
          },0);
        }
        if(isPosChanged) {
          setTimeout(function(){
            $content.trigger(events.change, that._getCurrentData());
          },0);
          that._savePosition();
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.hide){
          this.utSticker.hide.call(this);
        }
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.show){
          this.utSticker.show.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.focus){
          this.utSticker.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.blur){
          this.utSticker.blur.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.update){
          this.utSticker.update.call(this);
        }
      });
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utSticker && this.utSticker.editable){
          this.utSticker.editable.call(this, data);
        }
      });
      return this;
    },

    remove: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.removeElement){
          this.utSticker.removeElement.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      return methods.remove.apply(this);
    }
  };

  $.fn.utSticker = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utSticker');
    }
    return this;
  };
}(UT, jQuery, window, document, undefined));