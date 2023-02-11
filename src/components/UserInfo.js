//************************************
//      Модуль класса информации     //
//           о пользователе          //
//************************************
// TODO: Изменить стиль комментариев в формат JSDoc

export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameTitle = document.querySelector(nameSelector)
    this._jobTitle = document.querySelector(jobSelector)
  }
  getUserInfo = () => {
    return {
      username: this._nameTitle.textContent,
      job: this._jobTitle.textContent,
    }
  }

  setUserInfo = ({username, job}) => {
    this._nameTitle.textContent = username
    this._jobTitle.textContent = job
  }
}
