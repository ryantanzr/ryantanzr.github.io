import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Posts, newest first. Drafts are hidden from the built site but shown while
 * `npm run dev` is running, so you can preview a draft at its real URL.
 */
export async function getPosts({ drafts = import.meta.env.DEV } = {}): Promise<Post[]> {
  const all = await getCollection('blog', (p) => drafts || !p.data.draft);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Published posts only, regardless of environment (home page, RSS). */
export const getPublishedPosts = () => getPosts({ drafts: false });

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.replace(/```[\s\S]*?```/g, ' ').trim().split(/\s+/).length / 220));

/** First paragraph of the post as plain text, for posts without a hand-written description. */
function excerpt(body = '', max = 170): string {
  const para = body
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .find((s) => s && !/^(#|>|[-*+]\s|\d+\.\s|!\[|<|\|)/.test(s));
  if (!para) return '';
  const text = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

export const describe = (p: Post) => p.data.description || excerpt(p.body);

const date = (d: Date, month: 'short' | 'long') =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' });
export const fmtShort = (d: Date) => date(d, 'short');
export const fmtLong = (d: Date) => date(d, 'long');
