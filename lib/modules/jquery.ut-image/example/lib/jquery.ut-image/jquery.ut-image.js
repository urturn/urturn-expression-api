/*
 * This source code is licensed under version 3 of the AGPL.
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
(function($, window, document, undefined) {
  "use strict";

  var methods = {
    nextPanelToAddImage: -1,
    init: function(options) {
      this.each(function() {
        if(this.utImage) {
          if(typeof(options) === "object") {
            this.utImage.options = $.extend(true, this.utImage.options, options);
            if(options && options.styles && options.styles.linkPosition) {
              this.utImage.options.styles.linkPosition = $.extend(true, {}, options.styles.linkPosition);
            }
            if(options && options.styles && options.styles.menuPosition) {
              this.utImage.options.styles.menuPosition = $.extend(true, {}, options.styles.menuPosition);
            }
            if(options.data) {
              this.utImage.firstTimeImageLoad();
            }
          }

          this.utImage.updateElement();
          this.utImage.createElements();
          this.utImage.resizeContainer();
          return;
        }

        var events = {
          ready: "utImage:ready",
          buttonClick: "utImage:buttonClick",
          mediaBeforeAdd: "utImage:mediaBeforeAdd",
          mediaAdd: "utImage:mediaAdd",
          mediaCrop: "utImage:mediaCrop",
          mediaRemove: "utImage:mediaRemove",
          mediaReady: "utImage:mediaReady",
          change: "utImage:change",
          focus: "utImage:focus",
          blur: "utImage:blur",
          destroy: "utImage:destroy",
          dialogOpen: "utImage:dialogOpen",
          dialogCancel: "utImage:dialogCancel",
          resize: "utImage:resize"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            add:true,
            edit:true,
            remove:true,
            source:false
          },
          type: "background", /* background, image, svg, canvas */
          data: null,
          autoSave: true,
          styles: {
            width: "auto",
            height: false,
            minHeight: undefined,
            maxHeight: undefined,
            minWidth: undefined,
            maxWidth: undefined,
            flexRatio: true,
            autoCrop: true,
            linkPosition: {}, // def: left:0, bottom:0;
            menuPosition: {}, // def: left:15, top:15
            filters: [],
            groupMode: false,
            autoResize: true,
            listenMedia: true,
            svgFilterName: "",
            svgFilterData: "",
            expandPreloader: false
          },
          i18n: {
            addButtonText: "Add image",
            dialogLabel: ""
          },
          dialog: {
            preferedFormat: false
          },
          reuse: false
        };

        var that = {};
        this.utImage = that;
        that.initialized = false;

        var $that = $(this);
        that.options = $.extend(true, defaults, options);
        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isEditMode = false;
        that.data = {
          pictureData: null,
          image: null,
          imageWidth: 0,
          imageHeight: 0,
          scrollTop: 0,
          scrollBottom: 0
        };
        that.view = {
          addButton: null,
          ctrlPanel: null,
          editButton: null,
          removeButton: null
        };

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function() {
              $that.trigger(events.ready, { id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"] });
              if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
                var sz = {
                  width: $that.width(),
                  height: Math.round(that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                  ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
                };
                if(sz.height !== $that.height()) {
                  $that.height(sz.height);
                  $that.trigger(events.resize, sz);
                }
              }
            }, 0);
            that.addMediaListener();
          }
          setTimeout(function() {
            $(".webdoc_expression_wrapper").on("touchmove", that.onTouchMove);
            that.post.on("scroll", that.onPostScroll);
          }, 0);
        });

        that.updateElement = function() {
          if(that.options.styles.groupMode) {
            $that.addClass("ut-image-in-group");
          } else {
            $that.removeClass("ut-image-in-group");
          }

          if($that.attr("id") === "" && that.options.id) {
            that.options.id = "image-" + UT.uuid();
          }
          if(that.options.id !== "") {
            $that.attr("id", that.options.id);
          } else {
            that.options.id = $that.attr("id");
          }
        };

        that.prepareElement = function(){
          $that.addClass("ut-image");
          that.updateElement();

          $that.on("click", function() {
            if(!$that.hasClass("ut-image-focus") || $that.hasClass("ut-image-inscroll")) {
              $that.removeClass("ut-image-inscroll");
              that.focus();
            } else if(that.options.styles.groupMode) { // && $(".ut-image").length <= 1
              that.blur();
            }
          });
        };

        that.createElements = function() {
          if(that.view.addButton) {
            that.view.addButton.remove();
            that.view.addButton = null;
          }
          if(that.view.ctrlPanel) {
            that.view.ctrlPanel.remove();
            that.view.ctrlPanel = null;
          }

          that.updateSourceLink();
          if(!that.options.editable) {
            $that.removeClass("ut-image-edit");
            return;
          }
          $that.addClass("ut-image-edit");

          if(that.options.ui.add) {
            that.view.addButton = $("<div>", {"class":"ut-image-button-add ut-button ut-media-button icon_camera"}).appendTo($that).html(that.options.i18n.addButtonText);
            that.view.addButton.on("click",that.onAddButtonClick);
          }
          if(that.options.ui.edit || that.options.ui.remove) {
            that.view.ctrlPanel = $("<div>", {"class":"ut-image-control-panel"}).appendTo($that);
            if(that.options.ui.edit) {
              that.view.editButton = $("<div>", {"class":"ut-image-button-edit"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.editButton).html('<span class="icon_camera">&nbsp;</span>Edit');
              that.view.editButton.on("click", that.onEditButtonClick);
            }
            if(that.options.ui.remove) {
              that.view.removeButton = $("<div>", {"class":"ut-image-button-remove"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.removeButton).html('<span class="icon_trash"></span>');
              that.view.removeButton.on("click", that.onRemoveButtonClick);
            }
            if(typeof(that.options.styles.menuPosition.left) !== "undefined") {
              that.view.ctrlPanel.css({ "left":parseInt(that.options.styles.menuPosition.left ,10) + "px", "right":"auto" });
            } else if(typeof(that.options.styles.menuPosition.right) !== "undefined") {
              that.view.ctrlPanel.css({ "right":parseInt(that.options.styles.menuPosition.right ,10) + "px", "left":"auto" });
            } else {
              that.view.ctrlPanel.css({ "left":"15px", "right":"auto" });
            }
          }
          that.updateButtonsPosition();
        };

        that._onLinkTouch = function(event) {
          event.stopPropagation();
          if(that.data.srcLink.hasClass("showText")) {
            window.open(that.data.srcLink.attr("data-href"), "_blank");
          }
        };

        that._onImageTouch = function() {
          if(!that.data.srcLink.hasClass('show')) {
            $('.sourceLink').not(that.data.srcLink).removeClass('show').removeClass('showText');
            that.data.srcLink.addClass('show');
          } else {
            that.data.srcLink.removeClass('show').removeClass('showText');
          }
        };

        that._onIconTouch = function(event) {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
            event.stopPropagation();
          }
        };

        that._onImageMouseEnter = function() {
          if(!that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('show');
          }
        };

        that._onImageMouseLeave = function() {
          that.data.srcLink.removeClass('show').removeClass('showText');
        };

        that._onLinkMouseEnter = function() {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
          }
        };

        that._onLinkMouseLeave = function() {
          that.data.srcLink.removeClass('showText');
        };

        that._onLinkMouseClick = function(event) {
          if(that.data.srcLink.hasClass('showText')) {
            window.open(that.data.srcLink.attr('data-href'), '_blank');
          }
          event.stopPropagation();
          event.preventDefault();
        };

        that.updateSourceLink = function() {
          var removeLink = function() {
            if(that.data.srcLink) {
              if(that.isTouch) {
                that.data.srcLink.off('click', that._onLinkTouch);
                $that.find(".ut-image-source-link-icon").off('click', that._onIconTouch);
              } else {
                that.data.srcLink.off('mouseenter', that._onLinkMouseEnter).off('mouseleave', that._onLinkMouseLeave);
                that.data.srcLink.off('click', that._onLinkMouseClick);
              }
              that.data.srcLink.remove();
              that.data.srcLink = null;
            }
            if(that.isTouch) {
              $that.off('click', that._onImageTouch);
            } else {
              $that.off('mouseenter', that._onImageMouseEnter).off('mouseleave', that._onImageMouseLeave);
            }
          };
          removeLink();

          if(that.options.editable || !that.options.ui.source) {
            return;
          }
          if(!that.data.pictureData || !that.data.pictureData.info || !that.data.pictureData.info.source) {
            return;
          }

          var tmp = that.data.pictureData.info.source.match(/\/\/([^\/]+)\//i);
          if(!tmp || !tmp[0]) {
            tmp = that.data.pictureData.info.source.replace(/^http(s)?\:/i, "").match(/^([^\/]+)\//i);
            if(!tmp || !tmp[0]) {
              removeLink();
              return;
            }
          }

          var imgDomainName = (tmp[1] ? tmp[1] : tmp[0]).replace(/(^(\/\/)?www\.|\/)/g, "");
          if(imgDomainName.length <= 0 || imgDomainName.indexOf('urturn.com') !== -1) {
            removeLink();
            return;
          }

          var cLink = that.data.pictureData.info.source;
          if(!cLink.match(/^http\:\/\/|^https\:\/\/|^\/\//i)) {
            cLink = "//" + cLink;
          }

          if(!that.options.styles.linkPosition.direction) {
            if(
              (typeof(that.options.styles.linkPosition.left) !== "undefined" && parseInt(that.options.styles.linkPosition.left, 10) > ($that.width() / 2)) ||
              (typeof(that.options.styles.linkPosition.right) !== "undefined" && parseInt(that.options.styles.linkPosition.right, 10) < ($that.width() / 2))
                ) {
              that.options.styles.linkPosition.direction = "left";
            }
          }

          that.data.srcLink = $("<a>", {"class":"ut-image-source-link", "data-href":cLink}).appendTo($that);
          if(that.options.styles.linkPosition && that.options.styles.linkPosition.direction === "left") {
            that.data.srcLink.html('<span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span><span class="ut-image-source-link-icon icon_link"></span>');
            that.data.srcLink.addClass("left");
          } else {
            that.data.srcLink.html('<span class="ut-image-source-link-icon icon_link"></span><span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span>');
          }

          if(typeof(that.options.styles.linkPosition.top) !== "undefined") {
            that.data.srcLink.css("top", that.options.styles.linkPosition.top);
          } else if(typeof(that.options.styles.linkPosition.bottom) !== "undefined") {
            that.data.srcLink.css("bottom", that.options.styles.linkPosition.bottom);
          } else {
            that.data.srcLink.css("bottom", "0");
          }
          if(typeof(that.options.styles.linkPosition.left) !== "undefined") {
            that.data.srcLink.css("left", that.options.styles.linkPosition.left);
          } else if(typeof(that.options.styles.linkPosition.right) !== "undefined") {
            that.data.srcLink.css("right", that.options.styles.linkPosition.right);
          } else {
            that.data.srcLink.css("left", "0");
          }

          if(that.isTouch) {
            that.data.srcLink.on('click', that._onLinkTouch);
            $that.on('click', that._onImageTouch);
            $that.find(".ut-image-source-link-icon").on('click', that._onIconTouch);
          } else {
            $that.on('mouseenter', that._onImageMouseEnter).on('mouseleave', that._onImageMouseLeave);
            that.data.srcLink.on('mouseenter', that._onLinkMouseEnter).on('mouseleave', that._onLinkMouseLeave);
            that.data.srcLink.on('click', that._onLinkMouseClick);
          }

//          var checkSize =  function() {
//            var obj = $that.find('.ut-image-source-link-text');
//            if (obj.height() > 40) {
//              var text = obj.html();
//              text = text.substring(0, text.length - 1);
//              obj.html(text);
//              checkSize();
//            } else {
//              if (imgDomainName !== obj.html()) {
//                var tmp = obj.html();
//                tmp = tmp.substring(0, tmp.length - 3) + '...';
//                obj.html(tmp);
//              }
//            }
//          };
//          checkSize();
        };

        /**
         * retrieve size object for dialog
         * @returns {}
         */
        that.getSize = function(workData) {
          var options = {};
          if(typeof(workData.styles.width) === "undefined" || workData.styles.width === "auto") {
            options.width = $that.width();
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else if(workData.styles.height !== false) {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(workData.styles.height, 10);
            }
          } else if(workData.styles.width !== false) {
            options.width = parseInt(workData.styles.width, 10);
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else if(workData.styles.height !== false) {
              options.height = parseInt(workData.styles.height, 10);
            }
          }

          if(typeof(workData.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(workData.styles.minHeight, 10);
          }
          if(typeof(workData.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(workData.styles.maxHeight, 10);
          }
          if(typeof(workData.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(workData.styles.minWidth, 10);
          }
          if(typeof(workData.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(workData.styles.maxWidth, 10);
          }
          options.autoCrop = !!workData.styles.autoCrop;
          options.adaptUI = true; //!!workData.adaptUI;
          options.flexRatio = !!workData.styles.flexRatio;
          return options;
        };

        /**
         * processing click on "add" button
         * @param event
         */
        that.onAddButtonClick = function(event) {
          that.focus();
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "edit" button
         * @param event
         */
        that.onEditButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "edit");
          if(!ev.isDefaultPrevented()) {
            that.focus();
            that.recropImage({autoCrop:false});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "remove" button
         */
        that.onRemoveButtonClick = function() {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
//            that.removeImage();
          }
        };

        /**
         * prepare data and call API.dialog
         */
        that.queryImage = function(additionalData) {
          var options = {};
          var curData = $.extend(true, {}, that.options);
          curData = additionalData ? $.extend(true, curData, additionalData) : curData;
          options.size = that.getSize(curData);

          // add other parameters
          if(curData.styles.filters && curData.styles.filters.length > 0) {
            options.applyShaders = $.extend(true, [], curData.styles.filters);
          }

          options = $.extend(true, options, curData.dialog);

          if(curData.i18n.dialogLabel) {
            options.dialogLabel = curData.i18n.dialogLabel;
          }
          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          $that.trigger(events.dialogOpen);
          that.post.dialog('image', options, function(data, error){
            if(error) {
              return;
            }
            if($.isEmptyObject(data) || !data.url) {
              that.hideLoader();
              $that.trigger(events.dialogCancel);
              return;
            }
            that.onImageAdded(data, false);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        /**
         * show overlay with spin over image
         */
        that.showLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            return;
          }
          spin = $('<div class="ut-image-loading"></div>').appendTo($that).html('<div class="icon_spinner"></div>');
          $that.addClass("loading");
        };

        /**
         * hide overlay with spin over image
         */
        that.hideLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            spin.remove();
          }
          $that.removeClass("loading");
        };

        /**
         * build structure with sizes
         * @param imgSize - image size
         * @param contSize - container size
         * @returns {}
         */
        that.getImageSizeData = function(imgSize, contSize){
          return {
            width: imgSize.width,
            height: imgSize.height,
            containerWidth: contSize.width,
            containerHeight: contSize.height,
            desiredContainerWidth: Math.floor(imgSize.width*(contSize.height/imgSize.height)),
            desiredContainerHeight: Math.floor(imgSize.height*(contSize.width/imgSize.width))
          };
        };

        that.__setImage = function(imgData) {
          var tmp;
          if(typeof imgData === "undefined" || imgData === null || imgData === false) {
            if(that.options.type === "background") {
              tmp = $that[0].getAttribute("style") || "";
              tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
              $that[0].setAttribute("style", tmp);
            } else if(that.options.type === "image") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "svg") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "canvas") {
              $that.find(".ut-image-view").remove();
            }
            $that.removeClass("ut-image-full");
          } else if(that.options.type === "background") {
            tmp = $that[0].getAttribute("style") || "";
            tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
            $that[0].setAttribute("style", tmp + 'background-image:url("' + imgData.src + '")');
            $that.addClass("ut-image-full");
          } else if(that.options.type === "image") {
            $that.find(".ut-image-view").remove();
            $(imgData).addClass("ut-image-view").appendTo($that);
            $that.addClass("ut-image-full");
            that.__coverImage();
          } else if(that.options.type === "svg") {
            $that.find(".ut-image-view").remove();
            $that.append('<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + imgData.width + ' ' + imgData.height + '" enable-background="new 0 0 ' + imgData.width + ' ' + imgData.height + '" xml:space="preserve" preserveAspectRatio="none">' +
              '<defs>' + (that.options.styles.svgFilterData ? that.options.styles.svgFilterData : '') + '</defs>' +
              '<image ' + (that.options.styles.svgFilterName ? ('filter="url(#'+that.options.styles.svgFilterName+')" ') : '') + 'class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="' + imgData.width + 'px" height="' + imgData.height + 'px" xlink:href="' + imgData.src + '"/>' +
              '</svg>');
            $that.addClass("ut-image-full");
            that.__coverImage();
          }
        };

        that.__coverImage = function() {
          var obj = $that.find(".ut-image-view");
          if(obj.length <= 0) {
            return;
          }
          var ww = $that.width();
          var hh = $that.height();
          var sc = Math.max(ww/that.data.imageWidth, hh/that.data.imageHeight);
          var dx = (ww - that.data.imageWidth*sc)>>1;
          var dy = (hh - that.data.imageHeight*sc)>>1;
          obj.width((that.data.imageWidth*sc)|0).height((that.data.imageHeight*sc)|0);
          obj.css({"left":(dx|0)+'px', "top":(dy|0)+"px"});
        };

        /**
         * the image was added
         * @param data
         * @param isAfterRecrop
         */
        that.onImageAdded = function(data, isAfterRecrop) {
          if(!data) {
            return;
          }

          if(isAfterRecrop === false) {
            var ev = $.Event(events.mediaBeforeAdd);
            $that.trigger(ev, data);
            if(ev.isDefaultPrevented()) {
              return;
            }
          }

          if(!isAfterRecrop) {
            that.showLoader();
          }

          // loading and apply image
          var tmpImg = new Image();
          tmpImg.onload = function() {
            that.data.image = this;
            that.data.pictureData = data;
            that.options.data = data;
            that.data.imageWidth = tmpImg.width;
            that.data.imageHeight = tmpImg.height;
            that.saveData();

            that.__setImage(tmpImg);

            // inform about new image size
            that.hideLoader();
            that.updateSourceLink();
            var size = that.getImageSizeData({width:that.data.imageWidth, height:that.data.imageHeight}, {width:$that.width(), height:$that.height()});
            size.data = that.data.pictureData;
            if(isAfterRecrop === true || isAfterRecrop === false) {
              $that.trigger(isAfterRecrop ? events.mediaCrop : events.mediaAdd, size);
            }
            if(that.options.styles.autoResize) {
              that.resizeContainer();
            }
            $that.trigger(events.mediaReady, size);
            that.triggerChangeEvent();
          };
          tmpImg.onerror = function() {
            that.hideLoader();
          };
          tmpImg.src = data.url;
        };

        that.resizeContainer = function() {
          if(!that.options.styles.autoResize || !that.data.imageWidth || !that.data.imageHeight) {
            that.__coverImage();
            return;
          }

          // calculate new size
          var sz = {
            width: Math.round($that.width()),
            height: Math.round($that.width() * that.data.imageHeight / that.data.imageWidth),
            ratio: that.data.imageWidth / that.data.imageHeight
          };

          // resize object and dispatch event
          if(sz.width !== $that.width() || sz.height !== $that.height()) {
            $that.height(sz.height);
            that.updateButtonsPosition();
            that.__coverImage();
            $that.trigger(events.resize, sz);
          }
        };

        /**
         * call recrop function for image
         * @param params
         */
        that.recropImage = function(params) {
          if(!that.data.pictureData) {
            return;
          }

          var options = {};

          if(typeof(that.options.styles.width) === "undefined" || that.options.styles.width === "auto" || that.options.styles.width === false) {
            options.width = $that.width();
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(that.options.styles.height, 10);
            }
          } else {
            options.width = parseInt(that.options.styles.width, 10);
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else {
              options.height = parseInt(that.options.styles.height, 10);
            }
          }

          if(typeof(that.options.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(that.options.styles.minHeight, 10);
          }
          if(typeof(that.options.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(that.options.styles.maxHeight, 10);
          }
          if(typeof(that.options.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(that.options.styles.minWidth, 10);
          }
          if(typeof(that.options.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(that.options.styles.maxWidth, 10);
          }
          options.autoCrop = !!that.options.styles.autoCrop;
          options.adaptUI = true; //!!tmpPrm.adaptUI;
          options.flexRatio = !!that.options.styles.flexRatio;

          options = $.extend(true, options, that.options.dialog);
          options = $.extend(true, options, params);

          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          if(options.autoCrop !== true) {
            $that.trigger(events.dialogOpen);
          }
          that.post.dialog('crop',{'image':that.data.pictureData, 'size' : options}, function(data/*, error*/) {
            if($.isEmptyObject(data) || !data.url) {
              if(options.autoCrop !== true) {
                that.hideLoader();
                $that.trigger(events.dialogCancel);
              }
              return;
            }
            that.onImageAdded(data, true);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.removeImage = function() {
          that.__setImage(null);
//          var tmp = $that[0].getAttribute("style") || "";
//          tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
//          $that[0].setAttribute("style", tmp);
//          $that.removeClass("ut-image-full");
          that.data.pictureData = null;
          that.options.data = null;
          that.data.image = null;
          that.data.imageWidth = null;
          that.data.imageHeight = null;
          that.saveData();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
        };

        /**
         * save image data to storage
         */
        that.saveData = function() {
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = that.data.pictureData;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = (that.data.pictureData && that.data.imageHeight ? that.data.imageWidth / that.data.imageHeight : null);
            that.post.save();
          }
        };

        /**
         * load image while component initializing
         */
        that.firstTimeImageLoad = function(withReuse) {
          var storageKey = "utImage_" + that.options.id + "_img";
          if(that.options.data && (typeof that.options.data === "string" || that.options.data.url)) {
            if(typeof(that.options.data) === "string") {
              that.options.data = { url:that.options.data };
            }
            that.onImageAdded(that.options.data);
          } else {
            var tmp = that.post.storage[storageKey];
            if(tmp && tmp.url) {
              that.options.data = tmp;
              that.onImageAdded(that.options.data);
            } else if(withReuse && (that.options.reuse || that.options.styles.reuse)) {
              if(that.post.collection('parent') && that.post.collection('parent')[storageKey]){
                that.options.data = that.post.collection('parent')[storageKey];
                that.onImageAdded(that.options.data);
              }
            } else {
              that.options.data = null;
            }
          }
        };

        that.onTouchMove = function() {
          $that.addClass("ut-image-inscroll");
        };

        /**
         * the post was scrolled
         * @param v {Object} - data with scroll paddings
         */
        that.onPostScroll = function(v) {
          that.data.scrollTop = parseInt(v.scrollTop, 10);
          that.data.scrollBottom = parseInt(v.scrollBottom, 10);
          that.updateButtonsPosition();
          $that.removeClass("ut-image-inscroll");
        };

        /**
         * update "add" and "edit" button position
         */
        that.updateButtonsPosition = function() {
          var fullHeight = $(that.post.node).height();
          var pos = $that.offset();
          pos.height = $that.height();
          pos.bottom = pos.top + pos.height;
          var tmp1 = Math.max(pos.top, that.data.scrollTop) - pos.top;
          var tmp2 = Math.max(fullHeight - pos.bottom, that.data.scrollBottom) - (fullHeight - pos.bottom);
          // to center
          if(that.view.addButton) {
            that.view.addButton.css("top", (tmp1 + (pos.height-tmp1-tmp2)/2) + "px");
          }
          if(that.view.ctrlPanel) {
            var topPos = 0;
            if(typeof(that.options.styles.menuPosition.top) !== "undefined") {
              topPos = (tmp1 + parseInt(that.options.styles.menuPosition.top, 10));
            } else if(typeof(that.options.styles.menuPosition.bottom) !== "undefined") {
              topPos = (pos.height - tmp2 - parseInt(that.options.styles.menuPosition.bottom, 10) - that.view.ctrlPanel.height());
            } else {
              topPos = (tmp1 + 15);
            }
            if(that.view.editButton) {
              if((topPos + that.view.editButton.height() / 2) > (tmp1 + $that.height() - tmp2) / 2) {
                that.view.editButton.addClass("top");
              } else {
                that.view.editButton.removeClass("top");
              }
            }
            that.view.ctrlPanel.css({"top": topPos + "px", "bottom":"auto"});
          }
        };

        that.addMediaListener = function() {
          if(methods.nextPanelToAddImage < 0 && that.options.styles.listenMedia) {
            var onMediaHandler = function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-image");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPanelToAddImage) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utImage && (!allPanels[ww].utImage.data.pictureData || !allPanels[ww].utImage.data.pictureData.url)) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPanelToAddImage++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utImage.onImageAdded.call(tmp, data, false);
              }
            };

            that.post.on('image', onMediaHandler);
            methods.nextPanelToAddImage = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions){
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue) ? noDiff : diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that.css("display", "none");
        };

        that.show = function() {
          $that.css("display", "");
        };

        that.focus = function() {
          if(!that.options.editable || $that.hasClass("ut-image-focus")) {
            return;
          }
          if(that.options.styles.groupMode) {
            $("body").find(".ut-image.ut-image-in-group").utImage("blur");
          }
          $that.addClass("ut-image-focus");
          $that.trigger(events.focus, that.options.id);
        };

        that.blur = function() {
          if(!$that.hasClass("ut-image-focus")) {
            return;
          }
          $that.removeClass("ut-image-focus");
          if(!that.options.editable) {
            return;
          }
          $that.trigger(events.blur, that.options.id);
        };

        that.destroy = function(){
          $that.trigger(events.destroy, that.options.id);
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = null;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = null;
            that.post.save();
          }
          $that.remove();
        };

        that.editable = function(data) {
          that.options.editable = data;
          that.createElements();
          if(!that.options.styles.groupMode) {
            that.focus();
          }
        };

        that.listenMedia =  function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('media');
            that.post.off('image');
            methods.nextPanelToAddImage = -1;
          }
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isSetFocus = (jQuery(".ut-image").length <= 0);
        that.prepareElement();
        that.createElements();
        if(!that.options.styles.groupMode || isSetFocus) {
          that.focus();
        }
        that.firstTimeImageLoad(true);

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"]});
            if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
              var sz = {
                width: $that.width(),
                height: Math.round($that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
              };
              if(sz.height !== $that.height()) {
                $that.height(sz.height);
                $that.trigger(events.resize, sz);
              }
            }
          }, 0);
          that.addMediaListener();
        }
        that.oldOptions = $.extend(true, {}, that.options);
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utImage && this.utImage.show){
          this.utImage.show.call(this);
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hide){
          this.utImage.hide.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utImage && this.utImage.focus){
          this.utImage.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utImage && this.utImage.blur){
          this.utImage.blur.call(this);
        }
      });
      return this;
    },

    update: function(newParams) {
      methods.init.call(this, newParams);
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utImage && this.utImage.removeImage){
          this.utImage.removeImage.call(this);
        }
      });
      return this;
    },

    remove: function() {
      return methods.destroy.apply(this);
    },

    destroy: function() {
      this.each(function() {
        if(this.utImage && this.utImage.destroy){
          this.utImage.destroy.call(this);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.pictureData;
        }
      }
      return res;
    },

    image: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.image;
        }
      }
      return res;
    },

    ratio: function() {
      var res = 0;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.imageHeight > 0 ? (this[0].utImage.data.imageWidth/this[0].utImage.data.imageHeight) : 0;
        }
      }
      return res;
    },

    dialog: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.queryImage.call(this[0], data);
        }
      }
      return this;
    },

    crop: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.recropImage.call(this[0], data);
        }
      }
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.editable.call(this, data);
        }
      });
      return this;
    },

    listenMedia: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.listenMedia.call(this, data);
        }
      });
      return this;
    },

    showLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.showLoader){
          this.utImage.showLoader.call(this);
        }
      });
      return this;
    },

    hideLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hideLoader){
          this.utImage.hideLoader.call(this);
        }
      });
      return this;
    }
  };

  $.fn.utImage = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utImage');
    }
    return this;
  };
})(jQuery, window, document, undefined);
