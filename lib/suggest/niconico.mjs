import fetch from 'node-fetch';
import { map, pipe, transpose } from 'ramda';

/**
 * @param {string} query
 * @returns {[string, string[], string[], string[]]}
 */
export const search = async query => {
  const url = `https://sug.search.nicovideo.jp/suggestion/expand/${encodeURIComponent(query)}`;
  console.log({ url });

  const response = await fetch(url);
  const resObj = await response.json();
  const converted = pipe(
    map(s => [s, '', `https://www.nicovideo.jp/search/${encodeURIComponent(s)}`]),
    transpose,
  )(resObj.candidates);

  return [query, ...converted];
};
