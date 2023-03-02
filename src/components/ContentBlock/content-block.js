export class ContentBlock {
  #contentContainer; #items; #renderFn; #elementType; #className

  constructor({ items, renderFn, contentBlockType = 'div', contentBlockClassName }) {
    this.#contentContainer = document.createElement(contentBlockType);
    this.#items = items;
    this.#renderFn = renderFn;
    this.#elementType = contentBlockType;
    this.#className = contentBlockClassName;
  }


  generate() {
    if (this.#className) {
      this.#contentContainer.classList.add(this.#className);
    }

    if (this.#items && this.#renderFn) {
      this.#renderFn(this.#items);
    }
    return this.#contentContainer;
  }

  add(item) {
    this.#contentContainer.appendChild(item)
  }
}
