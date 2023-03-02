import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/Header/index.js";
import { ContentBlock } from "../../components/ContentBlock/content-block.js";
import { SearchComponent } from "../../components/Search/index.js";
import { generalClassNames } from "../../constants/index.js";
import "./main.css";

export class MainView extends AbstractView {
  #appState; #mainContentBlock;

  #state = {
    list: [],
    loading: false,
    searchQuery: '',
    offset: 0,
  };

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange)
    this.setTitle(MAIN_VIEW_TITLE)
  }

  #handleAppStateChange = (path) => {
    console.log(this.#appState.favorites.length);
    this.render();
  }

  render() {
    super.render(); //TODO: Возможно это и не нужно, может стоит удалить?
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    this.#mainContentBlock = new ContentBlock({ contentBlockType: 'main', contentBlockClassName: generalClassNames.main });
    const search = new SearchComponent(this.#state).generate();
    this.#mainContentBlock.add(search);

    this.appContentWrapper.appendChild(this.#mainContentBlock.generate());
  }

  destroy() {
    this.appRootContainer.replaceChildren();
  }
}
