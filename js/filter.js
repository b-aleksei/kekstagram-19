"use strict";

(function () {

  window.filter = {};

  var SCALE_VALUE = 100;
  var form = document.querySelector('.img-upload__form');
  var slider = form.querySelector('.effect-level__line');
  var track = form.querySelector('.img-upload__effect-level');
  var pin = form.querySelector('.effect-level__pin');
  var colorIndicator = form.querySelector('.effect-level__depth');
  var effect = form.querySelector('.effect-level__value');
  var preview = form.querySelector('.img-upload__preview img');
  var scaleIndicator = form.querySelector('.scale__control--value');
  var currentFilter = 'none';

  track.hidden = true;

  // change scale
  window.filter.incValue = function () {
    if (SCALE_VALUE < 100) {
      SCALE_VALUE += 25;
      preview.style.transform = 'scale(' + SCALE_VALUE / 100 + ')';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  window.filter.decValue = function () {
    if (SCALE_VALUE > 25) {
      SCALE_VALUE -= 25;
      preview.style.transform = 'scale(' + SCALE_VALUE / 100 + ')';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  // horizontal slider
  window.filter.onHandlerMouse = function (e) {

    var shiftX = e.clientX - pin.offsetLeft;
    var rightEdge = slider.offsetWidth;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMove(evt) {
      var left = evt.clientX - shiftX;
      if (left < 0) {
        left = 0;
      }
      if (left > rightEdge) {
        left = rightEdge;
      }
      colorIndicator.style.width = pin.style.left = left + 'px';
      var percent = effect.value = Math.round(left / slider.offsetWidth * 100);

      var filter = {
        chrome: 'grayscale(' + percent / 100 + ')',
        sepia: 'sepia(' + percent / 100 + ')',
        marvin: 'invert(' + percent + '%)',
        phobos: 'blur(' + 3 * percent / 100 + 'px)',
        heat: 'brightness(' + (1 + 2 * percent / 100) + ')',
      };

      preview.style.filter = filter[currentFilter]
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  // color filter
  window.filter.onChangeForm = function (e) {
    preview.className = '';
    preview.style.filter = '';
    if (e.target.matches('.effects__radio:not(#effect-none)')) {
      track.hidden = false;
      colorIndicator.style.width = pin.style.left = slider.offsetWidth + 'px';
      preview.classList.add('effects__preview--' + e.target.value);
      currentFilter = e.target.value;
    }
    if (e.target.matches('#effect-none')) {
      track.hidden = true;
    }
  };

  window.filter.pin = pin;

})();
