import { DivComponent } from "../../common/div-component.js";
import { mainViewStateKeys } from "../../constants/stateKeys.js";
import './Search.css';

export class SearchComponent extends DivComponent {
  #state; #searchInput; #searchButton;

  constructor(state) {
    super();
    this.#state = state;
  }

  #setSearchValue = () => {
    this.#state[mainViewStateKeys.SEARCH_QUERY] = this.#searchInput.value;
  }

  #handleKeyDown = (evt) => {
    if (evt.code === 'Enter') {
      this.#setSearchValue()
    }
  }

  #getSearchHtml = () => (`
    <div class="search__input-wrapper">
      <img src="/static/icons/search.svg" alt="Иконка поиска в поле поиска" />
      <input
        id="search-input"
        name="search-input"
        type="text"
        placeholder="Найти книгу или автора...."
        class="search__input"
        value="${this.#state[mainViewStateKeys.SEARCH_QUERY]}"
      />
    </div>
    <button aria-label="Искать книги" class="search__button">
      <img src="/static/icons/search-button-icon.svg" alt="Иконка поиска на кнопке поиска" />
    </button>
`);

  #setEventListeners = () => {
    this.#searchButton.addEventListener('click', this.#setSearchValue);
    this.#searchInput.addEventListener('keydown', this.#handleKeyDown);
  }

  generate() {
    this.divElement.classList.add('search');
    this.divElement.innerHTML = this.#getSearchHtml();

    this.#searchInput = this.divElement.querySelector('#search-input');
    this.#searchButton = this.divElement.querySelector('.search__button');

    this.#setEventListeners();
    return this.divElement;
  }

  destroy() {
    this.#searchButton.removeEventListener('click', this.#setSearchValue);
    this.#searchInput.removeEventListener('keydown', this.#handleKeyDown);
  }
}
