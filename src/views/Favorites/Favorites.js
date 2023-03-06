import { AbstractView } from "../../common/view.js";
import { FAVORITES_VIEW_TITLE } from "../../constants/titles.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { HeaderComponent } from "../../components/Header/index.js";
import onChange from "on-change";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { ContentBlock } from "../../components/ContentBlock/ContentBlock.js";
import { createCard } from "../../utils/createCard.js";
import { generalClassNames, routes } from "../../constants/index.js";
import './Favorites.css';

export class Favorites extends AbstractView {
  #appState; #mainContentBlock;

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange);
    this.setTitle(FAVORITES_VIEW_TITLE);
  }

  #handleAppStateChange = (path) => {
    if (path === appStateKeys.FAVORITES) {
      this.render();
    }

    if (path === appStateKeys.SELECTED_CARD) {
      this.redirectTo(routes.details);
    }
  }

  #onClickFavoritesButton = (card) => (evt) => {
    evt.stopPropagation()
    if (this.#appState[appStateKeys.FAVORITES].has(card)) {
      this.#appState[appStateKeys.FAVORITES].delete(card);
    } else {
      this.#appState[appStateKeys.FAVORITES].add(card);
    }
  }

  #onClickOnCard = (card) => () => { this.#appState[appStateKeys.SELECTED_CARD] = card; }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const pageTitle = new PageTitle('Избранное').generate();

    const cardsList = new ContentBlock({
      items: Array.from(this.#appState[appStateKeys.FAVORITES]),
      renderFn: cards => {
        cards.forEach(card => {
          const cardElement = createCard({
            card,
            isAddedToFavorites: this.#appState[appStateKeys.FAVORITES].has(card),
            handleClickFavoritesButton: this.#onClickFavoritesButton(card),
            handleClickOnCard: this.#onClickOnCard(card),
          })

          cardsList.add(cardElement);
        })
      },
      contentBlockType: 'div',
      contentBlockClassName: generalClassNames.cards,
    })

    const cardsBlock = cardsList.generate();

    const itemsToRender = [pageTitle, cardsBlock];

    const mainContentBlock = new ContentBlock({
      items: itemsToRender,
      renderFn: elements => {
        elements.forEach(element => { mainContentBlock.add(element); })
      },
      contentBlockType: 'main',
      contentBlockClassName: generalClassNames.main,
    });

    this.#mainContentBlock = mainContentBlock.generate();

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  render() {
    super.render();
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  destroy() {
    super.destroy();
    onChange.unsubscribe(this.#appState);
  }
}
