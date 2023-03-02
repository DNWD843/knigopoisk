import { routesMap } from "./constants/routesMap.js";
import { generalClassNames, rootId, routes } from "./constants/index.js";


class App {
  #routesMap;
  #currentView;
  #appState = {
    favorites: [],
  };

  constructor(routes) {
    this.#routesMap = routes;
  }

  #navigate = () => {
    if (this.#currentView) {
      this.#currentView.destroy();
    }
    // TODO: удалить в конце разработки
    console.log(location.hash, this.#routesMap.has(location.hash));

    const View = this.#routesMap.has(location.hash)
      ? this.#routesMap.get(location.hash).view
      : this.#routesMap.get(routes.default).view;

    this.#currentView = new View(this.#appState);
    this.#currentView.render();
  }

  render = () => {
    this.#navigate();
    window.addEventListener('hashchange', this.#navigate);
  }
}

const app = new App(routesMap);
app.render();
