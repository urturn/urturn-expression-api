/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    watch: {
      compass: {
        files: ['stylesheets/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: ['*.html','css/*.css'],
        options: {
          livereload: true,
        },
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['watch']);

};