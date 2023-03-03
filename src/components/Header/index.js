import './header.css';

export class HeaderComponent {
  #favoritesSize;
  #header = document.createElement('header');

  constructor(favoritesSize) {
    this.#favoritesSize = favoritesSize;
  }

  #getHeaderHtml = () => (`
    <img class="logo" src="/static/icons/logo.svg" alt="Логотип"/>
    <nav class="menu">
      <li class="menu__item">
          <a class="menu__link" href="#main">
            <img class="menu__link-icon" src="/static/icons/search.svg" alt="Иконка поиска книг" />
            <span class="menu__link-label">Поиск книг</span>
          </a>
      </li>
      <li class="menu__item">
          <a class="menu__link" href="#favorites">
            <img class="menu__link-icon" src="/static/icons/favorites.svg" alt="Иконка избранное" />
            <span class="menu__link-label">Избранное</span>
            <div class="favorites-counter-wrapper">
              <span class="favorites-counter">${this.#favoritesSize}</span>
            </div>
          </a>
      </li>
    </nav>
`);

  generate() {
    this.#header.classList.add('header');
    this.#header.innerHTML = this.#getHeaderHtml();

    return this.#header;
  }
}
