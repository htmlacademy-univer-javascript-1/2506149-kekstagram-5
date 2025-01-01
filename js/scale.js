const DEFAULT_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const valueScaleElement = modalElement.querySelector('.scale__control--value');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');

const imageScale = (value) => {
  imageElement.style.transform = `scale(${value/100})`;
  valueScaleElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentScale = parseInt(valueScaleElement.value, 10);
  const newScale = currentScale - STEP_SCALE;
  const rightValueScale = Math.max(newScale, MIN_SCALE);
  imageScale(rightValueScale);
};

const onBiggerButtonClick = () => {
  const currentScale = parseInt(valueScaleElement.value, 10);
  const newScale = currentScale + STEP_SCALE;
  const rightValueScale = Math.min(newScale, MAX_SCALE);
  imageScale(rightValueScale);
};

export const destroyScale = () => {
  imageScale(DEFAULT_SCALE);
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
};

export const initScale = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};
