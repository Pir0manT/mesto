//************************************
//     Модуль класса всплывающего    //
//         окна с фотографией        //
//************************************

import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__open-photo')
    this._title = this._popup.querySelector('.popup__open-photo-subtitle')
  }

  open = (item) => {
    this._image.src = item.link
    this._image.alt = item.name
    this._title.textContent = item.name
    super.open()
  }
}
