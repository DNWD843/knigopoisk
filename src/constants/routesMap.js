import { MainView } from "../views/main/index.js";
import { routes } from "./index.js";

export const routesMap = new Map([
  [routes.main, { view: MainView }],
  [routes.favorites, { view: MainView }],
  [routes.default, { view: MainView }],
]);

