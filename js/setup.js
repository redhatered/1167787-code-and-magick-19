'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var COUNT_WIZARDS = 4;
var Key = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

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
var wizards = [];
var fragment = document.createDocumentFragment();

generateWizards();
renderWizards();

setupWindowOpen.addEventListener('click', setupWindowOpenClickHandler);

setupWindowOpen.addEventListener('keydown', function (evt) {
  if (evt.key === Key.ENTER) {
    showWizardSettings();
  }
});

setupWindowClose.addEventListener('click', setupWindowCloseClickHandler);

setupWindowClose.addEventListener('keydown', function (evt) {
  if (evt.key === Key.ENTER) {
    hideWizardSettings();
  }
});

wizardCoat.addEventListener('click', wizardCoatClickHandler);

wizardEyes.addEventListener('click', wizardEyesClickHandler);

wizardFireball.addEventListener('click', wizardFireballClickHandler);

function setupWindowOpenClickHandler() {
  showWizardSettings();
}

function setupWindowCloseClickHandler() {
  hideWizardSettings();
}

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
  var color = getRandomItem(FIREBALLS);
  wizardFireball.style.background = color;
  inputFireball.value = color;
}

function changeEyesColor() {
  var color = getRandomItem(EYES_COLORS);
  wizardEyes.style.fill = color;
  inputEyes.value = color;
}

function changeCoatColor() {
  var color = getRandomItem(COAT_COLORS);
  wizardCoat.style.fill = color;
  inputCoat.value = color;
}

function windowEscPressHandler(evt) {
  if (evt.key === Key.ESC && !(evt.target && evt.target.matches('input[type="text"]'))) {
    hideWizardSettings();
  }
}

function hideWizardSettings() {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', windowEscPressHandler);
}

function showWizardSettings() {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', windowEscPressHandler);
}

function generateWizards() {
  for (var i = 0; i < COUNT_WIZARDS; i++) {
    wizards.push(generateWizard());
  }
}

function generateWizard() {
  return {
    name: getRandomItem(NAMES) + ' ' + getRandomItem(LAST_NAMES),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS),
  };
}

function getRandomItem(itemsArr) {
  return itemsArr[Math.floor(Math.random() * itemsArr.length)];
}

function renderWizards() {
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  setupSimilarList.appendChild(fragment);
  setupWindow.querySelector('.setup-similar').classList.remove('hidden');
}

function renderWizard(wizardData) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
}
