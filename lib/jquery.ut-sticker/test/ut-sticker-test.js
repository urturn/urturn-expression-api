(function($){
  "use strict";
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */
  QUnit.config.autostart = false;

  $(document).ready(function(){
    QUnit.start();
  });

  module('utSticker Basics', {
    setup: function(){
      this.setup = true;
      this.createSticker();
    },
    createSticker: function(){
      this.$sticker = $('#sticker');
      this.$container = $('#sticker-container');
      this.$sticker.utSticker();
      this.stickerData = this.$sticker.data('utSticker');
      return this.$sticker;
    },
    // Taken from https://github.com/jkroso/dom-event (sadly the project is not easy to import)
    mouseEvent: function(name, o){
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent(
        name,
        o.bubbles !== false,
        o.cancelable !== false,
        window,
        o.clicks,
        o.screenX || 0,
        o.screenY || 0,
        o.clientX || 0,
        o.clientY || 0,
        o.ctrl === true,
        o.alt === true,
        o.shift === true,
        o.meta === true,
        o.button || 0,
        o.relatedTarget
      );
      return event;
    }
  });

  test("default ut-sticker instance", function(){
    ok(this.$sticker);
    ok(this.$container);
    ok(this.stickerData, "has sticker data.");
    ok(this.stickerData.position());
    deepEqual(this.stickerData.position(), {
        x: 0,
        y: 0,
        w: this.$sticker.width() / this.$container.width(),
        h: this.$sticker.height() / this.$container.height(),
        z: 1,
        a: 0
      });
  });

  test("sticker has an handler", function(){
    var handler = this.stickerData.focus().handler();
    ok(handler);
  });

  test("sticker can be moved around", function(){
    var p0 = this.stickerData.position();
    var mdEvent = this.mouseEvent('mousedown', {clientX: 100, clientY: 200});
    var mmEvent = this.mouseEvent('mousemove', {clientX: 120, clientY: 200});
    var handler = this.stickerData.focus().handler();
    handler.get(0).dispatchEvent(mdEvent);
    document.dispatchEvent(mmEvent);
    var p1 = this.stickerData.position();
    equal(p1.y, p0.y);
    equal((p1.x + 40) / this.$container.width(), p0.x);
  });
})(window.jQuery);