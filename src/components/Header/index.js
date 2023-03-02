import './header.css';
import onChange from "on-change";
import { appStateKeys } from "../../constants/stateKeys.js";

export class HeaderComponent {
  #appState;
  #header = document.createElement('header');

  constructor(appState) {
    this.#appState = appState;
    this.#appState = onChange(this.#appState, this.#handleChangeAppState)
  }

  #handleChangeAppState = (path) => {
    if (path === appStateKeys.FAVORITES) {
      console.log('path in handler', path);
      // const links = Array.from(this.#header.querySelectorAll('.menu__link'));
      // links.forEach(link => {
      //   if (link.href === path) {
      //     link.classList.add('.menu__link_active');
      //   } else {
      //     link.classList.remove('.menu__link_active');
      //   }
      // })
      // this.render();
    }
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
              <span class="favorites-counter">${this.#appState[appStateKeys.FAVORITES].length}</span>
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
