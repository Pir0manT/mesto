//************************************
//      Модуль описания класса      //
//  карточки с картинкой и текстом  //
//************************************

class Card {
  constructor(data, template, handleClick) {
    this._data        = data
    this._template    = template
    this._handleClick = handleClick
  }

  // заполнение полей карточки
  _fill = () => {
    this._elementImage.src         = this._data.link
    this._elementImage.alt         = this._data.name
    this._elementTitle.textContent = this._data.name
  }

  // подписка на события
  _setEventListeners = () => {
    this._buttonDelete.addEventListener('click', evt => evt.target.closest('.element').remove())
    this._buttonLike.addEventListener('click', evt => evt.target.closest('.element__heart').classList.toggle('element__heart-active'))
    this._elementImage.addEventListener('click', () => this._handleClick(this._data.name, this._data.link))
  }

  getElement = () => {
    this._element = this._template.cloneNode(true);
    [this._buttonDelete,this._elementImage,this._elementTitle,this._buttonLike] = this._element.querySelectorAll('.element__delete,.element__image,.element__title,.element__heart')
    this._fill();
    this._setEventListeners();

    return this._element;
  }
}

//************************************
//             Экспорт              //
//************************************

export {
  Card
}

