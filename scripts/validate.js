//************************************
//      модуль валидации форм       //
//************************************
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
//            функции               //
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

// запретить кнопку submit
function disableSubmitButton(modalWindow) {
  modalWindow.querySelector('.popup__save').classList.add('popup__save_disabled')
}

//показать ошибки
function showInputErrors(errorElement, inputElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = inputElement.validationMessage
  errorElement.classList.add(errorClass)
}

//скрыть ошибки
function hideInputErrors(errorElement, inputElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

//проверка валидности ввода
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  !inputElement.validity.valid ?
    showInputErrors(errorElement, inputElement, inputErrorClass, errorClass) :
    hideInputErrors(errorElement, inputElement, inputErrorClass, errorClass)
}


//переключение состояния кнопки submit
function toggleButtonState(inputsList, buttonElement, inactiveButtonClass) {
  inputsList.some(inputElement => !inputElement.validity.valid) ?
    buttonElement.classList.add(inactiveButtonClass) :
    buttonElement.classList.remove(inactiveButtonClass)
}

// включает валидацию во всех формах
function enableValidation(params) {
  const formsList = Array.from(document.querySelectorAll(params.formSelector))
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault())
    const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector))
    const buttonElement = formElement.querySelector(params.submitButtonSelector)
    inputsList.forEach(inputElement => inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, params.inputErrorClass, params.errorClass)
      toggleButtonState(inputsList, buttonElement, params.inactiveButtonClass)
    }))
  })
}

//******************************************
//  выполняется при подключении скрипта    //
//******************************************

enableValidation(validationConfig);
