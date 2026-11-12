---
title: 'Making at-least-once delivery safe with an inbox table'
description: 'A sample post: how an inbox table turns duplicate, late and out-of-order events into idempotent state transitions.'
pubDate: 2026-11-01
tags: ['distributed-systems', 'go']
---

> This is a placeholder post so the blog has something to show. Edit or delete it, then add your own files in `src/content/blog/`.

Message brokers promise **at-least-once** delivery, which is a polite way of saying *you will see duplicates*. The inbox pattern makes your consumer safe regardless.

## The idea

Record every incoming event ID in the same transaction that applies its effect. If the insert collides, you've already handled it.

```go
func (s *Store) Apply(ctx context.Context, ev Event) error {
	return s.db.InTx(ctx, func(tx *sql.Tx) error {
		res, err := tx.ExecContext(ctx,
			`INSERT IGNORE INTO inbox (event_id) VALUES (?)`, ev.ID)
		if err != nil {
			return err
		}
		if n, _ := res.RowsAffected(); n == 0 {
			return nil // duplicate: already applied
		}
		return s.applyEffect(ctx, tx, ev)
	})
}
```

## What it doesn't solve

- **Ordering.** Use event-time and watermarks, not arrival time.
- **Concurrent writers.** Pair it with row-level locking.

## Writing a new post

Create `src/content/blog/my-post.md` with this frontmatter and push. GitHub Actions rebuilds the site.

```yaml
---
title: 'My post'
description: 'One-line summary shown in lists and link previews.'
pubDate: 2026-11-12
tags: ['aws']
draft: false   # set true to hide while writing
---
```
