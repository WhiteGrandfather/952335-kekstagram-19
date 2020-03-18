'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var IMAGE_FILTER_HIDDEN_CLASS = 'img-filters--inactive';
  var pictureItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesInlineListElement = document.querySelector('.pictures');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersForm = imageFiltersElement.querySelector('.img-filters__form');
  var pictureList = [];
  var lastTimeout;

  var renderElement = function (index, indexCount) {
    var element = pictureItemElement.cloneNode(true);

    element.querySelector('.picture__img').src = index.url;
    element.querySelector('.picture__likes').textContent = index.likes;
    element.querySelector('.picture__comments').textContent = index.comments.length;
    element.querySelector('.picture__img').classList.add(indexCount);
    element.querySelector('.picture__img').alt = index.description;
    element.classList.add(indexCount);
    return element;
  };

  var renderError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; fontSize: 30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeMinPictures = function () {
    var minPictures = picturesInlineListElement.querySelectorAll('a');

    minPictures.forEach(function (item, i) {
      minPictures[i].remove('a');
    });
  };

  var renderMinPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (item, i) {
      fragment.appendChild(renderElement(item, i));
    });

    picturesInlineListElement.appendChild(fragment);
  };

  var getMinPictures = function (pictures) {
    pictureList = pictures;

    renderMinPictures(pictures);
  };

  var rerenderPictures = function (pictures) {
    removeMinPictures();
    renderMinPictures(pictures);
  };

  var getSortBYLikes = function (first, second) {
    return first.likes - second.likes;
  };

  var onFilterChange = function (evt) {
    var pictureListOriginal = pictureList.slice();
    var pictureListCopy = pictureList.slice();

    if (evt.target.matches('#filter-default')) {
      rerenderPictures(pictureListOriginal);
    }
    if (evt.target.matches('#filter-random')) {
      rerenderPictures(window.util.sortRandom(pictureListCopy));
    }
    if (evt.target.matches('#filter-discussed')) {
      rerenderPictures(pictureListCopy.sort(getSortBYLikes));
    }
  };

  var debounce = function (evt) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      onFilterChange(evt);
    }, DEBOUNCE_INTERVAL);
  };

  imageFiltersForm.addEventListener('click', debounce);

  window.backend.load(getMinPictures, renderError);

  imageFiltersElement.classList.remove(IMAGE_FILTER_HIDDEN_CLASS);

  window.minPictures = {
    getMinPictures: getMinPictures,
    renderError: renderError
  };
})();
