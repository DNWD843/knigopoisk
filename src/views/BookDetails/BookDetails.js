import { AbstractView } from "../../common/view.js";
import { HeaderComponent } from "../../components/Header/Header.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { routes } from "../../constants/index.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { bookDetailsConfig } from "../../constants/bookDetailsConfig.js";
import { BookDetailsComponent } from "../../components/BookDetails/BookDetails.js";

export class BookDetails extends AbstractView {
  #appState; #mainContentBlock; #card;
  constructor(appState) {
    super();
    this.#appState = appState;
    this.#card = JSON.parse(this.#appState[appStateKeys.SELECTED_CARD]);
  }

  #onClickFavoritesButton = (card) => (evt) => {
    evt.stopPropagation();

    if (this.#appState[appStateKeys.FAVORITES].has(card)) {
      this.#appState[appStateKeys.FAVORITES].delete(card);
    } else {
      this.#appState[appStateKeys.FAVORITES].add(card);
    }
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const pageTitle = new PageTitle(this.#card.title).generate();

    const props = {
      title: this.#card.title,
      imageSrc: this.#card['cover_edition_key']
        ? `https://covers.openlibrary.org/b/olid/${this.#card['cover_edition_key']}-M.jpg`
        : 'https://cdn2.vectorstock.com/i/thumb-large/51/21/four-books-or-book-of-documents-vintage-engraving-vector-19015121.jpg',
      tags: this.#card['subject_facet'],
      category: this.#card['subject_facet'] ? this.#card['subject_facet'][0] : 'Books for everyone',
      author: this.#card['author_name'],
      firstPublishYear: this.#card['first_publish_year'] || '-',
      pagesQuantity: this.#card['number_of_pages_median'] || '-',
      isAddedToFavorites: this.#appState[appStateKeys.FAVORITES].has(this.#appState[appStateKeys.SELECTED_CARD]),
      handleClickFavoritesButton: this.#onClickFavoritesButton(this.#appState[appStateKeys.SELECTED_CARD]),
      config: bookDetailsConfig,
    }

    const bookDetails = new BookDetailsComponent(props).generate();

    const mainContentBlockElements = [pageTitle, bookDetails];
    this.#mainContentBlock = createMainContentBlock(mainContentBlockElements);

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  render() {
    super.render();

    if (!this.#card.key) {
      this.redirectTo(routes.main);
      return;
    }

    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  destroy() {
    this.#appState[appStateKeys.SELECTED_CARD] = {};
  }
}
