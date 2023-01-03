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

//************************************
//             Экспорт              //
//************************************

export {
  closePopupByEsc,
  openModalWindow,
  closeModalWindow
}
