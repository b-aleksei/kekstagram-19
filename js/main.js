"use strict";

(function () {

  window.main = {
    response: [],
    filteredResponse: []
  };

  var template = document.querySelector('#picture').content.firstElementChild;

  var fillDom = function (arr) {
    if (!arr || arr.length === 0) {
    return
    }
    var target = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
var i = 0;
    arr.forEach(function (item) {
    var clone = template.cloneNode(true);
    clone.dataset.id = i;
    i++;
    var img = clone.querySelector('.picture__img');
    var likes = clone.querySelector('.picture__likes');
    var comment = clone.querySelector('.picture__comments');
      img.src = item.url;
      likes.textContent = item.likes;
      comment.textContent = item.comments.length;
      fragment.append(clone)
    });
    target.append(fragment)
  };

  window.request.load(function (response) {
    window.main.response = response;
    window.main.filteredResponse = response;
    fillDom(response);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  });

  window.main.fillDom = fillDom

})();
