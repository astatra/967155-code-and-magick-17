'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
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

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var timeSpent = times[i];
    var rank = timeSpent / maxTime;
    var currentBarHeight = rank * MAX_BAR;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(31, 58, 147,' + rank + ')';
    }

    ctx.fillRect(140 + (COLUMN_WIDTH + COLUMN_GAP) * i, (CLOUD_X - GAP) + (MAX_BAR - currentBarHeight), BAR_WIDTH, currentBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), 140 + (COLUMN_WIDTH + COLUMN_GAP) * i, (CLOUD_HEIGHT - currentBarHeight) - 40);
    ctx.fillText(names[i], 140 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);
  }
};
