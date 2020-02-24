"use strict";

(function () {

  var form = document.forms[1];
  var fileChooser = form.querySelector('#upload-file');
  var preview = form.querySelector('.img-upload__preview img');
  var editForm = form.querySelector('.img-upload__overlay');
  var miniPreview = form.querySelectorAll('.effects__preview');
  var btnClose = form.querySelector('#upload-cancel');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    var blob = new Blob([file]);
    preview.src = URL.createObjectURL(blob);
    Array.from(miniPreview).forEach(function (item) {
      item.style.backgroundImage = "url('" + URL.createObjectURL(blob) + "')";
    });
    var closePopup = function () {
      editForm.classList.add('hidden');
      preview.src = URL.revokeObjectURL(blob);
      Array.from(miniPreview).forEach(function (item) {
        item.style.backgroundImage = "url('" + URL.revokeObjectURL(blob) + "')";
      });
    };
    btnClose.addEventListener('click', function () {
      closePopup()
    }, {once: true});
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
      editForm.classList.add('hidden');
        closePopup()
      }
    }, {once: true});
  });
})();
