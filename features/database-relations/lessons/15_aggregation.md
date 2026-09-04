# Lesson 15 — Aggregation & GROUP BY / HAVING

**Goal:** Summarize data — totals, counts, averages per group — and understand SQL's logical execution order.

---

## Theory

### Aggregate functions

| Function | Meaning |
|----------|---------|
| `COUNT(*)` / `COUNT(col)` | count rows / non-NULL values |
| `SUM(col)` | total |
| `AVG(col)` | average (ignores NULL) |
| `MIN(col)` / `MAX(col)` | smallest / largest |
| `COUNT(DISTINCT col)` | distinct count |

### GROUP BY

Groups rows that share values in the grouped columns, then applies aggregates **per group**:

```sql
SELECT country, SUM(score) AS total_score
FROM sales.customers
GROUP BY country;
```

**Rule:** every non-aggregated column in `SELECT` must appear in `GROUP BY` (or fail).

### HAVING vs WHERE

- `WHERE` filters **rows** *before* grouping.
- `HAVING` filters **groups** *after* aggregation.

```sql
SELECT country, AVG(score) AS avg_score
FROM sales.customers
WHERE score IS NOT NULL        -- filter rows first
GROUP BY country
HAVING AVG(score) > 400;       -- filter groups after
```

### Logical order of execution (important!)

SQL is written in one order but **logically evaluated** in another:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
         ↑ rows      ↑ groups            ↑ aliases usable here
```

This is why you **can't** use a `SELECT` alias in `WHERE` (aliases appear later), but you **can** in `ORDER BY`.

---

## Worked examples

```sql
-- total sales per product
SELECT productid, SUM(sales) AS total_sales, COUNT(*) AS orders
FROM sales.orders
GROUP BY productid
ORDER BY total_sales DESC;

-- top customers by revenue, only those with >1 order
SELECT customerid, SUM(sales) AS revenue, COUNT(*) AS n_orders
FROM sales.orders
GROUP BY customerid
HAVING COUNT(*) > 1
ORDER BY revenue DESC;
```

## Exercises

1. Compute total `sales` (alias `total_sales`) and average `sales` across all orders in one query.

2. Group orders by `orderstatus`: show status, `COUNT(*)`, and `SUM(sales)`. Sort by total descending.

3. Group `sales.customers` by `country`: show `COUNT(*)` and `AVG(score)`. Which country averages higher?

4. Find customers (`customerid`) who placed **more than one** order — show their `customerid` and order count (`HAVING`).

5. For `sales.employees`, show `department` and average `salary`, but only departments whose average salary exceeds `60000`.

6. **Execution-order trap:** does this work?
   ```sql
   SELECT customerid AS cid, SUM(sales) AS total
   FROM sales.orders
   WHERE total > 50
   GROUP BY customerid;
   ```
   Explain why/why not, and rewrite it correctly.

7. Combine month grouping + aggregate: total `sales` per month (`DATE_TRUNC('month', orderdate)`), sorted chronologically.
