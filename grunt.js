module.exports = function(grunt) {

  var fs = require('fs')
    , path = require('path')
    ;

  var s3PrivatePath = path.join(__dirname, '.s3private.json');
  var s3Config = {};
  if(fs.existsSync(s3PrivatePath)){
    s3Config = JSON.parse(fs.readFileSync(s3PrivatePath));
  } else {
    console.log("You need to create a " + s3PrivatePath + " file to run `grunt s3deploy`")
  }


  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    min: {
      minimifiedIframe: {
        src: 'dist/iframe.js',
        dest: 'dist/iframe.min.js'
      },
      minimifiedUuid: {
        src: 'dist/uuid.js',
        dest: 'dist/uuid.min.js'
      }
    },
    concat: {
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
      }
    },
    buster: {
      test: {
        config: 'test/compiled-buster.js'
      },
      server: {
        port: 1111
      }
    },
    s3deploy: {
      dev: {
        apiKey: s3Config.dev.apiKey,
        secretKey: s3Config.dev.secretKey,
        bucket: 'expressions.dev.urturn.com',
        files: {
          'dist/urturn-expression-api.js': '/urturn-expression-api/urturn-expression-api.js',
          'dist/iframe.js': '/urturn-expression-api/iframe.js',
          'dist/uuid.js': '/urturn-expression-api/uuid.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-buster');

  grunt.registerMultiTask('s3deploy', 'Deploying built file on AWS s3', function() {
    var done = this.async();
    var knox = require('knox');
    console.log(this)
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
    }
    var counter = this.data.files.length
    function syncPoint(err, data){
      counter --;
      if(counter == 0){
        done();
      }
      if(err){
        throw err;
      } else {
        console.log(data);
      }
    }
    for(var src in this.data.files){
      var dest = this.data.files[src];
      client.putFile(src, dest, {'x-amz-acl': 'public-read'}, syncPoint);
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min buster');
};