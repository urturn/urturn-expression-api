// An helper to help other nodejs module to find the files in this module.
var path = require('path');
var info = require('../package.json');
    info.directory = path.resolve(__dirname, '..', 'dist');

module.exports = info;