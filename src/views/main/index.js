import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { routes } from "../../constants/index.js";


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
    if (path === routes.favorites) {
      // this.render();

    }
  }

  render() {
    super.render(); // вызываю очистку вьюшки из супер класса
    const mainElement = document.createElement('div');
    mainElement.innerHTML = `Число книг: ${this.#appState.favorites.length}`;
    // this.app.replaceChildren();
    this.main.appendChild(mainElement);
    this.#appState.favorites.push('asd');
  }

  destroy() {}
}
