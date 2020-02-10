'use strict';

(function () {
  var windowStatsSettings = {
    COLOR: '#ffffff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    HEIGHT: 270,
    WIDTH: 420,
    X: 100,
    Y: 10,
    GAP: 10,
  };
  var windowTextStatsSettings = {
    X: 20,
    Y: 20,
    TOP_HEIGHT: 40,
    USERNAME_GAP: 10,
    COLOR: '#000000',
    SIZE: '16px',
    GAP: 20,
  };
  var userBarSettings = {
    WIDTH: 40,
    HEIGHT: 150,
    GAP: 50,
    COLOR: 'rgba(255, 0, 0, 1)',
    HSL_SAT_MIN: 30,
    HSL_SAT_MAX: 100,
    HSL_LIG_MIN: 30,
    HSL_LIG_MAX: 70,
    FIRST_X: 10,
    TEXT_HEIGHT: 20,
  };
  function renderGis(ctx, names, times) {
    var maxTime = window.utils.getMaxOfArray(times);
    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, names[i], times[i], maxTime, i);
    }
  }
  function renderBar(ctx, userName, userTime, maxTime, index) {
    var color = detectUserColor(userName);
    var height = userTime / maxTime * userBarSettings.HEIGHT;
    var x = windowStatsSettings.X + windowTextStatsSettings.X + userBarSettings.FIRST_X + (userBarSettings.WIDTH + userBarSettings.GAP) * index;
    var y = windowStatsSettings.Y + windowTextStatsSettings.Y + windowTextStatsSettings.TOP_HEIGHT + userBarSettings.TEXT_HEIGHT + userBarSettings.HEIGHT - height;
    renderRect(ctx, color, x, y, userBarSettings.WIDTH, height);
    renderText(ctx, Math.round(userTime), x, y - windowTextStatsSettings.GAP, windowTextStatsSettings.COLOR, windowTextStatsSettings.SIZE);
    renderText(ctx, userName, x, y + height + windowTextStatsSettings.USERNAME_GAP, windowTextStatsSettings.COLOR, windowTextStatsSettings.SIZE);
  }
  function detectUserColor(userName) {
    if (userName === 'Вы') {
      return userBarSettings.COLOR;
    } else {
      return 'hsl(231, ' + window.utils.getRandomInt(userBarSettings.HSL_SAT_MIN, userBarSettings.HSL_SAT_MAX) + '%, ' + window.utils.getRandomInt(userBarSettings.HSL_LIG_MIN, userBarSettings.HSL_LIG_MAX) + '%)';
    }
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
      ctx.fillText(item, x, y + index * windowTextStatsSettings.GAP);
    });
  }
  function renderWindow(ctx, x, y, width, height, text, names, times) {
    renderRect(ctx, windowStatsSettings.SHADOW_COLOR, x + windowStatsSettings.GAP, y + windowStatsSettings.GAP, width, height);
    renderRect(ctx, windowStatsSettings.COLOR, x, y, width, height);
    renderText(ctx, text, x + windowTextStatsSettings.X, y + windowTextStatsSettings.Y, windowTextStatsSettings.COLOR, windowTextStatsSettings.SIZE);
    renderGis(ctx, names, times);
  }
  window.renderStatistics = function (ctx, names, times) {
    renderWindow(ctx, windowStatsSettings.X, windowStatsSettings.Y, windowStatsSettings.WIDTH, windowStatsSettings.HEIGHT, 'Ура вы победили! \nСписок результатов:', names, times);
  };
})();
