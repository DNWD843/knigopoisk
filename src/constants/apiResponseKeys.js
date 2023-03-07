export const apiDataKeys = {
  numFound: 'numFound',
  docs: 'docs',
  doc: {
    title: 'title',
    cover: 'cover_edition_key',
    getImageSrc: (coverKey) => `https://covers.openlibrary.org/b/olid/${coverKey}-M.jpg`,
    defaultImageSrc: 'https://cdn2.vectorstock.com/i/thumb-large/51/21/four-books-or-book-of-documents-vintage-engraving-vector-19015121.jpg',
    tags: 'subject_facet',
    defaultCategory: 'Books for everyone',
    author: 'author_name',
    firstPublishYear: 'first_publish_year',
    pagesQuantity: 'number_of_pages_median',
    defaultValue: 'n/d'
  }
}
