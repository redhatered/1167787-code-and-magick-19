'use strict';

(function () {

  window.colorize = function (element, color) {
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
  };
})();
