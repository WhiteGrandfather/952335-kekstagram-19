'use strict';

(function () {
  var INLINE_COMMENTS_COUNT = 2;
  var INLINE_COMMENT_REMOVE = 1;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigCommentsListElement = bigPictureElement.querySelector('.social__comments');
  var bodyElement = document.querySelector('body');
  var bigComments = bigCommentsListElement.children;

  var getBigComment = function () {
    var bigComment = bigComments[0];
    var comentElement = bigComment.cloneNode(true);

    return comentElement;
  };

  var getBigComments = function (index) {
    var fragmentBigPicture = document.createDocumentFragment();

    if (window.minPictures[0].comments.length < INLINE_COMMENTS_COUNT) {
      bigComments[INLINE_COMMENT_REMOVE].remove('li');
    }

    for (var j = INLINE_COMMENTS_COUNT; j < window.minPictures[index].comments.length; j++) {
      fragmentBigPicture.appendChild(getBigComment());
    }

    return fragmentBigPicture;
  };

  var renerBigPicture = function (index) {
    bigCommentsListElement.appendChild(getBigComments(index));

    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = window.minPictures[index].url;
    bigPictureElement.querySelector('.likes-count').textContent = window.minPictures[index].likes;
    bigPictureElement.querySelector('.comments-count').textContent = window.minPictures[index].comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = window.minPictures[index].description;

    var element = window.minPictures[index].comments;

    for (var i = 0; i < element.length; i++) {
      bigComments[i].querySelector('.social__picture').src = element[i].avatar;
      bigComments[i].querySelector('.social__picture').alt = element[i].name;
      bigComments[i].querySelector('.social__text').textContent = element[i].message;
    }
  };

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bodyElement.classList.add('modal-open');

  window.bigPicture = renerBigPicture;
})();
