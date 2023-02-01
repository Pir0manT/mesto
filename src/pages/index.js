//************************************
//             Импорт               //
//************************************

import '../pages/index.css';
import { initialElements, validationConfig } from '../scripts/constants.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section} from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'

//************************************
//           переменные             //
//************************************

//кнопки
const btnOpenProfileEdit = document.querySelector(".profile__edit-button")
const btnOpenAddElement = document.querySelector(".profile__add-button")

//валидаторы форм
const validationProfileEdit = new FormValidator(validationConfig, document.forms.edit)
const validationAddElement  = new FormValidator(validationConfig, document.forms.addcard)

// секции и попапы
const section = new Section(
  {
    renderer: (item) =>
      section.addItem(createElement(item))
  },
  '.elements__grid'
)

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
})

const profileEditPopup = new PopupWithForm(
  '.popup_type_edit-profile',
  (values) => {
    userInfo.setUserInfo(values)
    profileEditPopup.close()
  }
)

const elementAddPopup = new PopupWithForm(
  '.popup_type_add-element',
  (values) => {
    section.addItem(createElement(values))
    elementAddPopup.close()
  }
)

const openImagePopup = new PopupWithImage('.popup_type_open-image')

//************************************
//            функции               //
//************************************

// возвращает DOM-элемент карточки по шаблону из переданного объекта
function createElement(item) {
  return new Card(item, '.element-template', () => openImagePopup.open(item)).getElement()
}

//************************************
//      обработчики событий         //
//************************************

// открытие формы редактирования профиля
btnOpenProfileEdit.addEventListener('click', () => {
  profileEditPopup.setInputValues(userInfo.getUserInfo())
  validationProfileEdit.resetValidation()
  profileEditPopup.open()
})

// открытие формы добавления элемента
btnOpenAddElement.addEventListener('click', () => {
  validationAddElement.resetValidation()
  elementAddPopup.open()
});

profileEditPopup.setEventListeners()
elementAddPopup.setEventListeners()
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
section.renderItems(initialElements.reverse())
