module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: {
        /*options: {
          jshintrc: '.jshintrc'
        },*/
        src: ['Gruntfile.js', '*.js', 'spec/*.js']
      }
    },
    mocha: {
      console: {
        src: ['spec/suite.html'],
        options: {
          run: true,
          reporter: 'Spec',
          log: true
        }
      }
    },
    watch: {
      files: ["*.js", "spec/*.js"],
      tasks: ['default']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mocha']);
};
