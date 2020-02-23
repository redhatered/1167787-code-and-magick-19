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
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

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
    window.wizard.fireballChangeCallback(color);
  }

  function changeEyesColor() {
    var color = window.utils.getRandomItem(wizardMockData.EYES_COLORS);
    window.colorize(wizardEyes, color);
    window.wizard.eyesChangeCallback(color);
  }

  function changeCoatColor() {
    var color = window.utils.getRandomItem(wizardMockData.COAT_COLORS);
    window.colorize(wizardCoat, color);
    window.wizard.coatChangeCallback(color);
  }

  function renderWizard(wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  }

  window.wizard = {
    renderWizard: renderWizard,
    eyesChangeCallback: function () {},
    coatChangeCallback: function () {},
    fireballChangeCallback: function () {},
  };
})();
