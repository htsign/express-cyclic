/** @typedef {import('./core.mjs').SearchResult} SearchResult */

const encode = text => encodeURIComponent(text).replaceAll('%20', '+');

/**
 * @param {string} query
 * @param {SearchResult[]} results
 * @returns {[string, string[], string[], string[]]}
 */
export const formatter = (query, results) => {
  return [
    query,
    results.map(x => x.subtitle),
    results.map(_ => ''),
    results.map(x => `https://dictionary.goo.ne.jp/word/en/${encode(x.title)}/`),
  ];
};
