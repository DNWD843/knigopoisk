import { generalClassNames } from "../../constants/index.js";
import "./PageTitle.css";

export class PageTitle {
  #titleElement = document.createElement('h1');
  #title;

  constructor(title) {
    this.#title = title;
  }

  generate() {
    this.#titleElement.classList.add(generalClassNames.pageTitle);
    this.#titleElement.textContent = this.#title;

    return this.#titleElement;
  }
}
