export default class CardList {
  constructor(container, createCard) {
    this.container = container
    this.createCard = createCard
  }

  addCard(card) {
    this.container.appendChild(this.createCard(card))
  }

  render(cards) {
    cards.forEach(element => {
      this.addCard(element)
    });
  }
}
