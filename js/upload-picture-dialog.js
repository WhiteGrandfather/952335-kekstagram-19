'use strict';

(function () {
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileButtonElement = imageUploadFormElement.querySelector('#upload-file');
  var uploadCancelButtonElement = imageUploadFormElement.querySelector('#upload-cancel');
  var imageUploadOverlayElement = imageUploadFormElement.querySelector('.img-upload__overlay');
  var effectLevelPinElement = imageUploadFormElement.querySelector('.effect-level__pin');
  var imgUploadPreviewElement = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelContainerElement = imageUploadOverlayElement.querySelector('.img-upload__effect-level');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersFormElement = imageFiltersElement.querySelector('.img-filters__form');
  var uploadScaleElement = document.querySelector('.img-upload__scale');
  var bodyElement = document.querySelector('body');
  var imageUploadButtonElement = document.querySelector('#upload-file');

  var onPopupEscPress = function (evt) {
    window.util.getEscEvent(evt, onCloseUploadOverlayPopup);
  };

  var onStopPropagation = function (evt) {
    evt.stopPropagation();
  };

  var onFormSend = function (evt) {
    evt.preventDefault();
    if (window.uploadPictureForm.validateHashtags()) {
      window.backend.upload(onCloseUploadOverlayPopup, window.popupMessage.renderErrorMessage, new FormData(imageUploadFormElement));
      window.popupMessage.renderSuccessMessage(evt);
    }
  };

  var onUploadImage = function () {
    window.uploadImage.onUploadImage(imageUploadButtonElement);
  };

  var onOpenUploadOverlayPopup = function () {
    imageUploadOverlayElement.classList.remove('hidden');
    uploadCancelButtonElement.addEventListener('click', onCloseUploadOverlayPopup);
    document.addEventListener('keydown', onPopupEscPress);
    uploadFileButtonElement.removeEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPinElement.addEventListener('mousedown', window.slider.onDialogMousedownDrag);
    document.querySelector('.text__hashtags').addEventListener('input', window.uploadPictureForm.validateHashtags);
    imageUploadFormElement.addEventListener('keydown', onStopPropagation);
    imgUploadPreviewElement.addEventListener('click', onStopPropagation);
    imageUploadFormElement.addEventListener('submit', onFormSend);
    effectLevelContainerElement.classList.add('hidden');
    imageFiltersFormElement.removeEventListener('click', window.minPictures.onFilterActive);
    imageFiltersFormElement.removeEventListener('click', window.minPictures.onFilterChange);
    uploadScaleElement.addEventListener('click', window.uploadPictureForm.onUploadScale);
    imageUploadButtonElement.removeEventListener('change', onUploadImage);
    bodyElement.classList.add('modal-open');
  };

  var onCloseUploadOverlayPopup = function () {
    imageUploadOverlayElement.classList.add('hidden');
    imageUploadFormElement.reset();
    uploadCancelButtonElement.removeEventListener('click', onCloseUploadOverlayPopup);
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFileButtonElement.addEventListener('change', onOpenUploadOverlayPopup);
    effectLevelPinElement.addEventListener('mousedown', window.slider.onDialogMousedownDrag);
    imageUploadFormElement.removeEventListener('keydown', onStopPropagation);
    imgUploadPreviewElement.removeEventListener('click', onStopPropagation);
    imageUploadFormElement.removeEventListener('submit', onFormSend);
    window.uploadPictureForm.pinDefaultPosition();
    window.uploadPictureForm.removeEffectClass();
    imageFiltersFormElement.addEventListener('click', window.minPictures.onFilterActive);
    imageFiltersFormElement.addEventListener('click', window.minPictures.onFilterChange);
    uploadScaleElement.removeEventListener('click', window.uploadPictureForm.onUploadScale);
    imageUploadButtonElement.addEventListener('change', onUploadImage);
    bodyElement.classList.remove('modal-open');
  };

  imageUploadButtonElement.addEventListener('change', onUploadImage);
  uploadFileButtonElement.addEventListener('change', onOpenUploadOverlayPopup);

  window.uploadPictureDialog = {
    onCloseUploadOverlayPopup: onCloseUploadOverlayPopup,
  };
})();
