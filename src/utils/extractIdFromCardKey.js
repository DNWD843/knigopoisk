export function extractIdFromDoc(cardAsString) {
  return JSON.parse(cardAsString).key.replace('/works/', '');
}
