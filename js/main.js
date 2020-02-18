'use strict';

var PICTURES_COUNT = 25;
var PICTURE_PATH = ['photos/', '.jpg'];
var AVATAR_IMAGE_COUNT = 6;
var AVATAR_PATH = ['img/avatar-', '.svg'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 4;
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
var fragment = document.createDocumentFragment();

var calcRandom = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var sortRandom = function shuffle(arr) {
  var j = 0;
  var temp = 0;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var getPictures = function (path, imageType, count) {
  var picturesList = [];
  for (var index = 1; index <= count; index++) {
    var picture = path + [index] + imageType;

    picturesList.push(picture);
  }
  return picturesList;
};

var renderComments = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    var commentsObject = {};

    commentsObject.avatar = getPictures(AVATAR_PATH[0], AVATAR_PATH[1], AVATAR_IMAGE_COUNT)[calcRandom(1, AVATAR_IMAGE_COUNT)];
    commentsObject.message = MESSAGES[calcRandom(0, MESSAGES.length)];
    commentsObject.name = NAMES[calcRandom(0, NAMES.length)];

    comments.push(commentsObject);
  }
  return comments;
};

var renderCards = function () {
  var cards = [];
  var photos = sortRandom(getPictures(PICTURE_PATH[0], PICTURE_PATH[1], PICTURES_COUNT));

  for (var i = 0; i < PICTURES_COUNT; i++) {
    var picture = {};

    picture.url = photos[i];
    picture.description = NaN;
    picture.likes = calcRandom(LIKES_MIN, LIKES_MAX);
    picture.comments = renderComments(calcRandom(COMMENTS_MIN, COMMENTS_MAX));

    cards.push(picture);
  }
  return cards;
};

var cardsList = renderCards();

var renderElement = function (index) {
  var Element = pictureItem.cloneNode(true);

  Element.querySelector('.picture__img').src = cardsList[index].url;
  Element.querySelector('.picture__likes').textContent = String(renderCards()[index].likes);
  Element.querySelector('.picture__comments').textContent = String(renderCards()[index].comments.length);

  return Element;
};

for (var i = 0; i < PICTURES_COUNT; i++) {
  fragment.appendChild(renderElement(i));
}

picturesInlineList.appendChild(fragment);
