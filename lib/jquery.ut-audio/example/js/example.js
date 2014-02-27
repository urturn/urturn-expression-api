UT.Expression.ready(function(post) {
  "use strict";
  /* global Rainbow:true */

  post.valid(true);

  jQuery('.demo').map(function(i,v) {
    var demo = jQuery(v);
    var code = $('<div>',{'class':'code'}).prependTo(demo);
    var jsNode = demo.find('script');
    var cssNode = demo.find('style');

    console.log(cssNode);
    if(jsNode.length){
      jQuery('<pre>',{"data-language":"javascript"}).text(jsNode.text()).appendTo(code);
    }
    if(cssNode.length){
      jQuery('<pre>',{"data-language":"css"}).text(cssNode.text()).appendTo(code);
    }
  });
  Rainbow.color();

  var list = jQuery('<ul>').appendTo('header');
  jQuery('section[data-title]').map(function(i,v) {
    var title = jQuery(v).data('title');
    var id = 'section-' + Math.ceil(Math.random()*10000) + new Date().getTime();
    jQuery(v).attr('data-id', id);
    var item = jQuery('<li>').appendTo(list);
    var radio = jQuery('<input>', {type:'radio', name:'menu', id:id}).appendTo(item);
    jQuery('<label>', {'for':id}).html(title).appendTo(item);
    radio.on('change', function() {
      var $tmp = jQuery('section');
      $tmp.removeClass('active');
      var id = radio.filter(':checked').prop('id');
      var currentSection = $tmp.filter('[data-id="'+id+'"]').addClass('active');
      post.storage.title = currentSection.data('title');
      post.save();
      post.size(currentSection.outerHeight() + jQuery('header').outerHeight());
    });
  });

  var init = function(){
    var initTitle = post.storage.title;
    var initId = jQuery('section').filter('[data-title="'+initTitle+'"]').data('id') || jQuery('section:first-child').data('id');
    check(initId);
  };

  var check = function(id){
    jQuery('#'+id).prop('checked', true).trigger('change');
  };

  init();
});