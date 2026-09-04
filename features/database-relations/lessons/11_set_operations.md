# Lesson 11 — Set operations

**Goal:** Combine *result sets* vertically with `UNION`, `UNION ALL`, `INTERSECT`, and `EXCEPT`.

---

## Theory

Set operations work on **whole result sets** (same number & compatible types of columns), stacking them vertically.

| Operation | Result | Duplicates? |
|-----------|--------|-------------|
| `UNION` | all rows from both queries | removed |
| `UNION ALL` | all rows from both queries | kept |
| `INTERSECT` | rows common to both | removed |
| `EXCEPT` | rows in first **not** in second | removed |

### Rules
- Same number of columns, in the same order, with compatible types.
- Column names come from the **first** query.
- `ORDER BY` applies to the combined result (put it at the end).
- `UNION` removes duplicates (sort+dedup) → slower than `UNION ALL`.

### Typical use cases
- `UNION ALL` — combine current + archive data for analysis.
- `UNION` — merge two lists and dedup.
- `EXCEPT` — "find what changed" (in A but not B).
- `INTERSECT` — "find overlap".

---

## Worked example — current + archive

```sql
SELECT orderid, orderdate, sales FROM sales.orders
UNION ALL
SELECT orderid, orderdate, sales FROM sales.ordersarchive
ORDER BY orderid;
```

Compare with `UNION` (drops duplicates — note `ordersarchive` has duplicate rows):

```sql
SELECT orderid, orderdate, sales FROM sales.orders
UNION
SELECT orderid, orderdate, sales FROM sales.ordersarchive
ORDER BY orderid;
```

## Exercises

1. Write a `UNION ALL` of `sales.orders` and `sales.ordersarchive` selecting `orderid, sales`. How many rows total? Now change to `UNION` — how many rows, and why fewer?

2. Use `INTERSECT` to find `orderid`s that appear in **both** `orders` and `ordersarchive`. What does a non-empty result tell you about the archive?

3. Use `EXCEPT` to find `orderid`s present in `orders` but **not** in `ordersarchive`.

4. Combine the current orders and archive orders, then compute total `sales` per `orderstatus` across both. (Hint: set op inside a subquery/CTE, then aggregate — CTEs are lesson 17.)

5. Column-order gotcha: what happens here?
   ```sql
   SELECT sales, orderid FROM sales.orders
   UNION ALL
   SELECT orderid, sales FROM sales.ordersarchive;
   ```
   **Trap:** in PostgreSQL this does **not** error — `INT` and `INT` are compatible, so the query runs and silently returns each row's values under the *first* query's column names (you'll see `89.99` labeled `orderid`). The columns are matched by **position**, not name. Run it and inspect the nonsense. Then try it with truly incompatible types — `SELECT orderstatus, orderid ... UNION ALL SELECT orderid, sales ...` — which *does* error (`UNION types character varying and integer cannot be matched`). Lesson: same position, same type family, and always list columns in a consistent order.

6. When would you prefer `UNION ALL` over `UNION` for performance? Give a realistic scenario where you *know* there are no duplicates.
