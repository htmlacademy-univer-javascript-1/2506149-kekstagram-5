import { showOverlay } from './edit-popup.js';

const ALERT_SHOW_TIME = 5000;
const bodyElement = document.querySelector('body');
const successMessageElement = bodyElement.querySelector('#success').content.querySelector('.success');
const errorMessageElement = bodyElement.querySelector('#error').content.querySelector('.error');
const successBtnElement = successMessageElement.querySelector('.success__button');
const errorBtnElement = errorMessageElement.querySelector('.error__button');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const showSuccessMessage = () => {
  document.body.append(successMessageElement);
  successBtnElement.addEventListener('click', onSuccessBtnClick);
  document.addEventListener('keydown', onDocumentSuccessKeydown);
  successMessageElement.addEventListener('click', onSuccessMessageElementClick);
};

const closeSuccessMessage = () => {
  successMessageElement.remove();
  successBtnElement.removeEventListener('click', onSuccessBtnClick);
  document.removeEventListener('keydown', onDocumentSuccessKeydown);
  successMessageElement.removeEventListener('click', onSuccessMessageElementClick);
};

export const showErrorMessage = () => {
  document.body.append(errorMessageElement);
  errorBtnElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentErrorKeydown);
  errorMessageElement.addEventListener('click', onErrorMessageElementClick);
};

const closeErrorMessage = () => {
  errorMessageElement.remove();
  errorBtnElement.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onDocumentErrorKeydown);
  errorMessageElement.removeEventListener('click', onErrorMessageElementClick);
  showOverlay();
};

function onSuccessMessageElementClick(evt) {
  if (evt.target !== successMessageElement.querySelector('.success__inner') &&
    evt.target !== successMessageElement.querySelector('.success__title')) {
    closeSuccessMessage();
  }
}

function onErrorMessageElementClick(evt) {
  if (evt.target !== errorMessageElement.querySelector('.error__inner') &&
    evt.target !== errorMessageElement.querySelector('.error__title')) {
    closeErrorMessage();
  }
}

function onSuccessBtnClick() {
  closeSuccessMessage();
}

function onErrorButtonClick() {
  closeErrorMessage();
}

function onDocumentSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function onDocumentErrorKeydown(evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}
