'use strict';

var atob = require('atob');
var fabric = require('fabric').fabric;


function svg2img(input, opts, callback) {
  var canvas = new fabric.createCanvasForNode();
  var svg;
  var isUrl = false;
  function cb(objects, options) {
    canvas.setWidth(options.width);
    canvas.setHeight(options.height);
    var obj = fabric.util.groupSVGElements(objects, options);
    canvas.add(obj);
    canvas.renderAll();
    var data = [];
    var stream = canvas.createPNGStream();
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
    if (input.indexOf('data:image/svg+xml;base64,') >= 0) {
      svg = atob(input.substring('data:image/svg+xml;base64,'.length));
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
