//************************************
//             Импорт               //
//************************************

import { initialElements, validationConfig } from './constants.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section} from './Section.js'
import { UserInfo } from './UserInfo.js'
import {PopupWithForm} from './PopupWithForm.js'
import {PopupWithImage} from './PopupWithImage.js'

//************************************
//           переменные             //
//************************************

//кнопки
const btnOpenProfileEdit = document.querySelector(".profile__edit-button")
const btnOpenAddElement = document.querySelector(".profile__add-button")

//формы
const formProfileEdit = document
  .querySelector('.popup_type_edit-profile')
  .querySelector('.popup__form')
const formAddElement = document
  .querySelector('.popup_type_add-element')
  .querySelector('.popup__form')

//валидаторы форм
const validationProfileEdit = new FormValidator(validationConfig, formProfileEdit)
const validationAddElement  = new FormValidator(validationConfig, formAddElement)

// секции и попапы
const section = new Section(
  {
    data: initialElements,
    renderer: (items, container) =>
      container.append(...items.map(createElement)),
  },
  '.elements__grid'
)

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
})

const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  (values) => {
    userInfo.setUserInfo(values)
    editProfilePopup.close()
  }
)

const addElementPopup = new PopupWithForm(
  '.popup_type_add-element',
  (values) => {
    section.addItem(createElement(values))
    addElementPopup.close()
  }
)

const openImagePopup = new PopupWithImage('.popup_type_open-image')

//************************************
//            функции               //
//************************************

// возвращает DOM-элемент карточки по шаблону из переданного объекта
function createElement(item) {
  return new Card(item, '.element-template', openImagePopup.open).getElement()
}

//************************************
//      обработчики событий         //
//************************************

// открытие формы редактирования профиля
btnOpenProfileEdit.addEventListener('click', () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo())
  validationProfileEdit.resetValidation()
  editProfilePopup.open()
})

// открытие формы добавления элемента
btnOpenAddElement.addEventListener('click', () => {
  validationAddElement.resetValidation()
  addElementPopup.open()
});

editProfilePopup.setEventListeners()
addElementPopup.setEventListeners()
openImagePopup.setEventListeners()

//************************************
//      валидаторы ввода            //
//************************************

//включение валидации форм
validationProfileEdit.enableValidation()
validationAddElement.enableValidation()

//************************************
//      отрисовка страницы          //
//************************************

// отрисовка картинок
section.renderItems()
