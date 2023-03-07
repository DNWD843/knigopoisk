import { cardConfig } from "../constants/cardConfig.js";
import { Card } from "../components/Card/Card.js";

export function createCard({ card, ...rest}) {
  const { cover_edition_key, subject_facet, title, author_name } = card;
  const cardToRender = {
    imageSrc: `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`,
    tag: subject_facet ? subject_facet[0] : 'Books for everyone',
    title,
    author: author_name,
    cardConfig,
    ...rest
  }

  return new Card(cardToRender).generate();
}
