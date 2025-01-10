import { renderGallery } from './rendering-full-size-image.js';

const MAX_COUNT_PHOTO_BOARD = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const HIDDEN_FILTER_CLASS = 'img-filters--inactive';
const TIMEOUT_DELAY = 500;

const filterContainerElement = document.querySelector('.img-filters');
const defaultFilterElement = filterContainerElement.querySelector('#filter-default');
const randomFilterElement = filterContainerElement.querySelector('#filter-random');
const discussedFilterElement = filterContainerElement.querySelector('#filter-discussed');

const debounce = (callback, delay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const getRandomInteger = (first, second) => {
  const lower = Math.ceil(Math.min(first, second));
  const upper = Math.floor(Math.max(first, second));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElementArray = (array, count) => {
  const randomIndexList = [];
  const max = Math.min(count, array.length);

  while (randomIndexList.length < max) {
    const index = getRandomInteger(0, array.length - 1);
    if (!randomIndexList.includes(index)) {
      randomIndexList.push(index);
    }
  }

  return randomIndexList.map((index) => array[index]);
};

const sortRandomPhotos = (photos, count) => getRandomElementArray(photos, count);
const sortDiscussedPhotos = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const filterMethod = {
  getDefaultMiniatures: (miniatures) => miniatures.slice(),
  getRandomMiniatures: (miniatures) => sortRandomPhotos(miniatures, MAX_COUNT_PHOTO_BOARD).slice(),
  getDiscussedMiniatures: (miniatures) => miniatures.slice().sort(sortDiscussedPhotos),
};

const removePhotos = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());

const changePhotos = (photos, filter) => {
  const currentFilter = document.querySelector(`.${ACTIVE_FILTER_CLASS}`);
  currentFilter.classList.remove(ACTIVE_FILTER_CLASS);
  filter.classList.add(ACTIVE_FILTER_CLASS);

  return () => {
    removePhotos();
    renderGallery(photos);
  };
};

export const showFilteredPhotos = (miniatures) => {
  renderGallery(miniatures);
  filterContainerElement.classList.remove(HIDDEN_FILTER_CLASS);

  const debouncedRender = debounce((renderCallback) => renderCallback());

  defaultFilterElement.addEventListener('click', () => {
    const renderCallback = changePhotos(filterMethod.getDefaultMiniatures(miniatures), defaultFilterElement);
    debouncedRender(renderCallback);
  });

  randomFilterElement.addEventListener('click', () => {
    const renderCallback = changePhotos(filterMethod.getRandomMiniatures(miniatures), randomFilterElement);
    debouncedRender(renderCallback);
  });

  discussedFilterElement.addEventListener('click', () => {
    const renderCallback = changePhotos(filterMethod.getDiscussedMiniatures(miniatures), discussedFilterElement);
    debouncedRender(renderCallback);
  });
};
