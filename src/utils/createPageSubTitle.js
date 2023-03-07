import { generalClassNames } from "../constants/index.js";

export function createPageSubTitle(text) {
  const pageSubTitle = document.createElement('p');
  pageSubTitle.classList.add(generalClassNames.pageSubTitle);
  pageSubTitle.textContent = text;

  return pageSubTitle;
}
