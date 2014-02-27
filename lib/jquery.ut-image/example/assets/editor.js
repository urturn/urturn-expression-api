;(function(UT, $, document) {
  "use strict";
  $(document).ready(function() {
    $('.sticker').utSticker();
    // Resize the post.
    UT.Expression.ready(function(post) {
      $('pre > code[data-language="javascript"]', post.node).each(function(){
        eval($(this).text());
      });

      $("body").on("utImage:resize", ".ut-image", function(e, data){
        $(e.target).parent().height(data.height);
      });

      post.size($('.expression-content').outerHeight());
    });
  });
}(UT, jQuery, document));