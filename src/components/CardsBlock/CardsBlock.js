import { createCard } from "../../utils/createCard.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { ContentBlock } from "../ContentBlock/ContentBlock.js";
import { generalClassNames } from "../../constants/index.js";
import './CardsBlock.css';

export class CardsBlock {
  #appState; #cardsSet; #cardsList;#onClickFavoritesButton;#onClickCard;
  constructor({ appState, cardsSet, onClickCard, onClickFavoritesButton }) {
    this.#appState = appState;
    this.#cardsSet = cardsSet;
    this.#onClickCard = onClickCard;
    this.#onClickFavoritesButton = onClickFavoritesButton;
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
