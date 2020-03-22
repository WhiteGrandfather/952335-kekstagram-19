'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageUploadPreviewElement = document.querySelector('.img-upload__preview');
  var uploadedImageElement = imageUploadPreviewElement.querySelector('img');

  var onUploadImage = function (uploadElement) {
    var file = uploadElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadedImageElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.uploadImage = {
    onUploadImage: onUploadImage
  };
})();
