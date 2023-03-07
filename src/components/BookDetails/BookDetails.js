import './BookDetails.css';
import { TagsList } from "../TagsList/TagsList.js";

export class BookDetailsComponent {
  #card;#title;#imageSrc;#tags;#category;#author;#firstPublishYear;#pagesQuantity;#isAddedToFavorites;#handleClickFavoritesButton;#config;
  #bookDetailsNode;#bookDetailsCoverElement;
  #bookDetailsTagsContainerElement;#bookDetailsCategoryElement;#bookDetailsAuthorElement;#bookDetailsPublishYearElement;
  #bookDetailsPagesQuantityElement;#bookDetailsFavoritesButtonElement;

  constructor({ card, isAddedToFavorites, handleClickFavoritesButton, config }) {
    this.#card = card;
    this.#title = this.#card.title;
    this.#imageSrc = this.#card['cover_edition_key']
      ? `https://covers.openlibrary.org/b/olid/${this.#card['cover_edition_key']}-M.jpg`
      : 'https://cdn2.vectorstock.com/i/thumb-large/51/21/four-books-or-book-of-documents-vintage-engraving-vector-19015121.jpg';
    this.#tags = this.#card['subject_facet'];
    this.#category = this.#card['subject_facet'] ? this.#card['subject_facet'][0] : 'Books for everyone';
    this.#author = this.#card['author_name'];
    this.#firstPublishYear = this.#card['first_publish_year'] || '-';
    this.#pagesQuantity = this.#card['number_of_pages_median'] || '-';
    this.#isAddedToFavorites = isAddedToFavorites;
    this.#handleClickFavoritesButton = handleClickFavoritesButton;
    this.#config = config;
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
