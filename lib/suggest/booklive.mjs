import fetch from 'node-fetch';
import { parse as parseHtml } from 'node-html-parser';

const HOST = 'https://booklive.jp';

/**
 * @param {string} query
 * @returns {[string, string[], string[], string[]]}
 */
export const search = async query => {
  const url = `${HOST}/json/suggest?keyword=${encodeURIComponent(query)}`;
  console.log({ url });

  const response = await fetch(url);
  const resObj = await response.json();
  const document = parseHtml(`<ul>${resObj.html}</ul>`);

  const listItems = document.getElementsByTagName('li');

  const titles = listItems.map(li => li.querySelector('p.title_name').textContent);
  const descs = listItems.map(li => li.querySelector('p.category_name').textContent);
  const urls = listItems.map(li => `${HOST}${li.querySelector('a[href]').href}`);

  return [query, titles, descs, urls];
};
