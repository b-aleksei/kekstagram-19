"use strict";

(function () {

  window.photo = {
    response: []
  };

  var main = document.querySelector('.big-picture');
  // main.classList.remove('hidden');
  var img = main.querySelector('.big-picture__img img');
  var likes = main.querySelector('.likes-count');
  var amountComments = main.querySelector('.comments-count');
  var templateComment = main.querySelector('.social__comment').cloneNode(true);
  var blockComments = main.querySelector('.social__comments');
  blockComments.innerHTML = '';
  var description = main.querySelector('.social__caption');

  var createComment = function (template, object, target) {
    var node = template.cloneNode(true);
    node.children[0].src = object.avatar;
    node.children[0].alt = object.name;
    node.children[1].textContent = object.message;
    target.append(node);
  };

  var showPhoto = function (obj) {
    if (obj === undefined || !Object.keys(obj).length) {
      return
    }
    img.src = obj.url;
    likes.textContent = obj.likes;
    description.textContent = obj.description;
    amountComments.textContent = obj.comments.length;
    for (var i = 0; i < obj.comments.length; i++) {
      createComment(templateComment, obj.comments[i], blockComments)
    }
  };

  window.request.load(function (response) {
    window.photo.response = response;
    console.log(response);
    window.main.fillDom(response);
    showPhoto(response[0]);
  });

  // main.querySelector('.social__comment-count').classList.add('hidden');
  // main.querySelector('.comments-loader').classList.add('hidden');
  // document.body.classList.add('modal-open')
})();

