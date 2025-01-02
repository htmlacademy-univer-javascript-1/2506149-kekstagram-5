const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA:'/data',
  SEND_DATA:'/'
};

const Method = {
  GET:'GET',
  POST: 'POST'
};

const Error = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте перезагрузить страницу!',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз!'
};

const loadData = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`,{method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => loadData(Route.GET_DATA, Error.GET_DATA);
export const sendData = (body) => loadData(Route.SEND_DATA, Error.SEND_DATA, Method.POST, body);
