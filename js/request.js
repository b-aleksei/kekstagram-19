'use strict';

(function () {

  var TIMEOUT_MS = 3000;
  var DELAY_ERROR_MS = 2000;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var ERROR_TYPE = {
    OK: 200,
    PAGE_NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var handleFailQuery = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: fixed;' +
      ' left: 0; right: 0; font-size: 30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, DELAY_ERROR_MS);
  };

  var startRequest = function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ERROR_TYPE.OK :
          success(xhr.response);
          break;
        case ERROR_TYPE.PAGE_NOT_FOUND :
          error(xhr.status + 'Страница не найдена, проверьте корректность адреса');
          break;
        case ERROR_TYPE.SERVER_ERROR :
          error(xhr.status + 'Сервер временно не доступен, скоро все заработает');
          break;
        default :
          error(xhr.status + 'Неизвестная ошибка, попробуйте позднее');
      }
    }, {once: true});

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения. Проверьте подключение к интернет');
    }, {once: true});

    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Обновите страницу.');
    }, {once: true});

    return xhr;
  };

  var load = function (success, error) {
    var errorHandler = error || handleFailQuery;
    var xhr = startRequest(success, errorHandler);
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, success, error) {
    var errorHandler = error || handleFailQuery;
    var xhr = startRequest(success, errorHandler);
    xhr.open('post', URL_UPLOAD);
    xhr.send(data);
  };

  window.request = {
    load,
    upload,
  };

})();
