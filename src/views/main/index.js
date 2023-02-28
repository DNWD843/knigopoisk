import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/index.js";

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle(MAIN_VIEW_TITLE)
  }

  render() {
    super.render(); // вызываю очистку вьюшки из супер класса
    const mainElement = document.createElement('div');
    mainElement.innerHTML = 'Test';
    // this.app.replaceChildren();
    this.app.appendChild(mainElement);
  }

  destroy() {}
}
