import { initScale, destroyScale } from './scale.js';
import { initEffect, destroyEffect } from './effect.js';
import { isValidTypeFile } from './type-photo.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zа-яё0-9]{1,19}$/i;

const Error = {
  PATTERN_INVALID: 'Неверный хэштег!',
  UNORIGINALITY: 'Хэштеги не могут быть одинаковыми!',
  COUNT_INVALID: `Максимум может быть ${MAX_COUNT_HASHTAG} хэштегов!`,
};

const SubmitBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const closeBtnElement = formElement.querySelector('.img-upload__cancel');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const fileInputElement = formElement.querySelector('.img-upload__start input[type=file]');
const commentElement = formElement.querySelector('.text__description');
const hashtagElement = formElement.querySelector('.text__hashtags');
const submitBtnElement = bodyElement.querySelector('.img-upload__submit');
const effectsPreviewElement = formElement.querySelectorAll('.effects__preview');

const рristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload-error',
}, false);

const disableSubmitBtn = () => {
  submitBtnElement.disabled = true;
  submitBtnElement.textContent = SubmitBtnText.SENDING;
};

const allowSubmitBtn = () => {
  submitBtnElement.disabled = false;
  submitBtnElement.textContent = SubmitBtnText.IDLE;
};

const standardizeTag = (tag) => tag.trim().split(' ');

const isValidPatternTag = (value) => {
  if (value.length === 0) {
    return true;
  }

  for (const normTag of standardizeTag(value).map((tag) => PATTERN_VALID.test(tag))) {
    if (!normTag) {
      return false;
    }
  }
  return true;
};

const isValidCountTag = (value) => standardizeTag(value).length <= MAX_COUNT_HASHTAG;

const isOriginalTag = (value) => {
  const lowerCaseTags = standardizeTag(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const initValidate = () => {
  рristine.addValidator(hashtagElement, isValidPatternTag, Error.PATTERN_INVALID, 3, true);
  рristine.addValidator(hashtagElement, isValidCountTag, Error.COUNT_INVALID, 2, true);
  рristine.addValidator(hashtagElement, isOriginalTag, Error.UNORIGINALITY, 1, true);
};

const openEditPopup = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownClosing);
  closeBtnElement.addEventListener('click', onCloseEditPopupClick);
  commentElement.addEventListener('keydown', onDocumentKeydownIgnore);
  hashtagElement.addEventListener('keydown', onDocumentKeydownIgnore);
};

export function showOverlay() {
  overlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownClosing);
}

const onFileInputChange = () => {
  const file = fileInputElement.files[0];

  if (isValidTypeFile(file)) {
    const newPictureURL = URL.createObjectURL(file);
    imgPreviewElement.src = newPictureURL;
    effectsPreviewElement.forEach((element) => {
      element.style.backgroundImage = `url(${newPictureURL})`;
    });
    openEditPopup();
    initValidate();
    initScale();
    initEffect();
  }
};

export const closeEditPopup = () => {
  formElement.reset();
  рristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownClosing);
  closeBtnElement.removeEventListener('click', onCloseEditPopupClick);
  commentElement.removeEventListener('keydown', onDocumentKeydownIgnore);
  hashtagElement.removeEventListener('keydown', onDocumentKeydownIgnore);
  destroyScale();
  destroyEffect();
};

function onCloseEditPopupClick() {
  closeEditPopup();
}

function onDocumentKeydownClosing(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPopup();
  }
}

function onDocumentKeydownIgnore(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

export const setFormSubmit = (actionSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = рristine.validate();
    if (isValid) {
      disableSubmitBtn();
      sendData(new FormData(evt.target))
        .then(actionSuccess)
        .then(showSuccessMessage)
        .catch(() => {
          showErrorMessage();
        })
        .finally(allowSubmitBtn);
    }
  });
};


export const initEditPopup = () => {
  fileInputElement.addEventListener('change', onFileInputChange);
};
