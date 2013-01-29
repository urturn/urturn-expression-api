UT.Expression.extendExpression('container', function(expression){

  var module = {};

  // Tell the iframe to resize to the whole content size.
  module.autoResize = function() {
    var height = expression.getElement().scrollHeight;
    UT.Expression._callAPI('container.resizeHeight', [height]);
  };
 // autoResize only work on certain condition. Often it is much more easier to set the height needed
 // callback is called when container has been resized
  module.resizeHeight = function(height, callback) {
    UT.Expression._callAPI('container.resizeHeight', [height], callback);
  };

  module.setTitle = function(title){
    UT.Expression._callAPI('container.setTitle', [title]);
  };

  // XXX Unused
  popupUsers = function(userIds) {
    UT.Expression._callAPI('container.popupUsers', [uerIds]);
  };

  // XXX Unused
  popup = function(data, ratio) {
    UT.Expression._callAPI('container.popup', [data, ratio]);
  };
  // XXX Unused
  closePopup = function() {
    UT.Expression._callAPI('container.closePopup');
  };



  return module;
});
