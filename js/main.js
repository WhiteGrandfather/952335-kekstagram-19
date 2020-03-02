'use strict';

var POPUP_BIG_PICTURE_NUMBER = 0;
var PICTURES_COUNT = 25;
var AVATAR_IMAGE_COUNT = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 4;
var INLINE_COMMENTS_COUNT = 2;
var NAMES = ['Адриан', 'Федосий', 'Прохор', 'Валерий', 'Мирослав', 'Лавр', 'Мартын', 'Святослав', 'Архип', 'Авдей'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var picturesInlineList = document.querySelector('.pictures');
var pictureItem = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var bigCommentsListElement = bigPicture.querySelector('.social__comments');
var bigComments = bigPicture.querySelectorAll('.social__comment');

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

bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').querySelector('img').src = cardsList[POPUP_BIG_PICTURE_NUMBER].url;
bigPicture.querySelector('.likes-count').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].likes;
bigPicture.querySelector('.comments-count').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].comments.length;
bigPicture.querySelector('.social__caption').textContent = cardsList[POPUP_BIG_PICTURE_NUMBER].description;

var renerBigPicture = function (index) {
  var element = cardsList[index].comments;

  for (var i = 0; i < element.length; i++) {
    bigComments[i].querySelector('.social__picture').src = element[i].avatar;
    bigComments[i].querySelector('.social__picture').alt = element[i].name;
    bigComments[i].querySelector('.social__text').textContent = element[i].message;
  }
};

var getBigComment = function () {
  var bigComment = bigPicture.querySelector('.social__comment');
  var comentElement = bigComment.cloneNode(true);

  return comentElement;
};

var getBigComments = function (index) {
  var fragmentBigPicture = document.createDocumentFragment();

  if (cardsList[0].comments.length < INLINE_COMMENTS_COUNT) {
    bigComments[1].remove('li');
  }

  for (var j = INLINE_COMMENTS_COUNT; j < cardsList[index].comments.length; j++) {
    fragmentBigPicture.appendChild(getBigComment());
  }

  return fragmentBigPicture;
};

bigCommentsListElement.appendChild(getBigComments(POPUP_BIG_PICTURE_NUMBER));

renerBigPicture(POPUP_BIG_PICTURE_NUMBER);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
