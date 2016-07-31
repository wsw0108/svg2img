'use strict';

var atob = require('atob');
var fabric = require('fabric').fabric;

/**
 * Convert input from svg to png/jpeg.
 *
 * @param {Buffer|String} input
 * @param {Object} options
 * @param {Function} callback
 */
function svg2img(input, options, callback) {
  if (typeof callback === 'undefined') {
    callback = options;
    options = {};
  }
  var canvas = new fabric.createCanvasForNode();
  var svg;
  var isUrl = false;
  function cb(objects, info) {
    var width = options.width || info.width,
        height = options.height || info.height,
        format = options.format || 'png';
    if (!width || !height) {
      callback(new Error('Cannot obtain width/height of input.'), null);
      return;
    }
    canvas.setWidth(width);
    canvas.setHeight(height);
    var ctx = canvas.getContext('2d');
    ctx.scale(width / info.width, height / info.height);
    var obj = fabric.util.groupSVGElements(objects, options);
    canvas.add(obj);
    canvas.renderAll();
    var data = [];
    var stream;
    if (format === 'png') {
      stream = canvas.createPNGStream();
    } else {
      stream = canvas.CreateJPEGStream();
    }
    stream.on('data', function (chunk) {
      data.push(chunk);
    });
    stream.on('end', function () {
      callback(null, Buffer.concat(data));
    });
    stream.on('error', function (err) {
      callback(err, null);
    });
  }
  if (Buffer.isBuffer(input)) {
    svg = input.toString('utf-8');
  } else {
    // assume `input` is String
    if (input.indexOf('data:') == 0) {
      svg = atob(input.slice(input.indexOf(',') + 1));
    } else if (input.indexOf('<svg') >= 0) {
      svg = input;
    } else {
      isUrl = true;
    }
  }
  if (!isUrl) {
    fabric.loadSVGFromString(svg, cb);
  } else {
    fabric.loadSVGFromURL(input, cb);
  }
}

module.exports = svg2img;
