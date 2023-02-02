//************************************
//     Модуль класса всплывающего    //
//           окна с формой           //
//************************************
import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    this._handleSubmit = handleSubmit
  }

  _getInputValues = () => {
    return Object.fromEntries(new FormData(this._form).entries())
    // return this._inputs.reduce((acc, input) => {
    //   return { ...acc, [input.name]: input.value }
    // }, {})
  }

  setInputValues = (values) => {
    this._inputs.forEach((input) => {
      input.value = values[input.name]
    })
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._getInputValues())
    })
  }

  close = () => {
    super.close()
    this._form.reset()
  }
}
