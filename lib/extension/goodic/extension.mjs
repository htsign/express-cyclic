/** @typedef {import('./core.mjs').SearchResult} SearchResult */

/**
 * @param {string} query
 * @param {SearchResult[]} results
 * @returns {SearchResult[]}
 */
export const formatter = (query, results) => results;
