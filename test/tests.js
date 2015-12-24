
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
  });

  it('middleBoundaryMode works', function() {
    var block3 = Slices(width, height, [100, 300], [100, 200, 300], {middleBoundaryMode: true});
    var result3 = [{"width":500,"height":100,"x":0,"y":0,"children":[{"width":100,"height":100,"x":100,"y":0,"left":0,"top":0,"parentBlockIndex":0,"index":0},{"width":100,"height":100,"x":200,"y":0,"left":100,"top":0,"parentBlockIndex":0,"index":1}],"boundary":{"leftTop":{"x":100,"y":0},"rightBottom":{"x":300,"y":100}}},{"width":500,"height":200,"x":0,"y":100,"children":[{"width":100,"height":200,"x":100,"y":100,"left":0,"top":0,"parentBlockIndex":1,"index":0},{"width":100,"height":200,"x":200,"y":100,"left":100,"top":0,"parentBlockIndex":1,"index":1}],"boundary":{"leftTop":{"x":100,"y":100},"rightBottom":{"x":300,"y":300}}},{"width":500,"height":200,"x":0,"y":300,"children":[{"width":100,"height":200,"x":100,"y":300,"left":0,"top":0,"parentBlockIndex":2,"index":0},{"width":100,"height":200,"x":200,"y":300,"left":100,"top":0,"parentBlockIndex":2,"index":1}],"boundary":{"leftTop":{"x":100,"y":300},"rightBottom":{"x":300,"y":500}}}];
    should(block3).eql(result3);
  });
});

describe('utils', function() {
  it('sortAndUnique() works', function() {
    var arr = [223, 1, 8863, 223, 1, 9];
    should(utils.sortAndUnique(arr)).eql([1, 9, 223, 8863]);

    arr = [87, 0, 2, 13, 87, 9, 1, 9, 10];
    should(utils.sortAndUnique(arr)).eql([0, 1, 2, 9, 10, 13, 87]);
  });
});