'use strict';

(function () {
  var POPUP_BIG_PICTURE_CLASS_NUMBER = 1;
  var bigPictureElement = document.querySelector('.big-picture');
  var picturesInlineListElement = document.querySelector('.pictures');
  var bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');

  var onBigPicturePopupEscPress = function (evt) {
    window.util.getEscEvent(evt, onCloseBigPictureOverlayPopup);
  };

  var onBigPicturePopup = function (evt) {
    if (evt.target.matches('a') || evt.target.matches('img')) {
      window.bigPicture.renerBigPicture(evt.target.classList[POPUP_BIG_PICTURE_CLASS_NUMBER]);
      onOpenBigPictureOverlayPopup();
    }
  };


  var onOpenBigPictureOverlayPopup = function () {
    bigPictureElement.classList.remove('hidden');
    picturesInlineListElement.removeEventListener('click', onBigPicturePopup);
    document.addEventListener('keydown', onBigPicturePopupEscPress);
    bigPictureCloseButton.addEventListener('click', onCloseBigPictureOverlayPopup);
  };

  var onCloseBigPictureOverlayPopup = function () {
    bigPictureElement.classList.add('hidden');
    picturesInlineListElement.addEventListener('click', onBigPicturePopup);
    document.removeEventListener('keydown', onBigPicturePopupEscPress);
    bigPictureCloseButton.removeEventListener('click', onCloseBigPictureOverlayPopup);
  };

  picturesInlineListElement.addEventListener('click', onBigPicturePopup);
})();
