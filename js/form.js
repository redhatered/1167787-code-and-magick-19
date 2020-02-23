'use strict';

(function () {
  var inputCoat = document.querySelector('form input[name=coat-color]');
  var inputEyes = document.querySelector('form input[name=eyes-color]');
  var inputFireball = document.querySelector('form input[name=fireball-color]');

  function setupInputCoat(value) {
    inputCoat.value = value;
  }

  function setupInputEyes(value) {
    inputEyes.value = value;
  }

  function setupInputFireball(value) {
    inputFireball.value = value;
  }

  window.form = {
    setupInputCoat: setupInputCoat,
    setupInputEyes: setupInputEyes,
    setupInputFireball: setupInputFireball,
  };
})();
