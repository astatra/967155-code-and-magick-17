'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING_X = 140;
var GAP = 10;
var FONT_SIZE = 16;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var titleBottom = 60;
  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, titleBottom);

  var maxTime = getMaxElement(times);

  names.forEach(function (playersName, index) {
    var timeSpent = times[index];
    var rank = timeSpent / maxTime;
    var currentBarHeight = rank * MAX_BAR;

    var currentResultX = CLOUD_PADDING_X + (COLUMN_WIDTH + COLUMN_GAP) * index;
    var currentResultY = titleBottom + FONT_SIZE + GAP * 2 + MAX_BAR - currentBarHeight;

    if (playersName === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(31, 58, 147,' + rank + ')';
    }

    ctx.fillRect(currentResultX, currentResultY, BAR_WIDTH, currentBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(timeSpent), currentResultX, currentResultY - GAP);
    ctx.fillText(playersName, currentResultX, currentResultY + currentBarHeight + FONT_SIZE);
  });
};
