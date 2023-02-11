//************************************
//      Модуль класса  API          //
//       получение и отправка       //
//         данных на сервер         //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

class API {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl
    this._headers = headers
  }

  _checkServerResponse = (res) => {
    return res.ok
      ? res.json
      : Promise.reject(`Ошибка: ${res.status} Описание: ${res.statusText}`)
  }

  getProfile = () => {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }
}
