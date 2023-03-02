import { routesMap } from "./constants/routesMap.js";
import { routes } from "./constants/index.js";


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

    if (!location.hash) {
      location.hash = routes.main;
    } else {
      const View = this.#routesMap.has(location.hash)
        ? this.#routesMap.get(location.hash).view
        : this.#routesMap.get(routes.default).view;

      this.#currentView = new View(this.#appState);
      this.#currentView.render();
    }
  }

  render = () => {
    this.#navigate();
    window.addEventListener('hashchange', this.#navigate);
  }
}

const app = new App(routesMap);
app.render();
