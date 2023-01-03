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
    inputElement.classList.remove(this._settings.inputErrorClass)
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
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
      this._buttonSubmit.classList.add(this._settings.inactiveButtonClass) :
      this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass)
    )
 }

 // скрыть ошибки валидации, очистить содержимое инпутов
  resetValidation = (clearInputValue = true) => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      if (clearInputValue) {inputElement.value =''}
      this._hideInputError(inputElement)
    });

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
//             Экспорт              //
//************************************

export {
  FormValidator
}
