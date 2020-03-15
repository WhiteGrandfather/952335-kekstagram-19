'use strict';

(function () {
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileButton = imageUploadFormElement.querySelector('#upload-file');
  var uploadCancelButton = imageUploadFormElement.querySelector('#upload-cancel');
  var imageUploadOverlay = imageUploadFormElement.querySelector('.img-upload__overlay');
  var effectLevelPin = imageUploadFormElement.querySelector('.effect-level__pin');
  var imgUploadPreview = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelContainer = imageUploadOverlay.querySelector('.img-upload__effect-level');

  var onPopupEscPress = function (evt) {
    window.util.getEscEvent(evt, onCloseUploadOverlayPopup);
  };

  var onStopPropagation = function (evt) {
    evt.stopPropagation();
  };

  var onOpenUploadOverlayPopup = function () {
    imageUploadOverlay.classList.remove('hidden');
    uploadCancelButton.addEventListener('click', onCloseUploadOverlayPopup);
    document.addEventListener('keydown', onPopupEscPress);
    uploadFileButton.removeEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPin.addEventListener('mousedown', window.slider.onDialogHandlerMousedownDrag);
    imageUploadFormElement.addEventListener('submit', window.uploadPctureForm.onImageUploadFormSubmit);
    imageUploadFormElement.addEventListener('keydown', onStopPropagation);
    imgUploadPreview.addEventListener('click', onStopPropagation);
    effectLevelContainer.classList.add('hidden');
  };

  var onCloseUploadOverlayPopup = function () {
    imageUploadOverlay.classList.add('hidden');
    imageUploadFormElement.reset();
    uploadCancelButton.removeEventListener('click', onCloseUploadOverlayPopup);
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPin.addEventListener('mousedown', window.slider.onDialogHandlerMousedownDrag);
    imageUploadFormElement.removeEventListener('submit', window.uploadPctureForm.onImageUploadFormSubmit);
    imageUploadFormElement.removeEventListener('keydown', onStopPropagation);
    imgUploadPreview.removeEventListener('click', onStopPropagation);
    window.uploadPctureForm.pinDefaultPosition();
  };

  uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);
})();
