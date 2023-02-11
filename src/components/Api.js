//************************************
//      Модуль класса  API          //
//       получение и отправка       //
//         данных на сервер         //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

class Api {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl
    this._headers = headers
  }

  _checkServerResponse = (res) => {
    // return res.ok
    //   ? res.json()
    //   : Promise.reject(
    //       `Ошибка: ${res.status} ${
    //         !!res.statusText ? 'Описание: ' + res.statusText : ''
    //       }`
    //     )
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(
        `Ошибка: ${res.status} ${
          !!res.statusText ? 'Описание: ' + res.statusText : ''
        }`
      )
    }
  }

  getInitialCards = () => {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._checkServerResponse)
  }

  getProfile = () => {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._checkServerResponse)
  }

  setProfile = ({ name, about }) => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkServerResponse)
  }

  setAvatar = ({ avatar }) => {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkServerResponse)
  }

  addCard = (card) => {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._checkServerResponse)
  }

  delCard = (id) => {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkServerResponse)
  }

  changeLike = (cardId, isAdd = true) => {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isAdd ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkServerResponse)
  }
}



export  const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  // headers: {
  //   authorization: "14108236-2953-4b21-88a6-cac7407c6c52",
  //   "Content-Type": "application/json"
  // }
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
  headers: {
    authorization: "a0b3e2e0-8bf7-47b3-9f51-e543921e1ae3",
    "Content-Type": "application/json",
  },
})
