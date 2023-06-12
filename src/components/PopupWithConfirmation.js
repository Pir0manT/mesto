//************************************
//     Модуль класса всплывающего    //
//       окна для подтверждения      //
//       действий пользователя       //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

import {Popup} from './Popup'

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form_delete')
  }

  setFormSubmitHandler = (handler) => {
    this._handleSubmitCallback = handler;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }
}
