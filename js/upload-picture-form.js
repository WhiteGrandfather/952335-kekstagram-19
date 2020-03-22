'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var EFFECT_CLASS_NUMBER = 1;
  var HASHTAG_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var PIN_DEFAULT_POSITION = '453px';
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var effects = imageUploadFormElement.querySelectorAll('.effects__item');
  var imageUploadOverlay = imageUploadFormElement.querySelector('.img-upload__overlay');
  var imgUploadPreview = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelLine = imageUploadFormElement.querySelector('.effect-level__line');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectLevelContainer = imageUploadOverlay.querySelector('.img-upload__effect-level');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var uploadScaleElement = document.querySelector('.img-upload__scale');
  var scaleControlMin = uploadScaleElement.querySelector('.scale__control--smaller');
  var scaleControlValue = uploadScaleElement.querySelector('.scale__control--value');
  var scaleControlMax = uploadScaleElement.querySelector('.scale__control--bigger');
  var previewImage = imgUploadPreview.querySelector('img');

  var renderSuccessMessage = function () {
    var element = successMessage.cloneNode(true);
    main.appendChild(element);
  };

  var getEffectsClass = function () {
    var effectsClassList = [];
    for (var i = 0; i < effects.length; i++) {
      effectsClassList.push(effects[i].querySelector('.effects__preview').classList[EFFECT_CLASS_NUMBER]);
    }
    return effectsClassList;
  };

  var pinDefaultPosition = function () {
    effectLevelPin.style.left = PIN_DEFAULT_POSITION;
    effectLevelDepth.style.width = PIN_DEFAULT_POSITION;
    previewImage.style.filter = '';
  };

  var removeEffectClass = function () {
    for (var i = 0; i < getEffectsClass().length; i++) {
      pinDefaultPosition();
      previewImage.classList.remove(getEffectsClass()[i]);
    }
  };

  var onClickEffect = function (effect, effectClass) {
    effect.addEventListener('click', function () {
      removeEffectClass();
      previewImage.classList.add(effectClass);
      if (effectClass === 'effects__preview--none') {
        effectLevelContainer.classList.add('hidden');
      } else {
        effectLevelContainer.classList.remove('hidden');
      }
    });
  };

  var onClickEffectChange = function () {
    for (var i = 0; i < effects.length; i++) {
      onClickEffect(effects[i], getEffectsClass()[i]);
    }
  };

  onClickEffectChange();

  var validateHashtags = function () {
    var hashtags = textHashtagsElement.value.trim().toLowerCase().split(/\s+/);

    if (textHashtagsElement.value.trim().length === 0) {
      return true;
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '#') {
        textHashtagsElement.setCustomValidity('Хеш-тег не может состоят только из решетки.');
        return false;
      }

      if (hashtags[i][0] !== '#') {
        textHashtagsElement.setCustomValidity('Каждый хеш-тег начинается с решетки "#".');
        return false;
      }

      if (!(/^[#][a-zа-яё0-9]+$/.test(hashtags[i]))) {
        textHashtagsElement.setCustomValidity('Хеш-тег состоит из букв и цифр.');
        return false;
      }

      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        textHashtagsElement.setCustomValidity('Хеш-тег не может быть длинее 20 символов.');
        return false;
      }

      var currentHashtag = hashtags[i];

      for (var x = i + 1; x < hashtags.length; x++) {
        if (hashtags.length !== 1 && currentHashtag === hashtags[x]) {
          textHashtagsElement.setCustomValidity('Не может быть повторяющихся хеш-тегов. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.');
          return false;
        }
      }
    }

    if (hashtags.length > HASHTAG_MAX_COUNT) {
      textHashtagsElement.setCustomValidity('Максимальное количество хеш-тегов ' + HASHTAG_MAX_COUNT + '.');
      return false;
    }

    textHashtagsElement.setCustomValidity('');

    return true;
  };

  var onUploadScale = function (evt) {
    var currentControlValue = Number.parseInt(scaleControlValue.value, 10);

    switch (evt.target) {
      case scaleControlMin:
        scaleControlValue.value = window.util.getMinMaxValue(currentControlValue - SCALE_STEP, MAX_SCALE, MIN_SCALE) + '%';
        previewImage.style.transform = 'scale(' + (Number.parseInt(scaleControlValue.value, 10) / 100) + ')';
        break;
      case scaleControlMax:
        scaleControlValue.value = window.util.getMinMaxValue(currentControlValue + SCALE_STEP, MAX_SCALE, MIN_SCALE) + '%';
        previewImage.style.transform = 'scale(' + (Number.parseInt(scaleControlValue.value, 10) / 100) + ')';
        break;
    }
  };

  window.uploadPictureForm = {
    pinDefaultPosition: pinDefaultPosition,
    renderSuccessMessage: renderSuccessMessage,
    onUploadScale: onUploadScale,
    removeEffectClass: removeEffectClass,
    validateHashtags: validateHashtags,
  };
})();
