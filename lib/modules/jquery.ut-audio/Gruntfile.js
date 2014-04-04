module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('bower.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: [
        "Gruntfile.js",
        "js/jquery.ut-audio.js",
        "js/jquery.ut-audio-engine.js"
        ],
      }
    },
    clean: {
      all: ['example/lib', 'component.urturn.json']
    },
    watch: {
      files: ["js/jquery.ut-audio-engine.js","js/jquery.ut-audio.js","css/default/jquery.ut-audio.css"],
      tasks: ['urturn_component:install', 'fixSwfPath']
    },
    // Install Bower Component, build manifest file and copy interesting files to example/lib.
    urturn_component: {
      all: {
        bower: true,
        manifest: {
          main: [
            "js/jquery.ut-audio.js",
            "js/jquery.ut-audio-engine.js",
            "js/jquery.jplayer.min.js",
            "css/default/jquery.ut-audio.css",
            "css/bottom-over/ut-audio-player-bottom-over.css"
          ],
          assets:[
            "swf/Jplayer.swf",
            "css/default/Roboto-Regular-webfont.eot",
            "css/default/Roboto-Regular-webfont.ttf",
            "css/default/Roboto-Regular-webfont.svg",
            "css/default/Roboto-Regular-webfont.woff"
          ]
        }
      },
      install: {
        install: { dest: 'example/lib' }
      }
    },
    exec: {
      publish: {
        command: 'git tag v<%= pkg.version %> && git push --tags'
      }
    }
  });

  grunt.registerTask('fixSwfPath', function() {
    var f = 'example/lib/jquery.ut-audio/js/jquery.ut-audio-engine.js';
    grunt.file.write(f, grunt.file.read(f).replace("swf/Jplayer.swf", "lib/jquery.ut-audio/swf/Jplayer.swf"));
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-urturn-component');

  // Default task.
  grunt.registerTask('default',
    'clean, configure and build',
    ['clean', 'configure', 'jshint']
  );

  grunt.registerTask('live', ['default', 'watch']);

  // Install task to configure local repository
  grunt.registerTask('configure',
    'generate descriptor and download module.',
    ['urturn_component', 'fixSwfPath']
  );

  // Create a new tag and push it on github.
  grunt.registerTask('publish', ['exec']);
};
