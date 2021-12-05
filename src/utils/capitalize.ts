/**
 * Capitalize the first word or first letter of each word in the string.
 */
function capitalize(str: string, eachWord = false) {
  if (eachWord) {
    return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  }
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

export { capitalize };
