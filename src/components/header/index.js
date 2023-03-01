import { DivComponent } from "../../common/div-component.js";

export class HeaderComponent extends DivComponent {
  #appState;

  constructor(appState, className = '') {
    super(className);
    this.#appState = appState;
  }

  #getHeaderHtml = () => (`
    <img class="logo" src="/static/icons/logo.svg" alt="Логотип"/>
    <span>Header</span>
    <span>${this.#appState.favorites.length}</span>
`);

  render() {
    this.divElement.innerHTML = this.#getHeaderHtml();

    return this.divElement;
  }
}
