"use strict";
// загрузка фотографии
(function () {

  var form = document.querySelector('.img-upload__form');
  var fileChooser = form.querySelector('#upload-file');
  var preview = form.querySelector('.img-upload__preview img');
  var editForm = form.querySelector('.img-upload__overlay');
  var miniPreview = form.querySelectorAll('.effects__preview');
  var btnClose = form.querySelector('#upload-cancel');
  var pin = window.filter.pin;
  var scaleSmaller = form.querySelector('.scale__control--smaller');
  var scaleBigger = form.querySelector('.scale__control--bigger');
  var hashTag = form.querySelector('.text__hashtags');
  var comment = form.querySelector('.text__description');
  preview.src = '';

  // file upload
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    var blob = new Blob([file]);
    preview.src = URL.createObjectURL(blob);
    Array.from(miniPreview).forEach(function (item) {
      item.style.backgroundImage = "url('" + URL.createObjectURL(blob) + "')";
    });

    scaleSmaller.addEventListener('click', window.filter.decValue);
    scaleBigger.addEventListener('click', window.filter.incValue);
    pin.addEventListener('mousedown', window.filter.onHandlerMouse);
    form.addEventListener('change', window.filter.onChangeForm);
    window.validity.hashTag.addEventListener('input', window.validity.method);

    var closePopup = function () {
      editForm.classList.add('hidden');
      preview.src = URL.revokeObjectURL(blob);
      Array.from(miniPreview).forEach(function (item) {
        item.style.backgroundImage = "url('" + URL.revokeObjectURL(blob) + "')";
      });
      scaleSmaller.removeEventListener('click', window.filter.decValue);
      scaleBigger.removeEventListener('click', window.filter.incValue);
      pin.removeEventListener('mousedown', window.filter.onHandlerMouse);
      document.removeEventListener('keydown', closeEsc);
      form.removeEventListener('change', window.filter.onChangeForm);
      window.validity.hashTag.removeEventListener('input', window.validity.method);
    };

    btnClose.addEventListener('click', function () {
      closePopup()
    }, {once: true});

    var closeEsc = function (e) {
      if (e.key === 'Escape' && e.target !== hashTag && e.target !== comment) {
        editForm.classList.add('hidden');
        closePopup()
      }
    };

    document.addEventListener('keydown', closeEsc);
  });

})();
