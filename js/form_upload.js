import {addEventListenerToScaleElements, removeEventListenerFromScaleElements, initializeEffects, resetEffects} from './effect_of_Image.js';
import {isEscapeKey} from './util.js';
import {sendDataToServer} from './api.js';
import {displayErrorNotification, displaySuccessNotification} from './notifications.js';

const MAX_HASHTAGS = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const formErrorMessages = {
  TOO_MANY_HASHTAGS: `Максимальное количество хэш-тегов — ${MAX_HASHTAGS}`,
  DUPLICATE_HASHTAGS: 'Хэш-теги повторяются',
  INVALID_HASHTAG: 'Некорректный хэш-тег. Хэш-тег начинается #, содержит только буквы и цифры',
  COMMENT_TOO_LONG: `Комментарий не может превышать ${MAX_COMMENT_LENGTH} символов.`
};
const SUPPORTED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const submitButtonText = {
  DEFAULT: 'Опубликовать',
  UPLOADING: 'Публикую...'
};
const documentBody = document.body;
const imageUploadForm = document.querySelector('.img-upload__form');
const modalWindowOverlay = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('.img-upload__cancel');
const hashtagInputField = document.querySelector('.text__hashtags');
const commentInputField = document.querySelector('.text__description');
const submitUploadButton = document.querySelector('.img-upload__submit');
const fileInputField = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const pristineFormValidator = new Pristine (imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const resetFormAndCloseModal = () => {
  imageUploadForm.reset();
  pristineFormValidator.reset();
  removeEventListenerFromScaleElements();
  resetEffects();
  modalWindowOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
};

const isValidFileType = (file) => SUPPORTED_FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type));
const isFieldFocused = () => document.activeElement === hashtagInputField || document.activeElement === commentInputField;

const setupImagePreview = () => {
  const file = fileInputField.files[0];
  if (file && isValidFileType(file)) {
    imagePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
  }
  addEventListenerToScaleElements();
  initializeEffects();
  modalWindowOverlay.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', handleDocumentKeydown);
};

function handleDocumentKeydown(event) {
  if (isEscapeKey(event) && !isFieldFocused()) {
    event.preventDefault();
    resetFormAndCloseModal();
  }
}

const closeModalOnCancelClick = () => resetFormAndCloseModal();
const parseHashtags = (input) => input.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagContent = (value) => {
  const hashtags = parseHashtags(value);
  const isWithinLimit = hashtags.length <= MAX_HASHTAGS;
  const areValidTags = hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
  const areUniqueTags = hashtags.length === new Set(hashtags.map((tag) => tag.toLowerCase())).size;
  return { isWithinLimit, areValidTags, areUniqueTags };
};

const isValidHashtagInput = (value) => {
  const { isWithinLimit, areValidTags, areUniqueTags } = validateHashtagContent(value);
  return isWithinLimit && areValidTags && areUniqueTags;
};

const isValidComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const getHashtagValidationMessage = (value) => {
  const { isWithinLimit, areValidTags, areUniqueTags } = validateHashtagContent(value);
  if (!areValidTags) {
    return formErrorMessages.INVALID_HASHTAG;
  } else if (!areUniqueTags) {
    return formErrorMessages.DUPLICATE_HASHTAGS;
  } else if (!isWithinLimit) {
    return formErrorMessages.TOO_MANY_HASHTAGS;
  }
  return true;
};

const updateSubmitButtonState = (isDisabled, buttonText) => {
  submitUploadButton.disabled = isDisabled;
  submitUploadButton.textContent = buttonText;
};
const disableSubmitButton = () => {
  updateSubmitButtonState(true, submitButtonText.UPLOADING);
};
const enableSubmitButton = () => {
  updateSubmitButtonState(false, submitButtonText.DEFAULT);
};

const setupFormSubmission = (onSuccessCallback) => {
  imageUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (pristineFormValidator.validate()) {
      disableSubmitButton();
      sendDataToServer(new FormData(event.target))
        .then(() => {
          displaySuccessNotification();
          onSuccessCallback();
        })
        .catch(() => {
          displayErrorNotification();
        })
        .finally(enableSubmitButton);
    }
  });
};

pristineFormValidator.addValidator(hashtagInputField, isValidHashtagInput, getHashtagValidationMessage);

pristineFormValidator.addValidator(commentInputField, isValidComment, formErrorMessages.COMMENT_TOO_LONG);
imageUploadForm.addEventListener('change', setupImagePreview);
cancelUploadButton.addEventListener('click', closeModalOnCancelClick);
export { setupFormSubmission, resetFormAndCloseModal };
