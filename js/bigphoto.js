"use strict";
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
  var addUserComment = document.querySelector('.social__footer-btn');
  var addComment;

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
        console.log(currentComments);
        i++;
        if (i % 5 === 0) {
          break
        }
      }
      if (blockComments.children.length === arrComment.length) {
        btnAddComment.classList.add('hidden')
      }
      currentComments.innerText = i;
    };
  };

  var showPhoto = function (obj) {
    if (obj === undefined || !Object.keys(obj).length) {
      return
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
    var img = e.target.closest('.picture');
    if (img) {
      var i = img.dataset.id;
      showPhoto(window.main.filteredResponse[i]);

      close.addEventListener('click', function () {
        closePopup()
      }, {once: true});

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closePopup()
        }
      }, {once: true});

      likeCount.addEventListener('click', onAddLike)
    }
  };

  var onAddLike = function () {
    likeCount.classList.toggle('likes-count--active');
    likeCount.innerText = (likeCount.matches('.likes-count--active')) ? +likeCount.innerText + 1 : +likeCount.innerText - 1
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    likeCount.removeEventListener('click', onAddLike)
  };

  imgContainer.addEventListener('click', onShowPhoto);

})();

