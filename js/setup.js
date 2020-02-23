'use strict';
(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var setupWindow = document.querySelector('.setup');
  var setupWindowOpen = document.querySelector('.setup-open');
  var setupWindowClose = setupWindow.querySelector('.setup-close');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var draggableBtn = setupWindow.querySelector('.upload');
  var fragment = document.createDocumentFragment();

  window.backend.load(loadHandler, window.utils.errorHandler);
  window.dialog.setDialog(setupWindow);
  window.dialog.setDialogOpenBtn(setupWindowOpen);
  window.dialog.setDialogCloseBtn(setupWindowClose);
  window.dialog.setDraggableElement(draggableBtn);

  window.wizard.coatChangeCallback = window.debounce(function (color) {
    window.form.setupInputCoat(color);
    window.similar.setCoatColor(color);
    window.similar.updateWizards();
  });

  window.wizard.eyesChangeCallback = window.debounce(function (color) {
    window.form.setupInputEyes(color);
    window.similar.setEyesColor(color);
    window.similar.updateWizards();
  });

  window.wizard.fireballChangeCallback = window.debounce(function (color) {
    window.form.setupInputFireball(color);
  });

  function loadHandler(wizards) {
    renderWizards(wizards);
    window.similar.setWizards(wizards);
  }

  function renderWizards(wizards) {
    setupSimilarList.innerHTML = '';
    for (var j = 0; j < Math.min(MAX_SIMILAR_WIZARD_COUNT, wizards.length); j++) {
      fragment.appendChild(window.wizard.renderWizard(wizards[j]));
    }
    setupSimilarList.appendChild(fragment);
    setupWindow.querySelector('.setup-similar').classList.remove('hidden');
  }

  window.setup = {
    renderWizards: renderWizards
  };
})();
