import { AbstractView } from "../../common/view.js";
import { APP_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/Header/Header.js";
import { SearchComponent } from "../../components/Search/Search.js";
import { MAX_CARDS_ON_PAGE, routes } from "../../constants/index.js";
import { appStateKeys, mainViewStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { createPageSubTitle } from "../../utils/createPageSubTitle.js";
import { CardsBlock } from "../../components/CardsBlock/CardsBlock.js";
import { api } from "../../api/Api.js";
import { apiDataKeys } from "../../constants/apiResponseKeys.js";
import { Pagination } from "../../components/Pagination/Pagination.js";
import { extractIdFromDocKey } from "../../utils/extractIdFromCardKey.js";
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
    this.setTitle(APP_TITLE);
    this.#normalizeNumber = new Intl.NumberFormat('ru-RU').format;
  }

  #fetchBooks = async (query, offset) => {
    // await api.getBooks(query, offset);
    this.#state[mainViewStateKeys.LOADING] = true;
    const data = await api.getBooks(query, offset);
    const {[apiDataKeys.docs]: docs = [], [apiDataKeys.numFound]: numFound = 0} = data;

    this.#state[mainViewStateKeys.CARDS_SET] = new Set(docs.map(doc => JSON.stringify(doc)));
    this.#state[mainViewStateKeys.NUM_FOUND] = numFound;
    this.#state[mainViewStateKeys.LOADING] = false;
  }

  #handleAppStateChange = (path) => {
    if (path === appStateKeys.FAVORITES) {
      this.render();
    }
  }

  #handleLocalStateChange = async (path) => {
    if (path === mainViewStateKeys.SEARCH_QUERY || path === mainViewStateKeys.OFFSET) {
      await this.#fetchBooks(this.#state[mainViewStateKeys.SEARCH_QUERY], this.#state[mainViewStateKeys.OFFSET]);
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

  #onClickPrevButton = () => {
    this.#state[mainViewStateKeys.OFFSET] -= MAX_CARDS_ON_PAGE;
  }

  #onClickNextButton = () => {
    this.#state[mainViewStateKeys.OFFSET] += MAX_CARDS_ON_PAGE;
  }

  #onClickFavoritesButton = card => (evt) => {
    evt.stopPropagation();

    if (this.#appState[appStateKeys.FAVORITES].has(card)) {
      this.#appState[appStateKeys.FAVORITES].delete(card);
    } else {
      this.#appState[appStateKeys.FAVORITES].add(card);
    }
  }

  #onClickCard = card => () => {
    this.#appState[appStateKeys.SELECTED_CARD] = card;
    const doc = JSON.parse(card);
    const docId = extractIdFromDocKey(doc);
    this.redirectTo(`${routes.details}/${docId}`);
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
      cardsSet: this.#state[mainViewStateKeys.CARDS_SET],
      onClickCard: this.#onClickCard,
      onClickFavoritesButton: this.#onClickFavoritesButton,
    }).generate();
    const pagination = this.#state[mainViewStateKeys.NUM_FOUND]
      ? new Pagination({
          onClickPrevButton: this.#onClickPrevButton,
          onClickNextButton: this.#onClickNextButton,
          state: this.#state,
        }).generate()
      : null;

    const mainContentBlockElements = this.#state[mainViewStateKeys.LOADING]
      ? [searchComponent]
      : [searchComponent, pageTitle, pageSubTitle, cardsBlock, pagination];

    this.#mainContentBlock = createMainContentBlock(mainContentBlockElements);
    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  destroy() {
    super.destroy();
    onChange.unsubscribe(this.#appState);
    onChange.unsubscribe(this.#state);
  }
}
