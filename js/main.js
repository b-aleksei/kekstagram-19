"use strict";

(function () {

  var template = document.querySelector('#picture').content.firstElementChild;

  var fillDom = function (arr) {
    var target = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    arr.forEach(function (item) {
    var clone = template.cloneNode(true);
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


  window.main = {
    fillDom: fillDom
  };

})();
