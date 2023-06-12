//************************************
//     Модуль класса всплывающего    //
//         окна с фотографией        //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__open-photo')
    this._title = this._popup.querySelector('.popup__open-photo-subtitle')
  }

  open = ({name, link}) => {
    this._image.src = link
    this._image.alt = name
    this._title.textContent = name
    super.open()
  }
}
