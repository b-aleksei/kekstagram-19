'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');
  var editForm = form.querySelector('.img-upload__overlay');
  var success = document.querySelector('#success').content.firstElementChild;
  var error = document.querySelector('#error').content.firstElementChild;
  var hashTag = form.querySelector('.text__hashtags');
  var comment = form.querySelector('.text__description');
  var defaulInput = form.querySelector('#effect-none');
  var preloader;

  var messageSend = function (status) {
    var clone = status.cloneNode(true);
    var target = document.querySelector('main');
    target.append(clone);
    preloader.remove();
    document.addEventListener('click', function () {
      clone.remove();
      editForm.classList.add('hidden');
    }, {once: true});
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        clone.remove();
      }
    }, {once: true});
    hashTag.value = '';
    comment.value = '';
    defaulInput.checked = true;
    window.filter.track.hidden = true;
  };

  var onsubmit = function (evt) {
    evt.preventDefault();
    preloader = document.createElement('img');
    preloader.src = 'img/preloader.gif';
    preloader.style.cssText = 'position: fixed; top: 50%; left:50%; z-index:999;';
    document.body.append(preloader);
    window.request.upload(new FormData(form), function () {
      messageSend(success);
    }, function () {
      messageSend(error);
    });
  };

  window.sendform = {
    onsubmit: onsubmit
  };

})();
