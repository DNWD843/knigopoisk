import { cardConfig } from "../constants/cardConfig.js";
import { Card } from "../components/Card/Card.js";
import { apiDataKeys } from "../constants/apiResponseKeys.js";
import { api } from "../api/Api.js";

export function createCard({ card, ...rest}) {
  const { cover, defaultImageSrc, tags, defaultCategory, title, author } = apiDataKeys.doc;
  const cardToRender = {
    imageSrc: card[cover] ? api.getImageSrc(card[cover]) : defaultImageSrc,
    tag: card[tags] ? card[tags][0] : defaultCategory,
    title: card[title],
    author: card[author],
    cardConfig,
    ...rest
  }

  return new Card(cardToRender).generate();
}
