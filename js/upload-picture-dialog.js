'use strict';

(function () {
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileButton = imageUploadFormElement.querySelector('#upload-file');
  var uploadCancelButton = imageUploadFormElement.querySelector('#upload-cancel');
  var imageUploadOverlay = imageUploadFormElement.querySelector('.img-upload__overlay');
  var effectLevelPin = imageUploadFormElement.querySelector('.effect-level__pin');
  var imgUploadPreview = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelContainer = imageUploadOverlay.querySelector('.img-upload__effect-level');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersForm = imageFiltersElement.querySelector('.img-filters__form');
  var uploadScaleElement = document.querySelector('.img-upload__scale');
  var bodyElement = document.querySelector('body');

  var onPopupEscPress = function (evt) {
    window.util.getEscEvent(evt, onCloseUploadOverlayPopup);
  };

  var onStopPropagation = function (evt) {
    evt.stopPropagation();
  };

  var onFormSend = function (evt) {
    window.backend.upload(function () {
      onCloseUploadOverlayPopup();
    }, window.popupMessage.renderErrorMessage, new FormData(imageUploadFormElement));
    evt.preventDefault();
    window.popupMessage.renderSuccessMessage(evt);
  };

  var onOpenUploadOverlayPopup = function () {
    imageUploadOverlay.classList.remove('hidden');
    uploadCancelButton.addEventListener('click', onCloseUploadOverlayPopup);
    document.addEventListener('keydown', onPopupEscPress);
    uploadFileButton.removeEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPin.addEventListener('mousedown', window.slider.onDialogMousedownDrag);
    imageUploadFormElement.addEventListener('submit', window.uploadPictureForm.onImageUploadFormSubmit);
    imageUploadFormElement.addEventListener('keydown', onStopPropagation);
    imgUploadPreview.addEventListener('click', onStopPropagation);
    imageUploadFormElement.addEventListener('submit', onFormSend);
    effectLevelContainer.classList.add('hidden');
    imageFiltersForm.removeEventListener('click', window.minPictures.onFilterActive);
    imageFiltersForm.removeEventListener('click', window.minPictures.onFilterChange);
    uploadScaleElement.addEventListener('click', window.uploadPictureForm.onUploadScale);
    bodyElement.classList.add('modal-open');
  };

  var onCloseUploadOverlayPopup = function () {
    imageUploadOverlay.classList.add('hidden');
    imageUploadFormElement.reset();
    uploadCancelButton.removeEventListener('click', onCloseUploadOverlayPopup);
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPin.addEventListener('mousedown', window.slider.onDialogMousedownDrag);
    imageUploadFormElement.removeEventListener('submit', window.uploadPictureForm.onImageUploadFormSubmit);
    imageUploadFormElement.removeEventListener('keydown', onStopPropagation);
    imgUploadPreview.removeEventListener('click', onStopPropagation);
    imageUploadFormElement.removeEventListener('submit', onFormSend);
    window.uploadPictureForm.pinDefaultPosition();
    window.uploadPictureForm.removeEffectClass();
    imageFiltersForm.addEventListener('click', window.minPictures.onFilterActive);
    imageFiltersForm.addEventListener('click', window.minPictures.onFilterChange);
    uploadScaleElement.removeEventListener('click', window.uploadPictureForm.onUploadScale);
    bodyElement.classList.remove('modal-open');
  };

  uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);

  window.uploadPictureDialog = {
    onCloseUploadOverlayPopup: onCloseUploadOverlayPopup
  };
})();
