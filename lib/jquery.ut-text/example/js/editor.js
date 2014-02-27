/*global UT: true, jQuery: true */

;(function(UT, $) {
  "use strict";

  UT.Expression.ready(function(post) {
    $("#demo")
    .utText({
      placeholder: "What's on your mind ?",
      tabIndex: 1
    });

    $("#demo2")
      .utImage({
        post: post
      })
      .utText({
        placeholder: "What's on your mind ?",
        tabIndex: 2
      });

    $("#demo4")
      .utText({
        maxFontSize: 50,
        minFontSize: 10,
        fixedSize: true,
        tabIndex: 3
      });

    $("#demo5")
      .utText({
        chars: 140,
        tabIndex: 4
      });

    post.valid(true);
  });
}(UT, jQuery));