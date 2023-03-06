import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/Header/index.js";
import { ContentBlock } from "../../components/ContentBlock/ContentBlock.js";
import { SearchComponent } from "../../components/Search/index.js";
import { generalClassNames, routes } from "../../constants/index.js";
import { appStateKeys, mainViewStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { createCard } from "../../utils/createCard.js";
import "./Main.css";

export class MainView extends AbstractView {
  #appState; #mainContentBlock; #normalizeNumber;

  #state = {
    [mainViewStateKeys.LIST]: [],
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
      this.redirectTo(routes.details);
    }
  }

  #handleLocalStateChange = async (path) => {
    if (path === mainViewStateKeys.SEARCH_QUERY) {
      this.#state[mainViewStateKeys.LOADING] = true;
      const { docs = [], numFound = 0 } = await this.#fetchBooks(this.#state[mainViewStateKeys.SEARCH_QUERY], this.#state[mainViewStateKeys.OFFSET]);
      this.#state[mainViewStateKeys.LIST] = docs;
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

  #onClickFavoritesButton = (card) => (evt) => {
    evt.stopPropagation();
    if (this.#appState[appStateKeys.FAVORITES].has(card)) {
      this.#appState[appStateKeys.FAVORITES].delete(card);
    } else {
      this.#appState[appStateKeys.FAVORITES].add(card);
    }
  }

  #onClickOnCard = (card) => () => { this.#appState[appStateKeys.SELECTED_CARD] = card; }

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
    const pageTitle = new PageTitle(`Найдено книг - ${this.#normalizeNumber(this.#state[mainViewStateKeys.NUM_FOUND])}`).generate();

    const cardsToRender = this.#state[mainViewStateKeys.LIST].slice(0, 8); //TODO: что-то сделать с органичением вывода книг на странице

    const renderCard = cards => {
      cards.forEach(card => {
        const cardElement = createCard({
          card,
          isAddedToFavorites: this.#appState[appStateKeys.FAVORITES].has(card),
          handleClickFavoritesButton: this.#onClickFavoritesButton(card),
          handleClickOnCard: this.#onClickOnCard(card),
        })

        cardsList.add(cardElement);
      })
    }

    const cardsList = new ContentBlock({
      items: cardsToRender,
      renderFn: renderCard,
      contentBlockType: 'div',
      contentBlockClassName: generalClassNames.cards,
    });

    const cardsBlock = cardsList.generate();

    const mainBlockElements = this.#state[mainViewStateKeys.LOADING]
      ? [searchComponent]
      : [searchComponent, pageTitle, cardsBlock];

    const mainContentBlock = new ContentBlock({
      items: mainBlockElements,
      renderFn: elements => {
        elements.forEach(element => { mainContentBlock.add(element); })
      },
      contentBlockType: 'main',
      contentBlockClassName: generalClassNames.main,
    });

    this.#mainContentBlock = mainContentBlock.generate();

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  destroy() {
    super.destroy();
    onChange.unsubscribe(this.#appState);
    onChange.unsubscribe(this.#state);
  }
}
