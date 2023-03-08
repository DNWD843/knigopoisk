import { createCard } from "../../utils/createCard.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { ContentBlock } from "../ContentBlock/ContentBlock.js";
import { generalClassNames, routes } from "../../constants/index.js";
import { extractIdFromDocKey } from "../../utils/extractIdFromCardKey.js";
import './CardsBlock.css';

export class CardsBlock {
  #appState; #cardsSet; #cardsList;#redirectTo;
  constructor({ appState, cardsSet, redirectFn }) {
    this.#appState = appState;
    this.#cardsSet = cardsSet;
    this.#redirectTo = redirectFn;
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
    this.#redirectTo(`${routes.details}/${docId}`);
  }

  #renderCard = cards => {
    cards.forEach(card => {
      const cardElement = createCard({
        card: JSON.parse(card),
        isAddedToFavorites: this.#appState[appStateKeys.FAVORITES].has(card),
        handleClickFavoritesButton: this.#onClickFavoritesButton(card),
        handleClickOnCard: this.#onClickCard(card),
      })

      this.#cardsList.add(cardElement);
    })
  }

  generate() {
    this.#cardsList = new ContentBlock({
      items: this.#cardsSet,
      renderFn: this.#renderCard,
      contentBlockType: 'div',
      contentBlockClassName: generalClassNames.cards,
    });

    return  this.#cardsList.generate();
  }




}
