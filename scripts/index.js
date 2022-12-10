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
const elementsList = document.querySelector(".elements__grid");
const elementTemplate = document.querySelector(".element-template").content;

// открытая картинка
const popupOpenPhoto = document.querySelector(".popup__open-photo");
const popupOpenSubtitle = document.querySelector(".popup__open-photo-subtitle");
const imageElementModal = document.querySelector(".popup_type_open-card");

//кнопки
const closeImageElement = imageElementModal.querySelector(".popup__close");

// открытие и закрытие попапов
function toggleModal(modal) {
  modal.classList.toggle("popup_opened");
}

// создание Node картинки из переданного объекта
function createElement(item) {
  const element = elementTemplate.cloneNode(true);
  const [deleteButton,elementImage,elementTitle,heartButton] = element.querySelectorAll('.element__delete,.element__image,.element__title,.element__heart');

  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;

  deleteButton.addEventListener('click', evt => evt.target.closest('.element').remove());
  heartButton.addEventListener('click', evt => evt.target.closest('.element__heart').classList.toggle('element__heart-active'));
  elementImage.addEventListener('click', () => {
    popupOpenPhoto.src = item.link;
    popupOpenPhoto.alt = item.name;
    popupOpenSubtitle.textContent = item.name;
    toggleModal(imageElementModal)
  })


  return element;
}

// отрисовка картинок
elementsList.append(...initialElements.map(createElement));

// обработчики событий
closeImageElement.addEventListener("click", () => toggleModal(imageElementModal));


const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');

}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
