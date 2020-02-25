"use strict";

(function () {

  window.slider = {};
  var filter = {
    DEFAULT_VALUE: 20,
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness',
    _value: 'none',
    get value() {
      if (this._value === 'blur') {
        return 'blur(' + this.DEFAULT_VALUE + 'px)'
      } else if (this._value === 'none') {
        return 'none'
      } else {
        return this._value + '(' + this.DEFAULT_VALUE + '%)'
      }
    },
    set value(prop) {
      this._value = this[prop] || prop;
    }
  };

  var form = document.forms[1];
  var slider = form.querySelector('.effect-level__line');
  var track = form.querySelector('.img-upload__effect-level');
  var pin = form.querySelector('.effect-level__pin');
  var colorIndicator = form.querySelector('.effect-level__depth');
  var preview = form.querySelector('.img-upload__preview img');
  var scaleIndicator = form.querySelector('.scale__control--value');
  var SCALE_VALUE = 100;

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
      filter.DEFAULT_VALUE = Math.round(left / slider.offsetWidth * 100);
      preview.style.filter = filter.value;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  // click on the track for move pin
  track.addEventListener('click', function (e) {
    var shift = e.clientX - slider.getBoundingClientRect().x;
    if (shift < 0) {
      shift = 0;
    }
    if (shift > slider.offsetWidth) {
      shift = slider.offsetWidth;
    }
      colorIndicator.style.width = pin.style.left = shift + 'px';
    filter.DEFAULT_VALUE = Math.round(shift / slider.offsetWidth * 100);
    preview.style.filter = filter.value;
  });

  // color filter
  var onFocusForm = function (e) {
    if (e.target.matches('.effects__radio')) {
      colorIndicator.style.width = pin.style.left = '91px';
      filter.DEFAULT_VALUE = 20;
      filter.value = e.target.value;
      preview.style.filter = filter.value;
    }
  };

  form.addEventListener('focusin', onFocusForm);
  window.slider.pin = pin;
  window.slider.colorIndicator = colorIndicator;
  window.slider.decValue = decValue;
  window.slider.incValue = incValue;

})();
