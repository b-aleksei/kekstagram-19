'use strict';
// показ фотографии в полноэкранном режиме
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var img = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var amountComments = bigPicture.querySelector('.comments-count');
  var templateComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var blockComments = bigPicture.querySelector('.social__comments');
  var description = bigPicture.querySelector('.social__caption');
  var close = bigPicture.querySelector('#picture-cancel');
  var imgContainer = document.body.querySelector('.pictures');
  var btnAddComment = bigPicture.querySelector('.social__comments-loader');
  var currentComments = bigPicture.querySelector('#currentComments');
  var likeCount = bigPicture.querySelector('.likes-count');
  var userComment = document.querySelector('.social__footer-text');
  var btnUserComment = document.querySelector('.social__footer-btn');
  var avatarUserComment = document.querySelector('.social__footer img');
  var addComment;

  var addUserComment = function () {
    var node = templateComment.cloneNode(true);
    node.children[0].src = avatarUserComment.src;
    node.children[0].alt = avatarUserComment.alt;
    node.children[1].textContent = userComment.value;
    blockComments.append(node);
    userComment.value = '';
    currentComments.innerText = +currentComments.innerText + 1 + '';
    amountComments.textContent = +amountComments.innerText + 1 + '';
  };

  var createComment = function (arrComment) {
    btnAddComment.classList.remove('hidden');
    blockComments.innerHTML = '';
    var i = 0;
    return function () {
      while (i < arrComment.length) {
        var node = templateComment.cloneNode(true);
        node.children[0].src = arrComment[i].avatar;
        node.children[0].alt = arrComment[i].name;
        node.children[1].textContent = arrComment[i].message;
        blockComments.append(node);
        i++;
        if (i % 5 === 0) {
          break;
        }
      }
      currentComments.innerText = blockComments.children.length;
      if (i === arrComment.length) {
        btnAddComment.classList.add('hidden');
      }
    };
  };

  var showPhoto = function (obj) {
    if (obj === undefined || !Object.keys(obj).length) {
      return;
    }
    img.src = obj.url;
    likes.textContent = obj.likes;
    description.textContent = obj.description;
    amountComments.textContent = obj.comments.length;
    addComment = createComment(obj.comments);
    addComment();
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    btnAddComment.addEventListener('click', addComment);
  };

  // обработчик показа фото на весь экран
  var onShowPhoto = function (e) {
    var image = e.target.closest('.picture');
    if (image) {
      var i = image.dataset.id;
      showPhoto(window.main.filteredResponse[i]);

      close.addEventListener('click', function () {
        closePopup();
      }, {once: true});

      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          closePopup();
        }
      }, {once: true});

      document.addEventListener('keydown', openEnter);

      likeCount.addEventListener('click', onAddLike);

      btnUserComment.addEventListener('click', addUserComment);
    }
  };

  var onAddLike = function () {
    likeCount.classList.toggle('likes-count--active');
    likeCount.innerText = (likeCount.matches('.likes-count--active')) ? +likeCount.innerText + 1 : +likeCount.innerText - 1;
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    likeCount.removeEventListener('click', onAddLike);
    document.removeEventListener('keydown', openEnter);
    btnUserComment.removeEventListener('click', addUserComment);
  };

  var openEnter = function (e) {
    if (e.key === 'Enter' && !e.target.closest('.big-picture')) {
      e.preventDefault();
    }
  };

  imgContainer.addEventListener('click', onShowPhoto);

})();

