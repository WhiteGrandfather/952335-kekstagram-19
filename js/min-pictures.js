'use strict';

(function () {
  var pictureItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesInlineListElement = document.querySelector('.pictures');

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

  var getMinPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (item, i) {
      fragment.appendChild(renderElement(item, i));
    });

    picturesInlineListElement.appendChild(fragment);
  };

  var renderError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; fontSize: 30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.minPictures = window.backend.load(getMinPictures, renderError);
})();
