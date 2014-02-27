module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('bower.json'),
    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['Gruntfile.js', 'jquery.ut-image.js']
      }
    },
    clean: {
      all: ['example/lib', 'component.urturn.json']
    },
    urturn_component: {
      all: {
        bower: true,
        manifest: {
          main: ["jquery.ut-image.js", "jquery.ut-image.css"]
        }
      },
      install: {
        install: {
          dest: "example/lib"
        }
      }
    },
    watch: {
      files: ["jquery.ut-image.css", "jquery.ut-image.js"],
      tasks: ['urturn_component:install']
    },
    exec: {
      publish: {
        command: 'git tag v<%= pkg.version %> && git push --tags'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-urturn-component');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'urturn_component']);
  grunt.registerTask('live', ['default', 'watch']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('publish', ['exec']);
};
