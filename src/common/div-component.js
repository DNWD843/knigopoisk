export class DivComponent {
  #divElement = document.createElement('div');
  #className;

  constructor(className) {
    this.#className = className;
  }
  get divElement() {
    if (this.#className) {
      this.#divElement.classList.add(this.#className);
    }

    return this.#divElement;
  }
  render() {
    if (this.#className) {
      this.#divElement.classList.add(this.#className);
    }

    return this.#divElement;
  }
}
