/** @typedef {import('./core.mjs').SearchResult} SearchResult */

/**
 * @param {string} query
 * @param {SearchResult[]} results
 * @returns {[string, string[], string[], string[]]}
 */
export const formatter = (query, results) => {
  return [
    query,
    results.map(x => x.title),
    results.map(x => x.subtitle),
    results.map(x => x.execution?.url ?? ''),
  ];
};
