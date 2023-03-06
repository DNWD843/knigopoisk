import { MainView } from "../views/Main/Main.js";
import { Favorites } from "../views/Favorites/Favorites.js";
import { BookDetails } from "../views/BookDetails/BookDetails.js";
import { routes } from "./index.js";

export const routesMap = new Map([
  [routes.main, { view: MainView }],
  [routes.favorites, { view: Favorites }],
  [routes.details, { view: BookDetails }],
  [routes.default, { view: MainView }],
]);

