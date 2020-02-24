"use strict";

(function () {

  var AMOUNT_OBJ = 25;
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var names = ['Артем', 'Вася', 'Сергей', 'Гена', 'Леша', 'Петя'];
  var template = document.querySelector('#picture').content.firstElementChild;


  var random = function (max, min) {
    var minValue = min || 0;
    return minValue + Math.floor(Math.random() * (max + 1 - minValue));
  };

  var GenerateObject = function () {
    this.url = 'photos/' + random(25, 1) + '.jpg';
    this.description = 'discription for photos';
    this.likes = random(200, 15);
    this.comments = [
      {
        avatar: 'img/avatar-' + random(6, 1) + '.svg',
        message: comments[random(comments.length - 1)],
        name: names[random(names.length - 1)]
      },
      {
        avatar: 'img/avatar-' + random(6, 1) + '.svg',
        message: comments[random(comments.length - 1)],
        name: names[random(names.length - 1)]
      }
    ];
  };

  var generatorArrayObj = function () {
    var arr = [];
    for (let i = 0; i < AMOUNT_OBJ; i++) {
      var obj = new GenerateObject();
      arr.push(obj)
    }
    return arr
  };


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

  var arrData = generatorArrayObj();
  fillDom(arrData);

  window.main = {
    arrData: arrData
  }

})();
