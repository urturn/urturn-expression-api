UT.Expression.ready(function(post) {
  var that = this;

  var testAudios = [
    "https://soundcloud.com/yahoo1/timelift-time-demo",
    {"service":"itunes","url":"http://a608.phobos.apple.com/us/r1000/109/Music/v4/c6/ee/92/c6ee92dc-94e1-de09-01c1-d67b1bea1634/mzaf_8541114276777876134.aac.m4a","title":"South Side","artist":"Moby","cover":"http://a1.mzstatic.com/us/r1000/004/Features/99/48/26/dj.snfubbon.100x100-75.jpg","artistCover":"","soundCover":"http://a1.mzstatic.com/us/r1000/004/Features/99/48/26/dj.snfubbon.100x100-75.jpg","waveFormImage":"","link":"https://itunes.apple.com/us/album/south-side/id281242279?i=281242430&uo=4","appData":{"wrapperType":"track","kind":"song","artistId":789023,"collectionId":281242279,"trackId":281242430,"artistName":"Moby","collectionName":"Play & Play: B Sides","trackName":"South Side","collectionCensoredName":"Play & Play: B Sides","trackCensoredName":"South Side","artistViewUrl":"https://itunes.apple.com/us/artist/moby/id789023?uo=4","collectionViewUrl":"https://itunes.apple.com/us/album/south-side/id281242279?i=281242430&uo=4","trackViewUrl":"https://itunes.apple.com/us/album/south-side/id281242279?i=281242430&uo=4","previewUrl":"http://a608.phobos.apple.com/us/r1000/109/Music/v4/c6/ee/92/c6ee92dc-94e1-de09-01c1-d67b1bea1634/mzaf_8541114276777876134.aac.m4a","artworkUrl30":"http://a3.mzstatic.com/us/r1000/004/Features/99/48/26/dj.snfubbon.30x30-50.jpg","artworkUrl60":"http://a5.mzstatic.com/us/r1000/004/Features/99/48/26/dj.snfubbon.60x60-50.jpg","artworkUrl100":"http://a1.mzstatic.com/us/r1000/004/Features/99/48/26/dj.snfubbon.100x100-75.jpg","collectionPrice":9.99,"trackPrice":0.99,"releaseDate":"2008-06-02T07:00:00Z","collectionExplicitness":"notExplicit","trackExplicitness":"notExplicit","discCount":1,"discNumber":1,"trackCount":29,"trackNumber":5,"trackTimeMillis":229733,"country":"USA","currency":"USD","primaryGenreName":"Electronic"}}
  ];

  // 0 ------------------------------------------
//  jQuery('#player0').utAudio();
//  jQuery('#player01').utAudio({data:testAudios[1]});
//  jQuery('#player02').utAudio({data:"https://itunes.apple.com/gb/album/six-degrees-of-separation/id550978544?i=550978548"});
//  jQuery('#player03').utAudio({data:"https://soundcloud.com/firebee/jellyfish-ask-yourself"});
//  jQuery('#player04').utAudio({data:"https://itunes.apple.com/us/album/into-the-groove/id329043011?i=329043298"});
//  jQuery('#player05').utAudio({data:"https://soundcloud.com/ruslandevice/ruslan-device-id-cut-2013"});
//  jQuery('#player06').utAudio({data:"https://soundcloud.com/dualclick/dualclick-sarduday-original"});
//  jQuery('#player07').utAudio({data:"https://soundcloud.com/andy-reed-6/andy-reed-unplugged"});
//  jQuery('#player08').utAudio({data:"https://soundcloud.com/trance123/a1"});
//  jQuery('#player09').utAudio({data:"https://soundcloud.com/alipa/speechless"});


//  jQuery('#player007').utAudio({data:{url:'I am wrong URL'}});


  jQuery('#player1').utAudio({
    data:"https://soundcloud.com/andy-reed-6/andy-reed-unplugged"
  });

  // 2 ------------------------------------------
  jQuery('#player2').utAudio({
    data:"https://soundcloud.com/andy-reed-6/andy-reed-unplugged",
    editable:false
  });

  jQuery('.myplayer').utAudio({
    id:"myId"
  });

  // 3 ------------------------------------------

  // audio container and action buttons
  var container3 = jQuery('#player3');
  var buttons3 = {
    add:     $('.player3-add-button'),
    edit:    $('.player3-edit-button'),
    destroy: $('.player3-remove-button')
  };

  // create new audio panel
  buttons3.add.on('click',function(){
    post.dialog('sound', function(data){
      container3.utAudio({data:data});
    });
  });

  // // change audio with another one
  // buttons3.edit.on('click',function(){
  //   post.dialog('sound', function(data){
  //     container3.utAudio('change',data);
  //   });
  // });

  // fully desctroy audio
  buttons3.destroy.on('click',function(){
    container3.utAudio('destroy');
  });

  // 4 ------------------------------------------
  var player4 = jQuery('#player4').utAudio();

  player4.on('utAudio:change',function(e,newValue,oldValue){
    console.log('--- utAudio:change -> audio data/parameters was changed. Changed data: new = ',newValue,', old = ',oldValue);
  });

  player4.on('utAudio:ready',function(e){
    console.log('--- utAudio:ready -> audio component ready to accept events');
  });

  player4.on('utAudio:canplay',function(e, data){
    console.log('--- utAudio:canplay -> audio ready to be played', data);
  });

  player4.on('utAudio:play',function(){
    console.log('--- utAudio:play -> audio started to play');
  });

  player4.on('utAudio:pause',function(){
    console.log('--- utAudio:pause -> audio paused');
  });

  player4.on('utAudio:stop',function(){
    console.log('--- utAudio:stop -> audio stopped');
  });

  player4.on('utAudio:finish',function(){
    console.log('--- utAudio:finish -> audio finished');
  });

  player4.on('utAudio:timeupdate',function(e,s){
    console.log('--- utAudio:timeupdate -> audio time updated', s);
  });

  player4.on('utAudio:seek',function(){
    console.log('--- utAudio:seek -> audio seek started');
  });


  // 5 ------------------------------------------

  var player5 =  jQuery('#player5').utAudio({
    data:"https://itunes.apple.com/us/album/into-the-groove/id329043011?i=329043298",
    ui:{
      play:    true,
      progress:true,
      time:    true,
      title:   true,
      source:  true,
      artwork: true
    },
    editable: false
  });

  var buttons5 = {
    play:   $('.player5-play-button'),
    seek:   $('.player5-seek-button'),
    pause:  $('.player5-pause-button'),
    stop:   $('.player5-stop-button'),
    volDn:  $('.player5-volume-down-button'),
    volUp:  $('.player5-volume-up-button'),
    dialog: $('.player5-dialog-button'),
    update: $('.player5-update-button')
  };

  buttons5.play.on('click',function(){
    player5.utAudio('play');
  });

  buttons5.seek.on('click',function(){
    player5.utAudio('play',15);
  });

  buttons5.pause.on('click',function(){
    player5.utAudio('pause');
  });

  buttons5.stop.on('click',function(){
    player5.utAudio('stop');
  });

  buttons5.volDn.on('click',function(){
    player5.utAudio('volume',0.2);
  });

  buttons5.volUp.on('click',function(){
    player5.utAudio('volume',0.8);
  });

  buttons5.dialog.on('click',function(){
    player5.utAudio('dialog');
  });

  buttons5.update.on('click',function(){
    player5.width(player5.width()*0.8);
    player5.utAudio('update');
  });


  // 6 ------------------------------------------


  jQuery('#player6').utAudio({
    data:'https://soundcloud.com/londongrammar/hey-now',
    ui:{
      play:    true,
      progress:true,
      time:    true,
      title:   true,
      source:  true,
      artwork: true
    },
    editable: false
  });

  jQuery('#player7').utAudio({
    data:'https://soundcloud.com/londongrammar/hey-now',
    ui:{
      progress:false,
      time:    false
    },
    editable: false
  });

  jQuery('#player8').utAudio({
    data:'https://soundcloud.com/londongrammar/hey-now',
    ui:{
      play:    true,
      progress:false,
      time:    false,
      title:   false,
      source:  false,
      artwork: true
    },
    editable: false
  });


  //----------------------------------------------------------


  // jQuery("#player9").utAudio({
  //   skin:'carbon'
  // });

  // jQuery("#player10").utAudio({
  //   data:{url:'https://soundcloud.com/londongrammar/hey-now'},
  //   skin:'carbon',
  //   ui:{
  //     play:    true,
  //     title:   true,
  //     source:  false,
  //     preview: true,
  //     loading: true
  //   }
  // });

  post.size({height:$('.container').height()});
  Rainbow.color();
  post.valid(true);
});
