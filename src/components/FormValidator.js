//************************************
//      Модуль класса валидатора     //
//               форм                //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class FormValidator {
  constructor(form, settings) {
    this._form = form
    this._settings = settings
    this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector))
    this._buttonSubmit = form.querySelector(settings.submitButtonSelector)
  }

  // показать ошибки
  _showInputError = (inputElement) => {
    inputElement.classList.add(this._settings.inputErrorClass)
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._settings.errorClass)
  }
  // скрыть ошибки
  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._settings.inputErrorClass)
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(this._settings.errorClass)
  }

  // проверка валидности ввода
  _checkInputValidity = (inputElement) => {
    !inputElement.validity.valid
      ? this._showInputError(inputElement)
      : this._hideInputError(inputElement)
  }

  _disableButton = () => {
    this._buttonSubmit.classList.add(this._settings.inactiveButtonClass)
    this._buttonSubmit.disabled = true
  }

  _enableButton = () => {
    this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass)
    this._buttonSubmit.disabled = false
  }

  // изменение доступности кнопки в зависимости от результата проверки полей ввода
  _toggleButtonState = () => {
    // this._inputList.some((inputElement) => !inputElement.validity.valid)
    //   ? this._disableButton()
    //   : this._enableButton()
    this._form.checkValidity()
      ? this._enableButton()
      : this._disableButton()
  }

  // скрыть ошибки валидации, очистить содержимое инпутов
  resetValidation = () => {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    )
    this._toggleButtonState()
  }

  // включение валидации
  enableValidation = () => {
    this._inputList.forEach((inputElement) =>
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    )
  }
}
