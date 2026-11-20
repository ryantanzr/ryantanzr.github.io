---
title: "Writing cheatsheet (a draft that shows every feature)"
description: "A sample post that exercises headings, code, callouts, tables and more. It stays a draft, so it only appears while you run npm run dev."
pubDate: 2026-11-19
tags: [meta, writing]
draft: true
---

This post is a living style guide. It is a **draft**, so it is visible only on your machine under `npm run dev` and never reaches the live site. Copy what you need, then delete it whenever you like.

## Sections become a contents list

Use `##` for sections and `###` for subsections. Posts with three or more `##` sections get an "On this page" list automatically.

### Inline formatting

Plain text, **bold**, *italic*, `inline code`, ~~strikethrough~~, a [link](https://astro.build) and a keyboard shortcut like <kbd>⌘</kbd> + <kbd>K</kbd>.

## Code

Fenced blocks are highlighted for light and dark, labelled with their language, and get a copy button on hover.

```go
func (s *Store) Apply(ctx context.Context, e Event) error {
	// Idempotent: replaying the same event is a no-op.
	if s.seen(ctx, e.ID) {
		return nil
	}
	return s.commit(ctx, e)
}
```

```bash
npm run new-post -- "My idea" --tags go,idempotency
```

## Callouts

> [!NOTE]
> Notes are for context the reader might want but doesn't need.

> [!TIP]
> Tips are for shortcuts and good habits.

> [!WARNING]
> Warnings are for things that will bite you in production.

> [!IMPORTANT]
> Important is for the one thing to remember if they remember nothing else.

## Quotes, lists and tables

> A plain quote looks like this, set in the display serif.

1. Ordered lists
2. keep their numbers
   - and nest cleanly

| Pattern | Guarantees | Cost |
| --- | --- | --- |
| Inbox | Idempotent consumers | One table |
| Outbox | At-least-once publish | A relay |

---

## Images

Put files in `public/images/blog/` (the writing UI does this for you) and reference them like this:

```md
![Describe the image for people who can't see it](/images/blog/diagram.png)
```

Footnotes work too.[^1]

[^1]: Like this one, collected at the bottom of the post.
