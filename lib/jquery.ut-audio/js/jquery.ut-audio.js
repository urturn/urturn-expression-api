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
(function ($) {
  "use strict";
  var methods = {
    nextPlayerToAddSound: -1,

    init: function(options) {
      this.each(function() {
        var $that = $(this);
        var that = {};
        this.utAudio = that;

        var events = {
          ready: "utAudio:ready",
          change: "utAudio:change",
          buttonClick: "utAudio:buttonClick",
          mediaAdd: "utAudio:mediaAdd",
          mediaRemove: "utAudio:mediaRemove",
          mediaReady: "utAudio:mediaReady",
          timeUpdate: "utAudio:timeUpdate",
          play: "utAudio:play",
          pause: "utAudio:pause",
          stop: "utAudio:stop",
          finish: "utAudio:finish",
          seek: "utAudio:seek",
          error: "utAudio:error",
          dialogOpen: "utAudio:dialogOpen",
          dialogCancel: "utAudio:dialogCancel"
        };

        var defaults = {
          data: undefined,
          skin: 'bottom-over',
          id: false,
          ui: {
            play:    true,
            progress:true,
            time:    true,
            title:   true,
            source:  true,
            artwork: true
          },
          styles: {
            autoPause: true,
            listenMedia: true,
            staticLink: false
          },
          editable: true,
          i18n: {
            add:         "add sound",
            change:      "",
            error:       "Error occurred",
            dialogLabel: undefined
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready){
          UT.Expression.ready(function(post){
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                that.update();
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.sckey   = 'T8Yki6U2061gLUkWvLA';
        that.doNotMakeAnimationFlag = false;

        that.eventNS   = '';
        that.storageNS = 'utAudio_';
        that.stateNS   = "ut-audio-state";
        that.editableNS= "ut-audio-editable";
        that.uiNS      = "ut-audio-ui";
        that.modeNS    = "ut-audio-mode";
        that.skinNS    = "ut-audio-skin";
        that.serviceNS = "ut-audio-service";
        that.aspectNS  = "ut-audio-aspect";
        that.sizeNS    = "ut-audio-size";
        that.touchNS   = "ut-audio-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            play:    v,
            progress:v,
            time:    v,
            title:   v,
            source:  v,
            artwork: v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddSound < 0 && that.options.styles.listenMedia) {
            that.post.on('sound',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-audio");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddSound) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utAudio && allPanels[ww].utAudio.options && !allPanels[ww].utAudio.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddSound++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utAudio.options.data = data;
                tmp.utAudio.update();
              }
            });
            methods.nextPlayerToAddSound = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions) {
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
          $that.trigger(events.change, diff.newValue, diff.oldValue);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        that.requestSoundcloudAboutAppData = function(url, callback) {
          var apiUrl = (document.location.protocol === 'https:' || (/^h ttps/i).test(url) ? 'https' : 'http') + '://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + that.sckey + '&callback=?';
          $.getJSON(apiUrl, function(data) {
            callback.call(this, data);
          });
        };

        that.requestItunesAboutAppData = function(url,callback) {
          var id = false;
          var parts = url.split('i=');
          if(parts[1]){
            id = parseInt(parts[1].split('&')[0].split('?')[0].split(':')[0],10);
          }

          var serchInStore = function(id, country, successCallback, errorCallback){
            var apiUrl = (document.location.protocol === 'https:' || (/^https/i).test(url) ? 'https' : 'http') + '://itunes.apple.com/lookup?media=music&country=' + country + '&id=' + id + '&callback=?';
            $.getJSON(apiUrl, function(data) {
              if(data && data.results && data.results[0]){
                successCallback.call(this, data.results[0]);
              } else {
                errorCallback.call(this, country);
              }
            });
          };

          var canNotFind = function(country){
            that.setState('error');
            if(console && console.warn){
              console.warn("utAaudio can't find the url=" + url + " with id=" + id + " in " + country + " itunes music store");
            }
          };

          var canFind = function(data){
            callback.call(this,data);
          };

          //here we search in UK and US stores

          serchInStore(id,'US',canFind,function(country){
            canNotFind(country);
            serchInStore(id,'GB',canFind,function(country){
              canNotFind(country);
            });
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? "true" : "false"),
            (that.currents.serviceData?(that.serviceNS + "-" + that.currents.serviceData.service_name) : ""),
            that.skinNS     + '-' + that.options.skin,
            that.modeNS     + '-' +(that.post.context.player ? "player" : "editor"),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch ? "true" : "false"),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that.setPlayPos = function(ms, animationFlagSencitive) {
          if(that.doNotMakeAnimationFlag && animationFlagSencitive) {
            return false;
          }

          if(ms < 0 || !that.currents.serviceData) {
            return false;
          }

          if(ms > that.currents.serviceData.duration) {
            ms = that.currents.serviceData.duration;
          }

          if(that.ui.progress){
            that.ui.progress.find('.' + that.uiNS + '-progress-playing').css("width", ((ms / that.currents.serviceData.duration) * 100) + "%");
          }

          var timeInSeconds = Math.round(ms / 1000);
          if(ms > 0 || ms === -1){
            $that.trigger(events.timeUpdate, timeInSeconds);
          }

          if(that.currents.serviceData && that.currents.serviceData.duration) {
            var ts = '<span class="'+that.uiNS+'-progress-time-current">'+that.formatTime(ms) + '</span><span class="'+that.uiNS+'-progress-time-left">' + that.formatTime(that.currents.serviceData.duration) + '</span>';
            if(that.ui.time){
              that.ui.time.html(ts);
            }
          } else {
            if(that.ui.time){
              that.ui.time.html("");
            }
          }

          that.doNotMakeAnimationFlag = true;
          setTimeout(function(){
            if(that){
              that.doNotMakeAnimationFlag = false;
            }
          }, 1000);
          return true;
        };

        that.formatTime = function(ms) {
          var hms = {
            h: Math.floor(ms / (60 * 60 * 1000)),
            m: Math.floor((ms / 60000) % 60),
            s: Math.floor((ms / 1000) % 60)
          }, tc = [];
          if (hms.h > 0) {
            tc.push(hms.h);
          }
          tc.push((hms.m < 10 && hms.h > 0 ? '0' + hms.m : hms.m));
          tc.push((hms.s < 10 ? '0' + hms.s : hms.s));
          return tc.join(':');
        };

        that.updateUiContent = function() {
          var sed = that.currents.serviceData || {};

          if(that.ui.artwork && sed.artwork_url) {
            var img = new window.Image();
            img.onload = function(){
              that.ui.artwork.css("backgroundImage", "url(" + sed.artwork_url + ")");
            };
            img.src = sed.artwork_url;
          }

          if(that.ui.play) {
            that.ui.play.html('<span class="icon_spinner '+that.uiNS+'-seek-icon"></span><span class="icon_play '+that.uiNS+'-play-icon"></span><span class="icon_pause '+that.uiNS+'-pause-icon"></span>');
            that.ui.play.on('click',function() {
              if(that.currents.state !== 'launch' && that.currents.state !== 'finish' && that.currents.state !== 'pause'){
                that.utPause();
              } else {
                that.utPlay();
              }
            });
            that.ui.play.on('touchend',function(){});
            that.ui.play.on('touchstart',function(){});
          }

          if(that.ui.title) {
            that.ui.title.html(sed.title || '');
            that.ui.title.off('click').on('click', function (e) {
              e.stopPropagation();
            });
          }

          if(that.ui.error) {
            that.ui.error.html("<div>" + (that.options.i18n.error || "Error") + "</div>");
            that.ui.error.off('click').on('click', function (event) {
              event.stopPropagation();
              event.preventDefault();
              that.setState("launch");
            });
          }

          if(that.ui.progress) {
            that.ui.progress
            .html('<span class="'+that.uiNS+'-progress-playing"></span><span class="'+that.uiNS+'-progress-marker"><span class="'+that.uiNS+'-progress-marker-time"></span><span class="'+that.uiNS+'-progress-time">');
          }

          if(!that.isTouch && that.ui.progress) {
            that.ui.progress
            .off('mouseenter')
            .on('mouseenter', function(){
              if(that.currents.state === 'play' || that.currents.state === 'pause'){
                that.ui.progress.find('.'+that.uiNS+'-progress-marker').addClass(that.uiNS+'-progress-marker-visible');
              }
            })
            .off('mouseleave')
            .on('mouseleave', function(){
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').removeClass(that.uiNS+'-progress-marker-visible');
            })
            .off('mousemove')
            .on('mousemove', function(e){
              var pos = e.pageX - that.ui.progress.offset().left;
              var time = (that.currents.serviceData.duration || 0)/that.ui.progress.width() * pos;
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').css('left',pos + 'px');
              that.ui.progress.find('.'+that.uiNS+'-progress-marker-time').html(that.formatTime(time));
            });
          }

          var _seekPlay = function(e) {
            var oo = that.ui.progress.offset();
            var px = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.pageX ? e.originalEvent.pageX : (e.originalEvent.touches && e.originalEvent.touches[0] && e.originalEvent.touches[0].pageX ? e.originalEvent.touches[0].pageX : 0));
            var pos = (px - parseInt(oo.left, 10))/that.ui.progress.width();
            if(that.currents.state === 'play' || that.currents.state === 'pause'){
              $that.utAudioEngine("seek", pos);
            }
          };

          if(that.ui.progress){
            that.ui.progress.on("touchstart mousedown", function(e) {
              _seekPlay(e);
            });
          }

          if(that.ui.source) {
            that.ui.source
            .html('<span class="icon_'+sed.service_name +' '+that.uiNS+'-source-icon"></span>')
            .prop('target','_blank')
            .prop('title','listen on '+sed.service_name);
          }

          if(that.ui.source) {
            that.ui.source.prop('href',that.options.styles.staticLink ? that.options.styles.staticLink : sed.source);
          }

          that.setPlayPos(0);
        };

        that.seek = function(pos) {
          if(that.currents.state === 'play' || that.currents.state === 'pause'){
            $that.utAudioEngine("seek", pos);
          }
        };

        that.getServiceName = function(){
          if(that.options.data && that.options.data.service) {
            return that.options.data.service;
          } else {
            if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('soundcloud') !== -1) {
              return 'soundcloud';
            } else if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('itunes.apple') !== -1) {
              return 'itunes';
            } else {
              var error = 'Something went wrong with defining service name that you want to play';
              console.error(error, that.options.data);
              that.setState('error', error);
              return false;
            }
          }
        };

        that.formatServiceData = function(data) {
          if (that.getServiceName() === 'soundcloud') {
            that.currents.serviceData = {
              title:       data.title,
              source:      data.permalink_url,
              artwork_url: (data.artwork_url ? data.artwork_url : '').replace(/\-large\./ig, "-t500x500."),
              duration:    data.duration,
              artist:      (data.user && data.user.username ? data.user.username : ""),
              trackName:   data.title
            };
          } else if(that.getServiceName() === 'itunes') {
            that.currents.serviceData = {
              title:       data.artistName + ' - ' + data.trackName,
              source:      data.trackViewUrl,
              artwork_url: (data.artworkUrl100 ? data.artworkUrl100 : '').replace("100x100","600x600"),
              duration:    30000,
              artist:      data.artistName,
              trackName:   data.trackName
            };
          }
          that.currents.serviceData.service_name = that.getServiceName();
        };

        that.requestServiceData = function(callback) {
          var errorTimeOut = setTimeout(function(){
            if(that && (!that.currents || !that.currents.serviceData)){
              that.setState('error', "We can't get data to play this track in 15 sec");
            }
          }, 15000);
          if(that.options.data.appData){
            clearTimeout(errorTimeOut);
            callback(that.options.data.appData);
          } else if (that.getServiceName() === 'soundcloud') {
            that.requestSoundcloudAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          } else if (that.getServiceName() === 'itunes') {
            that.requestItunesAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          }
        };

        that.setupServiceDataIntoPlayer = function(data) {
          var type, url;
          if (that.getServiceName() === 'soundcloud') {
            var uri = data.stream_url;// ? data.stream_url : data.uri;
            url = uri + (/\?/.test(uri) ? '&' : '?') + 'consumer_key=' + that.sckey;
            type = "mp3";
          } else {
            url = data.previewUrl;
            type = "m4a";
          }

          that.formatServiceData(data);

          that.utAudioEngineOptions = {
            duration: that.currents.serviceData && that.currents.serviceData.duration ? that.currents.serviceData.duration : false,
            url: url,
            type: type,
//            autoPause: that.options.styles.autoPause,
            onReady: function() {
              that.setPlayPos(0);
            },
            onPlay: function() {
//              if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
//                that.post.stopAllOther();
//              }
              that.setState('play');
              $that.trigger(events.play);
            },
            onPause: function() {
              that.setState('pause');
              $that.trigger(events.pause);
            },
            onStop: function() {
              that.setState('finish');
              $that.trigger(events.stop);
              that.setPlayPos(0);
            },
            onFinish: function() {
              that.setState('finish');
              $that.trigger(events.finish);
              that.setPlayPos(0);
            },
            onSeekStart: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "finish" && that.currents.state !== "empty") {
                that.setState('seek');
                $that.trigger(events.seek);
              }
            },
            onSeekEnd: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "finish" && that.currents.state !== "empty") {
//                if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
//                  that.post.stopAllOther();
//                }
                that.setState("play");
              }
            },
            onTimeUpdate: function(pos) {
              that.setPlayPos(pos, true);
            },
            onError: function(message) {
              $that.trigger(events.error, message);
              that.setState('error');
            }
          };

          that.updateUiContent();

          if($that.utAudioEngine) {
            that.setState('launch');
            $that.utAudioEngine(that.utAudioEngineOptions);
            setTimeout(function() {
              $that.trigger(events.mediaReady, that.currents.serviceData);
              that.triggerChangeEvent();
            }, 10);
          } else {
            that.setState("error", "Sound Player !!! The library not found.");
          }
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            sourceEmbedData: null,
            state: 'loading'
          };

          $that.addClass("ut-audio");

          var storage_data = that.post.storage[that.storageNS+that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utAudio: Please specify an id of your audio container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($('[id="'+that.currents.id+'"]').length > 1){
            console.error('utAudio: Your audio container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          if($that.utAudioEngine) {
            that.utStop();
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute"){
            $that.css('position','relative');
            if(console && console.warn) {
              console.warn('Your container (id='+that.currents.id+') css position was set as "relative" as requirement of utAudio component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').appendTo(that.ui.container);
          that.ui.loading   = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-error-icon"></div>').appendTo(that.ui.container);
          if(that.options.ui.artwork)  { that.ui.artwork  = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.title)    { that.ui.title    = $('<div class="'+that.uiNS+'-title">'        ).appendTo(that.ui.container);}
          if(that.options.ui.play)     { that.ui.play     = $('<div class="'+that.uiNS+'-play needsclick">'         ).appendTo(that.ui.container);}
          if(that.options.ui.progress) { that.ui.progress = $('<div class="'+that.uiNS+'-progress">'     ).appendTo(that.ui.container);}
          if(that.options.ui.time)     { that.ui.time     = $('<div class="'+that.uiNS+'-time">'         ).appendTo(that.ui.container);}
          if(that.options.ui.source)   { that.ui.source   = $('<a class="'+that.uiNS+'-source">'         ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_sound ut-media-button ut-button"></a>')
                                .html(that.options.i18n.add)
                                .appendTo(that.ui.container)
                                .on('click', that.onAddClick);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>')
                                .html(that.options.i18n.change)
                                .appendTo(that.ui.container)
                                .on('click', that.onRemoveClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post) {
            that.post.on('pause',that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.setState("loading");
            that.requestServiceData(that.setupServiceDataIntoPlayer);
          } else {
            that.setState("empty");
          }
        };

        that.onAddClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            event.stopPropagation();
            event.preventDefault();
            that.utDialog({});
          }
        };

        that.utEmpty = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          that.options.data = null;
          that.update();
        };

        that.utPlay = function(v) {
          if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
            that.post.stopAllOther();
          }

          that.setState("seek");
          if($that.utAudioEngine) {
            $that.utAudioEngine("play", v);
          }
        };

        that.utPause = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("pause");
          }
        };

        that.utStop = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("stop");
          }
          that.setPlayPos(-1);
        };

        that.utVolume = function(v) {
          if($that.utAudioEngine) {
            $that.utAudioEngine("volume", v);
          }
        };

        that.utDestroy = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.empty();
          that = null;
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
          that.post.dialog("sound", options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function(){
            $that.trigger(events.dialogCancel);
          });
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('sound');
            methods.nextPlayerToAddSound = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            that.update();
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utEmpty.call(this);
        }
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPlay.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utStop.call(this);
        }
      });
      return this;
    },

    seek: function(pos) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.seek.call(this, pos);
        }
      });
      return this;
    },

    volume: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utVolume.call(this,v);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utAudio && this.utAudio.utUpdate){
          this.utAudio.utUpdate.call(this);
        }
      });
      return this;
    },

    remove: function() {
      methods.destroy.apply(this, arguments);
    },

    destroy: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDialog.call(this, options);
        }
      });
      return this;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utAudio = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudio');
    }
    return this;
  };
})(window.$ || window.Zepto || window.jq);
