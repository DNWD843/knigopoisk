import { AbstractView } from "../../common/view.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { HeaderComponent } from "../../components/Header/Header.js";
import onChange from "on-change";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { CardsBlock } from "../../components/CardsBlock/CardsBlock.js";
import { extractIdFromDoc } from "../../utils/extractIdFromCardKey.js";
import { routes } from "../../constants/index.js";
import './Favorites.css';

export class Favorites extends AbstractView {
  #appState; #mainContentBlock;

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange);
  }

  #handleAppStateChange = (path) => {
    if (path === appStateKeys.FAVORITES) {
      this.render();
    }
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
    const docId = extractIdFromDoc(card);
    this.redirectTo(`${routes.details}/${docId}`);
  }

  #renderHeader = () => {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent = () => {
    const pageTitle = new PageTitle('Избранное').generate();
    const cardsBlock = new CardsBlock({
      appState: this.#appState,
      cardsSet: this.#appState[appStateKeys.FAVORITES],
      onClickCard: this.#onClickCard,
      onClickFavoritesButton: this.#onClickFavoritesButton,
    }).generate();

    const mainContentBlockElements = [pageTitle, cardsBlock];

    this.#mainContentBlock = createMainContentBlock(mainContentBlockElements);

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  render = () => {
    super.render();
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  destroy = () => {
    super.destroy();
    onChange.unsubscribe(this.#appState);
  }
}
