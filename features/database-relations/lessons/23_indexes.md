# Lesson 23 — Indexes

**Goal:** Understand how indexes speed up reads, the main index types, and when *not* to index.

---

## Theory

An **index** is a data structure (a sorted copy of some columns) that lets the database find rows **without scanning the whole table** (called a *sequential scan*). Think of a book's index vs reading every page.

### How it works

- Without index: `WHERE customerid = 3` → scan every row (O(n)).
- With B-tree index on `customerid`: jump straight to matches (O(log n)).

### Index types in PostgreSQL

| Type | Use case |
|------|----------|
| **B-tree** (default) | equality `<`, `>`, `BETWEEN`, `LIKE 'abc%'`, ranges, sorting |
| **Hash** | equality only (`=`), rarely used (B-tree does it) |
| **GIN** | full-text search, arrays, JSONB |
| **GiST/SP-GiST** | geometry, full-text |
| **BRIN** | huge, naturally-ordered tables (block ranges) |

### Kinds of B-tree indexes

- **Single-column**: `(customerid)`.
- **Composite** (multi-column): `(customerid, orderdate)` — helps queries filtering on both, in that order.
- **Unique**: also enforces uniqueness (PK/UNIQUE constraints create these automatically).
- **Partial**: indexes only rows matching `WHERE` (e.g. only active rows) — smaller & faster.
- **Expression**: indexes on `LOWER(email)` etc.
- **Covering** (`INCLUDE`): stores extra columns so queries are index-only.

### Trade-offs — when NOT to index

Indexes **help reads** but **hurt writes** (INSERT/UPDATE/DELETE must maintain them) and consume **storage**. Avoid over-indexing:

- Small tables (a sequential scan is fine).
- Tables written far more often than read.
- Columns with low **selectivity** (few distinct values, e.g. `gender`) — index won't narrow much.

### Commands & inspection

```sql
CREATE INDEX idx ON table (col);
CREATE UNIQUE INDEX ... ;
CREATE INDEX ... ON table (a, b);
DROP INDEX name;

-- see existing indexes on a table
SELECT indexname, indexdef FROM pg_indexes
WHERE schemaname='sales' AND tablename='orders';

-- see if the planner uses/skips an index
EXPLAIN SELECT * FROM sales.orders WHERE customerid = 3;
```

---

## Worked example

```sql
CREATE INDEX idx_orders_customer ON sales.orders (customerid);
CREATE INDEX idx_orders_customer_date ON sales.orders (customerid, orderdate);
CREATE UNIQUE INDEX u_customers_email ON sales.customers (firstname); -- only if unique!

EXPLAIN SELECT * FROM sales.orders WHERE customerid = 3;
```

## Exercises

1. Create an index on `sales.orders(customerid)`. Run `EXPLAIN` before and after — what does the plan change from/to?

2. Create a **composite** index on `(customerid, orderdate)`. Which of these would it help: filtering on `customerid` alone, on `customerid + orderdate`, on `orderdate` alone? (Hint: leftmost-prefix rule.)

3. Create a **unique** index on `sales.customers(firstname || ' ' || lastname)` (expression index). What happens when you try to insert a duplicate full name? (If you built lesson 04.5's partial unique index on `firstname`, the duplicate may be rejected by *that* constraint first — check the constraint name in the error, and list both indexes in `pg_indexes` to see why.)

4. Create a **partial** index on `sales.orders(sales)` `WHERE orderstatus = 'Delivered'`. When would this be smaller and faster than a full index?

5. Explain why indexing `gender` (an `employees` column with only 'M'/'F') is usually pointless. What term describes this?

6. Write a query against `pg_indexes` to list every index in the `sales` schema. Identify which were auto-created by `PRIMARY KEY`/`UNIQUE` constraints.

7. Drop a test index with `DROP INDEX` and confirm it's gone. When in a migration would you drop an index, and why does dropping an index never lose *data*?
