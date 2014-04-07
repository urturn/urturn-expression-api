/*
 * This source code is licensed under version 3 of the AGPL.
 * Copyright (c) 2013 by webdoc SA
 * Addendum to the license AGPL-3:
 *
 * Can be used only in the context of urturn service such as creation of Expression,
 * improving the tools to create Expressions.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

function loadUTAudioEngine() {
(function ($) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        var defaults = {
          path: "http://ds4kgpk6gzsw2.cloudfront.net/expression/lib/urturn-expression-api/0.9.2/components/jquery.ut-audio/swf/",
          url: null,
          type: "mp3",
          duration: false,
          startBuffering: (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true),
          autoPlay: false,
          debug: false,
          createPlayerBeforePlaying:true,//(window.navigator.userAgent.match(/(iPad|iPhone|iPod|android)/g) ? false : true),
          onReady:      function(){},
          onPlay:       function(){},
          onPause:      function(){},
          onStop:       function(){},
          onFinish:     function(){},
          onTimeUpdate: function(){},
          onSeekStart:  function(){},
          onSeekEnd:    function(){},
          onError:      function(){}
        };

        var $that = $(this);
        var that = {};
        this.utAudioEngine = that;
        that.options = $.extend(true, defaults, options);

        that.trackDuration = that.options.duration ? that.options.duration : 0 ;

        that.flagPlayerInitializing = false;
        that.flagPlayerInited = false;
        that.flagLoadedData = false;
        that.flagPlaying = false;

        that.globalUtAudioPauseEvent = "globalUtAudioPauseEvent";
        that.uid = Math.ceil((Math.random() * 1000000000)) + new Date().getTime();

        that.player = $("<div style='opacity: 0;'></div>").appendTo($that);
        /********************************************************************************
         * control functions
         ********************************************************************************/
        that.doOnCanPlay = function(){};
        that.doOnReady = function(){};

        that.initPlayer = function() {
          that.player.jPlayer({
            supplied: that.options.type,
            swfPath: that.options.path,
            errorAlerts: false,
            warningAlerts: false,
            preload: that.options.startBuffering,
           // waitForPlay: false,
            ready: function(e) {
              that.environment = {
                flash:e.jPlayer.flash.used,
                html:e.jPlayer.html.used
              };
              that.flagPlayerReady = true;
              that.loadTrack(that.options.url);
              if(that.options.autoPlay) {
                if(that.environment.flash){
                  that.player.jPlayer('play');
                } else {
                  that.doOnCanPlay = function(){
                    that.player.jPlayer('play');
                  };
                }
              }
              that.options.onReady();
            },
            loadeddata: function() {
              that.flagLoadedData = true;
            },
            progress:function(){
            },
            canplay:function(){
              that.flagCanPlay = true;
              if(that.flagPlaying) { //this
                setTimeout(function(){
                  that.doOnCanPlay(); // speciallly for ios
                }, 100);
              }
              that.options.onSeekEnd();
            },
            canplaythrough: function() {
            },
            seeking:function(){
              that.options.onSeekStart();
            },
            seeked:function(){
              that.options.onSeekEnd();
            },
            play: function() {
              that.flagPlaying = true;
              that.options.onPlay();
            },
            pause: function(e) {
              that.flagPlaying = false;
              if(e.jPlayer.status.currentTime === 0) {
                that.options.onStop();
              } else {
                that.options.onPause();
              }
            },
            ended: function() {
              that.flagPlaying = false;
              that.options.onFinish();
            },
            timeupdate: function(e){
              var time = e.jPlayer.status;
              if(that.trackDuration > 0) {
                var relative = that.trackDuration * 1000 > 0 ? (time.currentTime / that.trackDuration) : 0;
                that.options.onTimeUpdate(time.currentTime * 1000, relative, that.trackDuration * 1000);
              }
            },
            error: function(e) {
              that.flagPlaying = false;
              that.options.onError('error',e);
            }
          });
          that.flagPlayerInited = true;
        };

        that.play = function(v) {
          if(!that.flagPlayerInited) {
            that.options.onSeekStart();
            if(!that.options.createPlayerBeforePlaying) {
              that.initPlayer();
            }
          }
          if(that.flagPlayerReady){
            if(that.environment.flash){
              that.player.jPlayer('play',v);
            } else {
              if(that.flagCanPlay){
                that.player.jPlayer('play',v);
              } else {
                that.player.find('audio')[0].play();
              }
            }
          }
          that.flagPlaying = true;
          $('body').trigger(that.globalUtAudioPauseEvent, that.uid);
        };

        that.pause = function() {
          that.flagPlaying = false;
          //that.options.onPause();
          if(that.flagSetMedia){
            that.player.jPlayer('pause');
          }
        };

        that.stop = function() {
          that.flagPlaying = false;
          if(that.flagPlayerInited){
            that.player.jPlayer('stop');
          }
        };

        that.volume = function(v) {
          that.player.jPlayer('volume',v);
        };

        that.seek = function(pos) {
          var time =that.trackDuration ? (pos * that.trackDuration/1000) : 0;
          setTimeout(function(){ that.player.jPlayer('play',time);}, 100);
        };

        that.loadTrack = function(url) {
          if(that.options.type === "m4a") {
            that.player.jPlayer("setMedia", {m4a:url});
          } else {
            that.player.jPlayer("setMedia", {mp3:url});
          }
          that.flagSetMedia = true;
        };

        that.killallhumans = function (){
          that.player.jPlayer("destroy");
        };

        if(that.options.createPlayerBeforePlaying){
          that.initPlayer();
        }


        /********************************************************************************
         * init player
         ********************************************************************************/
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.play) {
          this.utAudioEngine.play.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.pause) {
          this.utAudioEngine.pause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.stop) {
          this.utAudioEngine.stop.call(this);
        }
      });
      return this;
    },

    seek: function (pos) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.seek) {
          this.utAudioEngine.seek.call(this,  pos);
        }
      });
      return this;
    },

    volume: function (v) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.volume) {
          this.utAudioEngine.volume.call(this, v);
        }
      });
      return this;
    },

    // loadTrack: function(url) {
    //   this.each(function () {
    //     if(this.utAudioEngine && this.utAudioEngine.loadTrack) {
    //       this.utAudioEngine.loadTrack.call(this, url);
    //     }
    //   });
    //   return this;
    // },

    killallhumans: function(data) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.killallhumans) {
          this.utAudioEngine.killallhumans.call(this, data);
        }
      });
      return this;
    }
  };

  $.fn.utAudioEngine = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudioEngine');
    }
    return this;
  };

})(window.$ || window.Zepto || window.jq);
}
