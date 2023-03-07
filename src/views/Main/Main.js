import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/Header/Header.js";
import { SearchComponent } from "../../components/Search/Search.js";
import { routes } from "../../constants/index.js";
import { appStateKeys, mainViewStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { createPageSubTitle } from "../../utils/createPageSubTitle.js";
import { CardsBlock } from "../../components/CardsBlock/CardsBlock.js";
import "./Main.css";

export class MainView extends AbstractView {
  #appState; #mainContentBlock; #normalizeNumber;

  #state = {
    [mainViewStateKeys.CARDS_SET]: new Set(),
    [mainViewStateKeys.LOADING]: false,
    [mainViewStateKeys.SEARCH_QUERY]: '',
    [mainViewStateKeys.OFFSET]: 0,
    [mainViewStateKeys.NUM_FOUND]: 0,

  };

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange);
    this.#state = onChange(this.#state, this.#handleLocalStateChange);
    this.setTitle(MAIN_VIEW_TITLE);
    this.#normalizeNumber = new Intl.NumberFormat('ru-RU').format;
  }

  #fetchBooks = async (query, offset) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&offset=${offset}`);
    return response.json();
}

  #handleAppStateChange = (path) => {
    if (path === appStateKeys.FAVORITES) {
      this.render();
    }

    if (path === appStateKeys.SELECTED_CARD) {
      const cardId = JSON.parse(this.#appState[appStateKeys.SELECTED_CARD]).key.replace('works/', '');
      this.redirectTo(`${routes.details}${cardId}`);
    }
  }

  #handleLocalStateChange = async (path) => {
    if (path === mainViewStateKeys.SEARCH_QUERY) {
      this.#state[mainViewStateKeys.LOADING] = true;
      const { docs = [], numFound = 0 } = await this.#fetchBooks(this.#state[mainViewStateKeys.SEARCH_QUERY], this.#state[mainViewStateKeys.OFFSET]);
      this.#state[mainViewStateKeys.CARDS_SET] = new Set(docs.map(el => JSON.stringify(el)));
      this.#state[mainViewStateKeys.NUM_FOUND] = numFound;
      this.#state[mainViewStateKeys.LOADING] = false;
    }

    if (path === mainViewStateKeys.LOADING) {
      this.render();
      if (this.#state[mainViewStateKeys.LOADING]) {
        this.setLoader();
      } else {
        this.removeLoader();
      }
    }
  }

  render() {
    super.render();
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const searchComponent = new SearchComponent(this.#state).generate();
    const pageTitle = new PageTitle(
      `Найдено книг - ${this.#normalizeNumber(this.#state[mainViewStateKeys.NUM_FOUND])}`
    ).generate();
    const pageSubTitle = createPageSubTitle(this.#state[mainViewStateKeys.NUM_FOUND] ? `Показано книг - ${this.#state[mainViewStateKeys.CARDS_SET].size}` : '');
    const cardsBlock = new CardsBlock({
      appState: this.#appState,
      cardsSet: this.#state[mainViewStateKeys.CARDS_SET] },
    ).generate();

    const mainContentBlockElements = this.#state[mainViewStateKeys.LOADING]
      ? [searchComponent]
      : [searchComponent, pageTitle, pageSubTitle, cardsBlock];

    this.#mainContentBlock = createMainContentBlock(mainContentBlockElements);
    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  destroy() {
    super.destroy();
    onChange.unsubscribe(this.#appState);
    onChange.unsubscribe(this.#state);
  }
}
