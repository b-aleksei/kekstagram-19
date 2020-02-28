'use strict';
// показ фотографии в полноэкранном режиме
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var img = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var amountComments = bigPicture.querySelector('.comments-count');
  var blockComments = bigPicture.querySelector('.social__comments');
  var templateComment = blockComments.querySelector('.social__comment').cloneNode(true);
  var description = bigPicture.querySelector('.social__caption');
  var close = bigPicture.querySelector('#picture-cancel');
  var imgContainer = document.body.querySelector('.pictures');
  var btnAddComment = bigPicture.querySelector('.social__comments-loader');
  var currentComments = bigPicture.querySelector('#currentComments');
  var userComment = bigPicture.querySelector('.social__footer-text');
  blockComments.innerHTML = '';
  var data;
  var id;
  var arrComment = [];
  var i = 0;

  var addComment = function () {
    while (i < arrComment.length) {
      var node = templateComment.cloneNode(true);
      node.children[0].src = arrComment[i].avatar;
      node.children[0].alt = arrComment[i].name;
      node.children[1].textContent = arrComment[i].message;
      blockComments.append(node);
      ++i;
      if (i % 5 === 0) {
        break;
      }
    }
    currentComments.innerText = i;
    if (i === arrComment.length) {
      btnAddComment.classList.add('hidden');
    }
  };

  var showPhoto = function (obj) {
    if (obj === undefined || !Object.keys(obj).length) {
      return;
    }
    i = 0;
    img.src = obj.url;
    likes.textContent = obj.likes;
    description.textContent = obj.description;
    amountComments.textContent = obj.comments.length + '';
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    btnAddComment.classList.remove('hidden');
    arrComment = obj.comments;
  };

  // обработчик показа фото на весь экран
  var onShowPhoto = function (e) {
    var image = e.target.closest('.picture');
    if (image) {
      id = image.dataset.id;
      data = window.main.filteredResponse;
      showPhoto(data[id]);
      addComment();
      btnAddComment.addEventListener('click', addComment);

      close.addEventListener('click', closePopup);

      document.addEventListener('keydown', closeEscape);

      document.addEventListener('keydown', openEnter);
    }
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    blockComments.innerHTML = '';
    document.removeEventListener('keydown', openEnter);
    btnAddComment.removeEventListener('click', addComment);
    document.removeEventListener('keydown', closeEscape);
    close.removeEventListener('click', closePopup);
  };

  var closeEscape = function (evt) {
    if (evt.key === 'Escape' && evt.target !== userComment) {
      closePopup();
    }
  };

  var openEnter = function (e) {
    if (e.key === 'Enter' && !e.target.closest('.big-picture')) {
      e.preventDefault();
    }
  };

  imgContainer.addEventListener('click', onShowPhoto);

})();

