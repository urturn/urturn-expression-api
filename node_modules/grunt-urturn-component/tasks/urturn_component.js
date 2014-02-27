/*
 * grunt-urturn-component
 * https://github.com/urturn/grunt-urturn-component
 *
 * Copyright (c) 2013 Olivier Amblet
 * Licensed under the MIT license.
 */

'use strict';

var Component = require('../component.js');

var bower = require("bower");
var async = require("async");
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('urturn_component', 'Manage urturn component.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({}),
        bowerOpts = this.data.bower || false,
        manifestOpts = this.data.manifest || false,
        installOpts = this.data.install || false;

    var done = this.async();
    var bowerInstall = function(callback) {
      if(bowerOpts){
        grunt.log.write("Install bower components: ");
        bower.commands.install()
          .on('error', function(error){
            console.log('an error occured');
            callback(error);
          })
          .on('end', function(){
            grunt.log.writeln("installed");
            callback(null);
          });
      } else {
        callback();
      }
    };
    var generateManifest = function(callback) {
      if(manifestOpts) {
        grunt.log.write("Create manifest file: ");
        var manifest = manifestOpts;
        var base = grunt.file.readJSON(bower.config.json);
        var json = {};
        json.name = base.name;
        json.version = base.version;
        json.dependencies = manifest.dependencies || base.dependencies;
        json.includes = manifest.includes || [];
        json.main = manifest.main;
        json.assets = manifest.assets;
        grunt.file.write('component.urturn.json', JSON.stringify(json, null, 2));
        grunt.log.writeln("component.urturn.json written");
        callback();
      } else {
        callback();
      }
    };
    var urturnInstall = function(callback) {
      if(installOpts) {
        grunt.log.write("Install urturn component: ");
        var dest = installOpts.dest || 'lib';
        var info = grunt.file.readJSON('component.urturn.json');
        info.basedir = '.';
        var component = Component.fromOptions(info);

        Component.list.forEach(function(comp){
          var files;
          if(comp.includedIn){
            comp.assets.forEach(function(f){
              grunt.file.copy( path.join(comp.basedir, f), path.join(dest, comp.name, f));
            });
          } else {
            comp.files().forEach(function(f){
              grunt.file.copy( path.join(comp.basedir, f), path.join(dest, comp.name, f));
            });
          }
        });
        grunt.log.writeln('installed');
        callback();
      } else {
        callback();
      }
    };

    async.series([bowerInstall, generateManifest, urturnInstall], done);
  });
};
