"use strict";

(function () {

  var form = document.forms[1];
  var fileChooser = form.querySelector('#upload-file');
  var preview = form.querySelector('.img-upload__preview img');
  var editForm = form.querySelector('.img-upload__overlay');
  var miniPreview = form.querySelectorAll('.effects__preview');
  var btnClose = form.querySelector('#upload-cancel');
/*  var scaleIndicator = form.querySelector('.scale__control--value');
  var scaleValue = 100;*/
  var pin = window.slider.pin;
  var colorIndicator = window.slider.colorIndicator;
  var scaleSmaller = form.querySelector('.scale__control--smaller');
  var scaleBigger = form.querySelector('.scale__control--bigger');

/*  // change scale
  var incValue = function () {
    if (scaleValue < 100) {
      scaleValue += 25;
      scaleIndicator.value = scaleValue + '%';
    }
  };

  var decValue = function () {
    if (scaleValue > 25) {
      scaleValue -= 25;
      scaleIndicator.value = scaleValue + '%';
    }
  };*/

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

    scaleSmaller.addEventListener('click', window.slider.decValue);
    scaleBigger.addEventListener('click', window.slider.incValue);
    pin.addEventListener('mousedown', window.slider.onHandlerMouse);

    var closePopup = function () {
      editForm.classList.add('hidden');
      preview.src = URL.revokeObjectURL(blob);
      Array.from(miniPreview).forEach(function (item) {
        item.style.backgroundImage = "url('" + URL.revokeObjectURL(blob) + "')";
      });
      scaleSmaller.removeEventListener('click', decValue);
      scaleBigger.removeEventListener('click', incValue);
      pin.removeEventListener('mousedown', window.slider.onHandlerMouse);
      colorIndicator.style.width = pin.style.left = '91px';
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

/*    form.addEventListener('click', function (e) {
      console.log(123);
      if (e.target.closest('.effects__preview:not(.effects__preview--none)')) {
        console.log(e.target.classList[1]);
      }
    });*/

  });

})();
