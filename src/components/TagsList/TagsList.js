import { bookDetailsConfig } from "../../constants/bookDetailsConfig.js";
import "./TagsList.css";

export class TagsList {
  #tags;
  constructor(tags) {
    this.#tags = tags ? tags : [];
  }

  generate() {
    return this.#tags.map(tag => {
      const tagElement = document.createElement('span');
      tagElement.classList.add(bookDetailsConfig.bookDetailsTagSelector);
      tagElement.textContent = tag;

      return tagElement;
    });
  }
}
