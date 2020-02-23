'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function updateWizards() {
    window.setup.renderWizards(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  }

  function setCoatColor(color) {
    coatColor = color;
  }

  function setEyesColor(color) {
    eyesColor = color;
  }

  function setWizards(wizardsArray) {
    wizards = wizardsArray;
  }

  window.similar = {
    setWizards: setWizards,
    setCoatColor: setCoatColor,
    setEyesColor: setEyesColor,
    updateWizards: updateWizards,
  };
})();
