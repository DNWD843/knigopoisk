
import { ContentBlock } from "../components/ContentBlock/ContentBlock.js";
import { generalClassNames } from "../constants/index.js";

export function createMainContentBlock(elements = []) {
  const mainContentBlock = new ContentBlock({
    items: elements,
    renderFn: elements => {
      elements.forEach(element => { mainContentBlock.add(element); })
    },
    contentBlockType: 'main',
    contentBlockClassName: generalClassNames.main,
  });

  return mainContentBlock.generate();
}
