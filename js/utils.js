'use strict';

(function () {
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  function isEscEvent(evt, callback) {
    if (evt.key === Key.ESC) {
      callback();
    }
  }

  function isEnterEvent(evt, callback) {
    if (evt.key === Key.ENTER) {
      callback();
    }
  }

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
  function getRandomInt(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }
  function getRandomItem(itemsArr) {
    return itemsArr[Math.floor(Math.random() * itemsArr.length)];
  }
  window.utils = {
    getMaxOfArray: getMaxOfArray,
    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };
})();
