module.exports = function(grunt) {

  var fs = require('fs'),
      path = require('path'),
      mime = require('mime');

  var s3PrivatePath = path.join(__dirname, '.s3private.json');
  var s3Config = loadS3Config();
  var info = JSON.parse(grunt.file.read('package.json'));

  function loadS3Config(){
    if(fs.existsSync(s3PrivatePath)){
      return JSON.parse(fs.readFileSync(s3PrivatePath));
    } else {
      console.log("You need to create a " + s3PrivatePath + " file to run `grunt s3deploy`");
      return null;
    }
  }

  // List all source files that might be include.
  var sources = [
    'lib/expression-api/namespace.js',
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
    'lib/expression-api/init.js'
  ];

  var sourcesCSS = ['lib/iframe.css'];
  var sourcesAssets = [];
  var pathMap = {}; // map relative path to asset paths

  var config = {};

  // Lint
  config.jshint = {
    options: {
      browser: true
    },
    build: ['Gruntfile.js'],
    lib: ['lib/**/*.js'],
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
    gz: ['dist_gz/'],
    components: ['components/']
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
        run: true
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
          'dist_gz/**/*': '/expression/lib/urturn-expression-api/' + info.version
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

  config.urturn_component = {
    createmanifest: {
      manifest: {
        main: ['iframe.min.css', 'iframe.min.js'],
        dependencies: {
          'jquery': '~2.0.0'
        },
        includes: [
          "fastclick",
          "urturn-expression-css",
          "jquery",
          "jquery.ut-sticker",
          "jquery.ut-image",
          "jquery.ut-audio",
          "jquery.ut-video",
          "jquery.ut-text"
        ]
      }
    },
    config: {
      bower: true
    }
  };

  config.concat_css = {
    all: {
      src: sourcesCSS,
      dest: "dist/iframe.css"
    }
  };

  config.exec = {
    clean: {
      cmd: "bower cache-clean"
    },
    tag: {
      cmd: "git tag v" + info.version + " && git push --tags"
    },
    npmpublish: {
      cmd: "npm publish"
    }
  };

  grunt.initConfig(config);

  // Load external grunt Task
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-urturn-component');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerMultiTask('filecheck', "Ensure sources file are here", function(){
    for(var i in this.data){
      if(!fs.existsSync(this.data[i])){
        grunt.warn("Missing " + this.data[i]);
      }
    }
  });

  // Declare the S3 grunt Task
  grunt.registerMultiTask('s3deploy', 'Deploying built file on AWS s3', function() {
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
      files[source] = this.data.files[pattern] + '/' + filepath;
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
      // Define cache controle policy (no-cache if -beta, -alpha or -rc)
      if(info.version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/)){
        headers['Cache-Control'] = "public, max-age=" + 60*60*24*365;
      } else {
        headers['Cache-Control'] = "no-cache";
      }
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

  grunt.registerTask('updateVersionNumber', function(){
    function updateInJSFiles(filename, version){
      content = grunt.file.read(filename);
      content = content.replace(/0\.0\.0/g, version);
      grunt.log.writeln("Updated "+filename+" version to " + version);
      grunt.file.write(filename, content);
    }
    function updateInBower(version){
      var bower = require('bower');
      var bowerInfo = grunt.file.readJSON(bower.config.json);
      if(bowerInfo.version !== version) {
        bowerInfo.version = version;
        grunt.log.writeln("Updated bower version to " + bowerInfo.version);
        grunt.file.write(bower.config.json, JSON.stringify(bowerInfo, null, 2));
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

  grunt.registerTask('addIncludedModule', function(){
    var Component = require('grunt-urturn-component/component');
    var path = require('path');
    var info = grunt.file.readJSON('component.urturn.json');
    info.basedir = '.';
    var component = Component.fromOptions(info);
    component.eachInclude(function(comp){
      console.log('Includes component', comp.name);
      var pathMap = {};
      var fileToRebind = [];
      comp.main.forEach(function(f){
        var filepath = path.join(comp.basedir, f);
        if (filepath.match(/\.js$/)) {
          sources.push(filepath);
          fileToRebind.push(filepath);
        } else if (filepath.match(/\.css$/)) {
          sourcesCSS.push(filepath);
        } else {
          sourcesAssets.push(filepath);
        }
      });
      comp.assets.forEach(function(f){
        var filepath = path.join(comp.basedir, f);
        pathMap[f] = filepath;
        sourcesAssets.push(filepath);
      });
      fileToRebind.forEach(function(filepath){
        var content = grunt.file.read(filepath);
        for(var f in pathMap){
          content = content.replace(new RegExp(f, 'gm'), pathMap[f]);
        }
        grunt.file.write(filepath, content);
      });
    });
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'exec:clean', 'jshint', 'build', 'buildTestExpression', 'updateVersionNumber', 'urturn_component:createmanifest', 'mocha', 'minify', 'copyAssetToDist']);
  grunt.registerTask('build', ['dependencies', 'addIncludedModule', 'filecheck', "concat", "concat_css", 'patchJQuery202']);
  grunt.registerTask('dependencies', ['urturn_component']);
  grunt.registerTask('minify', ['uglify', 'cssmin']);
  grunt.registerTask('publish', ['exec:tag', 'exec:npmpublish']);
  grunt.registerTask('deploy', ['compress', 's3deploy']);
  grunt.registerTask('local', ['concat', 'buildTestExpression', 'updateVersionNumber', 'uglify', 'cssmin', 'compress']);
};
