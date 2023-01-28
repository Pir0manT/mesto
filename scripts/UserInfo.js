//************************************
//      Модуль класса информации     //
//           о пользователе          //
//************************************

export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameTitle = document.querySelector(nameSelector)
    this._jobTitle = document.querySelector(jobSelector)
  }
  getUserInfo = () => {
    return {
      name: this._nameTitle.textContent,
      job: this._jobTitle.textContent,
    }
  }

  setUserInfo = (name, job) => {
    this._nameTitle.textContent = name
    this._jobTitle.textContent = job
  }
}
