//************************************
//     Модуль класса всплывающего   //
//              окна                //
//************************************

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open = () => {
    this._popup.classList.add('.popup__opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close = () => {
    this._popup.classList.remove('.popup__opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    evt.key === 'Escape' && this.close()
  }

  setEventListeners = () => {
    this._popup.addEventListener('mousedown', (evt) => {
      evt.classList.contains('popup') && this.close()
      evt.classList.contains('popup__close') && this.close()
    })
  }
}
