
(function(UT, undefined){
  "use strict";

  describe('UT.Image', function() {
    var imageURL = 'fixtures/urturn-badge.png';
    var rasterizedImageURL = 'fixtures/urturn-badge-rasterized.png';
    var imageDataURIB64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEJGlDQ1BJQ0MgUHJvZmlsZQAAOBGFVd9v21QUPolvUqQWPyBYR4eKxa9VU1u5GxqtxgZJk6XtShal6dgqJOQ6N4mpGwfb6baqT3uBNwb8AUDZAw9IPCENBmJ72fbAtElThyqqSUh76MQPISbtBVXhu3ZiJ1PEXPX6yznfOec7517bRD1fabWaGVWIlquunc8klZOnFpSeTYrSs9RLA9Sr6U4tkcvNEi7BFffO6+EdigjL7ZHu/k72I796i9zRiSJPwG4VHX0Z+AxRzNRrtksUvwf7+Gm3BtzzHPDTNgQCqwKXfZwSeNHHJz1OIT8JjtAq6xWtCLwGPLzYZi+3YV8DGMiT4VVuG7oiZpGzrZJhcs/hL49xtzH/Dy6bdfTsXYNY+5yluWO4D4neK/ZUvok/17X0HPBLsF+vuUlhfwX4j/rSfAJ4H1H0qZJ9dN7nR19frRTeBt4Fe9FwpwtN+2p1MXscGLHR9SXrmMgjONd1ZxKzpBeA71b4tNhj6JGoyFNp4GHgwUp9qplfmnFW5oTdy7NamcwCI49kv6fN5IAHgD+0rbyoBc3SOjczohbyS1drbq6pQdqumllRC/0ymTtej8gpbbuVwpQfyw66dqEZyxZKxtHpJn+tZnpnEdrYBbueF9qQn93S7HQGGHnYP7w6L+YGHNtd1FJitqPAR+hERCNOFi1i1alKO6RQnjKUxL1GNjwlMsiEhcPLYTEiT9ISbN15OY/jx4SMshe9LaJRpTvHr3C/ybFYP1PZAfwfYrPsMBtnE6SwN9ib7AhLwTrBDgUKcm06FSrTfSj187xPdVQWOk5Q8vxAfSiIUc7Z7xr6zY/+hpqwSyv0I0/QMTRb7RMgBxNodTfSPqdraz/sDjzKBrv4zu2+a2t0/HHzjd2Lbcc2sG7GtsL42K+xLfxtUgI7YHqKlqHK8HbCCXgjHT1cAdMlDetv4FnQ2lLasaOl6vmB0CMmwT/IPszSueHQqv6i/qluqF+oF9TfO2qEGTumJH0qfSv9KH0nfS/9TIp0Wboi/SRdlb6RLgU5u++9nyXYe69fYRPdil1o1WufNSdTTsp75BfllPy8/LI8G7AUuV8ek6fkvfDsCfbNDP0dvRh0CrNqTbV7LfEEGDQPJQadBtfGVMWEq3QWWdufk6ZSNsjG2PQjp3ZcnOWWing6noonSInvi0/Ex+IzAreevPhe+CawpgP1/pMTMDo64G0sTCXIM+KdOnFWRfQKdJvQzV1+Bt8OokmrdtY2yhVX2a+qrykJfMq4Ml3VR4cVzTQVz+UoNne4vcKLoyS+gyKO6EHe+75Fdt0Mbe5bRIf/wjvrVmhbqBN97RD1vxrahvBOfOYzoosH9bq94uejSOQGkVM6sN/7HelL4t10t9F4gPdVzydEOx83Gv+uNxo7XyL/FtFl8z9ZAHF4bBsrEwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAmtpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBJbWFnZVJlYWR5PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CuH1si4AAAggSURBVFgJjVdrjFXVFf72OffcO3feMwylgpLQFGJEKoE+kaaQRpvGBwakaRONLbQGTEPaRBOssUIL/WNsG/60ErRSbauMEYgJaFALbakaedhYamtpeQwzDg+Zl9w79545Z/f79rkb70yd1j3Zs9dae+21vrX22vvsC2st/lf/PZA7BEQTdZ5GfiU4J7noDUBjvY7WaG297MNoI+FHaXcY0/p1FLanCLelSD45B/h5P+yOMZj3rgLWngIeHkSwqw3p+lMw69bY8smPYvfDARhjuNgwNeku07CWzBkyC+fCPDTEicBNAsUaXeKoVmWfyv4P4NFhmO487Px+VLbcbW280ZjgIdqTXn37LwD0LZlLi5ltCi8dz1+cAdM4ylUhkLAHBCSAlkCcQSo7TFqUAGPsuRzpEVh0I5z5iC31kEW9bfFq4wDsNya3xNqx35locSeC9XkuaQW+0kA9evA9A0c+M5H9d0KCIiLDrtHGBDYMvFyBrYwA25bbys7DxkQLmRG/VkCzRnhyLiZFMPNqmJuUUmkqPEbuRg7jHLtUfCB0eyewAqK5acCX27jkz7Cvkd3pnNOXq3wKZBsbuT8S7DbN8/aa4uarYO7RXtN5LMdC6RQ5yug4BBNk0lP36wgkfo88gax4wTQ8vNc0Xi9fziflLgPXZGP1LOziG4AfaL+VUk5GMjSx1dLtxKJ9FiTwc5IJCMdIae2AuW4WcN0BJMSEg95njtlQHSjbrOqkMMCRe67Io5oBTV02LNo79KNkvkmm5oGJVxAszCpt5yNNsq2kT/l2RbjamJYVKOzugl1aZF1SySg13ph35HkrczTreRn0kYv2+p5WyFqhKCvsA7Bv/QvhV9fYUq+CxONLUB7kNrVzKdEmPnIZqjdmWZ6WEqOE1mbk2DtnZTku4z+gZUM2GVjSwvF92OlrW8ra6ay2NuxHYyvSd4WUAHTc2HhFa4nr4nkoIYgR5efJN3Jkvty8nEm3mTwPLmlzmc7geBAam2B6fzpS5E5nAUZ7UDg6C5jLFCUFYsjRtGEJWmR3nAGlTF5misX57bsRb9uaoZcVVQ1G3bx0FIDXNZhCmrcALSpAboEus7AXON+NyjUBCzB+G+gbdS4zRJkJOi98nEs+xh5ycTvCRV9CePNtaF69CrlV36HhDtimK2rzXLXgc4huutU5Cj79BYRLbyStQyiAGaRaQeIE0r6t01B2x3Aq0j0GwQ3Z3lOxoQPJaD8aN90HOxajdP96dL32CqqlEsqHjyAo5BEtuwV2SieKn5qHoTvvQOfOXTBXzsDIwVfRsuouBNN48mmq/MJnUd28iVVNfmyAYRorp6yifbbfXgq2mMZFn0D4M8pUqdn257Ih6GgnmIYMez6PodX3ILlvM+LhEQwuuxXhwACCri5X4aa9HcPPPofy99YhnNKFod88jfd/8SgKX1zsMmLGUjp3mHLcBjsb5t6nTGFFsA/lS2/CXNQxqSlkdyj5NI6Ra21FfvFShFGE8MTfEVw5BSHrp/iZ61lzzQgaCq78orY2BH3vOjodLcP09yNMuevqrvnRxWOOwlb3IR0Knrf2LxaVB7P0CywP08ioTgNKv30GZtYsNP34hyidPEVJO9Izx1E6fBRtv9wC3iSo9vah7cABlEeGkZy/4IKo9JxBWiojZaZEKzB9YWqFmeTJUfbIdhu/pLncPhSOzADm8e5PWC5hyKTqGFkM8lhw76Z3wp54m9G1UX3IpdzOW4jgrcPOqL12Aexfj/Dc6HLKc54ZyJy49IcsQh3q2mXkTsE54OyLqMxVoGYmb6UigjmdZMQHLn4Z6UCQXEAweIGSVprQsWxgoVD73EnON5HOke7h/2a3WLsc8E/3g46yaB1qRS8AajyC5iDSY4eQbr/8HnjWFJ6/FuZm7kHCKmUWqMVllhFltalPikzIlGYl18WqzctRd4wzKjSlWnXu91zzieNoQbds+E+kb9wyPV5ie21Js/ocNzOWBUo8Xbh3k9xk125MqRx5/LqEZdx/MyX38wKs5Hug4hLKMjikDN+QvNaC+b/uK3ZR7ODjGFfsRbLnj8BF3oa5+lilJAP/r02m453LJvMTHGXl74Hd/SeU3TWbbUH2IEmfMMVvLgR+xQhj7mKkRCpFisk3T3uH4j3tdepH5aoWUJVfi/wx2Af5NNskHX2N3RZszTaVn8ug2EOXLDs9ItzDTQYmc+Cde1B+lHEfOU+W21Z+bfOnWTvDCJo0v5VvQ34GrMuAkIj5mjEz38hj0QPV/PLPw+iHR0yj4zLhnfhRxuoBelpVUKsE97hh6l95IIqfmB/j9eesfcf7VJb1RLM1wWmyp58xhYRIV1ZhIx0+1nXKOle6/KNznFPZUPN1z5GvW71wTcC3ZVRk5PyIv/jvqn1Set65aAdARC0D4Q5rkwP8bVFG/BN+MIrLEa7jGGof6UK/BbhJ7jlSnwRNuh95cupc8OeDDt8fkG77W5Ccm5ri1duptJFPf/rKzJG/fA/Iglo9OvFPmoYzLNcrCOLSHNgWOReIMaQJrxqXEWbKhgh4OejmSOxJmNEe0m387bIflenbrL0oWxNtSyZb45oyIc1uY3TbYAeSu9YUKnMOIVk3QvXXYQff5KsqosOzXH+KEYs+jrSyH/ZsCaF5B8nm7xZHZ3cjue0x3d3cvY3szvY4b2Tkb7LOaZchzd/Il9Qa5DbwArz6WwiXPYaCvRe5TXci+v7jpO9HtJY39Azq/OgbfF9OZnOifFLnXpFHIVzCWvG8HwWknq4HK7nWaK3XmWz8D+e5+3X8I/mgAAAAAElFTkSuQmCC';
    var imageSVG = '<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve" preserveAspectRatio="none" style="width: 500px; height: 500px; left: 0px; top: 0px;"><defs><filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feColorMatrix id="saturation-0" result="flt1" values="1.03457 -0.03047000000000003 -0.004100000000000004 0 0 -0.015430000000000013 1.01953 -0.004100000000000004 0 0 -0.015430000000000013 -0.03047000000000003 1.0459 0 0 0 0 0 1 0"></feColorMatrix><feComponentTransfer in="flt1" result="flt2"><feFuncR type="gamma" id="redChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.35"></feFuncR><feFuncG type="gamma" id="greenChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.25"></feFuncG><feFuncB type="gamma" id="blueChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.28"></feFuncB></feComponentTransfer></filter></defs><image filter="url(#blackAndWhite)" class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="500px" height="500px" xlink:href="fixtures/urturn-badge.png"></image><g><radialGradient id="MyGradient"><stop offset="10%" stop-color="#000000" stop-opacity="0"></stop><stop offset="100%" stop-color="#000000" stop-opacity="0.79" id="vignette"></stop></radialGradient><ellipse fill="url(#MyGradient)" cx="50%" cy="50%" rx="100%" ry="100%"></ellipse></g></svg>';
    var templateSVG = '<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve" preserveAspectRatio="none" style="width: 500px; height: 500px; left: 0px; top: 0px;"><defs><filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feColorMatrix id="saturation-0" result="flt1" values="1.03457 -0.03047000000000003 -0.004100000000000004 0 0 -0.015430000000000013 1.01953 -0.004100000000000004 0 0 -0.015430000000000013 -0.03047000000000003 1.0459 0 0 0 0 0 1 0"></feColorMatrix><feComponentTransfer in="flt1" result="flt2"><feFuncR type="gamma" id="redChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.35"></feFuncR><feFuncG type="gamma" id="greenChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.25"></feFuncG><feFuncB type="gamma" id="blueChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.28"></feFuncB></feComponentTransfer></filter></defs><image filter="url(#blackAndWhite)" class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="500px" height="500px"></image><g><radialGradient id="MyGradient"><stop offset="10%" stop-color="#000000" stop-opacity="0"></stop><stop offset="100%" stop-color="#000000" stop-opacity="0.79" id="vignette"></stop></radialGradient><ellipse fill="url(#MyGradient)" cx="50%" cy="50%" rx="100%" ry="100%"></ellipse></g></svg>';
    var imageDataURISVG = 'data:image/svg+xml;utf8,<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve" preserveAspectRatio="none" style="width: 500px; height: 500px; left: 0px; top: 0px;"><defs><filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feColorMatrix id="saturation-0" result="flt1" values="1.03457 -0.03047000000000003 -0.004100000000000004 0 0 -0.015430000000000013 1.01953 -0.004100000000000004 0 0 -0.015430000000000013 -0.03047000000000003 1.0459 0 0 0 0 0 1 0"></feColorMatrix><feComponentTransfer in="flt1" result="flt2"><feFuncR type="gamma" id="redChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.35"></feFuncR><feFuncG type="gamma" id="greenChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.25"></feFuncG><feFuncB type="gamma" id="blueChannel-0" amplitude="1.600000" exponent="1.300000" offset="0.28"></feFuncB></feComponentTransfer></filter></defs><image filter="url(#blackAndWhite)" class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="500px" height="500px" xlink:href="fixtures/urturn-badge.png"></image><g><radialGradient id="MyGradient"><stop offset="10%" stop-color="#000000" stop-opacity="0"></stop><stop offset="100%" stop-color="#000000" stop-opacity="0.79" id="vignette"></stop></radialGradient><ellipse fill="url(#MyGradient)" cx="50%" cy="50%" rx="100%" ry="100%"></ellipse></g></svg>';

    var html = function(source){
      var c = document.createElement('div');
      c.innerHTML = source;
      return c.children[0];
    };

    // expected options:
    // - width
    // - height
    // - url
    var expectedSVG = function(svg, expected) {
      expect(svg).ok();
      expect(svg.getAttribute('xmlns')).to.equal('http://www.w3.org/2000/svg');
      expect(svg.getAttribute('xmlns:xlink')).to.equal('http://www.w3.org/1999/xlink');

      var width = svg.getAttribute('width');
      var height = svg.getAttribute('height');
      expect(width).to.equal(''+expected.width);
      expect(height).to.equal(''+expected.height);

      var img = svg.querySelector('image');
      expect(img).ok();
      expect(img.getAttribute('width')).to.equal(width);
      expect(img.getAttribute('height')).to.equal(height);
      expect(img.getAttribute('xlink:href')).to.equal(expected.url);
    };

    describe('Constructors', function() {
      it('instantiate an image using an URL', function() {
        var image = new UT.Image(imageURL);
        expect(image.url).to.equal(imageURL);
      });

      it('instantiate an image using a descriptor with an URL', function() {
        var image = new UT.Image({
          url: imageURL
        });
        expect(image.url).to.be(image.url);
      });

      it('instantiate an image using data URL and png in base64', function() {
        var image = new UT.Image(imageDataURIB64);
        expect(image.url).to.equal(imageDataURIB64);
      });

      it('instantiate an image using data URL and svg', function() {
        var image = new UT.Image(imageDataURISVG);
        expect(image.url).to.equal(imageDataURISVG);
      });

      it('instantiate an image using raw SVG', function() {
        var image = new UT.Image({svg: imageSVG});
        expect(image.url).to.equal(imageDataURISVG);
      });
    });

    describe('SVG templates', function() {
      beforeEach(function() {
        this.image = new UT.Image(imageURL);
        this.template = html(templateSVG);
      });

      it('can be added as a text to an image', function(done) {
        this.image
          .svg(templateSVG, 'image[xlink:href]')
          .svg(function(svg) {
            expect(svg.getAttribute('class')).to.be('ut-image-view');
            expect(svg.querySelector('image').getAttribute('xlink:href')).to.be(imageURL);
            done();
          });
      });

      it('can be added as a svg element to an image', function(done) {
        var template = html(templateSVG);
        this.image
          .svg(template, 'image[xlink:href]')
          .svg(function(svg) {
            expect(svg.getAttribute('class')).to.be('ut-image-view');
            expect(svg.querySelector('image').getAttribute('xlink:href')).to.be(imageURL);
            done();
          });
      });

      it('marshalled with the image', function() {
        var data = this.image
          .svg(templateSVG)
          .marshall();
        expect(data.svgTemplate).to.be(templateSVG);
        expect(data.svgCssSelector).to.be(data.svgCssSelector);
      });

      it('not marshalled in standard image after its NOT svg rendering', function(done) {
        this.image.svg(function(){
          expect(this.marshall().svgTemplate).to.be(undefined);
          done();
        });
      });

      it('unmarshalled from the image data', function() {
        var descriptor = {
          url: imageURL,
          svgTemplate: templateSVG,
          svgCssSelector: templateSVG,
          _type: 'image',
          _key: 'test'
        };
        this.image = new UT.Image(descriptor);
        expect(this.image.svgTemplate).to.be(templateSVG);
        expect(this.image.marshall(this.image)).to.eql(descriptor);
      });

      it('update the template at creation if its an SVGElement', function() {
        this.image = new UT.Image({
          url: imageURL,
          svgTemplate: this.template
        });
        expect(this.template.querySelector('image').getAttribute('xlink:href')).to.be(imageURL);
      });

      it('update the template if its an SVGElement', function(){
        this.image.svg(this.template);
        expect(this.template.querySelector('image').getAttribute('xlink:href')).to.be(imageURL);
      });

      it('marshall updated version of the svg tag', function() {
        this.image.svg(this.template);
        var actual = this.image.marshall().svgTemplate;
        expect(actual.match(/xlink:href/)).to.be(null);
        expect(this.template.querySelector('image').getAttribute('xlink:href')).to.be.ok();
      });

      it('cannot retrieve it as an image node', function(done) {
        this.image.svg(templateSVG, 'image[xlink:href]').node(function(elt, err) {
          expect(elt).to.be(null);
          expect(err.message).to.be('No Raster Image');
          done();
        });
      });
    });

    describe('rasterized version', function() {
      this.timeout(200);
      beforeEach(function() {
        this.image = new UT.Image({
          url: imageURL,
          svgTemplate: templateSVG,
          svgCssSelector: 'image[xlink:href]',
          rasterUrl: rasterizedImageURL
        });
      });

      it('has a rasterUrl', function() {
        expect(this.image.rasterUrl).to.be(rasterizedImageURL);
      });

      it('retrieve an img node whose src is the raster URL', function(done) {
        this.image.node('img', function(img) {
          expect(img.getAttribute('src')).to.be(rasterizedImageURL);
          done();
        });
      });

      it('get editable version of rasterized image', function(done) {
        this.image.node('svg', function(svg) {
          expect(svg.nodeName).to.be('svg');
          expect(svg.querySelector('image').getAttribute('xlink:href')).to.be(imageURL);
          done();
        });
      });
    });

    describe('image from URL', function() {
      beforeEach(function() {
        this.image = new UT.Image(imageURL);
      });

      it('cannot retrieve it as a SVG', function(done) {
        this.image.svg(function(svg, err){
          expect(svg).to.be(null);
          expect(err).to.be.ok();
          expect(err.message).to.be('No SVG Template');
          done();
        });
      });

      it('can retrieve it as an image node', function(done) {
        this.image.node(function(img) {
          expect(img.complete).to.be.ok();
          expect(img.width).to.be(400);
          expect(img.height).to.be(404);
          done();
        });
      });
    });

    describe('image from base64', function() {
      beforeEach(function() {
        this.image = new UT.Image(imageDataURIB64);
      });

      it('cannot retrieve it as a SVG', function(done) {
        this.image.svg(function(svg, err){
          expect(svg).to.be(null);
          expect(err).to.be.ok();
          expect(err.message).to.be('No SVG Template');
          done();
        });
      });

      it('can retrieve it as an image node', function(done) {
        this.image.node(function(img) {
          expect(img.complete).to.be.ok();
          expect(img.width).to.be(32);
          expect(img.height).to.be(32);
          done();
        });
      });
    });
  });
})(UT);