# Lesson 27 — Performance & execution plans

**Goal:** Read `EXPLAIN ANALYZE`, spot slow patterns, and apply optimization heuristics.

---

## Theory

### How a query runs

The **planner/optimizer** turns your SQL into an *execution plan* (which indexes, join order, algorithms). You inspect it with `EXPLAIN`:

```sql
EXPLAIN SELECT ...;                -- estimated plan (no execution)
EXPLAIN ANALYZE SELECT ...;        -- actually runs + real timings
```

### Reading a plan — key nodes & terms

| Term | Meaning |
|------|---------|
| `Seq Scan` | full table scan (often the red flag on big tables) |
| `Index Scan` | using an index to fetch rows |
| `Index Only Scan` | index covers all needed columns (fastest) |
| `Bitmap Index Scan` | index → bitmap → heap (good for many matches) |
| `Nested Loop` | join via per-row lookups (good when one side small + indexed) |
| `Hash Join` / `Merge Join` | join via hash / sort-merge (good for large sets) |

Read plans **bottom-up, right-to-left** for what runs first; look at `cost=start..total`, `rows`, and (with ANALYZE) `actual time` and `rows`.

### Optimization heuristics (the big wins)

1. **Filter early** — put the most selective predicates first.
2. **Index your predicates** — columns in `WHERE`/`JOIN ON`.
3. **Avoid `SELECT *`** — fetch only needed columns (enables index-only scans).
4. **Avoid functions on indexed columns** — `WHERE lower(name)='x'` defeats the index; use an expression index instead.
5. **Avoid leading wildcards** — `LIKE '%abc'` can't use a B-tree index.
6. **Prefer `EXISTS` over `IN`** on large lists; avoid correlated subqueries in `SELECT`.
7. **Limit `OR` / `UNION` dedup** — use `UNION ALL` when safe.
8. **Watch `DISTINCT`/`ORDER BY`** — they sort; add indexes matching the sort columns.
9. **Don't over-index** — writes get slower (see lesson 23).
10. **Inspect with EXPLAIN, don't guess.**

### Statistics

The planner relies on **statistics** (`ANALYZE table;` refreshes them). Stale stats → bad plans.

---

## Worked example — before/after

```sql
-- slow: full scan
EXPLAIN ANALYZE SELECT * FROM sales.orders WHERE customerid = 3;

-- add an index
CREATE INDEX idx_orders_customer ON sales.orders(customerid);

-- now uses Index Scan
EXPLAIN ANALYZE SELECT * FROM sales.orders WHERE customerid = 3;
```

On a tiny table the planner may still choose a `Seq Scan` (it's correct — scanning 10 rows is faster than an index). **Always test on realistic data volume** — small datasets hide performance problems.

## Exercises

1. Run `EXPLAIN ANALYZE SELECT * FROM sales.orders WHERE customerid = 3;` — does it use an index or a seq scan? Why is that expected on a 10-row table?

2. Add an index on `sales.orders(customerid)` and re-run the plan. Did it change? Explain why the optimizer might *still* prefer a seq scan.

3. Demonstrate the "function on the column" anti-pattern: `WHERE lower(firstname) = 'kevin'` — does an index on `firstname` get used? Then create an **expression index** on `lower(firstname)` and re-check.

4. Write `SELECT *` vs selecting only two columns that are both in a covering index, and observe an `Index Only Scan`. Which line in the plan tells you it's "only"?

5. `EXPLAIN` a 4-table join (orders+products+customers+employees). Identify the join strategy (Nested Loop / Hash Join). Which tables' keys should be indexed for this join?

6. For each heuristic below, write the bad and improved version and explain the fix:
   - `WHERE sales * 1.2 > 100` (sargability)
   - `WHERE shipaddress LIKE '%Lane'` (leading wildcard)
   - `UNION` where `UNION ALL` would be correct

7. Run `ANALYZE sales.orders;` and explain (in one sentence) what it does and why stale stats can produce slow queries.
