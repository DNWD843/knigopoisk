import { AbstractView } from "../../common/view.js";
import { HeaderComponent } from "../../components/Header/index.js";
import { appStateKeys } from "../../constants/stateKeys.js";
import { PageTitle } from "../../components/PageTitle/PageTitle.js";
import { ContentBlock } from "../../components/ContentBlock/ContentBlock.js";
import { generalClassNames } from "../../constants/index.js";

export class BookDetails extends AbstractView {
  #appState; #mainContentBlock;
  constructor(appState) {
    super();
    this.#appState = appState;
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState[appStateKeys.FAVORITES].size).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const pageTitle = new PageTitle(this.#appState[appStateKeys.SELECTED_CARD].title).generate();

    const itemsToRender = [pageTitle];
    const mainContentBlock = new ContentBlock({
      items: itemsToRender,
      renderFn: elements => {
        elements.forEach(element => { mainContentBlock.add(element); })
      },
      contentBlockType: 'main',
      contentBlockClassName: generalClassNames.main,
    });

    this.#mainContentBlock = mainContentBlock.generate();

    this.appContentWrapper.appendChild(this.#mainContentBlock);
  }

  render() {
    super.render();
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  destroy() {
    this.#appState[appStateKeys.SELECTED_CARD] = {};
  }
}
