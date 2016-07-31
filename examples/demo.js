'use strict';

var fs = require('fs');
var path = require('path');
var svg2img = require('../index');

// '3.svg' comes from http://fabricjs.com/assets/3.svg
svg2img(path.join(__dirname, '3.svg'), { width: 408, height: 402 }, function writeFile(err, data) {
  fs.writeFileSync(path.join(__dirname, 'demo.png'), data);
});
