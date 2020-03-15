'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_CODE_OK = 200;
  var RESPONCE_TYPE_JSON = 'json';
  var XHR_TIMEOUT = 10000;
  var METHOD_GET = 'GET';

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

    xhr.open(METHOD_GET, URL);
    xhr.send();
  };

  window.backend = {
    load: onLoad
  };


})();
