import { routesMap } from "./constants/routesMap.js";
import { rootId, routes } from "./constants/index.js";
import { AppLayout } from "./views/layout/index.js";


class App {
  #routesMap;
  #currentView;
  #app = document.querySelector(`#${rootId}`);

  #appState = {
    favorites: [],
  };

  constructor(routes) {
    this.#routesMap = routes;
    // this.navigate();
    // window.addEventListener('hashchange', this.navigate);
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
    const appLayout = new AppLayout(this.#appState);
    appLayout.render();
    this.#navigate();
    window.addEventListener('hashchange', this.#navigate);
  }
}

const app = new App(routesMap);
app.render();
