'use strict';

(function () {

  var hashTag = document.querySelector('.text__hashtags');

  var onValidateHash = function () {
    hashTag.setCustomValidity('');
    var str = hashTag.value;
    if (!str) {
      return;
    }
    var arr = str.trim().split(/\s+/);
    if (arr.length > 5) {
      hashTag.setCustomValidity('Максимальное кол-во хештегов: 5');
    }
    var clone = '';
    for (var i = 0; i < arr.length; i++) {
      var tag = arr[i].toLowerCase();
      if (tag !== clone) {
        clone = tag;
      } else {
        hashTag.setCustomValidity('Хештег ' + (i + 1) + ' уже существует');
        break;
      }
      if (!tag.match(/^#[^\W_]+(?!\S)/)) {
        hashTag.setCustomValidity('хештег ' + (i + 1) + ' должен начинаться с # и не содержать пробелы, спецсимволы (#, @, $ и т.п.)');
      }
      if (tag.length > 20) {
        hashTag.setCustomValidity('Максимальная длинна 20 символов');
      }
    }
  };

  window.validity = {
    hashTag: hashTag,
    method: onValidateHash
  };

})();
