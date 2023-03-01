import { generalClassNames, rootId } from "../../constants/index.js";

export class AppLayout {
  #app;
  #contentWrapper;
  #header;
  #main;
  #footer;

  constructor() {
    this.#app = document.querySelector(`#${rootId}`);
    this.#app.classList.add(generalClassNames.body);
    this.#contentWrapper = document.createElement('div');
    generalClassNames.contentWrapper.forEach(className => {
      this.#contentWrapper.classList.add(className);
    })
    this.#header = document.createElement('header');
    this.#header.classList.add(generalClassNames.header)
    this.#main = document.createElement('main');
    this.#main.classList.add(generalClassNames.main);
    this.#footer = document.createElement('footer');
    this.#footer.classList.add(generalClassNames.footer);
  }

  render() {
    [this.#header, this.#main, this.#footer].forEach(element => {
      this.#contentWrapper.appendChild(element);
    })
    this.#app.append(this.#contentWrapper);
  }
}
