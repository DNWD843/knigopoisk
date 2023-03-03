import './Card.css';

export class Card {
  #imageSrc; #tag; #title; #author; #isAddedToFavorites; #config;
  #cardImageElement; #cardTagElement; #cardTitleElement; #cardAuthorElement; #cardFavoritesButtonElement; #cardFavoritesButtonImageElement;
  constructor({ imageSrc, tag, title, author, isAddedToFavorites, cardConfig }) {
    this.#imageSrc = imageSrc;
    this.#tag = tag;
    this.#title = title;
    this.#author = author;
    this.#isAddedToFavorites = isAddedToFavorites;
    this.#config = cardConfig;
  }

  #getTemplate() {
    return document.querySelector(this.#config.cardTemplateSelector)
      .content
      .querySelector(this.#config.cardSelector)
      .cloneNode(true)
  }

  generate() {
    const cardNode = this.#getTemplate();
    this.#cardImageElement = cardNode.querySelector(this.#config.cardImageSelector);
    this.#cardTagElement = cardNode.querySelector(this.#config.cardTagSelector);
    this.#cardTitleElement = cardNode.querySelector(this.#config.cardTitleSelector);
    this.#cardAuthorElement = cardNode.querySelector(this.#config.cardAuthorSelector);
    this.#cardFavoritesButtonElement = cardNode.querySelector(this.#config.cardFavoritesButtonSelector);
    this.#cardFavoritesButtonImageElement = cardNode.querySelector(this.#config.cardFavoritesButtonImageSelector);

    this.#cardImageElement.src = this.#imageSrc;
    this.#cardImageElement.alt = `Обложка книги ${this.#title}`;
    this.#cardTagElement.textContent = this.#tag;
    this.#cardTitleElement.textContent = this.#title;
    this.#cardAuthorElement.textContent = this.#author;
    this.#cardFavoritesButtonElement.classList.add(this.#isAddedToFavorites ? this.#config.selectedClass : 'asd');
    this.#cardFavoritesButtonImageElement.src = this.#isAddedToFavorites ? this.#config.buttonImageSelectedSrc : this.#config.buttonImageDefaultSrc;

    return cardNode;
  }
}
