export function extractIdFromDocKey(doc) {
  return doc.key.replace('works/', '');
}
