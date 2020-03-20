'use strict';

(function () {
  var IMAGE_FILTER_HIDDEN_CLASS = 'img-filters--inactive';
  var pictureItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesInlineListElement = document.querySelector('.pictures');
  var imageFiltersElement = document.querySelector('.img-filters');
  var imageFiltersForm = imageFiltersElement.querySelector('.img-filters__form');
  var pictureList = [];
  var pictureListCopy = [];

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
    pictures.forEach(function (item) {
      pictureListCopy.push(item);
    });

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

  var getFilterChange = function () {
    var pictureListOriginal = pictureList.slice();
    var activeFilterElement = document.querySelector('button.img-filters__button--active');

    switch (activeFilterElement.id) {
      case 'filter-default':
        rerenderPictures(pictureListOriginal);
        break;
      case 'filter-random':
        rerenderPictures(window.util.sortRandom(pictureListCopy));
        break;
      case 'filter-discussed':
        rerenderPictures(pictureListCopy.sort(getSortByLikes));
        break;
      default:
        throw new Error('неожиданный ID кнопки фильтра "' + activeFilterElement.id + '"');
    }
  };

  var onFilterChange = function () {
    window.util.debounce(getFilterChange);
  };

  var onFilterActive = function (evt) {
    var activeFilterElement = document.querySelector('button.img-filters__button--active');
    activeFilterElement.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  imageFiltersForm.addEventListener('click', onFilterActive);
  imageFiltersForm.addEventListener('click', onFilterChange);

  window.backend.load(getMinPictures, window.backend.renderError);

  imageFiltersElement.classList.remove(IMAGE_FILTER_HIDDEN_CLASS);

  window.minPictures = {
    onFilterActive: onFilterActive,
    onFilterChange: onFilterChange,
    pictureListCopy: pictureListCopy
  };
})();
