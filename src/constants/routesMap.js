import { MainView } from "../views/main/index.js";

export const routes = {
  main: '',
  default: 'default',
};

export const routesMap = new Map([
  [routes.main, { path: routes.main, view: MainView }],
  [routes.default, { path: routes.main, view: MainView }],
]);
