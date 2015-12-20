# slices

Converting image into slices by the given reference lines

```
var Slices = require('slices');
// Slices(width, height, lineXArray, lineYArray [, options]);
var blocks = Slices(500, 500, [100], [100]);
```

Get blocks:

```
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

# Testing

```
npm test
```

# License

MIT, see the [LICENSE](/LICENSE) file for detail.

