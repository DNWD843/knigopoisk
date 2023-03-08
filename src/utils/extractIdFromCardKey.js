export function extractIdFromDoc(card) {
  const doc = JSON.parse(card);
  return doc.key.replace('/works/', '');
}
