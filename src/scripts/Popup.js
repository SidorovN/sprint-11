export default class Popup {
  constructor(popup, openButton) {
    this.popup = popup
    if (openButton) this.openButton = openButton
    this.setEventListeners()
  }

  setEventListeners() {
    this.closeButton = this.popup.querySelector('.popup__close')
    this.closeButton.addEventListener('click', this.close)
    if (this.openButton) this.openButton.addEventListener('click', this.open)
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened')
  }

  open = () => {
    this.popup.classList.add('popup_is-opened')
  }
}
