// TODO: Изменить стиль комментариев в формат JSDoc
//************************************
//             Импорт               //
//************************************

import '../pages/index.css';
import { validationConfig } from '../scripts/constants.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section} from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {api} from '../components/Api'
import {PopupWithConfirmation} from '../components/PopupWithConfirmation'

//************************************
//           переменные             //
//************************************

// ID текущего пользователя
let userId = ''

//кнопки
const btnOpenProfileEdit = document.querySelector(".profile__edit-button")
const btnOpenAddElement = document.querySelector(".profile__add-button")
const btnChangeAvatar = document.querySelector('.profile__edit')


// const validationProfileEdit = new FormValidator(validationConfig, document.forms.edit)
// const validationAddElement  = new FormValidator(validationConfig, document.forms.addcard)
// const validationChangeAvatar = new FormValidator(validationConfig, document.forms.editAvatar)

//здесь будут хранится валидаторы всех форм
const formValidators = {}

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
  avatarSelector: '.profile__avatar'
})

const profileEditPopup = new PopupWithForm(
  '.popup_type_edit-profile',
  (values) => {
    profileEditPopup.renderSaving(true)
    api
      .setProfile(values)
      .then((savedProfile) => {
        userInfo.setUserInfo(savedProfile)
        profileEditPopup.close()
      })
      .catch((err) => console.log(err))
      .finally(() => profileEditPopup.renderSaving())
  }
)

const avatarEditPopup = new PopupWithForm(
  '.popup_type_avatar',
  (values) => {
  avatarEditPopup.renderSaving(true)
  api
    .setAvatar(values)
    .then((newUserInfo) => {
      userInfo.setUserInfo(newUserInfo)
      avatarEditPopup.close()
    })
    .catch((err) => console.log(err))
    .finally(() => avatarEditPopup.renderSaving())
})

const elementAddPopup = new PopupWithForm(
  '.popup_type_add-element',
  (values) => {
    elementAddPopup.renderSaving(true)
    api.addCard(values)
      .then((newCard) => {
      section.addItem(createElement(newCard))
      elementAddPopup.close()
    })
      .catch(err => console.log(err))
      .finally(()=> elementAddPopup.renderSaving())
  }
)

const openImagePopup = new PopupWithImage('.popup_type_open-image')

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirm')

//************************************
//            функции               //
//************************************

// возвращает DOM-элемент карточки по шаблону из переданного объекта
function createElement(item) {
  return new Card(
    item,
    '.element-template',
    userId,
    () => openImagePopup.open(item),
    deleteCard,
    changeLike
  ).getElement()
}

// выполняет удаление карточки на сервере
function deleteCard(card) {
  confirmationPopup.setFormSubmitHandler(() => {
    api
      .delCard(card.getCardId())
      .then(() => {
        card.delete()
        confirmationPopup.close()
      })
      .catch((err) => console.log(err))
  })
  confirmationPopup.open()
}

// выполняет переключение лайка у карточки на сервере
function changeLike(card)  {
  api
    .changeLike(card.getCardId(), card.isLiked())
    .then(newCard => {
      card.setLikes(newCard.likes)
    })
    .catch(err => console.log(err))
}

//создание и подключение валидаторов форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
//************************************
//      обработчики событий         //
//************************************

// открытие формы редактирования профиля
btnOpenProfileEdit.addEventListener('click', () => {
  profileEditPopup.setInputValues(userInfo.getUserInfo())
  formValidators['editProfile'].resetValidation()
  profileEditPopup.open()
})

// открытие формы добавления элемента
btnOpenAddElement.addEventListener('click', () => {
  formValidators['addCard'].resetValidation()
  elementAddPopup.open()
});

// открытие формы редактирования аватара
btnChangeAvatar.addEventListener('click', () => {
  avatarEditPopup.setInputValues(userInfo.getUserInfo())
  formValidators['editAvatar'].resetValidation()
  avatarEditPopup.open()
})

profileEditPopup.setEventListeners()
elementAddPopup.setEventListeners()
openImagePopup.setEventListeners()
avatarEditPopup.setEventListeners()
confirmationPopup.setEventListeners()

//************************************
//      валидаторы ввода            //
//************************************

//включение валидации форм
// validationProfileEdit.enableValidation()
// validationAddElement.enableValidation()
// validationChangeAvatar.enableValidation()
enableValidation(validationConfig)
//************************************
//      отрисовка страницы          //
//************************************

Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userProfile]) => {
    // установка данных профиля пользователя
    userInfo.setUserInfo(userProfile)
    userId = userProfile._id
    // отрисовка картинок
    section.renderItems(cards.reverse())
  })
  .catch(err => console.log(err))
