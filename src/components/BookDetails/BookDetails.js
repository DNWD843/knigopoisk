import './BookDetails.css';
import { TagsList } from "../TagsList/TagsList.js";

export class BookDetailsComponent {
  #card;#title;#imageSrc;#tags;#category;#author;#firstPublishYear;#pagesQuantity;#isAddedToFavorites;#handleClickFavoritesButton;#config;
  #bookDetailsNode;#bookDetailsCoverElement;
  #bookDetailsTagsContainerElement;#bookDetailsCategoryElement;#bookDetailsAuthorElement;#bookDetailsPublishYearElement;
  #bookDetailsPagesQuantityElement;#bookDetailsFavoritesButtonElement;

  constructor({ card, isAddedToFavorites, handleClickFavoritesButton, config }) {
    this.#config = config;
    this.#card = card;
    this.#title = this.#card[this.#config.title];
    this.#imageSrc = this.#card[this.#config.cover]
      ? this.#config.getImageSrc(this.#card[this.#config.cover])
      : this.#config.defaultImageSrc;
    this.#tags = this.#card[this.#config.tags];
    this.#category = this.#card[this.#config.tags] ? this.#card[this.#config.tags][0] : this.#config.defaultCategory;
    this.#author = this.#card[this.#config.author];
    this.#firstPublishYear = this.#card[this.#config.firstPublishYear] || this.#config.defaultValue;
    this.#pagesQuantity = this.#card[this.#config.pagesQuantity] || this.#config.defaultValue;
    this.#isAddedToFavorites = isAddedToFavorites;
    this.#handleClickFavoritesButton = handleClickFavoritesButton;

  }
  #getTemplate() {
    return document.querySelector(this.#config.templateSelector)
      .content
      .querySelector(this.#config.bookDetailsSelector)
      .cloneNode(true)
  }

  #setEventListeners() {
    this.#bookDetailsFavoritesButtonElement.addEventListener('click', this.#handleClickFavoritesButton);
  }

  generate() {
    this.#bookDetailsNode = this.#getTemplate();
    this.#bookDetailsCoverElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsCoverSelector);
    this.#bookDetailsAuthorElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsAuthorSelector);
    this.#bookDetailsCategoryElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsCategorySelector);
    this.#bookDetailsPublishYearElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsPublishYearSelector);
    this.#bookDetailsPagesQuantityElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsPagesQuantitySelector);
    this.#bookDetailsFavoritesButtonElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsFavoritesButtonSelector);
    this.#bookDetailsTagsContainerElement = this.#bookDetailsNode.querySelector(this.#config.bookDetailsTagsContainerSelector);

    this.#bookDetailsCoverElement.src = this.#imageSrc;
    this.#bookDetailsCoverElement.alt = `Обложка книги ${this.#title}`;
    this.#bookDetailsCategoryElement.textContent = this.#category;
    this.#bookDetailsAuthorElement.textContent = this.#author;
    this.#bookDetailsPublishYearElement.textContent = this.#firstPublishYear;
    this.#bookDetailsPagesQuantityElement.textContent = this.#pagesQuantity;
    this.#bookDetailsFavoritesButtonElement.classList.add(this.#isAddedToFavorites ? this.#config.selectedClass : 'default');
    this.#bookDetailsFavoritesButtonElement.textContent = this.#isAddedToFavorites ? this.#config.removeFromFavoritesLabel : this.#config.addToFavoritesLabel;
    const tagsList = new TagsList(this.#tags);
    tagsList.generate().forEach(tag => {
      this.#bookDetailsTagsContainerElement.appendChild(tag);
    });


    this.#setEventListeners();

    return this.#bookDetailsNode;
  }
}
