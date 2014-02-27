if(false)
UT.Expression.ready(function(post) {
  "use strict";
  /* global Rainbow:true */

  var that = this;
  var testVideos = [
    {"url":"http://www.youtube.com/watch?v=vcMHkvEVgVo&feature=youtube_gdata","type":"video","appData":{"gd$etag":"W/\"Ck8NQH47eCp7I2A9WhBaFkQ.\"","id":{"$t":"tag:youtube.com,2008:video:vcMHkvEVgVo"},"published":{"$t":"2010-09-16T16:47:22.000Z"},"updated":{"$t":"2013-05-27T21:41:31.000Z"},"app$control":{"yt$state":{"$t":"Syndication of this video was restricted.","name":"restricted","reasonCode":"limitedSyndication"}},"category":[{"scheme":"http://schemas.google.com/g/2005#kind","term":"http://gdata.youtube.com/schemas/2007#video"},{"scheme":"http://gdata.youtube.com/schemas/2007/categories.cat","term":"Music","label":"Music"}],"title":{"$t":"Die Antwoord - Enter The Ninja (Clean, No Intro)"},"content":{"type":"application/x-shockwave-flash","src":"http://www.youtube.com/v/vcMHkvEVgVo?version=3&f=videos&d=AeCLPz5ioy6YatJ-w4fDlhkO88HsQjpE1a8d1GxQnGDm&app=youtube_gdata"},"link":[{"rel":"alternate","type":"text/html","href":"http://www.youtube.com/watch?v=vcMHkvEVgVo&feature=youtube_gdata"},{"rel":"http://gdata.youtube.com/schemas/2007#video.responses","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo/responses?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.ratings","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo/ratings?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.complaints","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo/complaints?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.related","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo/related?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#uploader","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/users/27mFz8e4kgh31Zh8k64Qyg?v=2"},{"rel":"self","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo?v=2"}],"author":[{"name":{"$t":"DieAntwoordVEVO's channel"},"uri":{"$t":"http://gdata.youtube.com/feeds/api/users/DieAntwoordVEVO"},"yt$userId":{"$t":"27mFz8e4kgh31Zh8k64Qyg"}}],"yt$accessControl":[{"action":"comment","permission":"allowed"},{"action":"commentVote","permission":"allowed"},{"action":"videoRespond","permission":"allowed"},{"action":"rate","permission":"allowed"},{"action":"embed","permission":"allowed"},{"action":"list","permission":"allowed"},{"action":"autoPlay","permission":"allowed"},{"action":"syndicate","permission":"allowed"}],"gd$comments":{"gd$feedLink":{"rel":"http://gdata.youtube.com/schemas/2007#comments","href":"http://gdata.youtube.com/feeds/api/videos/vcMHkvEVgVo/comments?v=2","countHint":5253}},"media$group":{"media$category":[{"$t":"Music","label":"Music","scheme":"http://gdata.youtube.com/schemas/2007/categories.cat"}],"media$content":[{"url":"http://www.youtube.com/v/vcMHkvEVgVo?version=3&f=videos&d=AeCLPz5ioy6YatJ-w4fDlhkO88HsQjpE1a8d1GxQnGDm&app=youtube_gdata","type":"application/x-shockwave-flash","medium":"video","isDefault":"true","expression":"full","duration":274,"yt$format":5}],"media$credit":[{"$t":"dieantwoordvevo","role":"uploader","scheme":"urn:youtube","yt$display":"DieAntwoordVEVO's channel","yt$type":"partner"}],"media$description":{"$t":"Music video by Die Antwoord performing Enter The Ninja. (C) 2010 Interscope Records.","type":"plain"},"media$keywords":{},"media$license":{"$t":"youtube","type":"text/html","href":"http://www.youtube.com/t/terms"},"media$player":{"url":"http://www.youtube.com/watch?v=vcMHkvEVgVo&feature=youtube_gdata_player"},"media$restriction":[{"$t":"DE ZA","type":"country","relationship":"deny"}],"media$thumbnail":[{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/default.jpg","height":90,"width":120,"time":"00:02:17","yt$name":"default"},{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/mqdefault.jpg","height":180,"width":320,"yt$name":"mqdefault"},{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/hqdefault.jpg","height":360,"width":480,"yt$name":"hqdefault"},{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/1.jpg","height":90,"width":120,"time":"00:01:08.500","yt$name":"start"},{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/2.jpg","height":90,"width":120,"time":"00:02:17","yt$name":"middle"},{"url":"http://i.ytimg.com/vi/vcMHkvEVgVo/3.jpg","height":90,"width":120,"time":"00:03:25.500","yt$name":"end"}],"media$title":{"$t":"Die Antwoord - Enter The Ninja (Clean, No Intro)","type":"plain"},"yt$duration":{"seconds":"274"},"yt$uploaded":{"$t":"2010-09-16T16:47:22.000Z"},"yt$uploaderId":{"$t":"UC27mFz8e4kgh31Zh8k64Qyg"},"yt$videoid":{"$t":"vcMHkvEVgVo"}},"gd$rating":{"average":4.4838266,"max":5,"min":1,"numRaters":16045,"rel":"http://schemas.google.com/g/2005#overall"},"yt$statistics":{"favoriteCount":"0","viewCount":"3863209"},"yt$rating":{"numDislikes":"2070","numLikes":"13975"}}},
    {"url":"http://www.youtube.com/watch?v=w-llZmPPNwU&feature=youtube_gdata","type":"video","appData":{"gd$etag":"W/\"DUcERH47eCp7I2A9WhBaF08.\"","id":{"$t":"tag:youtube.com,2008:video:w-llZmPPNwU"},"published":{"$t":"2012-12-18T20:39:21.000Z"},"updated":{"$t":"2013-05-28T07:43:25.000Z"},"category":[{"scheme":"http://schemas.google.com/g/2005#kind","term":"http://gdata.youtube.com/schemas/2007#video"},{"scheme":"http://gdata.youtube.com/schemas/2007/categories.cat","term":"Entertainment","label":"Entertainment"}],"title":{"$t":"Fruit Ninja in Real Life to Dubstep!"},"content":{"type":"application/x-shockwave-flash","src":"http://www.youtube.com/v/w-llZmPPNwU?version=3&f=videos&d=AeCLPz5ioy6YatJ-w4fDlhkO88HsQjpE1a8d1GxQnGDm&app=youtube_gdata"},"link":[{"rel":"alternate","type":"text/html","href":"http://www.youtube.com/watch?v=w-llZmPPNwU&feature=youtube_gdata"},{"rel":"http://gdata.youtube.com/schemas/2007#video.responses","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU/responses?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.ratings","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU/ratings?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.complaints","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU/complaints?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#video.related","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU/related?v=2"},{"rel":"http://gdata.youtube.com/schemas/2007#mobile","type":"text/html","href":"http://m.youtube.com/details?v=w-llZmPPNwU"},{"rel":"http://gdata.youtube.com/schemas/2007#uploader","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/users/aXDyLT3Xs4p8B0B79GFZCQ?v=2"},{"rel":"self","type":"application/atom+xml","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU?v=2"}],"author":[{"name":{"$t":"scottdw"},"uri":{"$t":"http://gdata.youtube.com/feeds/api/users/scottdw"},"yt$userId":{"$t":"aXDyLT3Xs4p8B0B79GFZCQ"}}],"yt$accessControl":[{"action":"comment","permission":"allowed"},{"action":"commentVote","permission":"allowed"},{"action":"videoRespond","permission":"moderated"},{"action":"rate","permission":"allowed"},{"action":"embed","permission":"allowed"},{"action":"list","permission":"allowed"},{"action":"autoPlay","permission":"allowed"},{"action":"syndicate","permission":"allowed"}],"gd$comments":{"gd$feedLink":{"rel":"http://gdata.youtube.com/schemas/2007#comments","href":"http://gdata.youtube.com/feeds/api/videos/w-llZmPPNwU/comments?v=2","countHint":20494}},"yt$hd":{},"media$group":{"media$category":[{"$t":"Entertainment","label":"Entertainment","scheme":"http://gdata.youtube.com/schemas/2007/categories.cat"}],"media$content":[{"url":"http://www.youtube.com/v/w-llZmPPNwU?version=3&f=videos&d=AeCLPz5ioy6YatJ-w4fDlhkO88HsQjpE1a8d1GxQnGDm&app=youtube_gdata","type":"application/x-shockwave-flash","medium":"video","isDefault":"true","expression":"full","duration":167,"yt$format":5},{"url":"rtsp://v1.cache3.c.youtube.com/CkULENy73wIaPAkFN89jZmXpwxMYDSANFEgGUgZ2aWRlb3NyIQHgiz8-YqMumGrSfsOHw5YZDvPB7EI6RNWvHdRsUJxg5gw=/0/0/0/video.3gp","type":"video/3gpp","medium":"video","expression":"full","duration":167,"yt$format":1},{"url":"rtsp://v1.cache3.c.youtube.com/CkULENy73wIaPAkFN89jZmXpwxMYESARFEgGUgZ2aWRlb3NyIQHgiz8-YqMumGrSfsOHw5YZDvPB7EI6RNWvHdRsUJxg5gw=/0/0/0/video.3gp","type":"video/3gpp","medium":"video","expression":"full","duration":167,"yt$format":6}],"media$credit":[{"$t":"scottdw","role":"uploader","scheme":"urn:youtube","yt$display":"scottdw","yt$type":"partner"}],"media$description":{"$t":"I wrote the song with my friend Brenden. We write lots of music as Scott & Brendo. Download \"The Chosen\" iTunes: http://bit.ly/V9WzkV | Amazon: http://amzn.t...","type":"plain"},"media$keywords":{},"media$license":{"$t":"youtube","type":"text/html","href":"http://www.youtube.com/t/terms"},"media$player":{"url":"http://www.youtube.com/watch?v=w-llZmPPNwU&feature=youtube_gdata_player"},"media$thumbnail":[{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/default.jpg","height":90,"width":120,"time":"00:01:23.500","yt$name":"default"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/mqdefault.jpg","height":180,"width":320,"yt$name":"mqdefault"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/hqdefault.jpg","height":360,"width":480,"yt$name":"hqdefault"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/sddefault.jpg","height":480,"width":640,"yt$name":"sddefault"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/1.jpg","height":90,"width":120,"time":"00:00:41.750","yt$name":"start"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/2.jpg","height":90,"width":120,"time":"00:01:23.500","yt$name":"middle"},{"url":"http://i.ytimg.com/vi/w-llZmPPNwU/3.jpg","height":90,"width":120,"time":"00:02:05.250","yt$name":"end"}],"media$title":{"$t":"Fruit Ninja in Real Life to Dubstep!","type":"plain"},"yt$aspectRatio":{"$t":"widescreen"},"yt$duration":{"seconds":"167"},"yt$uploaded":{"$t":"2012-12-18T20:39:21.000Z"},"yt$uploaderId":{"$t":"UCaXDyLT3Xs4p8B0B79GFZCQ"},"yt$videoid":{"$t":"w-llZmPPNwU"}},"gd$rating":{"average":4.796793,"max":5,"min":1,"numRaters":118672,"rel":"http://schemas.google.com/g/2005#overall"},"yt$statistics":{"favoriteCount":"0","viewCount":"21101541"},"yt$rating":{"numDislikes":"6029","numLikes":"112643"}}},

    {"url":"http://vimeo.com/66797673","type":"video","appData":{"allow_adds":"1","embed_privacy":"anywhere","id":"66797673","is_hd":"1","is_transcoding":"0","license":"by-nc-nd","privacy":"anybody","title":"Urturn movie","description":"Playful and exciting, Urturn is a social media platform that opens up a whole new world of expression. \nWith its ever-growing catalogue of ready-made templates that act as inspiration enhancers, Urturn enables you to turn your world into the richest experience yet.\nConnect. Share. Express your amazingness!\n\nDownload the App here: https://itunes.apple.com/ch/app/urturn/id592402543?l=fr&mt=8","upload_date":"2013-05-23 03:22:58","modified_date":"2013-05-27 19:32:40","number_of_likes":"3","number_of_plays":"130","number_of_comments":"1","width":"1280","height":"720","duration":"85","owner":{"display_name":"Urturn","id":"5248255","is_plus":"1","is_pro":"0","is_staff":"0","profileurl":"http://vimeo.com/urturnofficial","realname":"Urturn","username":"urturnofficial","videosurl":"http://vimeo.com/urturnofficial/videos","portraits":{"portrait":[{"height":"30","width":"30","_content":"http://b.vimeocdn.com/ps/483/058/4830586_30.jpg"},{"height":"75","width":"75","_content":"http://b.vimeocdn.com/ps/483/058/4830586_75.jpg"},{"height":"100","width":"100","_content":"http://b.vimeocdn.com/ps/483/058/4830586_100.jpg"},{"height":"300","width":"300","_content":"http://b.vimeocdn.com/ps/483/058/4830586_300.jpg"}]}},"tags":{"tag":[{"author":"5248255","id":"120910220","normalized":"urturn","url":"http://vimeo.com/tag:urturn","_content":"urturn"},{"author":"5248255","id":"120910256","normalized":"app","url":"http://vimeo.com/tag:app","_content":"app"},{"author":"5248255","id":"120910257","normalized":"fun","url":"http://vimeo.com/tag:fun","_content":"fun"},{"author":"5248255","id":"120910258","normalized":"expression","url":"http://vimeo.com/tag:expression","_content":"expression"},{"author":"5248255","id":"120910259","normalized":"amazing","url":"http://vimeo.com/tag:amazing","_content":"amazing"},{"author":"5248255","id":"120910260","normalized":"iphone","url":"http://vimeo.com/tag:iphone","_content":"iphone"}]},"cast":{"member":{"display_name":"Urturn","id":"5248255","role":"","username":"urturnofficial"}},"urls":{"url":[{"type":"video","_content":"http://vimeo.com/66797673"},{"type":"mobile","_content":"http://vimeo.com/m/66797673"}]},"thumbnails":{"thumbnail":[{"height":"75","width":"100","_content":"http://b.vimeocdn.com/ts/438/384/438384140_100.jpg"},{"height":"150","width":"200","_content":"http://b.vimeocdn.com/ts/438/384/438384140_200.jpg"},{"height":"360","width":"640","_content":"http://b.vimeocdn.com/ts/438/384/438384140_640.jpg"}]}}},
    {"url":"http://vimeo.com/66799309","type":"video","appData":{"allow_adds":"1","embed_privacy":"anywhere","id":"66799309","is_hd":"1","is_transcoding":"0","license":"by-nc-nd","privacy":"anybody","title":"Urturn App","description":"Playful and exciting, Urturn is a social media platform that opens up a whole new world of expression. \nWith its ever-growing catalogue of ready-made templates that act as inspiration enhancers, Urturn enables you to turn your world into the richest experience yet.\nConnect. Share. Express your amazingness!\n\nDownload the App here: https://itunes.apple.com/ch/app/urturn/id592402543?l=fr&mt=8","upload_date":"2013-05-23 04:04:19","modified_date":"2013-05-27 19:40:19","number_of_likes":"0","number_of_plays":"23","number_of_comments":"0","width":"1280","height":"720","duration":"50","owner":{"display_name":"Urturn","id":"5248255","is_plus":"1","is_pro":"0","is_staff":"0","profileurl":"http://vimeo.com/urturnofficial","realname":"Urturn","username":"urturnofficial","videosurl":"http://vimeo.com/urturnofficial/videos","portraits":{"portrait":[{"height":"30","width":"30","_content":"http://b.vimeocdn.com/ps/483/058/4830586_30.jpg"},{"height":"75","width":"75","_content":"http://b.vimeocdn.com/ps/483/058/4830586_75.jpg"},{"height":"100","width":"100","_content":"http://b.vimeocdn.com/ps/483/058/4830586_100.jpg"},{"height":"300","width":"300","_content":"http://b.vimeocdn.com/ps/483/058/4830586_300.jpg"}]}},"tags":{"tag":[{"author":"5248255","id":"120910275","normalized":"app","url":"http://vimeo.com/tag:app","_content":"app"},{"author":"5248255","id":"120910276","normalized":"ios","url":"http://vimeo.com/tag:ios","_content":"ios"},{"author":"5248255","id":"120910277","normalized":"urturn","url":"http://vimeo.com/tag:urturn","_content":"urturn"},{"author":"5248255","id":"120910278","normalized":"iphone","url":"http://vimeo.com/tag:iphone","_content":"iphone"},{"author":"5248255","id":"120910279","normalized":"entertainement","url":"http://vimeo.com/tag:entertainement","_content":"entertainement"},{"author":"5248255","id":"120910280","normalized":"fun","url":"http://vimeo.com/tag:fun","_content":"fun"}]},"cast":{"member":{"display_name":"Urturn","id":"5248255","role":"","username":"urturnofficial"}},"urls":{"url":[{"type":"video","_content":"http://vimeo.com/66799309"},{"type":"mobile","_content":"http://vimeo.com/m/66799309"}]},"thumbnails":{"thumbnail":[{"height":"75","width":"100","_content":"http://b.vimeocdn.com/ts/438/386/438386430_100.jpg"},{"height":"150","width":"200","_content":"http://b.vimeocdn.com/ts/438/386/438386430_200.jpg"},{"height":"360","width":"640","_content":"http://b.vimeocdn.com/ts/438/386/438386430_640.jpg"}]}}},

    {"url":"http://www.dailymotion.com/video/xs8sib_queen-we-are-the-champions-live_music","type":"video","appData":{"id":"xs8sib","owner.screenname":"Qello","title":"Queen - We Are The Champions (LIVE)","url":"http://www.dailymotion.com/video/xs8sib_queen-we-are-the-champions-live_music","duration":221,"thumbnail_small_url":"http://s1.dmcdn.net/Q-zC/80x60-zB7.jpg","created_time":1342828673,"views_total":9109}} ,
    {"url":"http://www.dailymotion.com/video/xzuu4f_best-of-cute-kittens-hd-compilation_animals","type":"video","appData":{"id":"xzuu4f","owner.screenname":"Tanya Love","title":"Best of CUTE KITTENS (HD) compilation","url":"http://www.dailymotion.com/video/xzuu4f_best-of-cute-kittens-hd-compilation_animals","duration":307,"thumbnail_small_url":"http://s1.dmcdn.net/BeBeu/80x60-DE4.jpg","created_time":1368518673,"views_total":20}},

    {"url":'http://www.dailymotion.com/video/x101sst_%D1%8D%D0%BB%D0%B8%D1%82%D0%BD%D0%BE%D0%B5-%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE-%D0%B4%D1%83%D0%B1%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9-%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80_shortfilms'},
    {"url":'http://vimeo.com/66797673/'},
    {"url":'http://www.youtube.com/watch?v=_qR3AQXAzss'}
  ];

  // 0 ------------------------------------------
  jQuery('#player0').utVideo();
  jQuery('#player01').utVideo({data:testVideos[0]});
  jQuery('#player02').utVideo({data:testVideos[1]});
  jQuery('#player03').utVideo({data:testVideos[2]});
  jQuery('#player04').utVideo({data:testVideos[3]});
  jQuery('#player05').utVideo({data:testVideos[4]});
  jQuery('#player06').utVideo({data:testVideos[5]});
  jQuery('#player07').utVideo({data:testVideos[6]});

  jQuery('#player007').utVideo({data:'I am wrong URL'});
  jQuery('#player008').utVideo({data:'http://www.youtube.com/watch?v=IamwrongvideoId'});

  // 1 ------------------------------------------
  jQuery('#player1').utVideo({
    data:'http://www.youtube.com/watch?v=_qR3AQXAzss'
  });

  // 2 ------------------------------------------
  jQuery('#player2').utVideo({
    data:'http://www.youtube.com/watch?v=_qR3AQXAzss',
    editable:false
  });

  jQuery('.myplayer').utVideo({
    id:"myId"
  });

  // 3 ------------------------------------------
  // video container and action buttons
  var container3 = jQuery('#player3');
  var buttons3 = {
    add:     $('.player3-add-button'),
    destroy: $('.player3-remove-button')
  };

  // create new video panel
  buttons3.add.on('click',function(){
    post.dialog('video', function(data){
      container3.utVideo({data:data});
    });
  });


  // fully desctroy video
  buttons3.destroy.on('click',function(){
    container3.utVideo('destroy');
  });

  // 4 ------------------------------------------
  var player4 = jQuery('#player4').utVideo();

  player4.on('utVideo:change',function(e,newValue,oldValue){
    console.log('--- utVideo:change -> video data/parameters was changed. Changed data: new = ',newValue,', old = ',oldValue);
  });

  player4.on('utVideo:ready',function(){
    console.log('-- utVideo:ready -> video component ready to accept events');
  });

  player4.on('utVideo:canplay',function(e,data){
    console.log('-- utVideo:canplay -> video component got all video data and ready to start playing',e,data);
  });

  player4.on('utVideo:play',function(){
    console.log('-- utVideo:play -> video started to play');
  });

  player4.on('utVideo:pause',function(){
    console.log('-- utVideo:pause -> video paused');
  });

  player4.on('utVideo:stop',function(){
    console.log('-- utVideo:stop -> video stopped');
  });

  player4.on('utVideo:finish',function(){
    console.log('-- utVideo:finish -> video finished');
  });

  // 5 ------------------------------------------
  var player5 =  jQuery('#player5').utVideo();
  var buttons5 = {
    play:   $('.player5-play-button'),
    pause:  $('.player5-pause-button'),
    stop:   $('.player5-stop-button'),
    dialog: $('.player5-dialog-button'),
    update: $('.player5-update-button')
  };

  buttons5.play.on('click',function(){
    player5.utVideo('play');
  });

  buttons5.pause.on('click',function(){
    player5.utVideo('pause');
  });

  buttons5.stop.on('click',function(){
    player5.utVideo('stop');
  });

  buttons5.dialog.on('click',function(){
    player5.utVideo('dialog');
  });

  buttons5.update.on('click',function(){
    player5.width(player5.width()*0.8);
    player5.utVideo('update');
  });

  // 6 ------------------------------------------
  jQuery('#player6').utVideo({
    data:'http://vimeo.com/66797673/',
    ui:{
      play:    true,
      title:   false,
      source:  true,
      artwork: false,
      loading: false
    },
    editable: false
  });

  jQuery('#player7').utVideo({
    data:'http://vimeo.com/66797673/',
    ui:{
      play:    true,
      title:   false,
      source:  false,
      artwork: true,
      loading: true
    },
    editable: false
  });

  jQuery('#player8').utVideo({
    data:'http://vimeo.com/66797673/',
    ui:{
      source:  false,
      artwork: false
    },
    editable: false
  });



  jQuery("#player9").utVideo({
    skin:'carbon'
  });

  jQuery("#player10").utVideo({
    data:'http://vimeo.com/66797673/',
    skin:'carbon',
    ui:{
      play:    true,
      title:   true,
      source:  false,
      artwork: true,
      loading: true
    }
  });


  jQuery("#player11").utVideo({
    skin:'webdoc'
  });

  jQuery("#player12").utVideo({
    data:'http://vimeo.com/66797673/',
    skin:'webdoc',
    ui:{
      play:    true,
      title:   true,
      source:  false,
      artwork: true,
      loading: true
    }
  });


  post.size($('.container').height());
  Rainbow.color();
  post.valid(true);
});
