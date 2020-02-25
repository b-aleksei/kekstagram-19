"use strict";

(function () {

  window.slider = {};

  var SCALE_VALUE = 100;
  var form = document.forms[1];
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
  var incValue = function () {
    if (SCALE_VALUE < 100) {
      SCALE_VALUE += 25;
      preview.style.transform = 'scale(' + SCALE_VALUE + '%)';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  var decValue = function () {
    if (SCALE_VALUE > 25) {
      SCALE_VALUE -= 25;
      preview.style.transform = 'scale(' + SCALE_VALUE + '%)';
      scaleIndicator.value = SCALE_VALUE + '%';
    }
  };

  // horizontal slider
  window.slider.onHandlerMouse = function (e) {

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
      var percent = effect = Math.round(left / slider.offsetWidth * 100);

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
  var onChangeForm = function (e) {
    preview.className = '';
      preview.removeAttribute('style');
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

  form.addEventListener('change', onChangeForm);
  window.slider.pin = pin;
  window.slider.colorIndicator = colorIndicator;
  window.slider.decValue = decValue;
  window.slider.incValue = incValue;

})();
