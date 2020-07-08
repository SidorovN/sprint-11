export default class FormValidator {
  constructor(form, errorMessages) {
    this.form = form
    this.errorMessages = errorMessages
    this.init()
    this.setEventListeners()
  }

  init() {
    this.inputs = Array.from(this.form.querySelectorAll('.popup__input'))
    this.errors = Array.from(this.form.querySelectorAll('.popup__error'))
    this.button = this.form.querySelector('.button');
  }

  setEventListeners() {
    this.form.addEventListener('input', this.inputChecker)
  }

  inputChecker = () => {
    // Можно лучше
    // Форму можно проверить целиком через метод формы checkValidity
    // Если inputChecker примет event, то event.target -- это наш инпут где случилось событие
    // Можно один раз вызвать для инпута checkInputValidity и не перебирать весь массив
    if (this.inputs.every(this.checkInputValidity)) {
      this.setSubmitButtonState(true)
    } else {
      this.setSubmitButtonState(false)
    }
    // Также, чтобы не перебирать весь массив инпутов можно собрать элементы подстрочников в
    // объект, где ключом будет id соответствющего инпута, а значением -- элемент подстрочника.
    // Тем самым можно будет менть только текущий элемент.
    for (let i = 0; i < this.inputs.length; i++) {
      this.setValidityState(this.inputs[i], this.errors[i])
    }
  }

  setValidityState(input, error) {
    error.textContent = input.validationMessage;
  }

  setSubmitButtonState(valid) {
    if (!valid) this.button.setAttribute('disabled', true)
    else this.button.removeAttribute('disabled')
  }

  checkInputValidity = (input) => {
    input.setCustomValidity('');
    if (input.validity.typeMismatch) {
      input.setCustomValidity(this.errorMessages.typeMismatch);
      return false;
    }
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.valueMissing);
      return false;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.tooShort);
      return false
    }
    return true;

  }
  resetErrors = () => {
    this.errors.forEach(error => {
      error.textContent = ''
    });

  }
}
