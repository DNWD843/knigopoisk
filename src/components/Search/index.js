import { DivComponent } from "../../common/div-component.js";
import './search.css';

export class SearchComponent extends DivComponent {
  #state;

  constructor(state) {
    super();
    this.#state = state;
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
        value="${this.#state.searchQuery}"
      />
    </div>
    <button aria-label="Искать книги" class="search__button">
      <img src="/static/icons/search-button-icon.svg" alt="Иконка поиска на кнопке поиска" />
    </button>
`);

  generate() {
    this.divElement.classList.add('search');
    this.divElement.innerHTML = this.#getSearchHtml();

    return this.divElement;
  }
}
