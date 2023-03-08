import { generalClassNames, loaderContainerId, loaderHtml, rootId } from "../constants/index.js";

export class AbstractView {
  #appRootContainer = document.querySelector(`#${rootId}`)
  #appContentWrapper = document.createElement('div');
  #loaderContainer = document.querySelector(`#${loaderContainerId}`);

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

  setLoader() {
    this.#loaderContainer.innerHTML = loaderHtml;
  }

  removeLoader() {
    this.#loaderContainer.innerHTML = '';
  }

  redirectTo = (path) => {
    location.hash = path;
  }

  render() {
    this.#appContentWrapper.innerHTML = '';
    this.#appRootContainer.innerHTML = '';
  }

  destroy() {
  }
}
