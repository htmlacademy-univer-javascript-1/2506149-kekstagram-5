const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};
const effectProperties = {
  [Effect.CHROME]: {
    filter: 'grayscale',
    unit: '',
    slider: {
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  [Effect.SEPIA]: {
    filter: 'sepia',
    unit: '',
    slider: {
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  [Effect.MARVIN]: {
    filter: 'invert',
    unit: '%',
    slider: {
      min: 0,
      max: 100,
      step: 1
    }
  },
  [Effect.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
    slider: {
      min: 0,
      max: 3,
      step: 0.1
    }
  },
  [Effect.HEAT]: {
    filter: 'brightness',
    unit: '',
    slider: {
      min: 1,
      max: 3,
      step: 0.1
    }
  },
  [Effect.DEFAULT]: {
    filter: null,
    unit: ''
  }
};

const modalElement = document.querySelector('.img-upload');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const buttonZoomSmall = document.querySelector('.scale__control--smaller');
const buttonZoomBig = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const ZOOM_STEP = 25;
const MIN_ZOOM_LEVEL = 25;
const MAX_ZOOM_LEVEL = 100;
const FULL_PERCENTAGE = 100;
let chosenEffect = Effect.DEFAULT;
const updateStyle = () => {
  const { filter, unit } = effectProperties[chosenEffect];
  previewImage.style.filter = chosenEffect === Effect.DEFAULT ? null : `${filter}(${effectLevelValue.value}${unit})`;
};
const sliderEventHandler = () => {
  effectLevelValue.value = effectSliderContainer.noUiSlider.get();
  updateStyle();
};
const initializeSlider = ({min, max, step}) => {
  noUiSlider.create(effectSliderContainer, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower'
  });
  effectSliderContainer.noUiSlider.on('update', sliderEventHandler);
};
const configureSlider = () => {
  if (chosenEffect !== Effect.DEFAULT) {
    const { slider } = effectProperties[chosenEffect];
    if (effectSliderContainer.noUiSlider) {
      effectSliderContainer.noUiSlider.destroy();
    }
    initializeSlider(slider);
    sliderContainerElement.classList.remove('hidden');
  } else {
    effectSliderContainer.noUiSlider?.destroy();
    sliderContainerElement.classList.add('hidden');
  }
  updateStyle();
};
const applyEffect = (effect) => {
  chosenEffect = effect;
  configureSlider();
};
const reset = () => {
  applyEffect(Effect.DEFAULT);
};
const onEffectsChange = (evt) => {
  applyEffect(evt.target.value);
};
const onChangeZoomImage = (increment) => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if ((increment && currentScaleValue < MAX_ZOOM_LEVEL) || (!increment && currentScaleValue > MIN_ZOOM_LEVEL)) {
    currentScaleValue += increment ? ZOOM_STEP : -ZOOM_STEP;
    scaleControlValue.value = `${currentScaleValue.toString()}%`;
    previewImage.style.transform = `scale(${currentScaleValue / FULL_PERCENTAGE})`;
  }
};
const onZoomOutButton = () => onChangeZoomImage(false);
const onZoomInButton = () => onChangeZoomImage(true);

const addEventListenerToScaleElemets = () => {
  buttonZoomSmall.addEventListener('click', onZoomOutButton);
  buttonZoomBig.addEventListener('click', onZoomInButton);
};

const removeEventListenerFromScaleElemets = () => {
  buttonZoomSmall.removeEventListener('click', onZoomOutButton);
  buttonZoomBig.removeEventListener('click', onZoomInButton);
};
const init = () => {
  configureSlider();
  modalElement.querySelector('.effects').addEventListener('change', onEffectsChange);
  addEventListenerToScaleElemets();
};

export {addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, init, reset };
