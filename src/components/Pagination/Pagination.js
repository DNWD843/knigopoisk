import { paginationConfig } from "../../constants/paginationConfig.js";
import './Pagination.css';
import { mainViewStateKeys } from "../../constants/stateKeys.js";
import { MAX_CARDS_ON_PAGE } from "../../constants/index.js";

export class Pagination {
  #node;#prevButton;#nextButton;#onClickPrevButton;#onClickNextButton;#isFirstPage;#isLastPage;#isSinglePage;#state;#position;
  constructor({ onClickPrevButton, onClickNextButton, state }) {
    this.#onClickPrevButton = onClickPrevButton;
    this.#onClickNextButton = onClickNextButton;
    this.#state = state;
    this.#isFirstPage = (this.#state[mainViewStateKeys.OFFSET] === 0) && (this.#state[mainViewStateKeys.NUM_FOUND] > this.#state[mainViewStateKeys.CARDS_SET].size);
    this.#isLastPage = (this.#state[mainViewStateKeys.OFFSET] > 0) && (this.#state[mainViewStateKeys.CARDS_SET].size < MAX_CARDS_ON_PAGE);
    this.#isSinglePage = (this.#state[mainViewStateKeys.OFFSET] === 0) && (this.#state[mainViewStateKeys.CARDS_SET].size < MAX_CARDS_ON_PAGE);
  }

  #getTemplate() {
    return document.querySelector(paginationConfig.templateSelector)
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
    this.#prevButton = this.#node.querySelector(paginationConfig.prevButtonSelector);
    this.#nextButton = this.#node.querySelector(paginationConfig.nextButtonSelector);
    this.#position = this.#node.querySelector(paginationConfig.positionSelector);

    this.#prevButton.innerHTML = paginationConfig.prevButtonLabel;
    this.#nextButton.innerHTML = paginationConfig.nextButtonLabel;
    const leftLimit = this.#state[mainViewStateKeys.OFFSET] + 1;
    const rightLimit = this.#isLastPage || this.#isSinglePage
      ? this.#state[mainViewStateKeys.OFFSET] + this.#state[mainViewStateKeys.CARDS_SET].size
      : this.#state[mainViewStateKeys.OFFSET] + MAX_CARDS_ON_PAGE;
    this.#position.textContent = `${leftLimit} . . . ${rightLimit}`;

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
