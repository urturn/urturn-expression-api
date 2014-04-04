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
        "js/jquery.ut-video.js"
        ],
      }
    },
    clean: {
      all: ['example/lib', 'component.urturn.json']
    },
    watch: {
      files: ["js/jquery.ut-video.js","css/default/jquery.ut-video.css"],
      tasks: ['urturn_component:install']
    },
    // Install Bower Component, build manifest file and copy interesting files to example/lib.
    urturn_component: {
      all: {
        bower: true,
        manifest: {
          main: [
            "js/jquery.ut-video.js",
            "js/froogaloop.min.js",
            "css/default/jquery.ut-video.css"
          ],
          assets:[
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
    ['urturn_component']
  );

  // Create a new tag and push it on github.
  grunt.registerTask('publish', ['exec']);
};
