import { paginationConfig } from "../../constants/paginationConfig.js";
import './Pagination.css';

export class Pagination {
  #node;#prevButton;#nextButton;#onClickPrevButton;#onClickNextButton;#isFirstPage;#isLastPage;#isSinglePage;#isEmptyPage;
  constructor({ onClickPrevButton, onClickNextButton, isFirstPage = true, isLastPage = false, isSinglePage = false }) {
    this.#onClickPrevButton = onClickPrevButton;
    this.#onClickNextButton = onClickNextButton;
    this.#isFirstPage = isFirstPage;
    this.#isLastPage = isLastPage;
    this.#isSinglePage = isSinglePage;
  }

  #getTemplate() {
    return document.querySelector(paginationConfig.paginationTemplateSelector)
      .content
      .querySelector(paginationConfig.paginationElementSelector)
      .cloneNode(true);
  }

  #setEventListeners() {
    this.#prevButton.addEventListener('click', this.#onClickPrevButton);
    this.#nextButton.addEventListener('click', this.#onClickNextButton);
  }

  generate() {
    this.#node = this.#getTemplate();
    this.#prevButton = this.#node.querySelector(paginationConfig.paginationPrevButtonSelector);
    this.#nextButton = this.#node.querySelector(paginationConfig.paginationNextButtonSelector);

    this.#prevButton.innerHTML = paginationConfig.prevButtonLabel;
    this.#nextButton.innerHTML = paginationConfig.nextButtonLabel;

    if (this.#isFirstPage && !this.#isSinglePage) {
      this.#prevButton.setAttribute('disabled', true);
    }

    if (this.#isLastPage) {
      this.#nextButton.setAttribute('disabled', true);
    }

    if (this.#isSinglePage) {
      this.#prevButton.setAttribute('disabled', true);
      this.#nextButton.setAttribute('disabled', true);
    }

    this.#setEventListeners();

    return this.#node;
  }
}
