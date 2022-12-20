//************************************
//      модуль валидации форм       //
//************************************

//************************************
//            функции               //
//************************************



//проверка валидности ввода
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  if (!inputElement.validity.valid) {
    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(errorClass)
  } else {
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass)
    errorElement.textContent = ''
  }
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
