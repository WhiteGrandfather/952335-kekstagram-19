'use strict';

var POPUP_BIG_PICTURE_NUMBER = 0;
var PICTURES_COUNT = 25;
var AVATAR_IMAGE_COUNT = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 6;
var INLINE_COMMENTS_COUNT = 2;
var INLINE_COMMENT_REMOVE = 1;
var NAMES = ['Адриан', 'Федосий', 'Прохор', 'Валерий', 'Мирослав', 'Лавр', 'Мартын', 'Святослав', 'Архип', 'Авдей'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ESC_KEY = 'Escape';
var EFFECT_CLASS_NUMBER = 1;
var DEFAULT_EFFECT_PIN_POSITION = 20;
var HASHTAG_MAX_COUNT = 5;
var HASHTAG_MAX_LENGTH = 20;
var picturesInlineList = document.querySelector('.pictures');
var pictureItem = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var bigCommentsListElement = bigPicture.querySelector('.social__comments');
var bigComments = bigCommentsListElement.children;
var imageUploadForm = document.querySelector('.img-upload__form');
var uploadFileButton = imageUploadForm.querySelector('#upload-file');
var uploadCancelButton = imageUploadForm.querySelector('#upload-cancel');
var imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
var effects = imageUploadForm.querySelectorAll('.effects__item');
var imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview');
var effectLevelLine = imageUploadForm.querySelector('.effect-level__line');
var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;
var effectLevelLinePageX = effectLevelLine.getBoundingClientRect().left;
var effectLevelPin = imageUploadForm.querySelector('.effect-level__pin');
var pinPosition = effectLevelLinePageX;
var textHashtagsElement = document.querySelector('.text__hashtags');

var calcRandom = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var sortRandom = function shuffle(arr) {
  var j;
  var temp;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var getImages = function (path, imageType, count) {
  var picturesList = [];
  for (var index = 1; index <= count; index++) {
    var picture = path + [index] + imageType;

    picturesList.push(picture);
  }
  return picturesList;
};

var getComments = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    var commentsObject = {};

    commentsObject.avatar = getImages('img/avatar-', '.svg', AVATAR_IMAGE_COUNT)[calcRandom(1, AVATAR_IMAGE_COUNT)];
    commentsObject.message = MESSAGES[calcRandom(0, MESSAGES.length)];
    commentsObject.name = NAMES[calcRandom(0, NAMES.length)];

    comments.push(commentsObject);
  }
  return comments;
};

var photosList = sortRandom(getImages('photos/', '.jpg', PICTURES_COUNT));

var renderCards = function () {
  var cards = [];

  for (var i = 0; i < PICTURES_COUNT; i++) {
    var picture = {};

    picture.url = photosList[i];
    picture.description = NaN;
    picture.likes = calcRandom(LIKES_MIN, LIKES_MAX);
    picture.comments = getComments(calcRandom(COMMENTS_MIN, COMMENTS_MAX));

    cards.push(picture);
  }
  return cards;
};

var cardsList = renderCards();

var renderElement = function (index) {
  var element = pictureItem.cloneNode(true);

  element.querySelector('.picture__img').src = cardsList[index].url;
  element.querySelector('.picture__likes').textContent = String(renderCards()[index].likes);
  element.querySelector('.picture__comments').textContent = String(renderCards()[index].comments.length);

  return element;
};

var getPictures = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PICTURES_COUNT; i++) {
    fragment.appendChild(renderElement(i));
  }

  return fragment;
};

picturesInlineList.appendChild(getPictures());

bigPicture.querySelector('.big-picture__img').querySelector('img').src = cardsList[POPUP_BIG_PICTURE_NUMBER].url;
bigPicture.querySelector('.likes-count').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].likes;
bigPicture.querySelector('.comments-count').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].comments.length;
bigPicture.querySelector('.social__caption').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].description;

var getBigComment = function () {
  var bigComment = bigComments[0];
  var comentElement = bigComment.cloneNode(true);

  return comentElement;
};

var getBigComments = function (index) {
  var fragmentBigPicture = document.createDocumentFragment();

  if (cardsList[0].comments.length < INLINE_COMMENTS_COUNT) {
    bigComments[INLINE_COMMENT_REMOVE].remove('li');
  }

  for (var j = INLINE_COMMENTS_COUNT; j < cardsList[index].comments.length; j++) {
    fragmentBigPicture.appendChild(getBigComment());
  }

  return fragmentBigPicture;
};

bigCommentsListElement.appendChild(getBigComments(POPUP_BIG_PICTURE_NUMBER));

var renerBigPicture = function (index) {
  var element = cardsList[index].comments;

  for (var i = 0; i < element.length; i++) {
    bigComments[i].querySelector('.social__picture').src = element[i].avatar;
    bigComments[i].querySelector('.social__picture').alt = element[i].name;
    bigComments[i].querySelector('.social__text').textContent = element[i].message;
  }
};

renerBigPicture(POPUP_BIG_PICTURE_NUMBER);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    onCloseUploadOverlayPopup();
  }
};

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

var onStopPropagation = function (evt) {
  evt.stopPropagation();
};

var onOpenUploadOverlayPopup = function () {
  imageUploadOverlay.classList.remove('hidden');
  uploadCancelButton.addEventListener('click', onCloseUploadOverlayPopup);
  document.addEventListener('keydown', onPopupEscPress);
  uploadFileButton.removeEventListener('change', onOpenUploadOverlayPopup);
  effectLevelPin.addEventListener('mouseup', onMouseupEffectLevelPinPosition);
  imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);
  imageUploadForm.addEventListener('keydown', onStopPropagation);
};

var onCloseUploadOverlayPopup = function () {
  imageUploadOverlay.classList.add('hidden');
  imageUploadForm.reset();
  uploadCancelButton.removeEventListener('click', onCloseUploadOverlayPopup);
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);
  effectLevelPin.addEventListener('mouseup', onMouseupEffectLevelPinPosition);
  imageUploadForm.removeEventListener('submit', onImageUploadFormSubmit);
  imageUploadForm.removeEventListener('keydown', onStopPropagation);
};

uploadFileButton.addEventListener('change', onOpenUploadOverlayPopup);
