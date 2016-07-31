# SVG to PNG/JPEG based on fabric

To convert to JPEG, you must [build](https://github.com/Automattic/node-canvas/wiki)
[node-canvas](https://github.com/Automattic/node-canvas) with jpeg support.

## Usage
```js
var fs = require('fs');
var svg2img = require('svg2img');

svg2img('src.svg', { format: 'png', width: 200, height: 200 }, function (err, data) {
  fs.writeFileSync('dest.png', data);
});
```

## Options
- `format`: output format, default to 'png', otherwise 'jpg/jpeg'
- `width`: set output width
- `height`: set output height
