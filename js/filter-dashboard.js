import { renderGallery } from './rendering-full-size-image.js';

const MAX_COUNT_PHOTO_BOARD = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const HIDDEN_FILTER_CLASS = 'img-filters--inactive';
const TIMEOUT_DELAY = 500;

const filterContainerElement = document.querySelector('.img-filters');
const defaultFilterElement = document.querySelector('#filter-default');
const randomFilterElement = document.querySelector('#filter-random');
const discussedFilterElement = document.querySelector('#filter-discussed');

const debounce = (callback) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
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
  removePhotos();
  const currentFilter = document.querySelector(`.${ACTIVE_FILTER_CLASS}`);
  currentFilter.classList.remove(ACTIVE_FILTER_CLASS);
  renderGallery(photos);
  filter.classList.add(ACTIVE_FILTER_CLASS);
};

export const showFilteredPhotos = (miniatures) => {
  renderGallery(miniatures);
  filterContainerElement.classList.remove(HIDDEN_FILTER_CLASS);

  defaultFilterElement.addEventListener('click', debounce(() => {
    changePhotos(filterMethod.getDefaultMiniatures(miniatures), defaultFilterElement);
  }));
  randomFilterElement.addEventListener('click', debounce(() => {
    changePhotos(filterMethod.getRandomMiniatures(miniatures), randomFilterElement);
  }));
  discussedFilterElement.addEventListener('click', debounce(() => {
    changePhotos(filterMethod.getDiscussedMiniatures(miniatures), discussedFilterElement);
  }));
};
