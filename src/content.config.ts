import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tags become URLs (/blog/tags/<tag>/), so normalise whatever gets typed in the editor.
const tag = z.string().transform((s) => s.trim().toLowerCase().replace(/[\s_]+/g, '-'));

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Optional: when empty, lists and link previews use the first paragraph of the post.
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(tag).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
