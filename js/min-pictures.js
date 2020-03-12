'use strict';

(function () {
  var PICTURES_COUNT = 25;
  var AVATAR_IMAGE_COUNT = 6;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 6;
  var NAMES = ['Адриан', 'Федосий', 'Прохор', 'Валерий', 'Мирослав', 'Лавр', 'Мартын', 'Святослав', 'Архип', 'Авдей'];
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var pictureItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesInlineListElement = document.querySelector('.pictures');

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

      commentsObject.avatar = getImages('img/avatar-', '.svg', AVATAR_IMAGE_COUNT)[window.util.calcRandom(1, AVATAR_IMAGE_COUNT)];
      commentsObject.message = MESSAGES[window.util.calcRandom(0, MESSAGES.length)];
      commentsObject.name = NAMES[window.util.calcRandom(0, NAMES.length)];

      comments.push(commentsObject);
    }
    return comments;
  };

  var photosList = window.util.sortRandom(getImages('photos/', '.jpg', PICTURES_COUNT));

  var renderCards = function () {
    var cards = [];

    for (var i = 0; i < PICTURES_COUNT; i++) {
      var picture = {};

      picture.url = photosList[i];
      picture.description = NaN;
      picture.likes = window.util.calcRandom(LIKES_MIN, LIKES_MAX);
      picture.comments = getComments(window.util.calcRandom(COMMENTS_MIN, COMMENTS_MAX));

      cards.push(picture);
    }
    return cards;
  };

  var cardsList = renderCards();

  var renderElement = function (index) {
    var element = pictureItemElement.cloneNode(true);

    element.querySelector('.picture__img').src = cardsList[index].url;
    element.querySelector('.picture__likes').textContent = String(renderCards()[index].likes);
    element.querySelector('.picture__comments').textContent = String(renderCards()[index].comments.length);
    element.querySelector('.picture__img').classList.add([index]);
    element.classList.add([index]);
    return element;
  };

  var getPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PICTURES_COUNT; i++) {
      fragment.appendChild(renderElement(i));
    }

    return fragment;
  };

  picturesInlineListElement.appendChild(getPictures());

  window.minPictures = cardsList;
})();
