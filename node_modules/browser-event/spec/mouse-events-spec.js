var expect = chai.expect;

describe("trigger MouseEvents", function() {
  var button;

  // before/after

  beforeEach(function() {
    button = document.createElement('button');
    document.body.appendChild(button);
  });

  afterEach(function() {
    document.body.removeChild(button);
  });

  // Helpers

  function itBubbles(type, yes) {
    it((yes ? 'bubbles' : 'does not bubble'), function(done) {
      button.addEventListener(type, function(event) {
        expect(event.bubbles).to.eql(yes);
        done();
      }, false);
      trigger(button, type);
    });
  }
  function itCanBeCanceled(type, yes) {
    it((yes ? 'generate cancelable event' : 'generate non-cancelable event'), function(done) {
      button.addEventListener(type, function(event) {
        expect(event.cancelable).to.eql(yes);
        done();
      }, false);
      trigger(button, type);
    });
  }

  // Specs

  describe("click", function() {
    it('initiates a click with the default value', function(done) {
      button.addEventListener('click', function(event) {
        expect(event.type).to.eql('click');
        expect(event.bubbles).to.eql(true);
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'click');
    });

    it('initiates click with custom options', function(done) {
      button.addEventListener('click', function(event) {
        expect(event.bubbles).to.eql(false);
        expect(event.cancelable).to.eql(false);
        expect(event.screenX).to.eql(1);
        expect(event.screenY).to.eql(2);
        expect(event.clientX).to.eql(3);
        expect(event.clientY).to.eql(4);
        expect(event.ctrlKey).to.eql(true);
        done();
      }, false);
      trigger(button, 'click', {
        bubbles: false,
        cancelable: false,
        ctrlKey: true,
        screenX: 1,
        screenY: 2,
        clientX: 3,
        clientY: 4
      });
    });
  });

  describe("mouseover", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
  });

  describe("mouseout", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
  });

  describe("mousedown", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
  });

  describe("mouseup", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
  });

  describe("mousemove", function() {
    itCanBeCanceled(this.title, false);
    itBubbles(this.title, true);
  });

  describe("contextmenu", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
  });

  describe("mouseenter", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, false);
  });

  describe("mouseleave", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, false);
  });

  describe("show", function() {
    itCanBeCanceled(this.title, false);
    itBubbles(this.title, false);
  });

  describe("dblclick", function() {
    itCanBeCanceled(this.title, true);
    itBubbles(this.title, true);
    it('count two clicks', function(done) {
      button.addEventListener('dblclick', function(event) {
        expect(event.cancelable).to.eql(true);
        done();
      }, false);
      trigger(button, 'dblclick');
    });
  });
});