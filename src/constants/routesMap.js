import { MainView } from "../views/main/index.js";
import { routes } from "./index.js";

export const routesMap = new Map([
  [routes.main, { path: routes.main, view: MainView }],
  [routes.default, { path: routes.main, view: MainView }],
]);
