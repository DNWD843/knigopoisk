import { generalClassNames, rootId } from "../constants/index.js";

export class AbstractView {
  #appRootContainer = document.querySelector(`#${rootId}`)
  #appContentWrapper = document.createElement('div');

  constructor() {
    generalClassNames.contentWrapperClassNames.forEach(className => {
      this.#appContentWrapper.classList.add(className);
    })

  }
  setTitle(title) {
    document.title = title;
  }

  get appRootContainer() {
    return this.#appRootContainer
  }
  get appContentWrapper() {
    return this.#appContentWrapper;
  }

  render() {
    this.#appContentWrapper.replaceChildren();
    this.#appRootContainer.appendChild(this.#appContentWrapper);
  }

  destroy() {

  }
}
