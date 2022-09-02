import fetch from 'node-fetch';
import { parse as parseHtml } from 'node-html-parser';
import { isEmpty, join, map, pipe, reject, split, trim, zip } from 'ramda';

const ESPECIAL_KEYWORDS = {
  '%26': '%252526', // &
  '%2F': '%25252F', // /
};

const HOST = 'https://dictionary.goo.ne.jp';

/**
 * @param {string} query
 * @returns {Promise<{ title: string, subtitle: string, execution?: { type: string, url: string }[] }>}
 */
export const search = async query => {
  const keyword = Object.entries(ESPECIAL_KEYWORDS)
    .reduce((s, [key, val]) => s.split(key).join(val), encodeURIComponent(query));

  const response = await fetch(`${HOST}/srch/en/${keyword}/m0u/`);
  const document = parseHtml(await response.text());

  if (response.url.substring(HOST.length).startsWith('/word/')) {
    const parents = document.querySelectorAll('.meanging');

    // remove all unnecessary elements
    parents
      .flatMap(e => e.querySelectorAll('script, div.examples'))
      .forEach(e => e.remove());

    const trimAndMergeLines = pipe(split('\n'), map(trim), reject(isEmpty), join(' '));

    const titles = parents.map(e => e.querySelector('.basic_title')?.textContent?.trim() ?? '');
    const contents = parents.map(e => trimAndMergeLines(e.querySelector('.content-box-ej')?.textContent ?? ''));
    return zip(titles, contents).map(([title, subtitle]) => ({ title, subtitle }));
  }

  // list of meanings
  return document.querySelectorAll('.search-list .content_list > li')
    .map(e => ({
      title: e.querySelector('.title')?.textContent?.trim() ?? '',
      subtitle: e.querySelector('.text')?.textContent?.trim() ?? '',
      execution: [{ type: 'OpenUrl', url: `${HOST}${e.querySelector('a[href]')?.href}` }],
    }));
};
