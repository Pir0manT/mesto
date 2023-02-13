//************************************
//      Модуль класса  карточки     //
//       с картинкой и текстом      //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class Card {
  constructor(
    data,
    template,
    userId,
    handleClick,
    handleDelete,
    handleChangeLike
  ) {
    this._data = data
    this._userId = userId
    this._template = document.querySelector(template).content
    this._handleClick = handleClick
    this._handleDelete = handleDelete
    this._handleChangeLike = handleChangeLike
  }

  // заполнение полей карточки
  _fillCardData = () => {
    this._elementImage.src = this._data.link
    this._elementImage.alt = this._data.name
    this._elementTitle.textContent = this._data.name
  }

  delete = () => {
    this._element.remove()
    this._element = null
  }
  isLiked = () => {
    return this._data.likes.some((like) => like._id === this._userId)
  }

  getCardId = () => {
    return this._data._id
  }

  setLikes = (newLikes) => {
    this._data.likes = newLikes
    this._renderLikes()
  }

  _renderLikes = () => {
    this._likeCounter.textContent = this._data.likes.length
    this.isLiked()
      ? this._buttonLike.classList.add('element__heart-active')
      : this._buttonLike.classList.remove('element__heart-active')
  }
  // подписка на события
  _setEventListeners = () => {
    this._buttonDelete.addEventListener('click', () => this._handleDelete(this))
    this._buttonLike.addEventListener('click', () => this._handleChangeLike(this))
    this._elementImage.addEventListener('click', () => this._handleClick())
  }

  getElement = () => {
    this._element = this._template.querySelector('.element').cloneNode(true)
    this._buttonDelete = this._element.querySelector('.element__delete')
    this._elementImage = this._element.querySelector('.element__image')
    this._elementTitle = this._element.querySelector('.element__title')
    this._buttonLike = this._element.querySelector('.element__heart')
    this._likeCounter = this._element.querySelector('.element__heart-count')
    if (this._data.owner._id !== this._userId) {
      this._buttonDelete.style.display = 'none'
    }
    this._fillCardData()
    this._renderLikes()
    this._setEventListeners()

    return this._element
  }
}
