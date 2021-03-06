/*
 * grunt-css-absolute-image-url
 * https://github.com/supersheep/grunt-css-absolute-image-url
 *
 * Copyright (c) 2013 supersheep
 * Licensed under the MIT license.
 */
 
'use strict';
var grunt = require("grunt");
var Parser = require("../lib/cssparser");
var node_path = require("path");

var removeInvalidFiles = function(files) {
  return files.src.filter(function(filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  });
};


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css-absolute-image-url', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.

    // var files = grunt.file.expandMapping("**/*.css",this.data.dest,{
    //   cwd:src
    // });
    var options = this.options({
      no_version:true,
      md5:false,
      allow_image_miss:false,
      cwd:process.cwd()
    });


    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var parsed = "";
      f.src.forEach(function(path,i){
        path = node_path.resolve(path);
        parsed += new Parser(options).parse(path) + (i < f.length+1 ? "\r\n" : "");
      });

      // Write the destination file.
      grunt.file.write(f.dest, parsed);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
