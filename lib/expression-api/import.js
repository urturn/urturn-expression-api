/**
 * Created by Ruben Alvarado on 4/16/14.
 */

(function (UT) {

  'use strict';
  var storage = {};
  var calledModuleFunctions = [];

  // Internal function for checking if a string is contained in a given array
  var _contains = function(list, name) {
    if (Object.prototype.toString.call(list) === '[object Array]' && Object.prototype.toString.call(name) === '[object String]') {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === name) {
          return true;
        }
      }
    }
    return false;
  };

  /**
    * This function is used to call the anonymous functions encompassing the modules (utImage, utSticker, etc..) in order to make them available
    * If dependencies argument is not a string or a an array of strings, nothing is done and the function returns false
    * Important: the return value is just here for debugging
    * We store anonymous "functions to call" and the names of the already called functions in private variables
    * If one of the stored "functions to call" is absent or not a function, we stop the process and return false
    * If an anonymous function corresponding to a module has already been called, it is simply ignored BUT import function does not return false
    *
    * @method import
    * @param {(string|Array.<string>)} dependencies - The name of the module or the list of modules we want to use
    * @returns {boolean} - Returns true if the entire process succeed otherwise returns false
    */

  var importFunction = function (dependencies) {

    if (Object.prototype.toString.call(dependencies) === '[object String]') {
      dependencies = [dependencies];
    }

    if (Object.prototype.toString.call(dependencies) === '[object Array]') {

      var moduleName;
      var moduleFunction;

      for (var i = 0; i < dependencies.length; i++) {

        moduleName = storage[dependencies[i]];

        // We check if module function has already been called in order to not recall it!
        if (_contains(calledModuleFunctions, moduleName)) {
          continue;
        } else if (Object.prototype.toString.call(moduleName) === '[object String]') {
          moduleFunction = storage[dependencies[i]];
          if (Object.prototype.toString.call(moduleFunction) === '[object Function]') {
            // Important! We push the moduleName into the calledModuleFunctions array just before calling it in order to avoid circular dependencies!
            calledModuleFunctions.push(moduleName);
            moduleFunction();
            continue;
          }
        }
        return false;
      }
      return true;
    }
    return false;
  };

  /**
   * This function is used to define modules
   * If name argument is not a string or module argument is not a function, nothing is done and the function returns false
   * Important: the return value is just here for debugging
   *
   * @method import.register
   * @param {string} name - The name of the module used for storing the related function and being able to retrieve it
   * @param {Function} module - The module to store as an executable function (generally this function will contain an immediately executed anonymous function)
   * @returns {boolean} - Returns true if the entire process succeed otherwise returns false
   */

  importFunction.define = function (name, module) {

    if (Object.prototype.toString.call(name) === '[object String]' && Object.prototype.toString.call(module) === '[object Function]') {

      //Check if a module function has already been registered with the same name, if yes we stop execution and return false
      if (Object.prototype.toString.call(storage[name]) === '[object Function]') {
        return false;
      }
      storage[name] = module;
      return true;
    }
    return false;
  };

  /**
   * This function is used to list defined modules
   *
   * @method import.list
   * @returns {Array} - Returns an array containing all the names of the defined modules
   */

  importFunction.list = function () {

    var modules = [];

    for(var key in storage) {
      if (storage.hasOwnProperty(key)) {
        modules.push(key);
      }
    }
    return modules;
  };

  /**
   * This function is used to list modules already imported
   *
   * @method import.done
   * @returns {Array} - Returns an array containing all the names of the imported modules
   */

  importFunction.done = function () {

    var modules = [];

    for(var i = 0; calledModuleFunctions.length; i++) {
      modules.push(calledModuleFunctions[i]);
    }
    return modules;
  };

  UT.import = importFunction;

}(UT));
