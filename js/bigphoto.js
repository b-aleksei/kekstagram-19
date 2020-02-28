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
  var likeCount = bigPicture.querySelector('.likes-count');
  blockComments.innerHTML = '';
  var data;
  var id;
  var addComment;

  var showPhoto = function (obj) {
    if (obj === undefined || !Object.keys(obj).length) {
      return;
    }
    img.src = obj.url;
    likes.textContent = obj.likes;
    description.textContent = obj.description;
    amountComments.textContent = obj.comments.length + '';
    // eslint-disable-next-line
    data[id].like ? likeCount.classList.add('likes-count--active') : likeCount.classList.remove('likes-count--active');
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    btnAddComment.classList.remove('hidden');
    var arrComment = obj.comments;
    var i = 0;

    return function () {
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
  };

  // обработчик показа фото на весь экран
  var onShowPhoto = function (e) {
    var image = e.target.closest('.picture');
    if (image) {
      id = image.dataset.id;
      data = window.main.filteredResponse;
      addComment = showPhoto(data[id]);
      addComment();
      btnAddComment.addEventListener('click', addComment);

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
    }
  };

  // добавление лайков
  var onAddLike = function () {
    likeCount.classList.toggle('likes-count--active');
    if (!data[id].like) {
      data[id].likes += 1;
      data[id].like = true;
    } else {
      data[id].likes -= 1;
      data[id].like = false;
    }
    likes.innerText = data[id].likes;
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    likeCount.removeEventListener('click', onAddLike);
    document.removeEventListener('keydown', openEnter);
    blockComments.innerHTML = '';
    btnAddComment.removeEventListener('click', addComment);
  };

  var openEnter = function (e) {
    if (e.key === 'Enter' && !e.target.closest('.big-picture')) {
      e.preventDefault();
    }
  };

  imgContainer.addEventListener('click', onShowPhoto);

})();

