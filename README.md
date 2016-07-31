# SVG to PNG/JPEG based on fabric

To convert to JPEG, you must [build](https://github.com/Automattic/node-canvas/wiki)
[node-canvas](https://github.com/Automattic/node-canvas) with jpeg support.

## Usage
```js
var fs = require('fs');
var svg2img = require('svg2img');

// var input = Buffer.from(...);
// var input = '<svg>...</svg>';
// var input = 'data:image/xml+svg;base64,...';
// var input = 'http://url.to/a.svg';
var input = 'src.svg';
svg2img(input, { format: 'png', width: 200, height: 200 }, function (err, data) {
  fs.writeFileSync('dest.png', data);
});
```

## Options
- `format`: output format, default to 'png', otherwise 'jpg/jpeg'
- `width`: set output width, default to original width
- `height`: set output height, default to original height
