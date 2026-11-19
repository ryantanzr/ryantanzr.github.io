// Blog helper. Run through npm:
//   npm run new-post -- "My title" [--tags go,idempotency]   create a draft
//   npm run posts                                             list every post and its status
//   npm run publish-post -- my-title                               publish a draft (sets today's date)
//   npm run unpublish-post -- my-title                             turn a post back into a draft
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const DIR = 'src/content/blog';
const [cmd, ...rest] = process.argv.slice(2);

const flag = (name) => {
  const i = rest.indexOf(`--${name}`);
  if (i === -1) return null;
  return rest.splice(i, 2)[1] ?? '';
};
const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD
const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
const fail = (msg) => { console.error(msg); process.exit(1); };
const files = () => readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).sort();
const field = (src, key) => src.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '') ?? '';

function resolve(name) {
  if (!name) fail('Give the post slug, e.g. `npm run publish-post -- my-title`. See `npm run posts`.');
  const base = name.replace(/\.mdx?$/, '').replace(/^.*\//, '');
  const hit = files().find((f) => f.replace(/\.mdx?$/, '') === base) ?? files().find((f) => f.includes(base));
  if (!hit) fail(`No post matches "${name}". See \`npm run posts\`.`);
  return `${DIR}/${hit}`;
}

function setDraft(name, draft) {
  const file = resolve(name);
  let src = readFileSync(file, 'utf8');
  if (!/^draft:/m.test(src)) fail(`${file} has no draft field.`);
  src = src.replace(/^draft:.*$/m, `draft: ${draft}`);
  if (!draft) {
    src = src.replace(/^pubDate:.*$/m, `pubDate: ${today()}`);
    if (!field(src, 'description')) console.log('Note: no description, so the first paragraph will be used for previews.');
  }
  writeFileSync(file, src);
  console.log(`${draft ? 'Unpublished' : 'Published'} ${file}\nCommit and push to main to ${draft ? 'take it down' : 'put it live'}.`);
}

if (cmd === 'new') {
  const tags = (flag('tags') ?? '').split(',').map((t) => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
  const title = rest.join(' ').trim();
  if (!title) fail('Usage: npm run new-post -- "My post title" [--tags go,idempotency]');
  const slug = slugify(title);
  if (!slug) fail('That title has no usable letters or numbers.');
  const file = `${DIR}/${slug}.md`;
  if (existsSync(file)) fail(`Already exists: ${file}`);
  writeFileSync(
    file,
    `---
title: ${JSON.stringify(title)}
description: ""
pubDate: ${today()}
tags: [${tags.join(', ')}]
draft: true
---

<!-- Open with the problem or the surprise. Use ## for sections; the page builds a contents list from them. -->

Write here.
`,
  );
  console.log(`Created ${file}\n\nPreview it:  npm run dev  ->  http://localhost:4321/blog/${slug}/\nPublish it:  npm run publish-post -- ${slug}`);
} else if (cmd === 'list') {
  const rows = files().map((f) => {
    const src = readFileSync(`${DIR}/${f}`, 'utf8');
    return { status: field(src, 'draft') === 'true' ? 'draft' : 'live', date: field(src, 'pubDate').slice(0, 10), slug: f.replace(/\.mdx?$/, ''), title: field(src, 'title') };
  });
  if (!rows.length) console.log('No posts yet. Create one with: npm run new-post -- "My first post"');
  for (const r of rows.sort((a, b) => b.date.localeCompare(a.date))) console.log(`${r.status.padEnd(6)} ${r.date}  ${r.slug.padEnd(36)} ${r.title}`);
} else if (cmd === 'publish') {
  setDraft(rest[0], false);
} else if (cmd === 'unpublish') {
  setDraft(rest[0], true);
} else {
  fail('Commands: new, list, publish, unpublish');
}
