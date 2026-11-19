import rss from '@astrojs/rss';
import { site } from '../data/site';
import { describe, getPublishedPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name} · Blog`,
    description: 'Notes on backend engineering, distributed systems and serverless.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: describe(p),
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
