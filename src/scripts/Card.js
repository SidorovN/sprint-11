export default class Card {
  // Можно лучше
  // Шаблон лучше передавать в конструктор, так класс не будет привязан к конкретному селектору шаблона
  // и будет более гибким.
  static template = document.querySelector('.place-card__template').content

  constructor(element, openImgCallback) {
    this.element = element
    this.openImgCallback = openImgCallback;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked')
  }

  removeCard = (event) => {
    this.removeListeners()
    const card = event.target.closest('.place-card');
    card.remove();
  }

  create() {
    this.card = Card.template.cloneNode(true).querySelector('.place-card');
    this.likeButton = this.card.querySelector('.place-card__like-icon');
    this.deleteButton = this.card.querySelector('.place-card__delete-icon');
    this.cardImage = this.card.querySelector('.place-card__image');
    this.cardName = this.card.querySelector('.place-card__name');
    this.cardImage.setAttribute('style', `background-image: url(${this.element.link})`);
    this.cardName.textContent = this.element.name;
    this.setListeners()
    return this.card
  }

  setListeners = () => {
    this.likeButton.addEventListener('click', this.like)
    this.deleteButton.addEventListener('click', this.removeCard)
    this.cardImage.addEventListener('click', this.openImg)
  }

  openImg = () => {
    this.openImgCallback(this.element.link)
  }

  removeListeners() {
    this.cardImage.removeEventListener('click', this.openImg)
    this.likeButton.removeEventListener('click', this.like)
    this.deleteButton.removeEventListener('click', this.removeCard)
  }

}