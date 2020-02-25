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
    none: 'none',
    get value() {
      if (this._value === 'blur') {
        return this._value + '(' + this.DEFAULT_VALUE + 'px)'
      } else if (this._value === 'none') {
        return this._value
      } else {
        return this._value + '(' + this.DEFAULT_VALUE + '%)'
      }
    },
    set value(prop) {
      this._value = this[prop];
    }
  };

  var form = document.forms[1];
  var slider = form.querySelector('.effect-level__line');
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
