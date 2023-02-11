//************************************
//      Модуль класса информации     //
//           о пользователе          //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._nameTitle = document.querySelector(nameSelector)
    this._jobTitle = document.querySelector(jobSelector)
    this._avatarImage = document.querySelector(avatarSelector)
    this._id = ''
  }
  getUserInfo = () => {
    return {
      name: this._nameTitle.textContent,
      about: this._jobTitle.textContent,
      avatar: this._avatarImage.src,
      _id: this._id
    }
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._nameTitle.textContent = name
    this._jobTitle.textContent = about
    this._avatarImage.src = avatar
    this._id = _id
  }
}
