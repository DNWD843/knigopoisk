import { rootId } from "../constants/index.js";

export class AbstractView {
  #app = document.querySelector(`#${rootId}`);

  setTitle(title) {
    document.title = title;
  }

  get app() {
    return this.#app;
  }

  render() {
    console.log('AbstractView render');
    this.#app.replaceChildren();
  }

  destroy() {
    return;
  }
}