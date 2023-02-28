import { routes, routesMap } from "./constants/index.js";

class App {
  #routes;
  #currentView;

  constructor(routes) {
    this.#routes = routes;
    this.navigate();
    window.addEventListener('hashchange', this.navigate);
  }

  navigate = () => {
    if (this.#currentView) {
      this.#currentView.destroy();
    }
    console.log(location.hash, this.#routes.has(location.hash));

    const View = this.#routes.has(location.hash)
      ? this.#routes.get(location.hash).view
      : this.#routes.get(routes.default).view;

    this.#currentView = new View();
    this.#currentView.render();
  }
}

new App(routesMap);
