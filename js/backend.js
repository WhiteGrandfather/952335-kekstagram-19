'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var PICTURES_CONTAINER = '/data';
  var STATUS_CODE_OK = 200;
  var RESPONCE_TYPE_JSON = 'json';
  var XHR_TIMEOUT = 10000;
  var METHOD_GET = 'GET';
  var METHOD_POST = 'post';


  var request = function (method, url, onSuccess, onError, data) {
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

    xhr.open(method, url);
    xhr.send(data);
  };

  var save = function (onSuccess, onError, data) {
    request(METHOD_POST, URL, onSuccess, onError, data);
  };

  var load = function (onSuccess, onError) {
    request(METHOD_GET, URL + PICTURES_CONTAINER, onSuccess, onError);
  };

  window.backend = {
    load: load,
    upload: save
  };
})();
