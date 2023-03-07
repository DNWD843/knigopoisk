export const routes = {
  main: '#main',
  favorites: '#favorites',
  details: '#details',
  default: 'default',
};

export const rootId = 'root';
export const loaderContainerId = 'loader-container';
export const generalClassNames = {
  body: 'root',
  contentWrapperClassNames: ['page', 'root__container'],
  header: 'header',
  main: 'content',
  footer: 'footer',
  pageTitle: 'page-title',
  pageSubTitle: 'page__sub-title',
  cards: 'cards',
  bookDetails: 'book-details',
};

export const loaderHtml = `
  <div class="loader-wrapper">
    <span class="loader-element">Загрузка данных...</span>
  </div>
`;

export const MAX_CARDS_ON_PAGE = 100;
