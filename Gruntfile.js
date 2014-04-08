module.exports = function(grunt) {

  var fs = require('fs'),
      path = require('path'),
      mime = require('mime');

  var s3PrivatePath = path.join(__dirname, '.s3private.json');
  var s3Config = loadS3Config();
  var info = JSON.parse(grunt.file.read('package.json'));
  var selectedComponents = [];

  function loadS3Config(){
    if(fs.existsSync(s3PrivatePath)){
      return JSON.parse(fs.readFileSync(s3PrivatePath));
    } else {
      console.log("You need to create a " + s3PrivatePath + " file to run `grunt s3deploy`");
      return null;
    }
  }

  // List all source files that might be include.
  var vendor_sources = [
    'vendors/jquery-2.1.0.min.js',
    'vendors/fastclick.js',
    'vendors/fontdetect.2.1.js',
    'vendors/jquery.textfill.js',
    'vendors/jquery.jplayer.min.js',
    'vendors/paper.js',
    'vendors/froogaloop.min.js'
  ];


  var jshintSources = [
    'lib/expression-api/namespace.js',
    'lib/expression-api/i18n.js',

    'lib/i18n/ar.js',
    'lib/i18n/de.js',
    'lib/i18n/en.js',
    'lib/i18n/es.js',
    'lib/i18n/fr.js',
    'lib/i18n/hi.js',
    'lib/i18n/it.js',
    'lib/i18n/nl.js',
    'lib/i18n/pt.js',
    'lib/i18n/ru.js',
    'lib/i18n/th.js',
    'lib/i18n/zh.js',

    'lib/expression-api/uuid.js',
    'lib/expression-api/compat.js',
    'lib/expression-api/Collection.js',
    'lib/expression-api/CollectionStore.js',
    'lib/expression-api/PublicCollection.js',
    'lib/expression-api/Expression.js',
    'lib/expression-api/User.js',
    'lib/expression-api/Post.js',
    'lib/expression-api/Image.js',
    'lib/expression-api/Video.js',
    'lib/expression-api/Sound.js',
    'lib/expression-api/events.js',
    'lib/expression-api/init.js',
    'lib/expression-api/preloader.js',



    'lib/modules/filter-image.js',
    // ut-image
    'lib/modules/jquery.ut-image/jquery.ut-image.js',
    // ut-audio
    'lib/modules/jquery.ut-audio/js/jquery.ut-audio.js',
    'lib/modules/jquery.ut-audio/js/jquery.ut-audio-engine.js',
    // ut-video
    'lib/modules/jquery.ut-video/js/jquery.ut-video.js',
    // ut-text
    'lib/modules/jquery.ut-text/jquery.ut-text.js',
    // ut-sticker
    'lib/modules/jquery.ut-sticker/jquery.ut-sticker.js',

    'lib/modules/antiscroll.costum.js',
    'lib/modules/class.MediaPlayer.js',
    'lib/modules/cutout.js',
    'lib/modules/filter-image.js',
    'lib/modules/jquery.ex.js'



  ];
  var sources = vendor_sources.concat(jshintSources);

  var sourcesCSS = [
    'lib/iframe.css',
    // urturn-expression-css
    'lib/urturn-expression-css/css/styles.css',
    // ut-image
    'lib/modules/jquery.ut-image/jquery.ut-image.css',
    // ut-audio
    'lib/modules/jquery.ut-audio/css/default/jquery.jplayer.min.js',
    'lib/modules/jquery.ut-audio/css/default/jquery.ut-audio-engine.css',
    'lib/modules/jquery.ut-audio/css/default/jquery.ut-audio.css',
    'lib/modules/jquery.ut-video/css/default/jquery.ut-video.css',
    'lib/modules/jquery.ut-audio/css/bottom-over/ut-audio-player-bottom-over.css',
    // ut-text
    'lib/modules/jquery.ut-text/jquery.ut-text.css',
    // ut-sticker
    'lib/modules/jquery.ut-sticker/jquery.ut-sticker.css',

    'lib/modules/antiscroll.css',
    'lib/modules/class.MediaPlayer.css',
    'lib/modules/cutout.css'

  ];
  var sourcesAssets = [
    // urturn-expression-css
    'lib/urturn-expression-css/fonts/urturn_icons.eot',
    'lib/urturn-expression-css/fonts/urturn_icons.svg',
    'lib/urturn-expression-css/fonts/urturn_icons.ttf',
    'lib/urturn-expression-css/fonts/urturn_icons.woff',
    // ut-audio, ut-video
    'lib/urturn-expression-css/fonts/Roboto-Regular-webfont.eot',
    'lib/urturn-expression-css/fonts/Roboto-Regular-webfont.svg',
    'lib/urturn-expression-css/fonts/Roboto-Regular-webfont.ttf',
    'lib/urturn-expression-css/fonts/Roboto-Regular-webfont.woff',
    // ut-audio
    'lib/modules/jquery.ut-audio/swf/Jplayer.swf',


    // Images
    
    // cut out
    'lib/images/tip_overlay_640x640.svg',
    'lib/images/mobile_popup.png',
    'lib/images/mobile_tooltip1.png',
    'lib/images/mobile_tooltip2.png'
  ];
  var pathMap = {}; // map relative path to asset paths

  var config = {};

  // Lint
  config.jshint = {
    options: {
      browser: true,
      sub : true,
      laxbreak : true
    },
    build: ['Gruntfile.js'],
    lib: jshintSources,
    test: ['test/*.js', 'test/lib/collection-fixtures.js', 'test/lib/dom.js']
  };

  // Minify JS
  config.uglify = {
    minimifiedIframe: {
      src: 'dist/iframe.js',
      dest: 'dist/iframe.min.js'
    },
    minimifiedSandbox: {
      src: 'dist/sandbox.js',
      dest: 'dist/sandbox.min.js'
    }
  };

  // Minify CSS
  config.cssmin = {
    minify: {
      report: false,
      files: {
        "dist/iframe.min.css": "dist/iframe.css"
      }
    }
  };

  config.clean = {
    dist: ['dist/'],
    gz: ['dist_gz/']
  };

  config.filecheck = {
    sources: sources
  };

  // Concatenation
  config.concat = {
    sandbox: {
      src: [
        'lib/expression-api/namespace.js',
        'lib/expression-api/uuid.js',
        'lib/expression-api/compat.js',
        'lib/expression-api/Collection.js',
        'lib/expression-api/PublicCollection.js',
        'lib/expression-api/CollectionStore.js'
      ],
      dest: 'dist/sandbox.js'
    },
    iframe: {
      src: sources,
      dest: 'dist/iframe.js'
    }
  };

  // Tests
  config.mocha = {
    console: {
      src: ['test/console.html'],
      options: {
        run: true,
        reporter: 'Spec',
        log: true
      }
    }
  };

  if(s3Config){
    var genS3Config = function(configs){
      return {
        apiKey: configs.apiKey,
        secretKey: configs.secretKey,
        bucket: configs.bucket,
        distribution: configs.distribution,
        files: {
          'dist_gz/**/*': '/expression/lib/urturn-expression-api/'
        }
      };
    };
    config.s3deploy = {};
    for(var target in s3Config){
      config.s3deploy[target] = genS3Config(s3Config[target]);
    }
  }

  config.compress = {
    main: {
      options: {
        mode: 'gzip'
      },
      expand: true,
      cwd: 'dist/',
      src: ['**/*'],
      dest: 'dist_gz/'
    }
  };

  config.watch = {
    scripts: {
      files: ['lib/**/*.js', 'test/**/*.js'],
      tasks: ['test'],
      options: {
        nospawn: true
      }
    }
  };

  config.compass = {
    dist: {
      options: {
        config: 'lib/urturn-expression-css/config.rb',
        basePath: 'lib/urturn-expression-css'
      }
    }
  };

  config.concat_css = {
    all: {
      src: sourcesCSS,
      dest: "dist/iframe.css",
      options: {
        assetBaseUrl: './',
        debugMode: true
      }
    }
  };

  config.exec = {
    clean: {
      cmd: "bower cache clean"
    },
    tag: {
      cmd: "git tag v" + info.version + " && git push --tags"
    },
    npmpublish: {
      cmd: "npm publish"
    }
  };


  config['closure-compiler'] = {
    frontend: {
      // brew --prefix closure-compiler
      closurePath: '/usr/local/Cellar/closure-compiler/20130411/libexec/',
      js: 'dist/iframe.js',
      jsOutputFile: 'dist/iframe.min.js',
      maxBuffer: 500,
      options: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT5'
      }
    }
  };

  grunt.initConfig(config);

  // Load external grunt Task
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-closure-compiler');

  grunt.registerMultiTask('filecheck', "Ensure sources file are here", function(){
    for(var i in this.data){
      if(!fs.existsSync(this.data[i])){
        grunt.warn("Missing " + this.data[i]);
      }
    }
  });

  // Declare the S3 grunt Task
  grunt.registerMultiTask('s3deploy', 'Deploying built file on AWS s3', function() {
    console.log('Will deploy on', this.data.bucket);
    var done = this.async();
    var knox = require('knox');
    var cloudfront = require('cloudfront');
    var client = knox.createClient({
      key: this.data.apiKey,
      secret: this.data.secretKey,
      bucket: this.data.bucket,
      secure: false
    });
    var cf = cloudfront.createClient(this.data.apiKey, this.data.secretKey);
    var counter = 0;
    var bucket = this.data.bucket;
    var distribution = this.data.distribution;
    var files = {};
    var doMap = function(source){
      if(!grunt.file.isFile(source)){
        return;
      }
      var filepath = source.replace(/^.*?\//, '').replace(/\.gz$/, '');
      files[source] = this.data.files[pattern] +  info.version + '/' + filepath;
      console.log(source, files[source]);
    }.bind(this);
    for(var pattern in this.data.files){
      grunt.file.expand(pattern).forEach(doMap);
    }

    var syncPoint = function(src, dest, bucket, callback){
      return function(err){
        counter --;
        if(err){
          console.log("Error " + err);
        } else {
          console.log("Uploaded " + src + " to " + bucket + dest);
        }
        if(counter === 0){
          callback();
        }
      };
    };

    function doUpload(src, dest, retry, callback){
      var headers = {'x-amz-acl': 'public-read'};
      headers['Cache-Control'] = "public, max-age=" + 60*60*24*365;
      headers['Content-Encoding'] = 'gzip';
      var mimeType = mime.lookup(dest.replace(/\.gz/, ''));
      console.log(dest, mimeType);
      headers['Content-Type'] = mimeType;
      client.putFile(src, dest, headers, function(err){
        if(err){
          if(retry > 2){
            callback(err);
          } else {
            console.log(err, "Retrying...");
            doUpload(src, dest, retry + 1, callback);
          }
        } else {
          callback();
        }
      });
    }

    var invalidate = function(){
      var reqID = "grunt_api_deploy_" + parseInt(Math.random()*1000000000, 10);
      var paths = [];
      for(var k in files){
        paths.push(files[k]);
      }
      cf.createInvalidation(distribution, reqID, paths, function(err, invalidation){
        if (err){
          console.log(err);
        } else {
          console.log("Invalidation request " + reqID + " sent to CloudFront, this may take as long as 15 minutes to complete.");
        }
        done();
      });
    };

    for(var key in files){
      var src = key;
      var dest = files[src];
      counter ++;
      doUpload(src, dest, 0, syncPoint(src, dest, bucket, invalidate));
    }
  });

  grunt.registerTask('copyAssetToDist', function(){
    sourcesAssets.forEach( function(filepath) {
      if(grunt.file.isFile(filepath)){
        grunt.file.copy(filepath, path.join('dist', filepath));
        grunt.file.copy(filepath, path.join('archive/' + info.version , filepath));
      } else {
        grunt.log.writeln(filepath + " is not a file.");
      }
    });
  });

  grunt.registerTask('buildTestExpression', function(){
    expPath = path.join('testExpression', 'bdd');
    grunt.file.copy('node_modules/mocha/mocha.js', path.join(expPath, 'lib', 'mocha.js'));
    grunt.file.copy('node_modules/mocha/mocha.css', path.join(expPath, 'lib', 'mocha.css'));
    grunt.file.copy('node_modules/expect.js/expect.js', path.join(expPath, 'lib', 'expect.js'));

    var expJsonPath = path.join(expPath, 'expression.json');
    content = JSON.parse(grunt.file.read(expJsonPath));
    content.api_version = info.version;
    content.title = content.system_name =  'bdd-' + info.version.replace(/\./g, '-');
    grunt.file.write(expJsonPath,JSON.stringify(content, null, 2));
  });

  grunt.registerTask('patchJQuery202', function(){
    grunt.file.write('dist/iframe.js',
      grunt.file.read('dist/iframe.js').replace(
        'if ( parent && parent.frameElement ) {', // BUG IN IE: SCRIPT5, access denied
        'if ( parent && parent.attachEvent && parent !== parent.top ) {'));
  });

  grunt.registerTask('patchJQuerySO', function(){
    grunt.file.write('dist/iframe.js',
      grunt.file.read('dist/iframe.js').replace(
        'camelCase: function( string ) {',
        'camelCase: function( string ) {   if (__STACK_JQUERY_JS) {try {this.undef();} catch (e) {var stack = e.stack; __STACK_JQUERY_JS.push({stack : stack, string : string}); if (__STACK_JQUERY_JS.length > 1000) {console.log(stack); __STACK_JQUERY_JS.splice(0,900); throw("Burk!"); }}}'));
  });

  grunt.registerTask('updateVersionNumber', function(){
    function updateInJSFiles(filename, version){
      content = grunt.file.read(filename);
      content = content.replace(/0\.0\.0/g, version);
      grunt.log.writeln("Updated "+filename+" version to " + version);
      grunt.file.write(filename, content);
    }
    function updateInBower(version){
      var bower = require('bower');
      var bowerInfo = grunt.file.readJSON("bower.json");
      if(bowerInfo.version !== version) {
        bowerInfo.version = version;
        grunt.log.writeln("Updated bower version to " + bowerInfo.version);
        grunt.file.write("bower.json", JSON.stringify(bowerInfo, null, 2));
      }
    }
    [
      'testExpression/bdd/specs/expression-spec.js',
      'dist/iframe.js',
      'dist/sandbox.js'
    ].forEach(function(name) {
      updateInJSFiles(name, info.version);
    });
    updateInBower(info.version);
  });

  grunt.registerTask('tagVanilla', function() {
    info.version = info.version + '-vanilla';
  });

  grunt.registerTask('tagSimple', function() {
    info.version = info.version + '-simple';
  });



  grunt.registerTask('select_simple_component', function() {
    selectedComponents =[
      "fastclick",
      "urturn-expression-css",
      "jquery",
      "FontDetect",
      "jquery-textfill",
      "jquery.ut-image",
      "jquery.ut-text"
    ];
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'exec:clean', 'test', 'prebuild', 'buildTestExpression', 'updateVersionNumber', 'minify', 'copyAssetToDist']);
  grunt.registerTask('prebuild', ["compass", "concat", "concat_css", 'patchJQuery202']); //'patchJQuerySO'

  // light sdk version task.
  grunt.registerTask('vanilla', ['tagVanilla', 'clean', 'exec:clean', 'test', 'buildvanilla', 'buildTestExpression', 'updateVersionNumber', 'minify', 'copyAssetToDist']);
  grunt.registerTask('buildvanilla', ["concat", "concat_css"]);

  // simple sdk version task.
  grunt.registerTask('simple', ['tagSimple', 'select_simple_component', 'clean', 'exec:clean', 'test', 'buildSimple', 'buildTestExpression', 'updateVersionNumber', 'minify', 'copyAssetToDist']);
  grunt.registerTask('buildSimple', ["concat", "concat_css", 'patchJQuery202']);

  grunt.registerTask('minify', ['uglify', 'cssmin']);
  grunt.registerTask('test', ['jshint', 'filecheck', 'mocha']);
  grunt.registerTask('publish', ['exec:tag', 'exec:npmpublish']);
  grunt.registerTask('deploy', ['compress', 's3deploy']);
  grunt.registerTask('deploysimple', ['tagSimple', 'compress', 's3deploy']);
  grunt.registerTask('deployvanilla', ['tagVanilla', 'compress', 's3deploy']);
};
