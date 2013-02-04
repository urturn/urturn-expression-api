module.exports = function(grunt) {

  var fs = require('fs'),
      path = require('path');

  var s3PrivatePath = path.join(__dirname, '.s3private.json');
  var s3Config = null;
  var info = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));
  if(fs.existsSync(s3PrivatePath)){
    s3Config = JSON.parse(fs.readFileSync(s3PrivatePath));
  } else {
    console.log("You need to create a " + s3PrivatePath + " file to run `grunt s3deploy`");
  }

  var config = {};
  // Lint
  config.lint = {
    all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
  };
  config.jshint = {
    options: {
      browser: true
    }
  };

  // Minify JS
  config.min = {
    minimifiedIframe: {
      src: 'dist/iframe.js',
      dest: 'dist/iframe.min.js'
    },
    minimifiedUuid: {
      src: 'dist/uuid.js',
      dest: 'dist/uuid.min.js'
    }
  };

  // Minify CSS
  config.cssmin = {
    csscompress: {
      src: 'dist/iframe.css',
      dest: 'dist/iframe.min.css'
    }
  };

  // Concatenation
  config.concat = {
    api: {
      src: [
        'lib/expression-api/init.js',
        'lib/expression-api/core.js',
        'lib/expression-api/uuid.js',
        'lib/expression-api/item-collection.js',
        'lib/expression-api/item-collection-store.js',
        'lib/expression-api/container.js',
        'lib/expression-api/medias.js',
        'lib/expression-api/document.js',
        'lib/expression-api/url.js'
      ],
      dest: 'dist/urturn-expression-api.js'
    },
    uuid: {
      src: [
        'lib/expression-api/init.js',
        'lib/expression-api/uuid.js'
      ],
      dest: 'dist/uuid.js'
    },
    iframe: {
      src: [
        'dist/urturn-expression-api.js',
        'lib/iframe.js'
      ],
      dest: 'dist/iframe.js'
    },
    iframecss: {
      src: ['lib/iframe.css'],
      dest: 'dist/iframe.css'
    }
  };

  // Tests
  config.buster = {
    test: {
      config: 'test/compiled-buster.js'
    },
    server: {
      port: 1111
    }
  };

  if(s3Config){
    config.s3deploy = {
      dev: {
        apiKey: s3Config.dev.apiKey,
        secretKey: s3Config.dev.secretKey,
        bucket: s3Config.dev.bucket,
        files: {
          'dist/urturn-expression-api.js': '/lib/urturn-expression-api/' + info.version + '/urturn-expression-api.js',
          'dist/iframe.js': '/lib/urturn-expression-api/' + info.version + '/iframe.js',
          'dist/uuid.js': '/lib/urturn-expression-api/' + info.version + '/uuid.js'
        }
      }
    };
  }

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-css');

  grunt.registerMultiTask('s3deploy', 'Deploying built file on AWS s3', function() {
    var done = this.async();
    var knox = require('knox');
    var client = knox.createClient({
      key: this.data.apiKey,
      secret: this.data.secretKey,
      bucket: this.data.bucket
    });

    var extensions = {
      'json': 'application/json',
      'js': 'application/javascript',
      'css': 'text/stylesheet',
      'jpg': 'image/jpg',
      'png': 'image/png',
      'gif': 'image/gif'
    };
    var counter = 0;
    var bucket = this.data.bucket;
    var syncPoint = function(src, dest, bucket){
      return function(err){
        counter --;
        if(err){
          console.log("Error", err);
        } else {
          console.log("Uploaded " + src + " to " + bucket + dest);
        }
        if(counter === 0){
          done();
        }
      };
    };

    var headers = {'x-amz-acl': 'public-read'};
    if(info.version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/)){
      headers['Cache-Control'] = "public, max-age=" + 60*60*24*365;
    }

    for(var key in this.data.files){
      var src = key;
      var dest = this.data.files[src];
      counter ++;
      client.putFile(src, dest, headers, syncPoint(src, dest, bucket));
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min buster cssmin');
  grunt.registerTask('all', 'default s3deploy');
};