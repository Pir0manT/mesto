//************************************
//           переменные             //
//************************************

// Картинки по умолчанию
const initialElements = [
  {name: 'Казань', link: 'https://sf.top61.ru/f/4cc317aad9034adba823/?dl=1'},
  {name: 'Озеро Байкал', link: 'https://sf.top61.ru/f/84068d4533584dff9411/?dl=1'},
  {name: 'Калининград', link: 'https://sf.top61.ru/f/d74736b16b0e419ea742/?dl=1'},
  {name: 'Ладожское озеро', link: 'https://sf.top61.ru/f/8348db34c3654aae90bf/?dl=1'},
  {name: 'Ростов-на-Дону', link: 'https://sf.top61.ru/f/2bdc20bbb5c44f0d8c4e/?dl=1'},
  {name: 'Владивосток', link: 'https://sf.top61.ru/f/8adca8203ba74e92b00e/?dl=1'}
]

// Добавление картинок
const elementsList = document.querySelector(".elements__grid")
const elementTemplate = document.querySelector(".element-template").content

// попапы
const modalElementImage = document.querySelector(".popup_type_open-image")
const modalProfileEdit = document.querySelector(".popup_type_edit-profile")
const modalAddElement = document.querySelector(".popup_type_add-element")

// открытая картинка
const popupOpenPhoto = document.querySelector(".popup__open-photo")
const popupOpenSubtitle = document.querySelector(".popup__open-photo-subtitle")


//кнопки
const btnCloseImage = modalElementImage.querySelector(".popup__close")
const btnOpenProfileEdit = document.querySelector(".profile__edit-button")
const btnCancelProfileEdit = modalProfileEdit.querySelector(".popup__close")
const btnOpenAddElement = document.querySelector(".profile__add-button")
const btnCancelAddElement = modalAddElement.querySelector(".popup__close")

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
  modalWindow.querySelectorAll('.popup__input_type_error')
    .forEach(inputElement => inputElement.classList.remove('popup__input_type_error'))
  modalWindow.querySelectorAll('.popup__error_visible')
    .forEach(errorElement => errorElement.classList.remove('popup__error_visible'))
  modalWindow.querySelectorAll('.popup__form')
    .forEach(formElement => formElement.reset())
}

// возвращает Node картинки по шаблону из переданного объекта
function createElement(item) {
  const element = elementTemplate.cloneNode(true)
  const [deleteButton,elementImage,elementTitle,heartButton] = element.querySelectorAll('.element__delete,.element__image,.element__title,.element__heart')

  elementTitle.textContent = item.name
  elementImage.src = item.link
  elementImage.alt = item.name

  deleteButton.addEventListener('click', evt => evt.target.closest('.element').remove())
  heartButton.addEventListener('click', evt => evt.target.closest('.element__heart').classList.toggle('element__heart-active'))
  elementImage.addEventListener('click', () => {
    popupOpenPhoto.src = item.link
    popupOpenPhoto.alt = item.name
    popupOpenSubtitle.textContent = item.name
    openModalWindow(modalElementImage)
  })

  return element
}

//************************************
//      обработчики событий         //
//************************************

// открытие формы редактирования профиля
btnOpenProfileEdit.addEventListener("click", () => {
  const evt = new Event('input')
  inputProfileName.value = profileName.textContent
  inputProfileJob.value = profileJob.textContent
  inputProfileName.dispatchEvent(evt)
  inputProfileJob.dispatchEvent(evt)
  openModalWindow(modalProfileEdit)
});

//сохранение данных из формы редактирования профиля
formProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault()
  profileName.textContent = inputProfileName.value
  profileJob.textContent = inputProfileJob.value
  closeModalWindow(modalProfileEdit)
});

// закрытие открытой картинки
btnCloseImage.addEventListener("click", () => closeModalWindow(modalElementImage))

// закрытие без сохранения формы редактирования профиля
btnCancelProfileEdit.addEventListener("click", () => closeModalWindow(modalProfileEdit))

// открытие формы добавления элемента
btnOpenAddElement.addEventListener('click', () => {
  modalAddElement.querySelector('.popup__save').classList.add('popup__save_disabled')
  openModalWindow(modalAddElement)
});

// закрытие без сохранения формы добавления элемента
btnCancelAddElement.addEventListener('click', () => closeModalWindow(modalAddElement))

// добавленние элемента из данных, введенных в форму; закрытие формы
formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  elementsList.prepend(createElement({name: inputElementName.value, link: inputElementLink.value}))
  formAddElement.reset()
  closeModalWindow(modalAddElement)
})

// закрытие popup кликом по overlay
document.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains("popup")){
    closeModalWindow(document.querySelector(".popup_opened"))
  }
})

//************************************
//      отрисовка страницы          //
//************************************

// отрисовка картинок
elementsList.append(...initialElements.map(createElement))
