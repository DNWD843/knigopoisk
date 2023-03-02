import { AbstractView } from "../../common/view.js";
import { MAIN_VIEW_TITLE } from "../../constants/titles.js";
import onChange from "on-change";
import { HeaderComponent } from "../../components/Header/index.js";
import { ContentBlock } from "../../components/ContentBlock/content-block.js";
import { SearchComponent } from "../../components/Search/index.js";
import { generalClassNames } from "../../constants/index.js";
import "./main.css";
import { appStateKeys, mainViewStateKeys } from "../../constants/stateKeys.js";

export class MainView extends AbstractView {
  #appState; #mainContentBlock;

  #state = {
    [mainViewStateKeys.LIST]: [],
    [mainViewStateKeys.LOADING]: false,
    [mainViewStateKeys.SEARCH_QUERY]: '',
    [mainViewStateKeys.OFFSET]: 0,
  };

  constructor(appState) {
    super();
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleAppStateChange);
    this.#state = onChange(this.#state, this.#handleLocalStateChange);
    this.setTitle(MAIN_VIEW_TITLE);
  }

  #fetchBooks = async (query, offset) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&offset=${offset}`);
    return response.json();
}

  #handleAppStateChange = (path) => {
    if (path === appStateKeys.FAVORITES) {
      console.log('handleAppStateChange', path);
      console.log(this.#appState[appStateKeys.FAVORITES].length);
    }
  }

  #handleLocalStateChange = async (path) => {
    console.log('handleLocalStateChange path:', path);
    if (path === mainViewStateKeys.SEARCH_QUERY) {
      this.#state[mainViewStateKeys.LOADING] = true;
      const { docs = [] } = await this.#fetchBooks(this.#state[mainViewStateKeys.SEARCH_QUERY], this.#state[mainViewStateKeys.OFFSET]);
      this.#state[mainViewStateKeys.LIST] = docs;
      this.#state[mainViewStateKeys.LOADING] = false;
    }

    if (path === mainViewStateKeys.LOADING) {

    }
  }

  render() {
    super.render();
    this.#renderHeader();
    this.#renderContent();
    this.appRootContainer.appendChild(this.appContentWrapper);
  }

  #renderHeader() {
    const header = new HeaderComponent(this.#appState).generate();
    this.appContentWrapper.appendChild(header);
  }

  #renderContent() {
    const searchComponent = new SearchComponent(this.#state).generate();

    const counter = document.createElement('span');
    counter.textContent = `Количетсво книг: ${this.#state[mainViewStateKeys.LIST].length}`;

    this.#mainContentBlock = new ContentBlock({
      items: [searchComponent, counter],
      renderFn: (elements) => {
        elements.forEach(element => {
          this.#mainContentBlock.add(element);
        })
      },
      contentBlockType: 'main',
      contentBlockClassName: generalClassNames.main,
    });

    this.appContentWrapper.appendChild(this.#mainContentBlock.generate());
  }

  destroy() {
    this.appRootContainer.replaceChildren();
  }
}
