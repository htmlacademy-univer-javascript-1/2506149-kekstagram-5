const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const Endpoints = {
  FETCH_PHOTOS: '/data',
  SUBMIT_FORM: '/',
};
const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorMessages = {
  FETCH_PHOTOS: 'Не удалось загрузить данные. Попробуйте обновить страницу.',
  SUBMIT_FORM: 'Не удалось отправить форму. Попробуйте снова.',
};

const request = (endpoint, errorMessage, method = HttpMethods.GET, body = null) =>
  fetch(`${API_URL}${endpoint}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      return response.json();
    });

const fetchPhotos = () => request(Endpoints.FETCH_PHOTOS, ErrorMessages.FETCH_PHOTOS);

const submitForm = (formData) => request(Endpoints.SUBMIT_FORM, ErrorMessages.SUBMIT_FORM, HttpMethods.POST, formData);

export { fetchPhotos, submitForm };
