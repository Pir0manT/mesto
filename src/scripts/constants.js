//************************************
//      В этом модуле содержатся    //
//       правила валидации форм     //
//************************************

// Картинки по умолчанию
// const initialElements = [
//   {name: 'Казань', link: 'https://sf.top61.ru/f/4cc317aad9034adba823/?dl=1'},
//   {name: 'Озеро Байкал', link: 'https://sf.top61.ru/f/84068d4533584dff9411/?dl=1'},
//   {name: 'Калининград', link: 'https://sf.top61.ru/f/d74736b16b0e419ea742/?dl=1'},
//   {name: 'Ладожское озеро', link: 'https://sf.top61.ru/f/8348db34c3654aae90bf/?dl=1'},
//   {name: 'Ростов-на-Дону', link: 'https://sf.top61.ru/f/2bdc20bbb5c44f0d8c4e/?dl=1'},
//   {name: 'Владивосток', link: 'https://sf.top61.ru/f/8adca8203ba74e92b00e/?dl=1'}
// ]

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}


//************************************
//             Экспорт              //
//************************************

export {
  // initialElements,
  validationConfig
}
