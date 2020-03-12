'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var calcRandom = function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };


  var getEscEvent = function (escEvt, action) {
    if (escEvt.key === ESC_KEY) {
      action();
    }
  };

  var sortRandom = function (arr) {
    var j;
    var temp;

    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  window.util = {
    calcRandom: calcRandom,
    getEscEvent: getEscEvent,
    sortRandom: sortRandom
  };
}
)();
