import { api } from "../api/Api.js";

export function getImageSrc(coverKey) {
  return api.getImageSrc(coverKey);
}
