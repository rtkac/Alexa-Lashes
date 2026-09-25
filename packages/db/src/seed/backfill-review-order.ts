import { sql } from 'drizzle-orm';

import { db } from '../index';

// One-off backfill: every review currently ties at display_order = 0, so
// today's effective order is really just createdAt. Spread existing rows
// 1000 apart (preserving that order) so the drag-reorder feature has room
// to insert between any two neighbors via midpoint math.
await db.execute(sql`
  UPDATE reviews r
  SET display_order = ranked.new_order
  FROM (
    SELECT id, (ROW_NUMBER() OVER (ORDER BY display_order ASC, created_at ASC) - 1) * 1000 AS new_order
    FROM reviews
  ) AS ranked
  WHERE r.id = ranked.id;
`);

console.log('Backfilled display_order for all reviews (spacing = 1000).');
