import noUiSlider from 'nouislider';
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level__slider');

export function applyImageFilters() {
  const effectValue = effectLevelValue.value;
  const currentEffect = document.querySelector('input[name="effect"]:checked').value;

  let filter;
  switch (currentEffect) {
    case 'chrome':
      filter = `grayscale(${effectValue})`;
      break;
    case 'sepia':
      filter = `sepia(${effectValue})`;
      break;
    case 'marvin':
      filter = `invert(${effectValue}%)`;
      break;
    case 'phobos':
      filter = `blur(${effectValue}px)`;
      break;
    case 'heat':
      filter = `brightness(${1 + effectValue})`;
      break;
    default:
      filter = 'none';
  }
  previewImage.style.filter = filter;
}

export function resetImageFilters() {
  previewImage.style.filter = 'none';
  effectLevelValue.value = '';
}

export function initEffectSlider() {
  if (effectSliderContainer) {
    noUiSlider.create(effectSliderContainer, {
      start: 100,
      range: {
        min: 0,
        max: 100
      },
      step: 1
    });

    effectSliderContainer.noUiSlider.on('update', (values) => {
      effectLevelValue.value = values[0];
      applyImageFilters();
    });
  }

  document.querySelectorAll('.effects__radio').forEach((radio) => {
    radio.addEventListener('change', () => {
      const selectedEffect = radio.value;

      updateEffect(selectedEffect);
    });
  });
}

export function updateEffect(effect) {
  resetImageFilters();

  if (effect === 'none') {
    effectSliderContainer.style.display = 'none';
  } else {
    effectSliderContainer.style.display = 'block';
    effectSliderContainer.noUiSlider.set(100);
  }

  let range;
  switch (effect) {
    case 'chrome':
    case 'sepia':
      range = { min: 0, max: 1 };
      break;
    case 'marvin':
      range = { min: 0, max: 100 };
      break;
    case 'phobos':
      range = { min: 0, max: 3 };
      break;
    case 'heat':
      range = { min: 1, max: 3 };
      break;
  }

  effectSliderContainer.noUiSlider.updateOptions({
    range: range,
    start: range.max
  });
}
