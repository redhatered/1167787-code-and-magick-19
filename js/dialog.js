'use strict';
(function () {
  var dialog;
  var dialogOpenBtn;
  var dialogCloseBtn;
  var draggableBtn;
  var form;

  function setupWindowOpenClickHandler() {
    showDialog();
  }

  function setupWindowCloseClickHandler() {
    hideDialog();
  }

  function windowEscPressHandler(evt) {
    if (!(evt.target && evt.target.matches('input[type="text"]'))) {
      window.utils.isEscEvent(evt, hideDialog);
    }
  }

  function setDialog(element) {
    dialog = element;
    form = element.querySelector('form');
  }

  function setDialogOpenBtn(element) {
    dialogOpenBtn = element;
    dialogOpenBtn.addEventListener('click', setupWindowOpenClickHandler);
    dialogOpenBtn.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, showDialog);
    });
    form.addEventListener('submit', formSubmitHandler);
  }

  function setDialogCloseBtn(element) {
    dialogCloseBtn = element;
    dialogCloseBtn.addEventListener('click', setupWindowCloseClickHandler);
    dialogCloseBtn.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, hideDialog);
    });
  }

  function setDraggableElement(element) {
    draggableBtn = element;
    draggableBtn.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
        dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';

      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        if (dragged) {
          var clickPreventDefaultHandler = function (clickEvt) {
            clickEvt.preventDefault();
            draggableBtn.removeEventListener('click', clickPreventDefaultHandler);
          };
          draggableBtn.addEventListener('click', clickPreventDefaultHandler);
        }

      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  }

  function hideDialog() {
    dialog.classList.add('hidden');
    document.removeEventListener('keydown', windowEscPressHandler);
    setDefaultSettings();
  }

  function showDialog() {
    dialog.classList.remove('hidden');
    document.addEventListener('keydown', windowEscPressHandler);
  }

  function setDefaultSettings() {
    dialog.removeAttribute('style');
  }

  function formSubmitHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), hideDialog, window.utils.errorHandler);
  }

  window.dialog = {
    setDialog: setDialog,
    setDialogOpenBtn: setDialogOpenBtn,
    setDialogCloseBtn: setDialogCloseBtn,
    setDraggableElement: setDraggableElement,
  };
})();
