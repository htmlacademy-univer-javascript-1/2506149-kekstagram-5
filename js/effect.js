const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EffectFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const EffectLevelSlider = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectElement = modalElement.querySelector('.effects');
const effectLevelElement = modalElement.querySelector('.effect-level__value');
let currentEffect = Effect.DEFAULT;
let isExistSlider = false;

const isDefaultEffect = () => currentEffect === Effect.DEFAULT;

const setStyle = () => {
  if (isDefaultEffect()) {
    imageElement.style.filter = null;
  } else {
    const {value} = effectLevelElement;
    const {style, unit} = EffectFilter[currentEffect];
    imageElement.style.filter = `${style}(${value}${unit})`;
  }
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setStyle();
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const createSlider = ({ min, max, step }) => {
  if (!isExistSlider) {
    noUiSlider.create(sliderElement, {
      range: { min, max },
      step,
      start: max,
      connect: 'lower',
      format: {
        to: (value) => Number(value),
        from: (value) => Number(value),
      }
    });
    isExistSlider = true;
  }
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefaultEffect()) {
    hideSlider();
  } else {
    updateSlider(EffectLevelSlider[currentEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  currentEffect = effect;
  setSlider();
  setStyle();
};

const onEffectElementChange = (evt) => {
  setEffect(evt.target.value);
};

export const initEffect = () => {
  createSlider(EffectLevelSlider[currentEffect]);
  effectElement.addEventListener('change', onEffectElementChange);
};

export const destroyEffect = () => {
  setEffect(Effect.DEFAULT);
  effectElement.removeEventListener('change', onEffectElementChange);
};
