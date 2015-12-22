'use strict';

var Slices = require('./slices');
var utils = require('./utils');

// Instance factory
function SlicesFactory(width, height, lineXArray, lineYArray, options) {
  checkArgs.apply(null, arguments);

  var slices;

  if (options) {
    slices = new Slices(width, height, lineXArray, lineYArray, options);
  } else {
    slices = new Slices(width, height, lineXArray, lineYArray);
  }

  return slices.slice();
}

// check arguments
function checkArgs(width, height, lineXArray, lineYArray, options) {
  if (utils.type(width) !== 'Number' ||
      utils.type(height) !== 'Number' ||
      utils.type(lineXArray) !== 'Array' ||
      utils.type(lineYArray) !== 'Array' ||
      options && utils.type(options) !== 'Object') {
    throw new Error('Invalid arguments.');
  }
}

// Export the SlicesFactory object for Node.js, with
// backwards-compatibility for their old module API.
exports = module.exports = SlicesFactory;
exports.Slices = SlicesFactory;

// If we're in the browser,
// define it if we're using AMD, otherwise leak a global.
if (typeof define === 'function' && define.amd) {
  define(function() {
    return SlicesFactory;
  });
} else if (typeof window !== 'undefined' || typeof navigator !== 'undefined') {
  window.Slices = SlicesFactory;
}