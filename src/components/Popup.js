//************************************
//     Модуль класса абстрактного    //
//          всплывающего окна        //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    evt.key === 'Escape' && this.close()
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      evt.target.classList.contains('popup') && this.close()
      evt.target.classList.contains('popup__close') && this.close()
    })
  }
}
