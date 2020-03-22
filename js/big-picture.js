'use strict';

(function () {
  var INLINE_COMMENTS_COUNT = 2;
  var INLINE_COMMENT_REMOVE = 1;
  var MAX_COMMENTS = 5;
  var commentsShow = 0;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigCommentsListElement = bigPictureElement.querySelector('.social__comments');
  var bodyElement = document.querySelector('body');
  var bigComments = bigCommentsListElement.children;
  var commentsLoader = bigPictureElement.querySelector('.comments-loader');

  var getBigComment = function () {
    var commentElement = bigComments[0].cloneNode(true);

    return commentElement;
  };

  var removeBigComments = function (comments) {
    if (comments.comments.length < INLINE_COMMENTS_COUNT) {
      bigComments[INLINE_COMMENT_REMOVE].remove('li');
    } else {
      for (var k = INLINE_COMMENT_REMOVE; k < bigComments.length; k++) {
        bigComments[k].remove('li');
      }
    }
  };

  var getBigComments = function (comments) {
    var fragmentBigPicture = document.createDocumentFragment();
    commentsShow = 0;
    removeBigComments(comments);

    for (var i = bigComments.length; i < comments.comments.length; i++) {
      fragmentBigPicture.appendChild(getBigComment());
    }

    return fragmentBigPicture;
  };

  var renderComments = function (element, elementLength) {
    for (var i = 0; i < elementLength; i++) {
      bigComments[i].querySelector('.social__picture').src = element[i].avatar;
      bigComments[i].querySelector('.social__picture').alt = element[i].name;
      bigComments[i].querySelector('.social__text').textContent = element[i].message;
      bigComments[i].classList.add('hidden');
    }
  };

  var onCommentsLoader = function () {
    showMoreComments();
  };

  var showMoreComments = function () {
    commentsShow = commentsShow + MAX_COMMENTS;
    for (var i = 0; i < Math.min(commentsShow, bigComments.length); i++) {
      bigComments[i].classList.remove('hidden');
    }

    if (bigComments.length > commentsShow) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }
  };

  var renderBigPicture = function (index) {
    var pictures = window.minPictures.pictureListCopy;

    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = pictures[index].url;
    bigPictureElement.querySelector('.likes-count').textContent = pictures[index].likes;
    bigPictureElement.querySelector('.comments-count').textContent = pictures[index].comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = pictures[index].description;

    bigCommentsListElement.appendChild(getBigComments(pictures[index]));

    var commentsElement = pictures[index].comments;

    renderComments(commentsElement, commentsElement.length);

    showMoreComments();

    commentsLoader.addEventListener('click', onCommentsLoader);
  };

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bodyElement.classList.add('modal-open');

  window.bigPicture = {
    renderBigPicture: renderBigPicture,
    onCommentsLoader: onCommentsLoader
  };

})();
