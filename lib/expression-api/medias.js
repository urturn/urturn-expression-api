UT.Expression.extendExpression('medias', function(expression){
  return {
    // open a dialog box that let the user pick an image from various sources.
    // 
    // The last parameter is a callback function that will receive the image.
    imageDialog: function(options, callback) {
      if (console && console.warn) {
        console.warn('Usage of imageDialog Deprecated, use expression.dialog instead');
      }
      if (!callback){
        callback = options;
        options = {};
      }

      if (options && options.size && options.size.auto && window.console && console.warn) {
        console.warn('Use of size.auto is deprecated, use size.autoCrop instead');
      }
      UT.Expression._callAPI('medias.openImageChooser', [options], function(imageDescriptor){
        callback.call(this, imageDescriptor);
      });
    },

    createImage: function(urlOrBase64, callback) {
      var readyState = expression.readyToPost();
      expression.readyToPost();
      UT.Expression._callAPI('medias.createImage', [urlOrBase64], function(){
        expression.readyToPost(readyState);
        callback.apply(expression, arguments);
      });
    },


    /*
     * Options should be : {x : source X,y : source Y, w : source width, h  : source height, width : dest Width, height : dest Height}
     */
    reCrop : function(imageOrURLOrBase64, options, callback) {
      if (imageOrURLOrBase64._type && imageOrURLOrBase64._type === 'image') {
        if (imageOrURLOrBase64._original) {
          UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64._original, crop : options, info : imageOrURLOrBase64.info}], callback);
        }
        else {
          UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64.url, crop : options, info : imageOrURLOrBase64.info}], callback);
        }
      }
      else {
        UT.Expression._callAPI('medias.reCrop', [{url : imageOrURLOrBase64, crop : options}], callback);
      }
    },

    crop : function(imageOrURLOrBase64, options , callback){

      var pictureID = 0;
      var center = null;
    var info = null;
      var original = null;
      if (imageOrURLOrBase64.pictureID) {
        pictureID = imageOrURLOrBase64.pictureID;
      }
      if (imageOrURLOrBase64._center) {
        center = imageOrURLOrBase64._center;
      }
      if (imageOrURLOrBase64.info) {
        info = imageOrURLOrBase64.info;
      }
      if (imageOrURLOrBase64._original) {
        imageOrURLOrBase64 = imageOrURLOrBase64._original;
        original = imageOrURLOrBase64._original;
      }
      else if (imageOrURLOrBase64.url) {
        if (imageOrURLOrBase64.url.indexOf('http://proxy') !== 0) {
          imageOrURLOrBase64 = expression.url.proxify(imageOrURLOrBase64.url);
        }
        else {
          imageOrURLOrBase64 = imageOrURLOrBase64.url;
        }
      }
      if (imageOrURLOrBase64.indexOf('http://proxy') !== 0) {
        imageOrURLOrBase64 = expression.url.proxify(imageOrURLOrBase64);
      }
      UT.Expression._callAPI('medias.crop', [{
          pictureID : pictureID,
          url : imageOrURLOrBase64,
          size : options,
          center : center,
          info : info,
      original : original
        }],
        function(imageDescriptor) {
            callback.call(this, imageDescriptor);
      });
    },

    applyFilterToImage : function(urlOrBase64, options, callback) {
      var crop =  null;
      var info = null;
      if (urlOrBase64._center) {
        crop = urlOrBase64._center;
        // a bug prevent x and y properties to be send by postmessage ???
        crop.xb = crop.x;
        crop.yb = crop.y;
      }
      if (urlOrBase64.info) {
        info = urlOrBase64.info;
      }
      if (urlOrBase64._type && urlOrBase64._type === 'image') {
        if (urlOrBase64._original) {
          UT.Expression._callAPI('medias.applyFilter', [{original : urlOrBase64._original, url : urlOrBase64._original, filter :  options, crop : crop, info : info}], callback);
        }
        else {
          UT.Expression._callAPI('medias.applyFilter', [{url : urlOrBase64.url, filter :  options, crop : crop, info : info}], callback);
        }
      }
      else {
        UT.Expression._callAPI('medias.applyFilter', [{url : urlOrBase64, filter :  options, info : info}], callback);
      }
    },

    // XXX: USE EXPRESSION.ITEMS.SAVE 
    /**
    * saveImage
    * WIP an helper function that combine medias.createImage() and items.save();
    * @param key the key associate with the image (to retrieve it latter with save)
    * @param urlOrBase64 URL or dataURL of the image to save
    * @param callback Callback called when function execution is over (success or failed)
    */
    saveImage: function(key, urlOrBase64, callback) {
       UT.Expression._callAPI(
          'medias.createImage',
           [urlOrBase64], 
           function (obj, error) {
            postMessageAPI.apply('items.save', [key, obj], function(data, error){
              if(error){
                // XXX have to define an error format.
                if(!callback && window.console && console.error){
                  console.error('Unable to save object with key: ' + key, error.message);
                } else if(callback){
                  callback.call(error, null, error);
                }
                return;
              }
              obj._id = data._id;
             // TODO : cahcke the item when saved success
             //  cacheItem(key, obj);
              if(callback){
                callback.call(obj, obj, null);
              }
            });
        });
    },

    imageWithDataUrl: function(image, callback){
      UT.Expression._callAPI('medias.imageWithDataUrl', [image], callback);
    },

    soundDialog: function(options, callback) {
     if (console && console.warn) {
        console.warn('Usage of soundDialog Deprecated, use expression.dialog instead');
      }
      UT.Expression._callAPI('medias.openSoundChooser', [options], callback);
    },

    videoDialog: function(options, callback) {
      if (console && console.warn) {
        console.warn('Usage of videoDialog Deprecated, use expression.dialog instead');
      }
      UT.Expression._callAPI('medias.openVideoChooser', [options], callback);
    },

    findImage: function(mediaId, callback) {
      UT.Expression._callAPI('medias.findImage', [mediaId], callback);
    }
  };
});