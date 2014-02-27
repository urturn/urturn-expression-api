/*global UT: true, jQuery: true */

;(function(UT, $) {
  "use strict";

  UT.Expression.ready(function(post) {
    $("#demo")
    .utText({
      placeholder: "What's on your mind ?"
    });

    $("#demo2")
      .utImage({
        post: post
      })
      .utText({
        placeholder: "What's on your mind ?",
      });

    $("#demo4")
      .utText({
        maxFontSize: 50,
        minFontSize: 10,
        fixedSize: true
      });

    $("#demo5")
      .utText({
        chars: 140
      });

    post.valid(true);
    post.size({'height':"800px"});
  });
}(UT, jQuery));