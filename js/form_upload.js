import { initEffectSlider, updateEffect } from './effects.js';
const MAX_HASHTAGS = 5;
const HASHTAG_REGEX = /^#[A-Za-z0-9а-яё]{1,19}$/i;
const FORM_ERRORS = {
  DESCRIPTION_ERROR: 'Описание до 140 символов',
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASTAGS: 'Хэш-теги повторяются',
  INCORRECT_HASHTAG: 'Некорректный хэштег'
};
const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const modalOverlay = uploadForm.querySelector('.img-upload__overlay');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const pristineValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});
const showForm = () => {
  modalOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
};

const closeForm = () => {
  uploadForm.reset();
  pristineValidator.reset();
  modalOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
};

const splitHashtags = (inputString) => inputString.trim().split(' ').filter((tag) => Boolean(tag.length));
const isInFocus = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;
const validateHashtagCount = (value) => splitHashtags(value).length <= MAX_HASHTAGS;
const validateHashtags = (value) => splitHashtags(value).every((tag) => HASHTAG_REGEX.test(tag));
const validateUniqueHashtags = (value) => {
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};
function handleKeydown (event) {
  if (event.key === 'Escape' && !isInFocus()) {
    event.preventDefault();
    closeForm();
  }
}

function handleInputChange (event) {
  if (event.target.files.length) {
    showForm();
  }
}
pristineValidator.addValidator(hashtagInput, validateUniqueHashtags, FORM_ERRORS.UNIQUE_HASTAGS);
pristineValidator.addValidator(hashtagInput, validateHashtags, FORM_ERRORS.INCORRECT_HASHTAG);
pristineValidator.addValidator(hashtagInput, validateHashtagCount, FORM_ERRORS.COUNT_EXCEEDED);
pristineValidator.addValidator(descriptionInput, (value) => value.length <= 140, FORM_ERRORS.DESCRIPTION_ERROR);
uploadForm.querySelector('.img-upload__input').addEventListener('change', handleInputChange);
uploadForm.querySelector('.img-upload__cancel').addEventListener('click', closeForm);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isInFocus()) {
    event.stopPropagation();
  }
});

initEffectSlider();

const effectRadios = document.querySelectorAll('.effects__radio');
effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedEffect = radio.value;
    updateEffect(selectedEffect);
  });
});
