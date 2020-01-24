'use strict';

var WINDOW_COLOR = '#ffffff';
var WINDOW_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;
var WINDOW_HEIGHT = 270;
var WINDOW_WIDTH = 420;
var WINDOW_X = 100;
var WINDOW_Y = 10;
var TEXT_X = 20;
var TEXT_Y = 20;
var WINDOW_TEXT_COLOR = '#000000';
var WINDOW_TEXT_SIZE = '16px';
var WINDOW_TEXT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var USER_BAR_HSL_SAT_MIN = 30;
var USER_BAR_HSL_SAT_MAX = 100;
var USER_BAR_HSL_LIG_MIN = 30;
var USER_BAR_HSL_LIG_MAX = 70;
var BAR_HEIGHT = 150;
var FIRST_BAR_X = 10;
var TOP_TEXT_HEIGHT = 40;
var BAR_TEXT_HEIGHT = 20;
var USERNAME_GAP = 10;

function renderGis(ctx, names, times) {
  var maxTime = getMaxOfArray(times);
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, names[i], times[i], maxTime, i);
  }
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function renderBar(ctx, userName, userTime, maxTime, index) {
  var color = detectUserColor(userName);
  var height = userTime / maxTime * BAR_HEIGHT;
  var x = WINDOW_X + TEXT_X + FIRST_BAR_X + (BAR_WIDTH + BAR_GAP) * index;
  var y = WINDOW_Y + TEXT_Y + TOP_TEXT_HEIGHT + BAR_TEXT_HEIGHT + BAR_HEIGHT - height;
  renderRect(ctx, color, x, y, BAR_WIDTH, height);
  renderText(ctx, Math.round(userTime), x, y - WINDOW_TEXT_GAP, WINDOW_TEXT_COLOR, WINDOW_TEXT_SIZE);
  renderText(ctx, userName, x, y + height + USERNAME_GAP, WINDOW_TEXT_COLOR, WINDOW_TEXT_SIZE);
}

function detectUserColor(userName) {
  if (userName === 'Вы') {
    return USER_BAR_COLOR;
  } else {
    return 'hsl(231, ' + randomInt(USER_BAR_HSL_SAT_MIN, USER_BAR_HSL_SAT_MAX) + '%, ' + randomInt(USER_BAR_HSL_LIG_MIN, USER_BAR_HSL_LIG_MAX) + '%)';
  }
}

function randomInt(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

function renderRect(ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function renderText(ctx, text, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  ctx.font = size + ' PT Mono';
  var stringsArray = text.toString().split('\n');
  stringsArray.forEach(function (item, index) {
    ctx.fillText(item, x, y + index * WINDOW_TEXT_GAP);
  });
}

function renderWindow(ctx, x, y, width, height, text, names, times) {
  renderRect(ctx, WINDOW_SHADOW_COLOR, x + GAP, y + GAP, width, height);
  renderRect(ctx, WINDOW_COLOR, x, y, width, height);
  renderText(ctx, text, x + TEXT_X, y + TEXT_Y, WINDOW_TEXT_COLOR, WINDOW_TEXT_SIZE);
  renderGis(ctx, names, times);
}

window.renderStatistics = function (ctx, names, times) {
  renderWindow(ctx, WINDOW_X, WINDOW_Y, WINDOW_WIDTH, WINDOW_HEIGHT, 'Ура вы победили! \nСписок результатов:', names, times);
};
