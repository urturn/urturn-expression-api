function loadCutOut() {
  
  loadPaper();

  /* global paper:true, Tool:true, Raster:true, view, Path, RgbColor, Point, Segment, project */
  (function(UT,$) {
    "use strict";

    paper.install(window);
    var __MOVEPOINT_TRACKED = false;
    var __ADDPOINT_TRACKED = false;
    var __MOVEPATH_TRACKED = false;
    
    var methods = {
      init: function(options) {
        this.each(function() {

          var opt = options;
          var defaults = {
            UT: false,
            imageData: {},
            segments: [],
            imageInfo : null,
            i18n: {
              back: "Back",
              edit: "Edit",
              done: "Done",
              pointTip: "Shift + Click to remove",
              doCutOut: "Cut-out your<br>sticker",
              fullImage: "Or use full image",
              reset: "Reset",
              doneEdit: "Done editing",
              pen: "PEN",
              addPoint: "Add point"
            },
            onCuted: function(data) {},
            onReady: function() {}
          };

          var $that = $(this);
          var $$that = this;
          var that = {};


         /**
           * Init Land
           */


          var tool = null;
          this.utCut = that;

          // dom elements
          var container = null;
          var canvasCont = null;
          var canvas1 = null;
          var canvas2 = null;
          var canvas3 = null;
          var backImg = null;
          var grayCover = null;
          var cancelButton = null;
          var saveButton = null;
          var useFullImgBtn = null;
          var resetBtn = null;
          var rmPointsBtn = null;
          var pen = null;
          var tooltip = null;
          var tooltip1 = null;
          var mobileTooltip = null;
          var rotateTooltip = null;
          var closeRotateTooltip = null;
          // others
          // 
          var canvasHover = null;
          var stickerPath, width, height;
          var mode = null;

          var ctx1 = null;
          var ctx2 = null;
          var ctx3 = null;

          var contWidth = null;
          var contHeight = null;

          var imgWidth = null;
          var imgHeight = null;

          var tmp = null;


          that.isTouch = ('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0);
          if(navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
            $("body").addClass("android-fix");
          }

          var hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: that.isTouch ? 21 : 15
          };

          that.hide = function() {
            $that.hide();
          };

          that.show = function() {
            $that.show();
          };

          that.resize = function() {
            that.pathBackup = that.getSegments();

            var oldSize = {
              width: width,
              height: height
            };

            contWidth = canvasCont.width();
            contHeight = canvasCont.height();

            width = Math.floor(imgWidth * (contHeight / imgHeight));
            height = Math.floor(imgHeight * (contWidth / imgWidth));

            if (height <= contHeight) {
              width = imgWidth * (height / imgHeight);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                marginLeft: -width / 2 + 'px',
                top: '50%',
                left: '50%'
              });
            } else {
              height = imgHeight * (width / imgWidth);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                marginLeft: -width / 2 + 'px',
                left: '50%',
                top: '50%'
              });
            }

            mobileTooltip.css({
              top: (contHeight - height) / 2 + 20,
              left: (contWidth - width) / 2 + 20
            });

            tooltip1.css({
              width: width,
              height: height,
              marginLeft: -width / 2 + 'px',
              marginTop: -height / 2 + 'px'
            });

            canvas1.width = canvas2.width = canvas3.width = width;
            canvas1.height = canvas2.height = canvas3.height = height;

            grayCover.width(width).height(height);
            backImg.width(width).height(height);

            ctx1.drawImage(tmp, 0, 0, width, height);

            paper.setup(canvas2);

            var stickerRaster = new paper.Raster(canvas1);
            stickerRaster.position = paper.view.center;

            stickerPath = new paper.Path.Circle(paper.view.center, 50);
            stickerPath.style = {
              fillColor: new paper.RgbColor(0, 0, 0, 0),
              strokeColor: 'black',
              strokeWidth: 2
            };

            stickerPath.selected = true;
            stickerPath.clipMask = true;
            stickerPath.clipped = true;

            stickerPath.removeSegments();

            var sizeOffset = {
              width: oldSize.width / width,
              height: oldSize.height / height
            };

            for (var i = 0; i < that.pathBackup.length; i++) {
              that.pathBackup[i].point.x = that.pathBackup[i].point.x / sizeOffset.width;
              that.pathBackup[i].point.y = that.pathBackup[i].point.y / sizeOffset.height;

              that.pathBackup[i].handleIn.x = that.pathBackup[i].handleIn.x / sizeOffset.width;
              that.pathBackup[i].handleIn.y = that.pathBackup[i].handleIn.y / sizeOffset.height;

              that.pathBackup[i].handleOut.x = that.pathBackup[i].handleOut.x / sizeOffset.width;
              that.pathBackup[i].handleOut.y = that.pathBackup[i].handleOut.y / sizeOffset.height;
            }

            that.restorePath(that.pathBackup);

            if (!that.isTouch) {
              var btnTopPos = height + (contHeight - height) / 2 - 47,
                btnXPos = (contWidth - width) / 2 + 10;
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 30
              });
              saveButton.css({
                top: btnTopPos,
                left: 'auto',
                right: btnXPos
              });
              useFullImgBtn.css({
                top: btnTopPos + 15,
                left: 'auto',
                right: btnXPos,
                display : none
              });
              if (window.editing_mode) {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              } else {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              }
            } else {
              container.removeClass('ut-cut-hide-all-controls');

              rmPointsBtn.css({
                left: '10px'
              });
            }

            if (height > width && contHeight / height >= 5) {
              mobileTooltip.addClass('landscape');
            } else {
              mobileTooltip.removeClass('landscape');
            }

            rotateTooltip.hide();

            paper.view.draw();
          };

          function saveContour() {

            UT.Expression._postInstance().track('cut-out - completed', {});

            stickerPath.selected = false;

            paper.view.draw();

            var data = canvas2.getContext('2d').getImageData(0, 0, width, height);

            var bounds = stickerPath.bounds;

            var offsetW = -bounds.x, offsetH = -bounds.y, newWidth = bounds.width, newHeight = bounds.height;

            if (bounds.x + bounds.width > width) {
              if (bounds.x < 0) {
                offsetW = 0;
                newWidth = width;
              } else {
                newWidth = width - bounds.x;
              }
            } else if (bounds.x < 0) {
              offsetW = 0;
              newWidth = bounds.width + bounds.x;
            }

            if (bounds.y + bounds.height > height) {
              if (bounds.y < 0) {
                offsetH = 0;
                newHeight = height;
              } else {
                newHeight = height - bounds.y;
              }
            } else if (bounds.y < 0) {
              offsetH = 0;
              newHeight = bounds.height + bounds.y;
            }

            canvas1.width = newWidth;
            canvas1.height = newHeight;

            var ctx1 = canvas1.getContext('2d');

            ctx1.putImageData(data, offsetW, offsetH);

            var url = canvas1.toDataURL();

            var newImage = new that.options.UT.Image(url);

            canvas1.width = width;
            canvas1.height = height;

            ctx1.drawImage(tmp, 0, 0, width, height);

            stickerPath.selected = true;

            paper.view.draw();

            that.options.onCuted({
              image: newImage,
              segments: that.getSegments()
            });

            that.destroy();

          }

        
          function useFullImage() {
            UT.Expression._postInstance().track('cut-out - use full image', {});
            UT.Expression._postInstance().popNavigationRight();
            var url = canvas1.toDataURL();

            var newImage = new that.options.UT.Image(url);

            that.options.onCuted({
              image: newImage,
              segments: []
            });

            tooltip1.hide();
          }


          that.backFromLib = function(data) {
            console.log('new Image', data.url);
            that.options.imageData = data;
            opt.imageData = data;
            container.empty();
            container.remove();
            that.initCutout();
          };
          
          that.revertToLib = function() {
            that.options.onCuted(null);
            that.destroy();
          };

        

          that.getSegments = function() {
            return (stickerPath && stickerPath.segments.length) ? stickerPath.segments.slice() : [];
          };

          that.restorePath = function(segments) {
            stickerPath.closed = true;

            // Select the path, so we can see its segments:
            mode = 'static';
            window.drawmode = false;
            for (var i = 0; i < segments.length; i++) {
              // Add a segment with handles:
              var point = new paper.Point(segments[i].point.x, segments[i].point.y);
              var handleIn = new paper.Point(segments[i].handleIn.x, segments[i].handleIn.y);
              var handleOut = new paper.Point(segments[i].handleOut.x, segments[i].handleOut.y);
              var added = stickerPath.add(new Segment(point, handleIn, handleOut));
            }

            paper.view.draw();

            stickerPath.fullySelected = false;
            stickerPath.selected = true;
          };

          that.destroy = function() {
            paper.project.remove();
            tool.remove();
            $that.remove();
          };

        

          var tmpLoaded = function() {

            console.log("!!!--loaded:" );
            imgWidth = tmp.width;
            imgHeight = tmp.height;
            backImg.css("background-image", "url("+tmp.src+")");

            width = Math.floor(imgWidth * (contHeight / imgHeight));
            height = Math.floor(imgHeight * (contWidth / imgWidth));

            if (height <= contHeight) {
              width = imgWidth * (height / imgHeight);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                top: '50%'
              });
            } else {
              height = imgHeight * (width / imgWidth);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginLeft: -width / 2 + 'px',
                left: '50%'
              });
            }

            tooltip1.css({
              width: width,
              height: height,
              marginLeft: -width / 2 + 'px',
              marginTop: -height / 2 + 'px'
            });

            tooltip1.show();

            mobileTooltip.css({
              top: (contHeight - height) / 2 + 20,
              left: (contWidth - width) / 2 + 20
            });

            if (height > width && contHeight / height >= 5) {
              mobileTooltip.addClass('landscape');
            } else {
              mobileTooltip.removeClass('landscape');
            }

            if(!that.isTouch) {
              var btnTopPos = height + (contHeight - height) / 2 - 47;
              var btnXPos = (contWidth - width) / 2 + 10;
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 10
              });
              saveButton.css({
                top: btnTopPos,
                left: 'auto',
                right: btnXPos
              });
              useFullImgBtn.css({
                top: btnTopPos + 15,
                left: 'auto',
                right: btnXPos
              });
              if (window.editing_mode) {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              } else {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              }

            } else {


              rmPointsBtn.css({
                left: '10px'
              });
            }

            canvas1.width = canvas2.width = canvas3.width = width;
            canvas1.height = canvas2.height = canvas3.height = height;

            grayCover.width(width).height(height);
            backImg.width(width).height(height);


            /* 
              Ugly fix for FF that crash with no reasons :
              see http://stackoverflow.com/a/18580878/1705736
            */
            try {
              ctx1.drawImage(tmp, 0, 0, width, height);
            }
            catch (e) {
              console.log('reload!  FF FIx');
              setTimeout(tmpLoaded, 10);
              return;
            }

            paper.setup(canvas2);

            var stickerRaster = new paper.Raster(canvas1);
            stickerRaster.position = paper.view.center;

            var segment;
            var movePath = false;

            stickerPath = new paper.Path.Circle(paper.view.center, 50);
            stickerPath.style = {
              fillColor: new paper.RgbColor(0, 0, 0, 0),
              strokeColor: 'black',
              strokeWidth: 2
            };

            stickerPath.selected = true;
            stickerPath.clipMask = true;
            stickerPath.clipped = true;

            UT.Expression._postInstance().track('cut-out - start', {});

            tool.onMouseDown = function(event) {
              mobileTooltip.hide();
              container.addClass('ut-cut-hide-all-controls');
              tooltip1.hide();

              if(mode === 'static') {
                var data = ctx2.getImageData(0, 0, width, height);
                ctx3.putImageData(data, 0, 0);

                var tmpRaster = new paper.Raster(canvas3);
                var inPath = tmpRaster.getPixel(event.point).alpha !== 0;
                tmpRaster.remove();

                segment = null;
                var hitResult = paper.project.hitTest(event.point, hitOptions);

                if(event.modifiers.shift || window.editing_mode) {
                  if(hitResult.type === 'segment' && stickerPath.segments.length > 3) {
                    hitResult.segment.remove();
                  }
                  return;
                }

                if(hitResult) {
                  if (hitResult.item.type !== 'Raster') {
                    stickerPath = hitResult.item;
                  }
                  if (hitResult.type === 'segment') {
                    segment = hitResult.segment;
                  } else if (hitResult.type === 'stroke'/* && !$.browser.mobile*/) {
                    var location = hitResult.location;
                    segment = stickerPath.insert(location.index + 1, event.point);
                    if (!__ADDPOINT_TRACKED) {
                      __ADDPOINT_TRACKED = true;
                      UT.Expression._postInstance().track('cut-out - add point', {});
                    }
                  }
                }
                movePath = inPath && !segment;

                if(movePath) {
                  paper.project.activeLayer.addChild(stickerPath);
                }
              }

              paper.view.draw();
            };

            tool.onMouseMove = function(event) {
              stickerPath.selected = true;
              stickerPath.clipMask = true;
              stickerPath.clipped = true;
              if (that.isTouch || $that.css('display') === 'none') {
                return;
              }

              var data = ctx2.getImageData(0, 0, width, height);
              ctx3.putImageData(data, 0, 0);

              var tmpRaster = new paper.Raster(canvas3);
              var inPath = tmpRaster.getPixel(event.point).alpha !== 0;
              tmpRaster.remove();

              if(mode === 'static' && canvasHover && !window.editing_mode) {
                var hitResult = paper.project.hitTest(event.point, hitOptions);
                if(!hitResult) {
                  return;
                }
                if(hitResult.type === 'segment') {
                  if (!__MOVEPOINT_TRACKED) {
                    __MOVEPOINT_TRACKED = true;
                    UT.Expression._postInstance().track('cut-out - move point', {});
                  }
                  canvasCont.css('cursor', 'default');
                  tooltip.css("width", "auto"); //119
                  tooltip.html(that.options.i18n.pointTip);
                  tooltip.show().css({
                    left: event.point.x + (contWidth - width) / 2 - tooltip.width() / 2 - 5,
                    top: event.point.y + (contHeight - height) / 2 - tooltip.height() / 2 - 35
                  });
                } else if(hitResult.type === 'stroke') {
                  canvasCont.css('cursor', 'default');
                  tooltip.width("width", "auto"); //52
                  tooltip.html(that.options.i18n.addPoint);
                  tooltip.show().css({
                    left: event.point.x + (contWidth - width) / 2 - tooltip.width() / 2 - 5,
                    top: event.point.y + (contHeight - height) / 2 - tooltip.height() / 2 - 35
                  });
                } else {
                  if (!__MOVEPATH_TRACKED) {
                    __MOVEPATH_TRACKED = true;
                    UT.Expression._postInstance().track('cut-out - move path', {});
                  }
                  canvasCont.css("cursor", inPath ? "move" : "default");
                  tooltip.hide();
                }
              } else {
                tooltip.hide();
                canvasCont.css('cursor', 'default');
              }
            };

            function bezierOnSegment(seg) {
              var x = (seg.next.point.x - seg.previous.point.x) / 2;
              var y = (seg.next.point.y - seg.previous.point.y) / 2;
              var c = Math.sqrt(Math.pow(seg.next.point.x - seg.previous.point.x, 2) + Math.pow(seg.next.point.y - seg.previous.point.y, 2));
              var a = Math.sqrt(Math.pow(seg.next.point.y - seg.previous.point.y, 2));

              var sin = a / c;
              var newC = c / 2 * 0.5;
              var newA = sin * c / 2 * 0.5;
              var newB = Math.sqrt(Math.pow(newC, 2) - Math.pow(newA, 2));
              var x1 = newB, y1 = newA, x2 = -newB, y2 = -newA;

              
              //path.fullySelected = true;
              seg.handleOut.x = x > 0 ? x1 : -x1;
              seg.handleOut.y = y > 0 ? y1 : -y1;
              seg.handleIn.x = x > 0 ? x2 : -x2;
              seg.handleIn.y = y > 0 ? y2 : -y2;
            }

            tool.onMouseDrag = function(event) {
              container.addClass('ut-cut-hide-all-controls');
              if(mode === 'static') {
                tooltip.hide();
                if (segment) {
                  bezierOnSegment(segment);
                  segment.point = event.point;
                }

                if (segment && segment.next) {
                  bezierOnSegment(segment.next);
                }

                if (segment && segment.previous) {
                  bezierOnSegment(segment.previous);
                }

                if(movePath) {
                  stickerPath.position = stickerPath.position.add(event.delta);
                }
              } else {
                window.drawmode = true;
                stickerPath.add(event.point);
              }

              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            tool.onMouseUp = function(event) {
              container.removeClass('ut-cut-hide-all-controls');
              if (mode === 'draw') {
                // When the mouse is released, simplify it:
                stickerPath.simplify(10);
                stickerPath.closed = true;
                stickerPath.fullySelected = false;
                stickerPath.selected = true;

                // Select the path, so we can see its segments:
                mode = 'static';
                window.drawmode = false;

                if(stickerPath.segments.length < 3) {
                  stickerPath.removeSegments();
                  stickerPath.selected = false;
                  stickerPath.closed = false;

                  mode = 'draw';
                  window.drawmode = true;
                } else {
                  UT.Expression._postInstance().track('cut-out - path drawed');
                  useFullImgBtn.hide();
                  UT.Expression._postInstance().popNavigationRight();
                  UT.Expression._postInstance().pushNavigationRight('next', saveContour);
                  saveButton.show();
                  resetBtn.hide();
                  rmPointsBtn.show();
                }

                paper.view.draw();

                stickerPath.fullySelected = false;
                stickerPath.selected = true;
              } else if(that.isTouch) {
                if(!window.editing_mode) {
                  UT.Expression._postInstance().popNavigationRight();
                  UT.Expression._postInstance().pushNavigationRight('next', saveContour);
                  saveButton.show();
                  resetBtn.hide();
                  useFullImgBtn.hide();
                  rmPointsBtn.show();
                }
              }
              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            that.update = function() {
              tool.activate();

              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            if(!that.isTouch) {
              pen.trigger('click');
            }

            if(that.options.segments.length) {
              stickerPath.removeSegments();
              that.restorePath(that.options.segments);
              useFullImgBtn.hide();
              UT.Expression._postInstance().popNavigationRight();
              UT.Expression._postInstance().pushNavigationRight('next', saveContour);
              saveButton.show();
              resetBtn.hide();
              rmPointsBtn.show();
              tooltip1.hide();
            } else {
              if (that.isTouch) {
                mobileTooltip.show();
              }
            }

            paper.view.draw();

            that.options.onReady();
          };

          


          function resetSegments() {
            UT.Expression._postInstance().track('cut-out - reset', {});
            UT.Expression._postInstance().popNavigationRight();
            saveButton.hide();
            resetBtn.hide();
            rmPointsBtn.hide();
            tooltip1.show();

            stickerPath.removeSegments();
            stickerPath.selected = false;
            stickerPath.closed = false;

            if (!that.isTouch) {
              mode = 'draw';
              window.drawmode = true;
            } else {
              paper.setup(canvas2);

               var stickerRaster = new paper.Raster(canvas1);
               stickerRaster.position = paper.view.center;

              stickerPath = new paper.Path.Circle(view.center, 50);
              stickerPath.style = {
                fillColor: new paper.RgbColor(0, 0, 0, 0),
                strokeColor: 'black',
                strokeWidth: 2
              };

              stickerPath.selected = true;
              stickerPath.clipMask = true;
              stickerPath.clipped = true;

              mobileTooltip.show();

            }

            window.editing_mode = false;
            rmPointsBtn.removeClass('icon_check').addClass('icon_edit').html('&nbsp;'+that.options.i18n.edit);

            paper.view.draw();

          }


          function removePoints() {
            UT.Expression._postInstance().track('cut-out - clicked edit', {});
            var curState = that.getSegments();

            stickerPath.removeSegments();

            var btnTopPos = height + (contHeight - height) / 2 - 47,
              btnXPos = (contWidth - width) / 2 + 10;

            if (!window.editing_mode) {
              window.editing_mode = true;
              saveButton.hide();
              UT.Expression._postInstance().popNavigationRight();
              resetBtn.show();
              rmPointsBtn.removeClass('icon_edit').addClass('icon_check').html('&nbsp;'+that.options.i18n.doneEdit);
            } else {
              window.editing_mode = false;
              saveButton.show();
              UT.Expression._postInstance().popNavigationRight();
              UT.Expression._postInstance().pushNavigationRight('next', saveContour);
              resetBtn.hide();
              rmPointsBtn.removeClass('icon_check').addClass('icon_edit').html('&nbsp;'+that.options.i18n.edit);
            }

            if (that.isTouch) {
              rmPointsBtn.css({
                left: '10px'
              });
              resetBtn.css({
                left: '170px'
              });
            } else {
              rmPointsBtn.css({
                top: btnTopPos,
                left: btnXPos
              });
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 30
              });
            }

            that.restorePath(curState);

            paper.view.draw();

          }

          function penClicked() {
            mode = 'draw';
            stickerPath.removeSegments();
            stickerPath.selected = false;
            stickerPath.closed = false;

            paper.view.draw();
          }

 
          // Add F I shortcut to full image
          var lastKey = 0;
          var _ShortUsed = 0;
          $('body').on('keyup', function(e) {
            if (!_ShortUsed && e.keyCode === 73 && lastKey === 70) {
              _ShortUsed = 1;
              useFullImage();
            }
            lastKey = e.keyCode;
          });


          that.initCutout = function() {

            console.log("Init Cut out");
            tool = new paper.Tool();
            tool.activate();

            that.options = $.extend(true, defaults, opt);
            that.pathBackup = [];

            // Create The DOM
            container = $('<div class="ut-cut-container"></div>').appendTo($that);
            canvasCont = $('<div class="ut-cut-canvas"></div>').appendTo(container);

            if(that.isTouch) {
              container.addClass('ut-cut-mobile');
            }

            canvas1 = document.createElement('canvas');
            canvas2 = document.createElement('canvas');
            canvas3 = document.createElement('canvas');

            canvasCont.append(canvas1);

            backImg = $('<div class="ut-cut-bg-img"></div>').appendTo(canvasCont);
            grayCover = $('<div class="ut-cut-bg"></div>').appendTo(canvasCont);
          
            canvasCont.append(canvas2);
            canvasCont.append(canvas3);

            canvas1.className = 'ut-cut-canvas1';
            canvas2.className = 'ut-cut-canvas2';
            canvas3.className = 'ut-cut-canvas3';

            canvasHover = false;

            $(canvas2).on('mouseenter',function() {
              canvasHover = true;
            });
            $(canvas2).on('mouseleave', function() {
              canvasHover = false;
            });


            cancelButton = $('<a class="ut-cut-cancel-button ut-edit-button icon_point_left"> '+that.options.i18n.back+'</a>').appendTo(container);
            cancelButton.on('click', function() {
              $that.hide();
            });

            saveButton = $('<a class="ut-cut-save-button ut-edit-button icon_check"> '+that.options.i18n.done+'</a>').appendTo(container);
          
            saveButton.on('click', function() { UT.Expression._postInstance().popNavigationRight(); saveContour();});

            useFullImgBtn = $('<a style="display:none" class="ut-cut-full-img-button">Or use full image <span class="icon_arrow_right"></span></a>').appendTo(container);


            resetBtn = $('<a class="ut-cut-reset-button ut-edit-button icon_refresh"> '+that.options.i18n.reset+'</a>').appendTo(container);
            resetBtn.on('click', resetSegments);

            that.options.UT.Expression._postInstance().pushNavigation('back', that.revertToLib);

            //Global variable for paper.js
            window.editing_mode = false;
            

            rmPointsBtn = $('<a class="ut-cut-rm-points-button ut-edit-button icon_edit"> '+that.options.i18n.edit+'</a>').appendTo(container);
            
            rmPointsBtn.on('click', removePoints);



            mode = 'static';

            pen = $('<button class="ut-cut-pen">'+that.options.i18n.pen+'</button>').appendTo(container);
            pen.on('click', penClicked);

            tooltip = $('<div class="ut-cut-tooltip">'+that.options.i18n.addPoint+'</div>').appendTo(container);
            tooltip1 = $('<div class="ut-cut-tooltip-1"><span>'+that.options.i18n.doCutOut+'</span></div>').appendTo(canvasCont);
         
            tooltip1.on('click', function() {
              $that.hide();
            });

            mobileTooltip = $('<div class="ut-cut-mobile-tooltip"><span>'+that.options.i18n.doCutOut+'</span></div>').appendTo(canvasCont);
            mobileTooltip.on('click', function() {
              $that.hide();
            });

            rotateTooltip = $('<div class="ut-cut-rotate-tooltip"></div>').appendTo(canvasCont);
            closeRotateTooltip = $('<div class="ut-cut-rotate-tooltip-close icon_delete"></div>').appendTo(rotateTooltip);
            closeRotateTooltip.on('click', function(){
              rotateTooltip.hide();
              container.removeClass('ut-cut-hide-all-controls');
            });

            ctx1 = canvas1.getContext('2d');
            ctx2 = canvas2.getContext('2d');
            ctx3 = canvas3.getContext('2d');

            contWidth = canvasCont.width();
            contHeight = canvasCont.height();

            imgWidth = $$that.width;
            imgHeight = $$that.height;

            tmp = new Image();
            tmp.onload = tmpLoaded;

            console.log("!!!--load:" + that.options.imageData.url);
            this.src = that.options.imageData.url;
            tmp.src = that.options.imageData.url;
          };

          that.initCutout();

        });
        return this;
      },

      update: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.update();
          }
        });
        return this;
      },


      hide: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.hide();
          }
        });
        return this;
      },

      show: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.show();
          }
        });
        return this;
      },

      resize: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.resize();
          }
        });
        return this;
      }
    };

    $.fn.utCut = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + method + ' does not exist on $.utCut');
      }
      return this;
    };
  })(UT, window.jQuery || window.Zepto || window.jq);
}