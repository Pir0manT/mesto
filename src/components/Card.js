//************************************
//      Модуль класса  карточки     //
//       с картинкой и текстом      //
//************************************

export class Card {
  constructor(data, template, handleClick) {
    this._data        = data
    this._template    = document.querySelector(template).content
    this._handleClick = handleClick
  }

  // заполнение полей карточки
  _fill = () => {
    this._elementImage.src         = this._data.link
    this._elementImage.alt         = this._data.name
    this._elementTitle.textContent = this._data.name
  }

  _toggleLike = () => {
    this._buttonLike.classList.toggle('element__heart-active')
}

  _delete = () => {
    this._element.remove()
    this._element = null
  }
  // подписка на события
  _setEventListeners = () => {
    this._buttonDelete.addEventListener('click', () => this._delete())
    this._buttonLike.addEventListener('click', () => this._toggleLike() )
    this._elementImage.addEventListener('click', () => this._handleClick())
  }

  getElement = () => {
    this._element = this._template.querySelector('.element').cloneNode(true);
    this._buttonDelete = this._element.querySelector('.element__delete')
    this._elementImage = this._element.querySelector('.element__image')
    this._elementTitle = this._element.querySelector('.element__title')
    this._buttonLike = this._element.querySelector('.element__heart')
    this._fill();
    this._setEventListeners();

    return this._element;
  }
}
