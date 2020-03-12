'use strict';

(function () {
  var EFFECT_CLASS_NUMBER = 1;
  var DEFAULT_EFFECT_PIN_POSITION = 20;
  var HASHTAG_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var effects = imageUploadFormElement.querySelectorAll('.effects__item');
  var imgUploadPreview = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelLine = imageUploadFormElement.querySelector('.effect-level__line');
  var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;
  var effectLevelLinePageX = effectLevelLine.getBoundingClientRect().left;
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var pinPosition = effectLevelLinePageX;

  var getEffectsClass = function () {
    var effectsClassList = [];
    for (var i = 0; i < effects.length; i++) {
      effectsClassList.push(effects[i].querySelector('.effects__preview').classList[EFFECT_CLASS_NUMBER]);
    }
    return effectsClassList;
  };

  var removeEffectClass = function () {
    for (var i = 0; i < getEffectsClass().length; i++) {
      imgUploadPreview.classList.remove(getEffectsClass()[i]);
    }
  };

  var onClickEffect = function (effect, effectClass) {
    effect.addEventListener('click', function () {
      removeEffectClass();
      imgUploadPreview.classList.add(effectClass);
    });
  };

  var onClickEffectChange = function () {
    for (var i = 0; i < effects.length; i++) {
      onClickEffect(effects[i], getEffectsClass()[i]);
    }
  };

  onClickEffectChange();

  var getEffectLevelPinPosition = function (position) {
    position = Math.round((pinPosition - effectLevelLinePageX) / (effectLevelLineWidth / 100));
    return position;
  };

  var onMouseupEffectLevelPinPosition = function (evt) {
    pinPosition = evt.clientX;
    getEffectLevelPinPosition(DEFAULT_EFFECT_PIN_POSITION);
  };

  var onImageUploadFormSubmit = function (evt) {
    if (!validateHashtags()) {
      evt.preventDefault();
    }
  };

  var validateHashtags = function () {
    var hashtags = textHashtagsElement.value.trim().toLowerCase().split(/\s+/);

    for (var j = 0; j < hashtags.length; j++) {
      if (hashtags[j] === '#') {
        textHashtagsElement.setCustomValidity('Хеш-тег не может состоят только из решетки.');
        return false;
      } else {
        textHashtagsElement.setCustomValidity('');
      }
    }

    for (var k = 0; k < hashtags.length; k++) {
      if (hashtags[k][0] !== '#') {
        textHashtagsElement.setCustomValidity('Каждый хеш-тег начинается с решетки "#".');
        return false;
      } else {
        textHashtagsElement.setCustomValidity('');
      }
    }

    for (var m = 0; m < hashtags.length; m++) {
      if (!(/^[#][a-zа-яё0-9]+$/.test(hashtags[m]))) {
        textHashtagsElement.setCustomValidity('Хеш-тег состоит из букв и цифр.');
        return false;
      } else {
        textHashtagsElement.setCustomValidity('');
      }
    }

    for (var l = 0; l < hashtags.length; l++) {
      if (hashtags[l].length > HASHTAG_MAX_LENGTH) {
        textHashtagsElement.setCustomValidity('Хеш-тег не может быть длинее 20 символов.');
        return false;
      } else {
        textHashtagsElement.setCustomValidity('');
      }
    }

    for (var z = 0; z < hashtags.length; z++) {
      var currentHashtag = hashtags[z];

      for (var x = z + 1; x < hashtags.length; x++) {
        if (hashtags.length !== 1 && currentHashtag === hashtags[x]) {
          textHashtagsElement.setCustomValidity('Не может быть повторяющихся хеш-тегов. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.');
          return false;
        } else {
          textHashtagsElement.setCustomValidity('');
        }
      }
    }

    if (hashtags.length > HASHTAG_MAX_COUNT) {
      textHashtagsElement.setCustomValidity('Максимальное количество хеш-тегов ' + HASHTAG_MAX_COUNT + '.');
      return false;
    } else {
      textHashtagsElement.setCustomValidity('');
    }

    return true;
  };

  window.uploadPctureForm = {
    onMouseupEffectLevelPinPosition: onMouseupEffectLevelPinPosition,
    onImageUploadFormSubmit: onImageUploadFormSubmit
  };
})();

