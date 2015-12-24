'use strict';

var utils = require('./utils');

function Slices(width, height, lineXArray, lineYArray, options) {
  options = options || {};

  this.width = width;
  this.height = height;

  lineXArray = lineXArray || [];
  lineYArray = lineYArray || [];

  // 生成参考线的 X Y 方向的边界
  lineXArray.push(height);
  lineYArray.push(width);

  this.lineXArray = utils.sortAndUnique(lineXArray);
  this.lineYArray = utils.sortAndUnique(lineYArray);

  // instance properties
  this.options = {};

  // extend instance properties with global defaults and initial properties
  utils.extend(this.options, this.defaults, options);


  // there are no reference lines
  if (!this.lineXArray.length && !this.lineYArray.length) {
    throw new Error('At least one reference line');
  }

  return this;
}

Slices.prototype.defaults = {
  middleBoundaryMode: false
};

Slices.prototype.slice = function() {

  var options = this.options;

  var lineXArray = this.lineXArray;
  var lineYArray = this.lineYArray;
  var width = this.width;
  // var height = this.height;
  var middleBoundaryMode = options.middleBoundaryMode;

  var lineXLength = lineXArray.length;
  var lineYLength = lineYArray.length;

  // 中间边界模式
  // 这时会把 X 轴之间的空间作为一个父区块
  // 并把第一和最后的 Y 轴之间的区块作为父区块的子级，同时生成边界信息
  // Y 轴必须大于 2 根
  if (middleBoundaryMode) {
    if (lineYLength < 3) {
      middleBoundaryMode = false;
    }
  }

  var previousX = 0;
  var previousY = 0;
  var curX, curY, x, y, xEnd, yEnd;

  // full row when is at middleBoundaryMode
  // 整行区块信息
  var fullRow;

  // assign to child block info between the first Y line and the last Y line
  // when is at middleBoundaryMode
  // 中间边界模式时，第 1 根 与最后一根 Y 轴之间的子区块
  var middleChildBlock;
  var parentBlockIndex = 0;

  var blocks = [];

  // 只有 X 轴或 Y 轴的情况
  if (!lineYLength || !lineXLength) {
    return this.getChildBlocks();
  }

  // 非中间边界模式
  if (!middleBoundaryMode) {
    return this.getChildBlocks();
  }

  // 循环 X 和 Y 轴上的参考线，得到区块信息
  for (x = 0, xEnd = lineXLength; x < xEnd; x++) {
    curX = lineXArray[x];

    previousY = lineYArray[0];

    fullRow = {
      width: width,
      height: curX - previousX,
      x: 0,
      y: x === 0 ? 0 : previousX,
      children: [],
      // 需要抹擦去的图片区域
      boundary: {
        leftTop: {
          x: lineYArray[0],
          y: x === 0 ? 0 : previousX
        },
        rightBottom: {
          x: lineYArray[lineYLength - 2],
          y: curX
        }
      }
    };

    blocks.push(fullRow);

    for (y = 1, yEnd = lineYLength - 1; y < yEnd; y++) {
      curY = lineYArray[y];

      middleChildBlock = {
        width: curY - previousY,
        height: curX - previousX,
        x: previousY,
        y: x === 0 ? 0 : previousX
      };

      // 子区块附加额外信息
      // left: 距中间主区块左边界的绝对距离
      // top: 距中间主区块上边界的绝对距离，由于一直靠着最顶部的位置，所以一直是 0
      // parentBlockIndex: 子区块所属父区块的索引值
      // index: 子区块在父区块范围之内的索引值
      utils.extend(middleChildBlock, {
        left: y === 1 ? 0 : previousY - lineYArray[0],
        top: 0,
        parentBlockIndex: parentBlockIndex,
        index: y - 1
      });

      // 将子区块插入到父区块信息中
      fullRow.children.push(middleChildBlock);

      previousY = curY;
    }

    parentBlockIndex++;

    previousX = curX;
  }

  return blocks;
};

Slices.prototype.getChildBlocks = function() {

  var lineXArray = this.lineXArray;
  var lineYArray = this.lineYArray;
  var width = this.width;
  var height = this.height;

  var lineXLength = lineXArray.length;
  var lineYLength = lineYArray.length;

  var previousX = 0;
  var previousY = 0;
  var curX, curY, x, y, xEnd, yEnd;

  var blocks = [];

  // X 轴上有参考线
  if (lineXLength) {
    for (x = 0, xEnd = lineXLength; x < xEnd; x++) {
      curX = lineXArray[x];

      previousY = 0;

      // Y 轴上也有参考线
      if (lineYLength) {
        for (y = 0, yEnd = lineYLength; y < yEnd; y++) {
          curY = lineYArray[y];

          blocks.push({
            width: curY - previousY,
            height: curX - previousX,
            x: previousY,
            y: x === 0 ? 0 : previousX
          });

          previousY = curY;
        }
      }
      // 只有 X 轴的情况
      else {
        blocks.push({
          width: width,
          height: curX - previousX,
          x: 0,
          y: x === 0 ? 0 : previousX
        });
      }

      previousX = curX;
    }
  }
  // 只有 Y 轴的情况
  else {
    previousY = 0;

    for (y = 0, yEnd = lineYLength; y < yEnd; y++) {
      curY = lineYArray[y];

      blocks.push({
        width: curY - previousY,
        height: height,
        x: x === 0 ? 0 : previousY,
        y: 0
      });

      previousY = curY;
    }
  }

  return blocks;
};

module.exports = Slices;