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
    return res.ok
      ? res.json()
      : Promise.reject(
          `Ошибка: ${res.status} ${
            !!res.statusText ? 'Описание: ' + res.statusText : ''
          }`
        )
    // if (res.ok) {
    //   return res.json()
    // } else {
    //   return Promise.reject(
    //     `Ошибка: ${res.status} ${
    //       !!res.statusText ? 'Описание: ' + res.statusText : ''
    //     }`
    //   )
    // }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse)
  }

  getInitialCards = () => {
    return this._request(`${this._baseURL}/cards`, {
      headers: this._headers
    })
  }

  getProfile = () => {
    return this._request(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
  }

  setProfile = ({ name, about }) => {
    return this._request(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
  }

  setAvatar = ({ avatar }) => {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
  }

  addCard = (card) => {
    return this._request(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
  }

  delCard = (cardId) => {
    return this._request(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeLike = (cardId, isLiked) => {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
  }
}



export  const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "91dc4eb1-7a8e-4261-b2c1-7c75534621a0",
    "Content-Type": "application/json",
  }
}
)
