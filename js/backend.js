'use strict';

const RESPONSE_TYPE = `json`;
const TIMEOUT_IN_MS = 5000;
const STATUS_CODE_OK = 200;
const CONNECTION_ERROR_TEXT = `Произошла ошибка соединения`;
const SAVE_URL = `https://echo.htmlacademy.ru`;
const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;

const makeGeneralError = (status, text) => {
  return `Статус ответа: ${status} ${text}`;
};

const makeTimeoutError = (timeout) => {
  return `Запрос не успел выполниться за ${timeout} мс`;
};

const request = (url, onLoad, onError, data) => {
  const method = (data) ? `POST` : `GET`;

  const xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE_OK) {
      onLoad(xhr.response);
    } else {
      onError(makeGeneralError(xhr.status, xhr.statusText));
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(CONNECTION_ERROR_TEXT);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(makeTimeoutError(xhr.timeout));
  });

  xhr.open(method, url);

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};

const load = (onLoad, onError) => {
  request(LOAD_URL, onLoad, onError);
};

const save = (data, onLoad, onError) => {
  request(SAVE_URL, onLoad, onError, data);
};

window.backend = {
  load, save
};
