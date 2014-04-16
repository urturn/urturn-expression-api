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

function loadUTVideo() {
  loadFroogaLoop();
(function (UT, $) {
  "use strict";

  var methods = {
    nextPlayerToAddVideo: -1,

    init: function(opts) {
      this.each(function () {
        var $that = $(this);
        var that = {};
        this.utVideo = that;

        var events = {
          ready: "utVideo:ready",
          buttonClick: "utVideo:buttonClick",
          mediaAdd: "utVideo:mediaAdd",
          mediaRemove: "utVideo:mediaRemove",
          mediaReady: "utVideo:mediaReady",
          play: "utVideo:play",
          pause: "utVideo:pause",
          stop: "utVideo:stop",
          finish: "utVideo:finish",
          destroy: "utVideo:destroy",
          change: "utVideo:change",
          error: "utVideo:error",
          dialogOpen: "utVideo:dialogOpen",
          dialogCancel: "utVideo:dialogCancel"
        };

        var defaults = {
          id: false,
          data: undefined,
          editable: true,
          ui:{
            artwork:   true,
            loading:   true,
            play:      true,
            title:     true,
            source:    true,
            playing:   true
          },
          styles: {
            skin:'default',
            autoPause: true,
            listenMedia: true
          }
        };

        that.options = $.extend(true, defaults, opts);
        if(that.options.manualMode) {
          that.options.editable = false;
          that.options.styles.listenMedia = false;
          that.post = {
            storage: [],
            on: function() {},
            off: function() {},
            save: function() {},
            context: {player:true}
          };
        }

        if(!that.post && window.UT && UT.Expression && UT.Expression.ready) {
          UT.Expression.ready(function(post) {
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        // TODO do it for all touch devices now :P
        that.isMobileSafari = that.isTouch;//!!(window.navigator.userAgent.match(/(iPod|iPhone|iPad)/) && window.navigator.userAgent.match(/AppleWebKit/));
        that.canplay = false;

        that.eventNS   = 'utVideo:';
        that.storageNS = 'utVideo_';
        that.stateNS   = "ut-video-state";
        that.editableNS= "ut-video-editable";
        that.uiNS      = "ut-video-ui";
        that.modeNS    = "ut-video-mode";
        that.skinNS    = "ut-video-skin";
        that.serviceNS = "ut-video-service";
        that.aspectNS  = "ut-video-aspect";
        that.sizeNS    = "ut-video-size";
        that.touchNS   = "ut-video-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            artwork:  v,
            loading:  v,
            play:     v,
            title:    v,
            source:   v,
            playing:  v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddVideo < 0 && that.options.styles.listenMedia) {
            that.post.on('video',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-video");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddVideo) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utVideo && allPanels[ww].utVideo.options && !allPanels[ww].utVideo.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddVideo++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utVideo.options.data = data;
                tmp.utVideo.update();
              }
            });
            methods.nextPlayerToAddVideo = 0;
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
          return $.isEmptyObject(diff.newValue)?noDiff:diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /************************************************************/
        /* video.embedProcessor start
        /************************************************************/
        var embedProcessor = {
          debug:false,
          defaultWorker:'embedly',
          getVideoPlayerParameters:function (url, appData, options, callback) {
            var param = {};
            if (url.indexOf('youtu.be/') !== -1) {
              url = '//youtube.com?v=' + url.split('youtu.be/')[1];
            } // fix for short youtube url format

            param.url = url;
            param.appData = appData;
            param.source = this._getSourceNameByUrl(url);
            param.options = options;
            that.autoplay = that.options.autoPlay || !that.isMobileSafari;

            if (!this._sources[param.source]) {
              param.worker = this.defaultWorker;
            } else {
              param.worker = this._sources[param.source].worker;
            }

            this._workers[param.worker](param, options, callback);
          },

          embedVideoByParameters:function (param, options) {
            if (param.url && param.status) {
              if (this._sources[param.source] && this._sources[param.source].embedVideo && typeof(this._sources[param.source].embedVideo) === 'function') {
                this._sources[param.source].embedVideo(param, options);
              } else {
                that.ui.video.html(param.html);
              }
            }
          },

          _sources:{
            'youtube':{
              urlPart:'youtube.com',
              worker:'youtube',
              getVideoId:function (url) {
                var id = '';
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('v=') !== -1) {
                  id = url.split('v=')[1].split('&')[0];
                } else if (url.indexOf('video_ids=') !== -1) {
                  var ids = url.split('video_ids=')[1].split('%2C');
                  var index = (url.indexOf('index=') !== -1) ? url.split('index=')[1].split('&')[0] : 0;
                  id = ids[index].split('&')[0];
                } else if (url.indexOf('v%3D') !== -1) {
                  id = url.split('v%3D')[1].split('&')[0];
                } else {
                  var urlParts = url.split('/');
                  id = urlParts[urlParts.length - 1];
                }
                return id;
              },

              prepareEmbedCode:function (param) {
                param.id = this.getVideoId(param.url);
                return param;
              },

              embedVideo:function (param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                $('<div id="' + id + '" width="100%" height="100%" frameborder="0"></div>').appendTo(container);
                function initYTPlayer() {
                  window.youtubeApiReady = true;

                  that.onPlayerReady = function(event) {
                    player.addEventListener('onStateChange', that.onPlayerStateChange);
                    if(that.autoplay) { /*!that.isMobileSafari*/
                      event.target.playVideo();
                    }
                  };

                  that.onPlayerStateChange = function(event) {
                    if (event.data === window.YT.PlayerState.PLAYING) {
//                      that.pauseOtherPlayers();
                      $that.trigger(events.play);
                      that.setState("play");
                    }

                    if (event.data === window.YT.PlayerState.ENDED) {
                      that.utStop();
                      player.stopVideo();
                      player.destroy();
                      player = null;
                      $that.trigger(events.finish);
                    }

                    if (event.data === window.YT.PlayerState.PAUSED) {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    }

//                    if (event.data === window.YT.PlayerState.BUFFERING) {}
                  };


                  var playerVars = that.options.ui.playing?null:{controls:0,showinfo:0};

                  var player = new window.YT.Player(id, {
                    height:'100%',
                    width:'100%',
                    videoId: param.id,
                    playerVars: playerVars,
                    events:{'onReady':that.onPlayerReady}
                  });

                  container.off('continueAfterPause pauseVideo')
                  .on('continueAfterPause',function () {
                    player.playVideo();
                  }).on('pauseVideo', function () {
                    player.pauseVideo();
                  });
                }

                if (!window.youtubeApiReady) {
                  var tag = document.createElement('script');
                  tag.src = "//www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                } else {
                  initYTPlayer();
                }

                window.onYouTubeIframeAPIReady = function () {
                  initYTPlayer();
                };

              }
            },

            'vimeo':{
              urlPart:'vimeo.com',
              worker:'vimeo',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('vimeo.com/')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode: function(param) {
                return param;
              },

              embedVideo: function(param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                var src = '//player.vimeo.com/video/' + this.getVideoId(param.url) + (that.autoplay ? '?autoplay=1&' : '?') + ' api=1&player_id=' + id;
                // src="'+src+'"
                var iframe = $('<iframe  id="' + id + '" allowfullscreen="1" width="100%" height="100%" frameborder="0"></iframe>').appendTo(container)[0];
                iframe.src = src;

                function ready(playerID) {
                  window.Froogaloop(playerID).addEvent('play', function () {
//                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                  });

                  window.Froogaloop(playerID).addEvent('finish', function () {
                    $that.trigger(events.finish);
                    that.utStop();
                  });

                  window.Froogaloop(playerID).addEvent('pause', function () {  //paleyerId
                    $that.trigger(events.pause);
                    that.setState("pause");
                  });

                  container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                    window.Froogaloop(playerID).api('play');
                  }).on('pauseVideo', function () {
                    window.Froogaloop(playerID).api('pause');
                  });
                }
                window.Froogaloop(iframe).addEvent('ready', ready);
              }
            },

            'dailymotion':{
              getVideoId:function (url) {
                var id;
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('request=%2F') !== -1) {
                  id = url.split('request=%2F')[1].split('video%2F')[1].split('_')[0];
                } else {
                  id = url.substr(url.lastIndexOf("/") + 1, url.length).split('_')[0];
                }
                return id;
              },
              urlPart:'dailymotion.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<iframe frameborder="0" allowfullscreen="1" width="100%" height="100%" src="//www.dailymotion.com/embed/video/' + id + '"></iframe>';
                return param;
              },
              embedVideo:function (param) {
                that.ui.video.empty();
                var container = jQuery("<div>").appendTo(that.ui.video);
                // This code loads the Dailymotion Javascript SDK asynchronously.
                (function () {
                  var e = document.createElement('script');
                  e.async = true;
                  e.src = document.location.protocol + '//api.dmcdn.net/all.js';
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(e, s);
                }());

                // This function init the player once the SDK is loaded
                var self = this;
                var initDM = function () {
                  var id = 'video-ui-'+that.currents.id;
                  container.prop('id',id);
                  var prms = {video:self.getVideoId(param.url), width:"100%", height:"100%"};
                  if(that.autoplay) {
                    prms.params = {autoplay:1};
                  }
                  var player = window.DM.player(id, prms);

                  player.addEventListener("apiready", function (e) {
                    var prevE = e;
//                    that.pauseOtherPlayers();
                    if(that.autoplay) {
                      $that.trigger(events.play);
                    }
                    e.target.addEventListener("ended", function () {
                      $that.trigger(events.finish);
                      that.utStop();
                    });

                    e.target.addEventListener("pause", function () {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    });

                    container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                      prevE.target.play();
                    }).on('pauseVideo', function () {
                      prevE.target.pause();
                    });
                  });
                };

                window.dmAsyncInit = function () {
                  initDM();
                };
              }
            },

            // 'm4v':{
            //   urlPart:'.m4v',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",
            //   jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       };
            //     })();
            //   },
            //   initJWPlayer: function(containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            // 'facebook':{
            //   urlPart:'fbcdn.net',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",      jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       }
            //     })();
            //   },
            //   initJWPlayer:function (containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            'metacafe':{
              urlPart:'metacafe.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashVars="playerVars=showStats=' + (param.details ? 'yes' : 'no') + '|' + ((that.autoplay) ? 'autoPlay=yes|' : '') + '"');
                return param;
              }
            },

            'myspace':{
              urlPart:'myspace.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/media\/embed.aspx\/(.*?)"/ig, 'media/embed.aspx/$1' + (that.autoplay ? ',ap=1' : '') + '"');
                return param;
              }
            },

            'veoh':{
              urlPart:'veoh.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/videoAutoPlay=(.*?)&/ig, 'videoAutoPlay=' + that.autoplay + '&');
                return param;
              }
            },

            'liveleak':{
              urlPart:'liveleak.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autostart=true"' : ''));
                return param;
              }
            },

            'viddler':{
              urlPart:'viddler.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autoplay=t"' : ''));
                return param;
              }
            },

            'blip':{
              urlPart:'blip.tv',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/src="(.*?)"/ig, 'src="$1?' + (that.autoplay ? 'autostart=true' : '') + '"');
                return param;
              }
            },

            'crackle':{
              urlPart:'crackle.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autoplay=true"' : ''));
                return param;
              }
            },

            'ustream':{
              urlPart:'ustream.tv',
              worker:'ustream',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/autoplay=(.*?)&/ig, 'autoplay=' + (that.autoplay ? 'true' : 'false') + '&');
                return param;
              }
            },

            'revver':{
              urlPart:'revver.com',
              worker:'noworker',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<embed src="//flash.revver.com/player/1.0/player.swf" flashvars="mediaId=' + id + '" width="100%" height="100%" type="application/x-shockwave-flash" ></embed>';
                return param;
              }
            },

            'google':{
              urlPart:'video.google.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashvars="playerMode=' + param.gskins + (that.autoplay ? '&autoPlay=true' : '') + (param.loop ? '&loop=true' : ''));
                param.html = param.html.replace('&hl=en&fs=true', '');
                return param;
              }
            },

            'megavideo':{
              urlPart:'megavideo.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('v=')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object wmode="transparent" width="100%" height="100%"><param name="movie" value="//www.megavideo.com/v/' + id + '"/><param name="allowFullScreen" value="true"/><param name="wmode" value="transparent"/><embed wmode="transparent" src="//www.megavideo.com/v/' + id + '" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%"></embed></object>';
                return param;
              }
            },

            'joost':{
              urlPart:'joost.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('container_info=') !== -1) {
                  return url.split('container_info=')[1].split('/')[0].split('&')[0];
                } else if (url.indexOf('joost.com/') !== -1) {
                  return url.split('joost.com/')[1].split('/')[0].split('&')[0];
                }
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object width="100%" height="100%"><param name="movie" value="//www.joost.com/embed/' + id + (that.autoplay ? '?autoplay=true' : '') + '"></param><param name="allowFullScreen" value="true"/><param name="allowNetworking" value="all"/><param name="allowScriptAccess" value="always"/><embed src="//www.joost.com/embed/' + id + (that.autoplay ? '?autoplay=true' : '') + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" allownetworking="all" width="100%" height="100%"></embed></object>';
                return param;
              }
            }
          },

          _workers:{
            /**
             ** Youtube worker
             */
            'youtube':function (param, options, callback) {
              embedProcessor.log(param.worker + " started with parameters = ", param);
              var parser = function(data) {
                if (data) {
                  param.status = true;
                  param.duration = (data.media$group.yt$duration) ? parseInt(data.media$group.yt$duration.seconds,10) : 0;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  var thumbs = data["media$group"]["media$thumbnail"];
                  var selThumb = null;
                  if (thumbs && thumbs.length > 0){
                    for (var qq = 0; qq < thumbs.length; qq++){
                      if (!selThumb || selThumb.width < thumbs[qq].width){
                        selThumb = thumbs[qq];
                      }
                    }
                  }
                  param.thumbnail_url = selThumb ? selThumb.url : false;
                  param.favicon_url = "//www.youtube.com/favicon.ico";
                  param.service_name = "YouTube";
                  param.provider_url = "//youtube.com";
                  param.html = false;
                  param.views = ((data["yt$statistics"] && data["yt$statistics"].viewCount) ? data["yt$statistics"].viewCount : 0);
                  param.title = data.title ? data.title["$t"] : "";
                  param.author = data.author && data.author[0] && data.author[0].name && data.author[0].name["$t"] ? data.author[0].name["$t"] : "";
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){
                parser(param.appData);
              } else {
                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = "//gdata.youtube.com/feeds/api/videos/" + videoId + "?alt=json-in-script&v=2&&callback=?";
                $.getJSON(api_url, function (data) {
                  parser(data.entry);
                });
              }
            },
            /**
             ** Vimeo worker
             */
            'vimeo':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);

              var parser = function(data){
                if (data) {
                  param.status = true;
                  param.duration = data.duration;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  param.thumbnail_url = data.thumbnail_large || ((data.thumbnails && data.thumbnails.thumbnail && data.thumbnails.thumbnail[2])?data.thumbnails.thumbnail[2]._content:'');
                  param.favicon_url = '//vimeo.com/favicon.ico';
                  param.service_name = 'Vimeo';
                  param.provider_url = '//vimeo.com';
                  param.title = data.title || '';
                  param.html = false;
                  param.views = data.stats_number_of_plays;
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                  param.author = data.user_name || "";
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){

                parser(param.appData);
              } else {

                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = '//vimeo.com/api/v2/video/' + videoId + '.json?&callback=?';

                $.getJSON(api_url, function (data) {
                  parser(data[0]);
                });
              }
            },
            /**
             ** Embed.ly supported sites worker
             */
            'embedly':function (param, options, callback) {
              // dailymotion make call toservice every time einsted of vidmeo and youtube
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              var sourceUrl = encodeURIComponent(param.url);
              var api_url = '//api.embed.ly/1/oembed?key=c6544dc839bd11e088ae4040f9f86dcd&url=' + sourceUrl + (that.autoplay ? "":"&autoplay=1") + '&callback=?';
              $.getJSON(api_url, function (data) {
                if(data && data.html) {
                  param.status = true;
                  param.duration = false;
                  param.duration_formatted = false;
                  param.thumbnail_url = data.thumbnail_url ? data.thumbnail_url : '';
                  param.favicon_url = data.favicon_url;
                  if (param.source === 'dailymotion') {
                    param.favicon_url = '//favicon.yandex.net/favicon/dailymotion.com';
                  }
                  param.service_name = data.provider_name;
                  param.provider_url = data.provider_url;
                  param.html = data.html;
                  param.title = data.title || '';
                  param.views = false;
                  if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                    param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                  }
                  param.author = data.author_name || "";
                  param = embedProcessor._paramEmbedCodeNormalizer(param);
                } else {
                  /* prepare data from appData */
                  if(param.appData && param.appData.id && param.source === "dailymotion") {
                    param.status = true;
                    param.duration = false;
                    param.duration_formatted = false;
                    param.thumbnail_url = param.appData.thumbnail_small_url;
                    param.favicon_url = '//favicon.yandex.net/favicon/dailymotion.com';
                    param.service_name = "Dailymotion";
                    param.provider_url = "http://www.dailymotion.com";
                    param.html = '<iframe src="http://www.dailymotion.com/embed/video/' + param.appData.id + (that.autoplay ? "" : "?autoPlay=1") + '" width="480" height="301" frameborder="0"></iframe>';
                    param.title = param.appData.title || '';
                    param.views = false;
                    if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                      param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                    }
                    param.author = data.author_name || "";
                    param = embedProcessor._paramEmbedCodeNormalizer(param);
                  } else {
                    param.status = false;
                  }
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              });
            },
            /**
             ** ustream worker
             */

            'ustream':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              if (param.url.match(/\/channel\//) === null) {
                var video_id = param.url.split('/').pop();
                var api_url = '//api.ustream.tv/json/video/' + video_id + '/getInfo?key=CA8D42389DA4266B9489912DE63A817F&callback=?';
                $.getJSON(api_url, function (data) {
                  if (data) {
                    param.status = true;
                    param.duration = data.lengthInSecond;
                    param.duration_formatted = false;
                    param.thumbnail_url = data.imageUrl.medium || data.imageUrl.small || '';
                    param.title = data.title || '';
                    param.description = data.description || '';
                    param.rating = data.rating || '';
                    param.numberOf = data.numberOf || '';
                    param.html = data.embedTag;
                    if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                      param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                    }
                    param = embedProcessor._paramEmbedCodeNormalizer(param);
                  } else {
                    param.status = false;
                  }
                  embedProcessor.log(param.worker + ' receive parameters = ', param);
                  callback(param);
                });
              } else {
                this.embedly(param, options, callback);
              }
            },

            /**
             ** m4v worker
             */
            'm4v':function (param, options, callback) {
              var videoUrl = param.url;
              var thumbUrl = "m4v";
              var title = "Video";
              if (videoUrl.indexOf("#")) {
                var ii = videoUrl.match(/##webdoc,([^,]*)?,(.*)/ig);
                if (ii && ii.length > 0) {
                  ii = ii[0].split(",");
                  title = decodeURIComponent(ii[1]);
                  thumbUrl = decodeURIComponent(ii[2]);
                }
                videoUrl = videoUrl.substr(videoUrl.indexOf("#"));
              }
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = thumbUrl;
              param.favicon_url = '';
              param.service_name = 'm4v';
              param.provider_url = 'm4v';
              param.html = false;
              param.service_name = '';
              param.provider_url = videoUrl;
              param.title = title;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            },
            /**
             ** Without any API worker
             */
            'noworker':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = false;
              param.favicon_url = '';
              param.service_name = '';
              param.provider_url = '';
              param.html = false;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            }
          },

          _getSourceNameByUrl:function (url) {
            for (var currentSource in this._sources) {
              if (url.indexOf(this._sources[currentSource].urlPart) !== -1) {
                return currentSource;
              }
            }
            return false;
          },

          _paramEmbedCodeNormalizer:function (param) {
            if (param.html) {
              param.html = param.html
                .replace(/width="(.*?)"/ig, "width='100%'")
                .replace(/height="(.*?)"/ig, "height='100%'")
                .replace(/width=(.*?)px/ig, "width='100%'")
                .replace(/height=(.*?)px/ig, "height='100%'")
                .replace('><embed', "><param name='wmode' value='transparent'/><embed ")
                .replace('<embed', "<embed wmode='transparent'")
                .replace('<object', "<object wmode='transparent'");
            }
            return param;
          },

          _timeConverter:function (time) {
            var minutes = 0;
            var seconds = 0;
            minutes = Math.floor(time / 60);
            seconds = Math.floor(time - minutes * 60);
            time = minutes + ":" + (seconds === 0 ? "00" : (seconds > 9 ? seconds : '0' + seconds));
            return time;
          },

          log:function (m1, m2, m3, m4, m5, m6, m7, m8) {
            if (this.debug) {
              console.log(' :::::: video.embedProcessor::debug::message --- >', m1 || '', m2 || '', m3 || '', m4 || '', m5 || '', m6 || '', m7 || '', m8 || '');
            }
          }
        };

        that.pauseOtherPlayers = function() {
          if(!that.options.styles.autoPause) {
            return;
          }
//          var list = $(".ut-video");
//          $.each(list, function(i, v) {
//            if(v !== $that[0]) {
//              $(v).utVideo("pause");
//            }
//          });
          if(that.post && that.post.stopAllOther) {
            that.post.stopAllOther();
          }
        };

        /************************************************************/
        /* video.embedProcessor end
        /************************************************************/

        that.updatePreViewVideoData = function() {
          var sed = that.currents.sourceEmbedData || {};

          if(that.ui.artwork) {
            that.ui.artwork.css("backgroundImage", "url(" + sed.thumbnail_url + ")");
          }

          if(that.ui.play) {
            that.ui.play.off("click");
            that.ui.play.html('<span class="icon_play '+that.uiNS+'-play-icon"></span>');
            that.ui.play.on("click", function(event){
              that.utPlay();
              event.stopPropagation();
              event.preventDefault();
            });
          }

          if(that.ui.title) {
            that.ui.title.html(sed.title || '');
            that.ui.title.on('click', function(event) {
              event.stopPropagation();
            });
          }

          if(that.ui.source) {
            that.ui.source.prop('href',sed.url);
            that.ui.source.prop('target','_blank');
            that.ui.source.prop('title','Watch on '+sed.service_name);
            that.ui.source.on('click', function(event) {
              event.stopPropagation();
            });

            if(sed.source === 'youtube' || sed.source === 'vimeo' || sed.source === 'dailymotion'){
              that.ui.source.html('<span class="icon_'+sed.source+' '+that.uiNS+'-source-icon"></span>');
            } else {
              that.ui.source.html(sed.favicon_url ? '<img src="' + sed.favicon_url + '" border=0 />' : '');
            }
          }

          /* auto-start */
          if(that.options.autoPlay) {
            that.utPlay();
          }

          that.currents.videoDataReceived = true;
        };

        that.processEmbedData = function(sourceEmbedData) {
          if(that._embedVideoByDataTO) {
            clearTimeout(that._embedVideoByDataTO);
            that._embedVideoByDataTO = 0;
          }
          that.currents.sourceEmbedData = sourceEmbedData;
          if(sourceEmbedData.source) {
            that.canplay = true;
            if(that.isMobileSafari){
              that.utPlay();
            } else {
              that.updatePreViewVideoData();
              if(!that.autoplay) {
                that.setState('launch');
              }
            }
            setTimeout(function() {
              $that.trigger(events.mediaReady, sourceEmbedData);
              that.triggerChangeEvent();
            }, 10);
          } else {
            $that.trigger(events.error, [false, "sorry: utVideo can not play this source of video"]);
            that.setState('error');
          }
        };

        that.utDestroy = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.destroy);
          that.ui.container.remove();
          that = null;
        };

        that.utChange = function(data) {
          that.options.data = data;
          that.update();
        };

        that.utPlay = function() {
          if(!that.canplay) {return;}
          that.pauseOtherPlayers();
          if(that.currents.state === 'pause') {
            that.ui.video.trigger('continueAfterPause');
          } else {
            that.setState("video");
            embedProcessor.embedVideoByParameters(that.currents.sourceEmbedData, that.options);
          }
        };

        that.utPause = function() {
          that.ui.video.trigger('pauseVideo');
        };

        that.utStop = function() {
          that.ui.video.find('iframe').prop('src','');
          that.ui.video.empty();
          $that.trigger(events.stop);
          that.setState('launch');
        };

        that.utUpdate = function() {
          that.update();
        };

        that.utDialog = function(opt) {
          var options = {
            inputTypes: ['search'],
            label: that.options.i18n.dialogLabel
          };
          if(!$.isEmptyObject(opt)) {
            options = $.extend(true, options, opt);
          }

          $that.trigger(events.dialogOpen);
          that.post.dialog('video', options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function() {
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? 'true' : 'false'),
            (that.currents.serviceData?(that.serviceNS + '-' + that.currents.serviceData.service_name):''),
            that.skinNS     + '-' + that.options.styles.skin,
            that.modeNS     + '-' +(that.post.context.player?'player':'editor'),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch?'true':'false'),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that._embedVideoByDataTO = 0;
        that.embedVideoByData = function(data) {
          that._embedVideoByDataTO = 0;
          that.setState("loading");
          that._embedVideoByDataTO = setTimeout(function () {
            if(!that.currents.videoDataReceived && that.currents.state !== 'error' && that.options.data) {
              $that.trigger(events.error, [false, 'sorry: utVideo can not embed this video']);
              that.setState('error');
            }
          }, 15000);
          embedProcessor.getVideoPlayerParameters(data.url, data.appData || false, {}, that.processEmbedData);
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            videoDataReceived: false,
            sourceEmbedData: null,
            state: null
          };

          $that.addClass("ut-video");

          var storage_data = that.post.storage[that.storageNS + that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utVideo: Please specify an id of your video container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($("#" + that.currents.id).length > 1) {
            console.error('utVideo: Your video container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          /* hack for firefox flash video */
          if (/Firefox[\/\s](\d+\.\d+)/.test(window.navigator.userAgent)) {
            $that.parents().each(function(){
              if ($(this).css('transform') !== "none" || $(this).css('-moz-transform') !== "none") {
                $(this).css({
                  '-moz-transform': 'none',
                  'transform': 'none'
                });
                if(console && console.warn) {
                  console.warn('WARNING!!! css property translate for firefox removed in order to avoid problems with FLASH');
                }
              }
            });
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute") {
            $that.css('position', 'relative');
            if(console && console.warn) {
              console.warn('Your container (id=' + that.currents.id + ') css position was set as "relative" as requirement of utVideo component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.video     = $('<div class="'+that.uiNS+'-video"></div>'  ).appendTo(that.ui.container);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').append($('<div>').html(i18n.get('error'))).appendTo( that.ui.container);
          if(that.options.ui.artwork) {that.ui.artwork = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.loading) {that.ui.loading = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-loading-icon"></div>').appendTo(that.ui.container);}
          if(that.options.ui.play)    {that.ui.play    = $('<div class="'+that.uiNS+'-play">'         ).appendTo(that.ui.container);}
          if(that.options.ui.title)   {that.ui.title   = $('<h1  class="'+that.uiNS+'-title"></h1>'   ).appendTo(that.ui.container);}
          if(that.options.ui.source)  {that.ui.source  = $('<a   class="'+that.uiNS+'-source"></a>'   ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_video ut-media-button ut-button"></a>').html(i18n.get('add_video')).appendTo(that.ui.container);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>').html(i18n.get('edit')).appendTo(that.ui.container);

            that.ui.add.on('click', that.onAddButtonClick);
            that.ui.remove.on('click', that.onRemoveButtonClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post){
            that.post.on('pause', that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.embedVideoByData(that.options.data);
          } else {
            that.setState("empty");
          }
        };

        that.onAddButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
//            that.removeVideo();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.removeVideo = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
          that.update();
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('video');
            methods.nextPlayerToAddVideo = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);
        that.update();

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    play: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPlay && this.utVideo.canplay) {
          this.utVideo.utPlay.call(this);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPause && this.utVideo.canplay) {
          this.utVideo.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utStop && this.utVideo.canplay){
          this.utVideo.utStop.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utUpdate){
          this.utVideo.utUpdate.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDestroy){
          this.utVideo.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDialog){
          this.utVideo.utDialog.call(this,options);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0 && this[0].utVideo && this[0].utVideo.options) {
        res = this[0].utVideo.options.data;
      }
      return res;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utVideo) {
          this.utVideo.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utVideo = function (method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utVideo');
    }
    return this;
  };
})(UT, window.$ || window.Zepto || window.jq);
}
