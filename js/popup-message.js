'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var successMessageElement = document.querySelector('#success').content.querySelector('.success');
  var errorMessageElement = document.querySelector('#error').content.querySelector('.error');

  var onStopPropagation = function (evt) {
    evt.stopPropagation();
  };

  var onSuccessEscMessageClose = function (evt) {
    window.util.getEscEvent(evt, onCloseSuccessMessage);
  };

  var onErrorEscMessageClose = function (evt) {
    window.util.getEscEvent(evt, onCloseErrorMessage);
  };

  var onCloseSuccessMessage = function () {
    mainElement.querySelector('.success__inner').removeEventListener('click', onStopPropagation);
    document.removeEventListener('keydown', onSuccessEscMessageClose);
    mainElement.querySelector('.success').removeEventListener('click', onCloseSuccessMessage);
    mainElement.querySelector('.success__button').removeEventListener('click', onCloseSuccessMessage);
    mainElement.querySelector('.success').remove();
  };

  var onCloseErrorMessage = function () {
    document.removeEventListener('keydown', onErrorEscMessageClose);
    mainElement.querySelector('.error').removeEventListener('click', onCloseSuccessMessage);
    mainElement.querySelector('.error__button').removeEventListener('click', onCloseSuccessMessage);
    mainElement.querySelector('.error').remove();
  };

  var rendreSuccessMessage = function () {
    var element = successMessageElement.cloneNode(true);

    mainElement.appendChild(element);

    mainElement.querySelector('.success__inner').addEventListener('click', onStopPropagation);
    document.addEventListener('keydown', onSuccessEscMessageClose);
    mainElement.querySelector('.success').addEventListener('click', onCloseSuccessMessage);
    mainElement.querySelector('.success__button').addEventListener('click', onCloseSuccessMessage);
  };

  var rendreErrorMessage = function () {
    var element = errorMessageElement.cloneNode(true);

    mainElement.appendChild(element);

    mainElement.querySelector('.error__inner').addEventListener('click', onStopPropagation);
    document.addEventListener('keydown', onErrorEscMessageClose);
    mainElement.querySelector('.error').addEventListener('click', onCloseErrorMessage);
    mainElement.querySelector('.error__button').addEventListener('click', onCloseErrorMessage);
    window.uploadPictureDialog();
    if (mainElement.querySelector('.success')) {
      mainElement.querySelector('.success').remove();
    }
  };

  window.popupMessage = {
    rendreSuccessMessage: rendreSuccessMessage,
    rendreErrorMessage: rendreErrorMessage
  };
})();
