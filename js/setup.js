'use strict';
(function () {
  var wizardMockData = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALLS_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    COUNT_WIZARDS: 4,
  };
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var setupWindow = document.querySelector('.setup');
  var setupWindowOpen = document.querySelector('.setup-open');
  var setupWindowClose = setupWindow.querySelector('.setup-close');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var wizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
  var inputCoat = setupWindow.querySelector('input[name=coat-color]');
  var inputEyes = setupWindow.querySelector('input[name=eyes-color]');
  var inputFireball = setupWindow.querySelector('input[name=fireball-color]');
  var draggableBtn = setupWindow.querySelector('.upload');
  var fragment = document.createDocumentFragment();

  window.backend.load(renderWizards, window.utils.errorHandler);
  window.dialog.setDialog(setupWindow);
  window.dialog.setDialogOpenBtn(setupWindowOpen);
  window.dialog.setDialogCloseBtn(setupWindowClose);
  window.dialog.setDraggableElement(draggableBtn);

  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);

  function wizardCoatClickHandler() {
    changeCoatColor();
  }

  function wizardEyesClickHandler() {
    changeEyesColor();
  }

  function wizardFireballClickHandler() {
    changeFireballColor();
  }

  function changeFireballColor() {
    var color = window.utils.getRandomItem(wizardMockData.FIREBALLS_COLORS);
    window.colorize(wizardFireball, color);
    inputFireball.value = color;
  }

  function changeEyesColor() {
    var color = window.utils.getRandomItem(wizardMockData.EYES_COLORS);
    window.colorize(wizardEyes, color);
    inputEyes.value = color;
  }

  function changeCoatColor() {
    var color = window.utils.getRandomItem(wizardMockData.COAT_COLORS);
    window.colorize(wizardCoat, color);
    inputCoat.value = color;
  }

  function renderWizards(wizards) {
    for (var j = 0; j < Math.min(MAX_SIMILAR_WIZARD_COUNT, wizards.length); j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }
    setupSimilarList.appendChild(fragment);
    setupWindow.querySelector('.setup-similar').classList.remove('hidden');
  }

  function renderWizard(wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  }

})();
