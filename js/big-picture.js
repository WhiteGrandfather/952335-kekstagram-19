'use strict';

(function () {
  var INLINE_COMMENTS_COUNT = 2;
  var INLINE_COMMENT_REMOVE = 1;
  var MAX_COMMENTS = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigCommentsListElement = bigPictureElement.querySelector('.social__comments');
  var bodyElement = document.querySelector('body');
  var bigComments = bigCommentsListElement.children;

  var getBigComment = function () {
    var bigComment = bigComments[0];
    var comentElement = bigComment.cloneNode(true);

    return comentElement;
  };

  var getBigComments = function (comments) {
    var fragmentBigPicture = document.createDocumentFragment();

    if (comments.comments.length < INLINE_COMMENTS_COUNT) {
      bigComments[INLINE_COMMENT_REMOVE].remove('li');
    }

    for (var i = INLINE_COMMENTS_COUNT; i < MAX_COMMENTS; i++) {
      fragmentBigPicture.appendChild(getBigComment());
    }

    return fragmentBigPicture;
  };

  var renerBigPicture = function (index) {
    var getMinPictures = function (pictures) {
      bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = pictures[index].url;
      bigPictureElement.querySelector('.likes-count').textContent = pictures[index].likes;
      bigPictureElement.querySelector('.comments-count').textContent = pictures[index].comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = pictures[index].description;

      bigCommentsListElement.appendChild(getBigComments(pictures[index]));

      var element = pictures[index].comments;

      element.forEach(function (item, i) {
        bigComments[i].querySelector('.social__picture').src = item.avatar;
        bigComments[i].querySelector('.social__picture').alt = item.name;
        bigComments[i].querySelector('.social__text').textContent = item.message;
      });
    };
    window.backend.load(getMinPictures);
  };

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bodyElement.classList.add('modal-open');

  window.bigPicture = {
    renerBigPicture: renerBigPicture
  };

})();
