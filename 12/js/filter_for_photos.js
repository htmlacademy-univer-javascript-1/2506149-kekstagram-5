import { renderThumbnails } from './photos.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';

const FILTER_DEBOUNCE_DELAY = 500;
const RANDOM_IMAGE_COUNT = 10;
const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';
const FILTER_ID_DEFAULT = 'filter-default';
const FILTER_ID_RANDOM = 'filter-random';
const FILTER_ID_DISCUSSED = 'filter-discussed';
const filterButtonElements = document.body.querySelectorAll('.img-filters__button');
let currentActiveFilterId = FILTER_ID_DEFAULT;
let activeFilterButtonElement = document.getElementById(FILTER_ID_DEFAULT);

const getRandomImages = (imageArray, count) => {
  if (imageArray.length <= count) {
    return imageArray.slice();
  }
  const remainingImages = imageArray.slice();
  const randomImages = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    randomImages.push(remainingImages[randomIndex]);
    remainingImages.splice(randomIndex, 1);
  }
  return randomImages;
};

const filterImages = (images) => {
  switch (currentActiveFilterId) {
    case FILTER_ID_DEFAULT:
      return images;
    case FILTER_ID_DISCUSSED:
      return images.slice().sort((a, b) => b.comments.length - a.comments.length);
    case FILTER_ID_RANDOM:
      return getRandomImages(images, RANDOM_IMAGE_COUNT);
    default:
      return images;
  }
};

const updateImageDisplay = (images) => {
  const filteredImages = filterImages(images);
  document.querySelectorAll('.picture').forEach((pic) => pic.remove());
  renderThumbnails(filteredImages);
};

const filterButtonClickHandler = (callback) => (evt) => {
  currentActiveFilterId = evt.target.id;
  activeFilterButtonElement.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
  activeFilterButtonElement = evt.target;
  activeFilterButtonElement.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
  callback();
};

getData()
  .then((images) => {
    renderThumbnails(images);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    const onFilterClick = filterButtonClickHandler(debounce(() => updateImageDisplay(images), FILTER_DEBOUNCE_DELAY));
    filterButtonElements.forEach((filterButton) => filterButton.addEventListener('click', onFilterClick));
  })
  .catch((error) => showAlert(error.message));
