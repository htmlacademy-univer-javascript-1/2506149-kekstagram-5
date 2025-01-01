const ImageEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectSettings = {
  [ImageEffect.CHROME]: {
    filter: 'grayscale',
    unit: '',
    slider: {
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  [ImageEffect.SEPIA]: {
    filter: 'sepia',
    unit: '',
    slider: {
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  [ImageEffect.MARVIN]: {
    filter: 'invert',
    unit: '%',
    slider: {
      min: 0,
      max: 100,
      step: 1
    }
  },
  [ImageEffect.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
    slider: {
      min: 0,
      max: 3,
      step: 0.1
    }
  },
  [ImageEffect.HEAT]: {
    filter: 'brightness',
    unit: '',
    slider: {
      min: 1,
      max: 3,
      step: 0.1
    }
  },
  [ImageEffect.DEFAULT]: {
    filter: null,
    unit: ''
  }
};

const uploadModalElement = document.querySelector('.img-upload');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectSliderWrapper = document.querySelector('.img-upload__effect-level');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomLevelInput = document.querySelector('.scale__control--value');
const ZOOM_INCREMENT = 25;
const MIN_ZOOM_PERCENTAGE = 25;
const MAX_ZOOM_PERCENTAGE = 100;
const FULL_ZOOM_SCALE = 100;

let activeEffect = ImageEffect.DEFAULT;

const updateStyle = () => {
  const { filter, unit } = effectSettings[activeEffect];
  previewImageElement.style.filter = activeEffect === ImageEffect.DEFAULT ? null : `${filter}(${effectLevelInput.value}${unit})`;
};

const sliderEventHandler = () => {
  effectLevelInput.value = effectSliderElement.noUiSlider.get();
  updateStyle();
};

const initializeSlider = ({ min, max, step }) => {
  noUiSlider.create(effectSliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower'
  });
  effectSliderElement.noUiSlider.on('update', sliderEventHandler);
};

const configureSlider = () => {
  if (activeEffect !== ImageEffect.DEFAULT) {
    const { slider } = effectSettings[activeEffect];
    if (effectSliderElement.noUiSlider) {
      effectSliderElement.noUiSlider.destroy();
    }
    initializeSlider(slider);
    effectSliderWrapper.classList.remove('hidden');
  } else {
    effectSliderElement.noUiSlider?.destroy();
    effectSliderWrapper.classList.add('hidden');
  }
  updateStyle();
};

const applyEffect = (effect) => {
  activeEffect = effect;
  configureSlider();
};

const reset = () => {
  applyEffect(ImageEffect.DEFAULT);
};

const onEffectsChange = (evt) => {
  applyEffect(evt.target.value);
};

const onChangeZoomImage = (increment) => {
  let currentZoomValue = parseInt(zoomLevelInput.value, 10);
  if ((increment && currentZoomValue < MAX_ZOOM_PERCENTAGE) || (!increment && currentZoomValue > MIN_ZOOM_PERCENTAGE)) {
    currentZoomValue += increment ? ZOOM_INCREMENT : -ZOOM_INCREMENT;
    zoomLevelInput.value = `${currentZoomValue.toString()}%`;
    previewImageElement.style.transform = `scale(${currentZoomValue / FULL_ZOOM_SCALE})`;
  }
};

const onZoomOutButton = () => onChangeZoomImage(false);
const onZoomInButton = () => onChangeZoomImage(true);

const addEventListenerToScaleElemets = () => {
  zoomOutButton.addEventListener('click', onZoomOutButton);
  zoomInButton.addEventListener('click', onZoomInButton);
};

const removeEventListenerFromScaleElemets = () => {
  zoomOutButton.removeEventListener('click', onZoomOutButton);
  zoomInButton.removeEventListener('click', onZoomInButton);
};

const init = () => {
  configureSlider();
  uploadModalElement.querySelector('.effects').addEventListener('change', onEffectsChange);
  addEventListenerToScaleElemets();
};

export { addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, init, reset };
