import { generalClassNames, rootId } from "../../constants/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class AppLayout {
  #appState;
  #app = document.querySelector(`#${rootId}`);
  #contentWrapper;
  #header;
  #main;
  #footer;

  constructor(appState) {
    this.#appState = appState;
  }

  render() {
    this.#app.classList.add(generalClassNames.body);
    this.#contentWrapper = document.createElement('div');
    generalClassNames.contentWrapperClassNames.forEach(className => {
      this.#contentWrapper.classList.add(className);
    })
    this.#header = document.createElement('header');
    this.#header.classList.add(generalClassNames.header)

    this.#main = document.createElement('main');
    this.#main.classList.add(generalClassNames.main);

    this.#footer = document.createElement('footer');
    this.#footer.classList.add(generalClassNames.footer);

    const headerContent = new HeaderComponent(this.#appState, 'header__container').render();
    this.#header.appendChild(headerContent);

    [this.#header, this.#main, this.#footer].forEach(element => {
      this.#contentWrapper.appendChild(element);
    })
    this.#app.append(this.#contentWrapper);
  }
}
