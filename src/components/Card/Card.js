import './Card.css';

export class Card {
  #card; #imageSrc; #tag; #title; #author; #isAddedToFavorites; #handleClickFavoritesButton; #handleClickOnCard; #config;
  #cardImageElement; #cardTagElement; #cardTitleElement; #cardAuthorElement; #cardFavoritesButtonElement; #cardFavoritesButtonImageElement;
  #cardNode;
  constructor(card) {
    this.#card = card;
    const { imageSrc, tag, title, author, isAddedToFavorites, handleClickFavoritesButton, handleClickOnCard, cardConfig } = card;
    this.#imageSrc = imageSrc;
    this.#tag = tag;
    this.#title = title;
    this.#author = author;
    this.#isAddedToFavorites = isAddedToFavorites;
    this.#handleClickFavoritesButton = handleClickFavoritesButton;
    this.#handleClickOnCard = handleClickOnCard;
    this.#config = cardConfig;
  }

  #getTemplate() {
    return document.querySelector(this.#config.cardTemplateSelector)
      .content
      .querySelector(this.#config.cardSelector)
      .cloneNode(true)
  }

  #setEventListeners = () => {
    this.#cardFavoritesButtonElement.addEventListener('click', this.#handleClickFavoritesButton);
    this.#cardNode.addEventListener('click', this.#handleClickOnCard);
  }

  generate() {
    this.#cardNode = this.#getTemplate();
    this.#cardImageElement = this.#cardNode.querySelector(this.#config.cardImageSelector);
    this.#cardTagElement = this.#cardNode.querySelector(this.#config.cardTagSelector);
    this.#cardTitleElement = this.#cardNode.querySelector(this.#config.cardTitleSelector);
    this.#cardAuthorElement = this.#cardNode.querySelector(this.#config.cardAuthorSelector);
    this.#cardFavoritesButtonElement = this.#cardNode.querySelector(this.#config.cardFavoritesButtonSelector);
    this.#cardFavoritesButtonImageElement = this.#cardNode.querySelector(this.#config.cardFavoritesButtonImageSelector);

    this.#cardImageElement.src = this.#imageSrc;
    this.#cardImageElement.alt = `Обложка книги ${this.#title}`;
    this.#cardTagElement.textContent = this.#tag;
    this.#cardTitleElement.textContent = this.#title;
    this.#cardAuthorElement.textContent = this.#author;
    this.#cardFavoritesButtonElement.classList.add(this.#isAddedToFavorites ? this.#config.selectedClass : 'inactive');
    this.#cardFavoritesButtonImageElement.src = this.#isAddedToFavorites ? this.#config.buttonImageSelectedSrc : this.#config.buttonImageDefaultSrc;

    this.#setEventListeners();

    return this.#cardNode;
  }
}
