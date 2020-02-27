"use strict";

(function () {

  var RANDOM_MAX = 10;
  var DEBOUNCE_INTERVAL = 500;
  var time = null;
  var form = document.querySelector('.img-filters__form');
  var randomFilter = form.querySelector('#filter-random');
  var discussedFilter = form.querySelector('#filter-discussed');
  var picturesContainer = document.querySelector('.pictures');
  var buttons = form.querySelectorAll('.img-filters__button');

  var randomShuffle = function (arr) {
    arr.sort(function (a, b) {
      return Math.random() - 0.5
    })
  };

  var rerender = function (e) {

    var response = window.main.response;
    var pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      item.remove();
    });

    if (e.target === randomFilter) {
      response = response.slice();
      randomShuffle(response);
      response = response.slice(0, RANDOM_MAX)
    }
    if (e.target === discussedFilter) {
      response = response.slice();
      response.sort(function (a, b) {
        return b.comments.length - a.comments.length
      });
    }
    window.main.fillDom(response);
    window.main.filteredResponse = response
  };

  form.addEventListener('click', function (e) {
    buttons.forEach(function (item) {
      item.classList.remove('img-filters__button--active')
    });

    if (e.target.matches('.img-filters__button')) {
      e.target.classList.add('img-filters__button--active')
    }

    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(rerender, DEBOUNCE_INTERVAL, e);
  });

})();

