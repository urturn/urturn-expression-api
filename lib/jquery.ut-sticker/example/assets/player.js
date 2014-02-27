;(function(UT, $, document) {
  "use strict";
  $(document).ready(function() {
    $('.sticker').utSticker();
    // Resize the post.
    UT.Expression.ready(function(post) {
      $('pre > code[data-language="javascript"]', post.node).each(function(){
        eval($(this).text());
      });

      $(".sticker-recreate").on("click", function(){
        $("#sticker-6").utSticker("remove");
        $('<img id="sticker-6" src="assets/pix6.png" style="width:50px;height:50px;"/>').appendTo("#last_sticker_panel");
        $(".sticker-update").trigger("click");
      });

      $(".sticker-update").on("click", function() {
        var txt = $(".stylesList").val();
        txt = txt.replace(/(\/\/[^\n]*\n+\s*|\n\s*)/g, "");
        txt = txt.replace(/\s*[:]\s*/g, ":");
        txt = txt.replace(/\s*[,]\s*/g, ",");
        txt = txt.replace(/\s*[{]\s*/g, "{");
        txt = txt.replace(/\s*[}]\s*/g, "}");
        txt = txt.replace(/{([^:]+)/g, "{\"$1\"");
        txt = txt.replace(/,([^:]+)/g, ",\"$1\"");
        var json = {};
        try {
          json = JSON.parse(txt);
        } catch(e) {
          alert(e.message);
          json = {};
          console.error("Error parsing parameters");
        }
        $("#sticker-6").utSticker(json);
      });
      $("#sticker-6").utSticker();
      $("#sticker-6").on("utSticker:ready", function(){ console.log("utSticker:ready"); });
      $("#sticker-6").on("utSticker:change", function(){ console.log("utSticker:change"); });
      $("#sticker-6").on("utSticker:rotate", function(){ console.log("utSticker:rotate"); });
      $("#sticker-6").on("utSticker:resize", function(){ console.log("utSticker:resize"); });
      $("#sticker-6").on("utSticker:move", function(){ console.log("utSticker:move"); });
      $("#sticker-6").on("utSticker:buttonClick", function(e, id){ console.log("utSticker:buttonClick", id); });

      post.size($('.expression-content').height());
    });
  });
}(UT, jQuery, document));