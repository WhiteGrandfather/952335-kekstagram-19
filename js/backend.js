'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var PICTURES_CONTAINER = '/data';
  var STATUS_CODE_OK = 200;
  var RESPONCE_TYPE_JSON = 'json';
  var XHR_TIMEOUT = 10000;
  var METHOD_GET = 'GET';
  var METHOD_POST = 'post';
  var imageUploadFormElement = document.querySelector('.img-upload__form');

  var onUpload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONCE_TYPE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(METHOD_POST, URL + '1');
    xhr.send(data);
  };

  var onLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONCE_TYPE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(METHOD_GET, URL + PICTURES_CONTAINER);
    xhr.send();
  };

  var onformSend = function (evt) {
    onUpload(new FormData(imageUploadFormElement), function () {
      imageUploadFormElement.classList.add('hidden');
    });
    evt.preventDefault();
  };

  window.backend = {
    load: onLoad,
    upload: onUpload,
    onformSend: onformSend
  };


})();
