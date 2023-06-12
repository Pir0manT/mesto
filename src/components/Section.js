//************************************
//      Модуль класса отрисовки     //
//               элементов          //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class Section {
  constructor({ renderer }, containerSelector) {
    //constructor({ items, renderer }, containerSelector) {
    // this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  renderItems = (items) => {
    items.forEach((item) => this._renderer(item))
  }

  addItem = (item) => {
    this._container.prepend(item)
  }
}
