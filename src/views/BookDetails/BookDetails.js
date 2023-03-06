import { AbstractView } from "../../common/view.js";
import { HeaderComponent } from "../../components/Header/Header.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { routes } from "../../constants/index.js";
import { createMainContentBlock } from "../../utils/createMainContentBlock.js";
import { createCard } from "../../utils/createCard.js";

export class BookDetails extends AbstractView {
  #appState; #mainContentBlock; #card;
  constructor(appState) {
    super();
    this.#appState = appState;
    this.#card = JSON.parse(this.#appState[appStateKeys.SELECTED_CARD]);
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const pageTitle = new PageTitle(this.#card.title).generate();

    const card = createCard({
      card: this.#card,
    });

    const mainContentBlockElements = [pageTitle, card];
    this.#mainContentBlock = createMainContentBlock(mainContentBlockElements);

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  render() {
    super.render();

    if (!this.#card.key) {
      this.redirectTo(routes.main);
      return;
    }

    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  destroy() {
    this.#appState[appStateKeys.SELECTED_CARD] = {};
  }
}
