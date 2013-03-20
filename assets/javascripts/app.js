(function( $ ){

  var currentBookmark ;
  var currentToc ;
  var selectors = {
    content: '#content',
    toc: '#mainmenu',
    sidebar: '#sidebar'
  } ;

  // New Cache Manifest
  if( window.applicationCache ) {
    window.applicationCache.addEventListener('updateready', function() {
      console.log( 'New version found') ;
      window.location.reload() ;
    }, false);
  }

  window.addEventListener( 'load', initialize, false ) ;

  function initialize(){
    // Handle the case of using the filesystem to serve page
    if(window.location.protocol.indexOf('file') > -1){
      $(selectors.content).html('<div class="alert alert-error"><strong>Ouch!</strong> You must serve those files through a http server.<br/>The simpliest way is to run <code>./serve</code> from this project root dir,</br>then visits <a href="http://localhost:3003">http://localhost:3003</a></div>') ;
      return ;
    }

    bindEvents();
    openToInitialBookmark();
  }

  function bindEvents() {
    $('a[data-bookmark]').live('click', function(e) {
      openBookmark( $(e.target).data('bookmark') ) ;
      e.preventDefault() ;
    } ) ;

    if( window.history ) {
      window.addEventListener('popstate', function( event ) {
        if( event.state && event.state.bookmark ) {
          openBookmark( event.state.bookmark, null, true ) ;
        }
      }) ;
    }
  }

  function openToInitialBookmark() {
    if( window.history && history.state ) {
      if ( history.state.bookmark ) {
        openBookmark( history.state.bookmark ) ;
      }
    } else if (window.location &&  window.location.url && window.location.url.indexOf('#!') != -1) {
      openBookmark( window.location.split('#!')[1] ) ;
    } else {
      openBookmark( 'home' ) ;
    }
  }

  // Open a bookmark
  function openBookmark(bookmark, callback, noPushState) {
    console.log ('trying to open ' + bookmark);
    if( !bookmark ) { console.log( 'no bookmark provided' ) ; return ; }
    $.when( $.ajax( 'doc/' + bookmark + '.html?' + cacheBuster() )).done( function( data ){
      $('#content').html( data ) ;

      // Update history state
      if( window.history && window.history.pushState && ! noPushState ) {
        var h1 = $(selectors.content + ' h1').first() ;
        var title = ( h1 ? h1.html() : 'Untitled' );
        history.pushState( { bookmark: bookmark } , title, "#!" + bookmark ) ;
      }

      // improve code samples
      prettyPrint( ) ;

      var toc = bookmark.split('/')[0] ;
      openToc(toc, function(){
        // mark link as active
        $('li a[data-bookmark="'+ currentBookmark +'"]').parent().removeClass('active') ;
        $('li a[data-bookmark="'+ bookmark +'"]').parent().addClass('active') ;
        $('li a[data-bookmark="'+ toc +'"]').parent().addClass('active') ;
        currentBookmark = bookmark ;
        if( callback ){ callback() ; }
      } ) ;
    } ).fail( xhrFail ) ;
  }

  function openToc( toc, callback ){
    if(currentToc == toc) { 
      if(callback) { callback() ; }
      return ; 
    }

    $(selectors.toc).html('') ;

    function renderToc( data, level ) {
      level = level || 0 ;
      if( ! data ){
        $(selectors.sidebar).hide() ;
        $(selectors.content).removeClass('span9') ;
        return ;
      }
      $(selectors.sidebar).show() ;
      $(selectors.content).addClass('span9') ;

      console.log($(selectors.sidebar));
      var htmlString = "";
      for( var i = 0; i < data.length ; i++ ) {
        var entry = data[i] ;
        htmlString += '<li' ;
        if(level===0){ htmlString += ' class="nav-header"';}
        htmlString += '>';

        if(entry.bookmark){ htmlString += '<a href="#" data-bookmark="'+ entry.bookmark + '">'; }
        htmlString += entry.title ;
        if(entry.bookmark){ htmlString += '</a>'; }
        htmlString += '</li>' ;

        if( entry.children ){
          if(level % 2 == 1){
            htmlString += '<ul class="nav nav-list">';
          }
          htmlString += renderToc( entry.children, level + 1 ) ;
          if(level % 2 == 1){
            htmlString += '</ul>' ;
          }
        }
      }
      return htmlString ;
    }

    $.when( $.ajax({
      url: 'doc/'+ toc + '_toc.json?' + cacheBuster(),
      dataType: 'json'
    }) ).done( function(data){
      $(selectors.toc).html( renderToc( data ) ) ;
      $('li a[data-bookmark="'+ currentToc +'"]').parent().removeClass('active') ;
      currentToc = toc ;

      if( callback ) { callback(); }
    }).fail( xhrFail );
  }

  function xhrFail( xhr ) {
    console.error( 'Failed to load ', xhr ) ;
  }

  function cacheBuster(){
    return new Date().getTime();
  }
})( jQuery) ;