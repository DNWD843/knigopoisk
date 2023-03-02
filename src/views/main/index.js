import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/header/index.js";


export class MainView extends AbstractView {
  #appState;

  #state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange)
    this.setTitle(MAIN_VIEW_TITLE)
  }

  #handleAppStateChange = (path) => {
    console.log(this.#appState.favorites.length);
    this.render();
  }

  render() {
    super.render(); // вызываю очистку вьюшки из супер класса
    const header = new HeaderComponent(this.#appState).generate();

    this.appContentWrapper.appendChild(header);
    this.appRootContainer.appendChild(this.appContentWrapper);

    // this.appContentWrapper.innerHTML = `Число книг: ${this.#appState.favorites.length}`;
    const button = document.createElement('button');
    button.textContent = 'add to favorites';
    button.onclick = () => {
      this.#appState.favorites.push('asd'); }
    this.appContentWrapper.append(button);
  }

  destroy() {
    this.appRootContainer.replaceChildren();
  }
}
