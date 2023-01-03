//************************************
//      Модуль описания класса      //
//          валидатора форм         //
//************************************
//************************************
//         Описание классов         //
//************************************

class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    this._inputList = Array.from(form.querySelectorAll(settings.inputSelector))
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
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._settings.inputErrorClas)
    errorElement.textContent = ''
    errorElement.classList.remove(this._settings.errorClass)
  }

  // проверка валидности ввода
  _checkInputValidity = (inputElement) => {
    !inputElement.validity.valid ?
      this._showInputError(inputElement) :
      this._hideInputError(inputElement)
 }

 // изменение доступности кнопки в зависимости от результата проверки полей ввода
 _toggleButtonState = () => {
    this._inputList.some(inputElement => !inputElement.validity.valid ?
      this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass) :
      this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass)
    )
 }

 disableSubmitButton = () => {
   this._buttonSubmit.classList.add(this._settings.inactiveButtonClass)
 }

 // включение валидации в
 enableValidation = () => {
   this._form.addEventListener('submit', evt => evt.preventDefault())
   this._inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
     this._checkInputValidity(inputElement)
     this._toggleButtonState()
   }))
 }
}

//************************************
//            переменные            //
//************************************

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

//************************************
//             функции              //
//************************************

//очистка полей ввода и удаление ошибок валидации
function resetFormCondition(modalWindow) {
  modalWindow.querySelectorAll('.popup__input_type_error')
    .forEach(inputElement => inputElement.classList.remove('popup__input_type_error'))
  modalWindow.querySelectorAll('.popup__error_visible')
    .forEach(errorElement => errorElement.classList.remove('popup__error_visible'))
  modalWindow.querySelectorAll('.popup__form')
    .forEach(formElement => formElement.reset())
}

//************************************
//             Экспорт              //
//************************************

export {
  FormValidator,
  validationConfig,
  resetFormCondition
}
