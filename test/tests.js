
var should = require('should');
var Slices = require('../lib/index');
var utils = require('../lib/utils');

var width = 500;
var height = 500;
var lineXArray = [100, 300];
var lineYArray = [100, 300];

describe('entrance method Slices()', function() {
  it('Slices(width, height, lineXArray, lineYArray) works', function() {
    var blocks = Slices(width, height, lineXArray, lineYArray);
    var result = [{ width: 100, height: 100, x: 0, y: 0 },
      { width: 200, height: 100, x: 100, y: 0 },
      { width: 200, height: 100, x: 300, y: 0 },
      { width: 100, height: 200, x: 0, y: 100 },
      { width: 200, height: 200, x: 100, y: 100 },
      { width: 200, height: 200, x: 300, y: 100 },
      { width: 100, height: 200, x: 0, y: 300 },
      { width: 200, height: 200, x: 100, y: 300 },
      { width: 200, height: 200, x: 300, y: 300 }];
    should(blocks).eql(result);
    //console.log(Slices(width, height, lineXArray, lineYArray, {middleBoundaryMode: true}));

    var blocks2 = Slices(width, height, [100], [100]);
    var result2 = [{ width: 100, height: 100, x: 0, y: 0 },
      { width: 400, height: 100, x: 100, y: 0 },
      { width: 100, height: 400, x: 0, y: 100 },
      { width: 400, height: 400, x: 100, y: 100 }];
    should(blocks2).eql(result2);

    var result3 = Slices(width, height, [100, 300], [100, 200, 300], {middleBoundaryMode: true});
    console.log(JSON.stringify(result3));
  });
});
