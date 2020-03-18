'use strict';

(function () {
  var IMAGE_FILTER_HIDDEN_CLASS = 'img-filters--inactive';
  var pictureItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesInlineListElement = document.querySelector('.pictures');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersForm = imageFiltersElement.querySelector('.img-filters__form');
  var pictureList = [];

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

  var removeMinPictures = function () {
    var minPictures = picturesInlineListElement.querySelectorAll('a');

    minPictures.forEach(function (item, i) {
      minPictures[i].remove('a');
    });
  };

  var rerenderPictures = function (pictures) {
    removeMinPictures();
    renderMinPictures(pictures);
  };

  var getSortByLikes = function (first, second) {
    return first.likes - second.likes;
  };

  var onFilterChange = function (evt) {
    var pictureListOriginal = pictureList.slice();
    var pictureListCopy = pictureList.slice();

    /*
    switch (evt.target) {
      case '#filter-default':
        rerenderPictures(pictureListOriginal);
        break;
      case '#filter-random':
        rerenderPictures(window.util.sortRandom(pictureListCopy));
        break;
      case '#filter-discussed':
        rerenderPictures(pictureListCopy.sort(getSortBYLikes));
        break;
      default:
        console.log('Неизвестное значение');
    }
    */

    if (evt.target.matches('#filter-default')) {
      rerenderPictures(pictureListOriginal);
    }
    if (evt.target.matches('#filter-random')) {
      rerenderPictures(window.util.sortRandom(pictureListCopy));
    }
    if (evt.target.matches('#filter-discussed')) {
      rerenderPictures(pictureListCopy.sort(getSortByLikes));
    }
  };

  var getDebounce = function (evt) {
    window.util.debounce(evt, onFilterChange);
  };

  imageFiltersForm.addEventListener('click', getDebounce);

  window.backend.load(getMinPictures, window.backend.renderError);

  imageFiltersElement.classList.remove(IMAGE_FILTER_HIDDEN_CLASS);
})();
