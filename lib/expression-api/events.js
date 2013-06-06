; (function(UT){
  /**
   * This event is sent by the on('resize') producers.
   */
  UT.ResizeEvent = function(width, height){
    this.height = height;
    this.width = width;
  };

  UT.ScrollEvent = function(scrollTop, scrollBottom){
    this.scrollTop = scrollTop;
    this.scrollBottom = scrollBottom;
  };
})(UT);