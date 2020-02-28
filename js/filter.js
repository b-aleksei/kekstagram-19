'use strict';
// фильтр эффектов
(function () {

  window.filter = {};

  var SCALE_VALUE = 100;
  var SCALE_MIN_VALUE = 25;
  var PERCENT_MAX_VALUE = 100;
  var BLUR_MAX_VALUE = 3;
  var BRIGHTNESS_MIN_VALUE = 1;
  var BRIGHTNESS_MAX_VALUE = 2;
  var form = document.querySelector('.img-upload__form');
  var slider = form.querySelector('.effect-level__line');
  var track = form.querySelector('.img-upload__effect-level');
  var pin = form.querySelector('.effect-level__pin');
  var colorIndicator = form.querySelector('.effect-level__depth');
  var effect = form.querySelector('.effect-level__value');
  var preview = form.querySelector('.img-upload__preview');
  var img = form.querySelector('.img-upload__preview img');
  var scaleIndicator = form.querySelector('.scale__control--value');
  var currentFilter = 'none';

  track.hidden = true;

  // change scale
  window.filter.incValue = function () {
    if (SCALE_VALUE < PERCENT_MAX_VALUE) {
      SCALE_VALUE += SCALE_MIN_VALUE;
      preview.style.transform = 'scale(' + SCALE_VALUE / PERCENT_MAX_VALUE + ')';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  window.filter.decValue = function () {
    if (SCALE_VALUE > SCALE_MIN_VALUE) {
      SCALE_VALUE -= SCALE_MIN_VALUE;
      preview.style.transform = 'scale(' + SCALE_VALUE / PERCENT_MAX_VALUE + ')';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  // horizontal slider
  window.filter.onHandlerMouse = function (e) {

    var shiftX = e.clientX - pin.offsetLeft;
    var rightEdge = slider.offsetWidth;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onMouseUp);

    var onMove = function (evt) {
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
        chrome: 'grayscale(' + percent / PERCENT_MAX_VALUE + ')',
        sepia: 'sepia(' + percent / PERCENT_MAX_VALUE + ')',
        marvin: 'invert(' + percent + '%)',
        phobos: 'blur(' + BLUR_MAX_VALUE * percent / PERCENT_MAX_VALUE + 'px)',
        heat: 'brightness(' + (BRIGHTNESS_MIN_VALUE + BRIGHTNESS_MAX_VALUE * percent / PERCENT_MAX_VALUE) + ')',
      };

      img.style.filter = filter[currentFilter];
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  // color filter
  window.filter.onChangeForm = function (e) {
    img.className = '';
    img.style.filter = '';
    if (e.target.matches('.effects__radio:not(#effect-none)')) {
      track.hidden = false;
      colorIndicator.style.width = pin.style.left = slider.offsetWidth + 'px';
      img.classList.add('effects__preview--' + e.target.value);
      currentFilter = e.target.value;
    }
    if (e.target.matches('#effect-none')) {
      track.hidden = true;
    }
  };

  window.filter.pin = pin;
  window.filter.track = track;

})();
