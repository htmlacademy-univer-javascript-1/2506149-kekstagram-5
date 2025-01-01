import {isEscape} from './util.js';
const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const removeMessage = (value) => {
  value.remove();
  document.removeEventListener('keydown', (evt) => handleModalClickOrKeydown(evt, value));
  document.removeEventListener('click', (evt) => handleModalClickOrKeydown(evt, value));
};

function handleModalClickOrKeydown (evt, msgElement) {
  if (evt.type === 'keydown' && isEscape(evt)) {
    evt.preventDefault();
    removeMessage(msgElement);
  } else if (evt.type === 'click' && !evt.target.closest('div')) {
    removeMessage(msgElement);
  }
}

const handleCloseButtonClick = (message) => removeMessage(message);
const displayMessage = (value, buttonSelector) => {
  body.appendChild(value);
  value.querySelector(buttonSelector)
    .addEventListener('click', () => handleCloseButtonClick(value));
  document.addEventListener('keydown', (evt) => handleModalClickOrKeydown(evt, value));
  body.addEventListener('click', (evt) => handleModalClickOrKeydown(evt, value));
};

const showError = () => displayMessage(errorTemplate, '.error__button');
const showSuccess = () => displayMessage(successTemplate, '.success__button');
export { showError, showSuccess };
