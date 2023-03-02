import { MainView } from "../views/Main/index.js";
import { routes } from "./index.js";

export const routesMap = new Map([
  [routes.main, { view: MainView }],
  [routes.favorites, { view: MainView }],
  [routes.default, { view: MainView }],
]);

