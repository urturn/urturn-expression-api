function loadMediaPlayer() {

  /**
   * params {Object} -- init parameters, where:
   * - parent {String|DOM} -- the parent element to attach player
   * - style {String} -- the player UI working mode
   *   full -- full working mode (default)
   *   circle -- player always as circle
   */
  (function(window) {
    "use strict";

    function MediaPlayer(params) {
      
      this._parent = jQuery(params.parent ? params.parent : "body");
      this._trackData = null;
      this._trackService = "";
      this._trackType = "";
      this._trackDuration = 0;
      this._curState = "loading";
      this._curStyle = "circle";
      this._sourceLink = "";
      this._isNeedShowAnim = true;
      this._isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
      this.onExpand = null;
      this.onReady = null;
      this.post = null;

      var that = this;
      if(window.UT && UT.Expression && UT.Expression.ready) {
        UT.Expression.ready(function(p){
          that.post = p;
          that.post.on("publish", function(){
            if(that._curState === "playing") {
              that.stop();
            }
          });
        });
      }

      this.player = null;
      this.view = {};
      this.view.container = jQuery("<div>", {"class":"media-player mp-container"}).appendTo(this._parent);
      // hide for prevent animation
      this.view.container.css("display", "none");
      this.view.back = jQuery("<div>", {"class":"mp-ui-back"}).appendTo(this.view.container);
      this.view.trackInfo = jQuery("<div>", {"class":"mp-ui-track-info"}).appendTo(this.view.container);
      this.view.trackAuthor = jQuery("<div>", {"class":"mp-ui-track-author"}).appendTo(this.view.trackInfo);
      this.view.trackName = jQuery("<div>", {"class":"mp-ui-track-name"}).appendTo(this.view.trackInfo);
      this.view.artworkContainer = jQuery("<div>", {"class":"mp-ui-art-cont","target":"_blank"}).appendTo(this.view.back);
      this.view.artworkImage = jQuery("<div>", {"class":"mp-ui-art-image"}).appendTo(this.view.artworkContainer);
      this.view.artworkOverlay = jQuery("<div>", {"class":"mp-ui-art-overlay"}).appendTo(this.view.artworkContainer);
      this.view.button = jQuery("<div>", {"class":"mp-ui-ctrl-button"}).appendTo(this.view.back);
      this.view.buttonBack = jQuery("<div>", {"class":"mp-ui-ctrl-button-back"}).appendTo(this.view.button);
      this.view.buttonIcons = jQuery("<div>", {"class":"mp-ui-ctrl-button-icons"}).appendTo(this.view.button);
      jQuery("<span>", {"class":"mp-button-icon mp-play icon_play"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-pause icon_pause"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-wait icon_spinner"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-close icon_delete_alt"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-error icon_error"}).appendTo(this.view.buttonIcons).html("!");
      this.view.buttonOverlay = jQuery("<div>", {"class":"mp-ui-ctrl-button-overlay"}).appendTo(this.view.button);

      var str = "";
      str += '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="-2 -2 54 54" >';
      str += '<g>';
      str += '<path class="waitStatusLine" d="M26,2" stroke-linecap="round" fill="none" stroke="#ffffff" stroke-width="4"/>';
      str += '<path class="playStatusLine" d="M26,2" stroke-linecap="round" fill="none" stroke="#d2523e" stroke-width="4"/>';
      str += '</g>';
      str += '</svg>';
      this.view.buttonOverlay.html(str);

      this.setZIndex(params.zIndex);
      this.setStyle(params.style ? params.style : "circle");
      this.setState("loading");

      this.view.trackInfo.on("click", ".source", this._onSourceClick.bind(this));
      this.view.button.on("click", this._onButtonClick.bind(this));
    }

    MediaPlayer.prototype._onSourceClick =  function() {
      this.stop();
    };

    MediaPlayer.prototype.Load = function(data) {
      if(typeof(data) === "string") {
        if(data.toLowerCase().indexOf('soundcloud') !== -1) {
          data = {service:"soundcloud", url:data};
        } else if(data.toLowerCase().indexOf('itunes.apple') !== -1) {
          data = {service:"itunes", pageUrl:data};
        } else {
          data.service = "unknown";
        }
      }

      if(typeof(data.service) === "undefined") {
        return;
      }

      this.view.container.removeClass("mp-audio mp-video");
      var trackService = data.service.toLowerCase();
      if(trackService === "itunes" || trackService === "soundcloud") {
        this._trackService = trackService;
        this._trackData = data;
        this._trackType = "audio";
        this.view.container.addClass("mp-audio");
        this.initAudioPlayer();
      } else {
        this._trackService = trackService;
        this._trackData = data;
        this._trackType = "video";
        this.view.container.addClass("mp-video");
        this.initVideoPlayer();
      }
      // show player
      this.view.container.css("display", "");
    };

    MediaPlayer.prototype.initAudioPlayer = function() {
      if(this.player) {
        this.player.remove();
        this.player = null;
      }

      var that = this;
      that.setState("loading");

      var playerId = "mp_player_"+Math.floor(Math.random()*100000).toString();
      that.player = jQuery("<div>", {"class":"mp-player","id":playerId}).appendTo(that.view.container);

      that.player.on("utAudio:change",function(){
      });

      that.player.on("utAudio:ready",function(e){
        if(that._curState === "loading") {
          that.setState("launched");
        }
      });

      that.player.on("utAudio:mediaReady",function(e, data) {
        var timeStr = "";
        if(data.duration > 0) {
          that._trackDuration = data.duration;
          var ts = Math.floor(that._trackDuration/1000) % 60;
          var tm = Math.floor(that._trackDuration/60000);
          timeStr = tm + "."+that.zeroPad(ts,2,"0") + " - ";
        } else {
          that._trackDuration = 0;
        }

        // updating artist name and title
        if(!that._trackData.artist && data.artist) {
          that._trackData.artist = data.artist;
        }
        if(!that._trackData.title && data.trackName) {
          that._trackData.title = data.trackName;
        }
        if(!that._trackData.cover && data.artwork_url) {
          that._trackData.cover = data.artwork_url;
          that.setCoverUrl(that._trackData.cover);
        }

        // display artist name
        if(that._trackService === "itunes") {
          that.view.trackAuthor.html((that._trackData.artist || "") + " - " + timeStr + '<a target="_blank" class="source">iTunes</a>');
        } else {
          that.view.trackAuthor.html((that._trackData.artist || "") + " - " + timeStr + '<a target="_blank" class="source">SoundCloud</a>');
        }
        that.view.trackName.html(that._trackData.title || "");

        if(that._sourceLink) {
          that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
        }

        if(that.onReady) {
          that.onReady();
        }
      });

      that.player.on("utAudio:play",function() {
        that.setState("playing");
        UT.Expression._postInstance().track('media player - play audio');
      });

      that.player.on("utAudio:pause", function() {
        that.setState("paused");
        that._isNeedShowAnim = false;
      });

      that.player.on("utAudio:stop", function() {
        that.setState("finished");
        that.showProgress(0);
        that._isNeedShowAnim = true;
      });

      that.player.on("utAudio:finish", function() {
        that.setState("finished");
        that.showProgress(0);
        that._isNeedShowAnim = true;
      });

      that.player.on("utAudio:timeUpdate", function(e,s) {
  //      if(that._curState !== "playing") {
  //        that.setState("playing");
  //      }
        if(that._trackDuration > 0) {
          that.showProgress(s*1000/that._trackDuration);
        } else {
          that.showProgress(0);
        }
      });

      that.player.on("utAudio:seek", function(){
        that.setState("seeking");
      });

      var data = jQuery.extend(true, {}, that._trackData);
      var prm = {
        data: data,
        skin: "tiny-bottom",
        ui:{
          play:    false,
          progress:false,
          time:    false,
          title:   false,
          source:  false,
          artwork: false
        },
        editable: false
      };

      if(that._trackService === "itunes" && data.url && data.pageUrl) {
        data.appData = {
          previewUrl: data.url,
          artistName: data.artist,
          trackName: data.title,
          artworkUrl100: data.cover
        };
        data.link = data.url;
        data.url = data.pageUrl;
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">iTunes</a>');
      } else if(that._trackService === "itunes" && data.pageUrl) {
        data.url = data.pageUrl;
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">iTunes</a>');
      } else {
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">SoundCloud</a>');
      }
      if(that._sourceLink) {
        that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
      }
      that.view.trackName.html(data.title || "");

      if(data.cover) {
        that.setCoverUrl(data.cover);
      } else {
        that.setCoverUrl("");
      }

      if(data.pageUrl) {
        that.setSourceLink(data.pageUrl);
      } else {
        that.setSourceLink("");
      }

      that.player.utAudio(prm);
    };

    MediaPlayer.prototype.initVideoPlayer = function() {
      if(this.player) {
        this.player.remove();
        this.player = null;
      }

      var that = this;
      that.setState("loading");

      var playerId = "mp_player_"+Math.floor(Math.random()*100000).toString();
      that.player = jQuery("<div>", {"class":"mp-player","id":playerId}).appendTo(that.view.container);

      that.player.on("utVideo:ready", function(event, data) {
        if(that._curState === "loading") {
          that.setState("launched");
        }
      });

      that.player.on("utVideo:mediaReady", function(event, data) {
        var author = data.author ? data.author + " - " : "";
        var title = data.title ? data.title : that._trackData.artist;
        var timeStr = "";
        if(data.duration > 0) {
          that._trackDuration = data.duration * 1000;
          var ts = Math.floor(that._trackDuration/1000) % 60;
          var tm = Math.floor(that._trackDuration/60000);
          timeStr = tm + "."+that.zeroPad(ts,2,"0") + " - ";
        } else {
          that._trackDuration = 0;
        }

        that.view.trackAuthor.html(author + timeStr + '<a target="_blank" class="source">' + data.service_name + "</a>");
        that.view.trackName.html(title);
        if(that._sourceLink) {
          that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
        }

        if(that.onReady) {
          that.onReady();
        }
      });

      that.player.on("utVideo:play", function() {
        that.setState("playing");
        UT.Expression._postInstance().track('media player - play video');
      });
      that.player.on("utVideo:pause", function() {
  //      that.setState("paused");
      });
      that.player.on("utVideo:stop", function() {
        that.setState("finished");
      });
      that.player.on("utVideo:finish", function() {
        that.setState("finished");
      });
      that.player.on("utVideo:error", function() {
        that.setState("error");
      });

      that.view.trackAuthor.html(that._trackData.artist || "");
      that.view.trackName.html(that._trackData.title || "");

      if(that._trackData.cover) {
        that.setCoverUrl(that._trackData.cover);
      } else {
        that.setCoverUrl("");
      }

      if(that._trackData.pageUrl || that._trackData.url) {
        that.setSourceLink(that._trackData.pageUrl || that._trackData.url);
      } else {
        that.setSourceLink("");
      }
      window.ppp = that.player;
      that.player.utVideo({
        editable: false,
        data: that._trackData.url,
        autoPlay: false
      });
    };

    MediaPlayer.prototype.setZIndex = function(zIndex) {
      if(zIndex) {
        this.view.container.css("z-index", zIndex);
      }
    };

    MediaPlayer.prototype.setStyle = function(style) {
      var modes = [
        "mp-style-full",
        "mp-style-full_m",
        "mp-style-circle",
        "mp-style-circle_m"
      ];
  //    this.view.container.removeClass(modes.join(" ")).addClass("mp-style-" + style + (this._isTouch ? "_m" : ""));
      this.view.container.removeClass(modes.join(" ")).addClass("mp-style-" + style);
      this._curStyle = style;
    };

    MediaPlayer.prototype.setState = function(mode) {
      var modes = [
        "mp-mode-loading",
        "mp-mode-launched",
        "mp-mode-seeking",
        "mp-mode-playing",
        "mp-mode-paused",
        "mp-mode-finished",
        "mp-mode-error"
      ];
      this.view.container.removeClass(modes.join(" ")).addClass("mp-mode-" + mode);
      if(mode === "playing") {
        if(!this.view.container.hasClass("mp-expand")) {
          this.view.container.addClass("mp-expand");
          if(this._isNeedShowAnim) {
            this.whiteAnim();
            this._isNeedShowAnim = false;
          }
          if(this._isTouch && this._curStyle !== "circle") {
            var ww = Math.min(this._parent.width() - 20, 320); /* limit size to 320px */
            this.view.container.css("width", ww + "px");
            this.view.back.css("width", ww + "px");
            this.view.container.find(".mp-player").css("width", ww + "px");
          }
          if(this.onExpand) {
            this.onExpand.call(this, true);
          }
        }
      } else {
        if(this._isTouch) {
          this.view.container.css("width", "");
          this.view.back.css("width", "");
        }
        if(this.view.container.hasClass("mp-expand")) {
          this.view.container.removeClass("mp-expand");
          if(this._trackService !== "itunes" && this._trackService !== "soundcloud") {
            this.whiteAnim2();
            this._isNeedShowAnim = true;
          }
          if(this.onExpand) {
            this.onExpand.call(this, false);
          }
        }
      }
      this._curState = mode;
    };

    MediaPlayer.prototype._onButtonClick = function(event) {
      event.stopPropagation();
      if(this._trackType === "audio") {
        if(this._curState === "playing") {
          this.stop();
        } else if(this._curState === "launched" || this._curState === "paused" || this._curState === "finished") {
          this.play();
        } else if(this._curState === "error") {
          // try to recreate player when error
          this.initAudioPlayer();
        }
      } else if(this._trackType === "video") {
        if(this._curState === "playing") {
          this.stop();
        } else if(this._curState === "launched" || this._curState === "paused" || this._curState === "finished") {
          this.play();
        } else if(this._curState === "error") {
          // try to recreate player when error
          this.initVideoPlayer();
        }
      }
    };

    MediaPlayer.prototype.play = function() {
      if(this._curState === "playing") {
        return;
      }

      if(this._trackType === "audio") {
        this.setState("seeking");
        this.player.utAudio("play");
      } else {
        this.setState("playing");
        this.player.utVideo("play");
      }
    };

    MediaPlayer.prototype.stop = function() {
      if(this._curState !== "playing") {
        return;
      }

      if(this._trackType === "audio") {
        this.player.utAudio("pause");
      } else {
        this.player.utVideo("stop");
      }
    };

    MediaPlayer.prototype.setCoverUrl = function(url) {
      if(url) {
        this.view.artworkImage.css("background-image", "url("+url+")");
      } else {
        this.view.artworkImage.css("background-image");
      }
    };

    MediaPlayer.prototype.zeroPad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };

    MediaPlayer.prototype.setSourceLink = function(url) {
      if(url) {
        this._sourceLink = url;
        if(this.view.container) {
          this.view.container.find(".source").attr("href", url);
        }
      } else {
        this._sourceLink = "";
        if(this.view.container) {
          this.view.container.find(".source").removeAttr("href");
        }
      }
    };

    MediaPlayer.prototype.showProgress = function(posInPercent, color) {
      posInPercent = posInPercent > 1 ? 1 : (posInPercent < 0 ? 0 : posInPercent);
      var aaa = 2*Math.PI*posInPercent - Math.PI/2;
      var cx = 25;
      var cy = 25;
      var rr = 24.5;
      var dx = Math.cos(aaa)*rr;
      var dy = Math.sin(aaa)*rr;
      var obj = this.view.buttonOverlay.find(color ? ".waitStatusLine" : ".playStatusLine");
      var tmp = obj && obj[0] ? obj[0] : null;

      if(tmp) {
        if(dx > 0) {
          tmp.setAttribute("d", "M"+cx+","+(cy-rr)+" a"+rr+","+rr+" 0 0,1 "+dx+","+(rr+dy)+""); //z
        } else {
          tmp.setAttribute("d", "M"+cx+","+(cy-rr)+" a"+rr+","+rr+" 0 1,1 "+dx+","+(rr+dy)+""); //z
        }
      }
    };

    MediaPlayer.prototype.whiteAnim = function() {
      var intNum = 0;
      var stTime = (new Date()).getTime();
      var that = this;
      that.showProgress(1, true);
      intNum = setInterval(function() {
        var curTime = (new Date()).getTime();
        if((curTime - stTime) > 200) {
          that.showProgress(0, true);
          clearInterval(intNum);
          return;
        }
        that.showProgress(1-(curTime - stTime)/200, true);
      }, 1);
    };

    MediaPlayer.prototype.whiteAnim2 = function() {
      var intNum = 0;
      var stTime = (new Date()).getTime();
      var that = this;
      that.showProgress(0, true);
      intNum = setInterval(function() {
        var curTime = (new Date()).getTime();
        if((curTime - stTime) < 200) {
          return;
        }
        if((curTime - stTime) > 500) {
          that.showProgress(1, true);
          clearInterval(intNum);
          return;
        }
        that.showProgress((curTime - stTime - 200)/300, true);
      }, 1);
    };

    window.MediaPlayer = MediaPlayer;
  })(window);
}