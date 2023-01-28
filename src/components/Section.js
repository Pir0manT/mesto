//************************************
//      Модуль класса отрисовки     //
//               элементов          //
//************************************
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  renderItems = () => {
    this._renderer(this._items, this._container)
  }

  addItem = (item) => {
    this._container.prepend(item)
  }
}
