import { generalClassNames } from "../constants/index.js";

export class AbstractView {
  #contentContainer = document.querySelector(`.${generalClassNames.main}`);

  setTitle(title) {
    document.title = title;
  }

  get main() {
    return this.#contentContainer;
  }

  render() {
    this.#contentContainer.replaceChildren();
  }

  destroy() {
    return;
  }
}
