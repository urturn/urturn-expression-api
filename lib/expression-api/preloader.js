; (function(UT, window, document, undefined){
  "use strict";

  UT.preloader = {};

  UT.preloader.waitFor = function(keys, debug){
    if(typeof(debug) == 'undefined') debug = false;
    var that = this;
    var instance = {
      keys:{},
      callback:{
        loadstart: function(){},
        progress:function(){},
        load:function(){}
      }
    };

    var now = function(){
      return new Date().getTime();
    };

    var setKeys = function(keys){
      keys.map(function(key){instance.keys[key] = {ready:false, startTime:now()};});
    };

    var readyKey = function(key){
      var that = this;
      if(!instance.keys[key]) {console.error('wrong key, that was not defined for waitFor');return;}
      instance.keys[key].ready = true;
      instance.keys[key].endTime = now();
      instance.keys[key].delay = (instance.keys[key].endTime - instance.keys[key].startTime);
      if(debug && console && console.log) console.log(' -- waitFor:progress: key:'+key);
      instance.callback.progress.call(that,instance.keys);
      for(var i in instance.keys){
        if(!instance.keys[i].ready) {return;}
      }
      if(debug && console && console.group){
        console.group(' -- waitFor:load',instance.keys);
        for(var j in instance.keys){
          console.log(j,' = ',instance.keys[j].delay+'ms');
        }
        console.groupEnd();
      }
      instance.callback.load.call(that,instance.keys);
    };

    var cacheImage = function(key, url) {
      if(!url) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify image url as a second parameter of readyImage(key, url).. currently url='+name);
        return;
      }
      var tmpImg = new Image();
      tmpImg.onload = function() {
        readyKey(key);
      };
      tmpImg.onerror = function() {
        readyKey(key);
      };
      instance.keys[key].startTime = now();
      instance.keys[key].url = url;
      tmpImg.src = url;
    };

    var cacheFont = function(key, name) {
      if(!name) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify font name as a second parameter of readyFont(key, fontName).. currently fontname='+name);
        return;
      }
      instance.keys[key].startTime = now();
      instance.keys[key].fontName = name;
      fontdetect.onFontLoaded(name, function(){
        readyKey(key);
      }, function() {
        if(debug) console.error('We was not able to load the font "'+name+'" in 5 sec...');
        readyKey(key);
      }, {msInterval: 30, msTimeout: 5000});
    };

    instance.on = function(event,callback){
      instance.callback[event] = callback;
      return instance;
    };

    instance.ready = function(key){
      readyKey(key);
      return instance;
    };

    instance.readyImage = function(key, url){
      cacheImage(key, url);
      return instance;
    };

    instance.readyFont = function(key, fontName){
      cacheFont(key, fontName);
      return instance;
    };

    setKeys(keys);
    return instance;
  };
})(UT, window, document, undefined);