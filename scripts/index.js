//************************************
//             Импорт               //
//************************************

import {
  initialElements,
  validationConfig
} from './constants.js'

import {
  Card
} from './Card.js'

import {
  FormValidator
} from './FormValidator.js'

//************************************
//           переменные             //
//************************************

// Добавление картинок
const elementsList = document.querySelector(".elements__grid")
// const elementTemplate = document.querySelector(".element-template")

// попапы
const modalElementImage = document.querySelector(".popup_type_open-image")
const modalProfileEdit = document.querySelector(".popup_type_edit-profile")
const modalAddElement = document.querySelector(".popup_type_add-element")

// открытая картинка
const popupOpenPhoto = document.querySelector(".popup__open-photo")
const popupOpenSubtitle = document.querySelector(".popup__open-photo-subtitle")


//кнопки
const btnOpenProfileEdit = document.querySelector(".profile__edit-button")
const btnOpenAddElement = document.querySelector(".profile__add-button")
const buttonCloseList = document.querySelectorAll('.popup__close');

// профиль
const profileName = document.querySelector(".profile__title")
const profileJob = document.querySelector(".profile__subtitle")

// поля ввода
const inputProfileName = modalProfileEdit.querySelector(".popup__input_type_name")
const inputProfileJob = modalProfileEdit.querySelector(".popup__input_type_job")
const inputElementName = modalAddElement.querySelector(".popup__input_type_element-name")
const inputElementLink = modalAddElement.querySelector(".popup__input_type_element-link")

//формы
const formProfileEdit = modalProfileEdit.querySelector(".popup__form")
const formAddElement = modalAddElement.querySelector('.popup__form')

//валидаторы форм
const validationProfileEdit = new FormValidator(validationConfig, formProfileEdit)
const validationAddElement  = new FormValidator(validationConfig, formAddElement)

//************************************
//            функции               //
//************************************

// закрытие popup по клавише Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModalWindow(document.querySelector(".popup_opened"))
  }
}

// открывает popup
function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

// закрывает popup
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

// открывает popup с картинкой элемента
function handleElementClick(name, link) {
  popupOpenPhoto.src = link
  popupOpenPhoto.alt = name
  popupOpenSubtitle.textContent = name
  openModalWindow(modalElementImage)
}

// возвращает Node картинки по шаблону из переданного объекта
function createElement(item) {
  return new Card(item, '.element-template', handleElementClick).getElement()
}

//************************************
//      обработчики событий         //
//************************************

// закрытие любого из имеющихся popup
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup")){
    closeModalWindow(popup)
  }
});
  btn.addEventListener('click', () => closeModalWindow(popup));
})

// открытие формы редактирования профиля
btnOpenProfileEdit.addEventListener("click", () => {
  // resetFormCondition(modalProfileEdit)
  inputProfileName.value = profileName.textContent
  inputProfileJob.value = profileJob.textContent
  validationProfileEdit.resetValidation(false)
  openModalWindow(modalProfileEdit)
});

//сохранение данных из формы редактирования профиля
formProfileEdit.addEventListener('submit', () => {
  profileName.textContent = inputProfileName.value
  profileJob.textContent = inputProfileJob.value
  closeModalWindow(modalProfileEdit)
});


// открытие формы добавления элемента
btnOpenAddElement.addEventListener('click', () => {
  validationAddElement.resetValidation()
  openModalWindow(modalAddElement)
});


// добавление элемента из данных, введенных в форму; закрытие формы
formAddElement.addEventListener('submit', () => {
  elementsList.prepend(createElement({name: inputElementName.value, link: inputElementLink.value}))
  closeModalWindow(modalAddElement)
})

//************************************
//      отрисовка страницы          //
//************************************

//включение валидации форм
validationProfileEdit.enableValidation()
validationAddElement.enableValidation()

// отрисовка картинок
elementsList.append(...initialElements.map(createElement))
