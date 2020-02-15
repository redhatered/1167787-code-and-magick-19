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

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.utils = {
    getMaxOfArray: getMaxOfArray,
    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    errorHandler: errorHandler,
  };
})();
