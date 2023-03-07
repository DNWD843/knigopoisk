import { AbstractView } from "../../common/view.js";
import { HeaderComponent } from "../../components/Header/Header.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { routes } from "../../constants/index.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { bookDetailsConfig } from "../../constants/bookDetailsConfig.js";
import { BookDetailsComponent } from "../../components/BookDetails/BookDetails.js";
import onChange from "on-change";
import { apiDataKeys } from "../../constants/apiResponseKeys.js";

export class BookDetails extends AbstractView {
  #appState; #mainContentBlock; #card;
  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleChangeAppState);
    this.#card = JSON.parse(this.#appState[appStateKeys.SELECTED_CARD]);
  }

  #handleChangeAppState = (path) => {
    if (path === appStateKeys.FAVORITES) {
      this.render();
    }
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

    const bookDetailsProps = {
      card: this.#card,
      isAddedToFavorites: this.#appState[appStateKeys.FAVORITES].has(this.#appState[appStateKeys.SELECTED_CARD]),
      handleClickFavoritesButton: this.#onClickFavoritesButton(this.#appState[appStateKeys.SELECTED_CARD]),
      config: { ...bookDetailsConfig, ...apiDataKeys.doc },
    }

    const bookDetails = new BookDetailsComponent(bookDetailsProps).generate();
3
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
    super.destroy();
    onChange.unsubscribe(this.#appState);
  }
}
