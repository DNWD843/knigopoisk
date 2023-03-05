import { MainView } from "../views/Main/Main.js";
import { Favorites } from "../views/Favorites/Favorites.js";
import { routes } from "./index.js";

export const routesMap = new Map([
  [routes.main, { view: MainView }],
  [routes.favorites, { view: Favorites }],
  [routes.default, { view: MainView }],
]);

