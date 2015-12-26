<p style="text-align: center">
    <img src="docs/demonstrate.png" width="887" alt="slices">
</p>

# slices

> Node.js module for slicing given area into blocks by the given reference lines

[![Build Status](https://travis-ci.org/superRaytin/slices.svg?branch=master)](https://travis-ci.org/superRaytin/slices)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[![slices](https://nodei.co/npm/slices.png)](https://npmjs.org/package/slices)

[npm-url]: https://npmjs.org/package/slices
[downloads-image]: http://img.shields.io/npm/dm/slices.svg
[npm-image]: http://img.shields.io/npm/v/slices.svg

```js
var Slices = require('slices');
var blocks = Slices(500, 500, [100], [100]);
```

Get blocks:

```js
[
    { width: 100, height: 100, x: 0, y: 0 },
    { width: 400, height: 100, x: 100, y: 0 },
    { width: 100, height: 400, x: 0, y: 100 },
    { width: 400, height: 400, x: 100, y: 100 }
]
```

# Installation

```
npm install slices
```

# API

### Slices(width, height, lineXArray, lineYArray [, options])

- **width:** Number of pixels wide
- **height:** Number of pixels high
- **lineXArray:** reference lines of the X axis
- **lineYArray:** reference lines of the Y axis
- **options:** slice with some optional parameters, see [options](#options) for detail.

## Options

### middleBoundaryMode

Either true or false, default is false.

If set to true, this will put spaces between each two X axis as parent-block,
the areas between the first Y axis and last Y axis will be children of the parent-block, and it will generate boundary data.

<p style="text-align: center">
    <img src="docs/demonstrate2.png" width="870" alt="slices">
</p>

Below is an example:

```js
Slices(width, height, [x1, x2], [y1, y2, y3], {middleBoundaryMode: true});
```

Get blocks like below:

```js
[
    {
        "width": 500,
        "height": 100,
        "x": 0,
        "y": 0,
        "children": [
            {
                "width": 100,
                "height": 100,
                "x": 100,
                "y": 0,
                "left": 0,
                "top": 0,
                "parentBlockIndex": 0,
                "index": 0
            },
            {
                "width": 100,
                "height": 100,
                "x": 200,
                "y": 0,
                "left": 100,
                "top": 0,
                "parentBlockIndex": 0,
                "index": 1
            }
        ],
        "boundary": {
            "leftTop": {
                "x": 100,
                "y": 0
            },
            "rightBottom": {
                "x": 300,
                "y": 100
            }
        }
    },
    ...
]
```

# Testing

```
npm test
```

# License

MIT, see the [LICENSE](/LICENSE) file for detail.

