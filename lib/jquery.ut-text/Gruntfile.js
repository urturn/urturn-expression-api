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
        src: ['Gruntfile.js', '<%= pkg.name %>.js']
      }
    },
    urturn_component: {
      all: {
        bower: true,
        manifest: {
          main: [
            "<%= pkg.name %>.js",
            "<%= pkg.name %>.css"
          ]
        }
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
  grunt.loadNpmTasks('grunt-urturn-component');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('default', ['jshint', 'urturn_component']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('publish', ['exec']);
};