# Lesson 18 — Window functions: OVER / PARTITION BY / frames

**Goal:** Compute values across a *set of rows related to the current row* without collapsing them (unlike `GROUP BY`).

---

## Theory

A **window function** runs an aggregate-like calculation over a "window" of rows, but returns **one row per input row** (it doesn't reduce rows).

```sql
func(...) OVER (
    [PARTITION BY cols]     -- divide rows into groups ("resets" per group)
    [ORDER BY cols]         -- order within each partition
    [ROWS/RANGE frame]      -- which rows to include (for running totals)
)
```

### The window parts

- **`OVER ()`** — empty window = all rows.
- **`PARTITION BY`** — like a "GROUP BY" that doesn't collapse (each group gets its own calculation).
- **`ORDER BY`** — sets the order inside the partition (required for running/rank functions).
- **Frame** — restricts to a moving subset, e.g. `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` (running total).

### Window vs GROUP BY

| | `GROUP BY` | Window function |
|--|-----------|-----------------|
| Rows in result | one per group | one per input row |
| Can it add columns alongside detail rows? | no | **yes** |

### Logical position

Window functions evaluate **after** `WHERE`/`GROUP BY`/`HAVING`, near the end (before `ORDER BY`). That's why you can't put them in `WHERE` directly — wrap in a CTE/subquery first.

---

## Worked examples

```sql
-- grand total alongside each row
SELECT orderid, sales,
       SUM(sales) OVER () AS grand_total
FROM sales.orders;

-- total per customer (partition), no collapsing
SELECT orderid, customerid, sales,
       SUM(sales) OVER (PARTITION BY customerid) AS customer_total
FROM sales.orders;

-- running total per customer, oldest → newest
SELECT orderid, customerid, orderdate, sales,
       SUM(sales) OVER (
           PARTITION BY customerid
           ORDER BY orderdate
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM sales.orders
ORDER BY customerid, orderdate;
```

## Exercises

1. Add a column `total_sales` (grand total across all orders) to every row of `sales.orders` using an empty window.

2. Add `customer_total` (SUM over `PARTITION BY customerid`) and `customer_avg` (AVG) as two extra columns. Compare a customer's individual `sales` to their average.

3. Compute a **running total** of `sales` per customer ordered by `orderdate`. Which technique (frame) makes this a true running sum rather than the partition total?

4. Compute the `COUNT(*)` per `orderstatus` as a window column, then compare with `GROUP BY orderstatus`. How many result rows does each approach produce?

5. **Frame experiment:** get a running total using `ROWS UNBOUNDED PRECEDING` (default) vs `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. In this small dataset do they differ? When *would* `ROWS` vs `RANGE` matter (think: duplicate `orderdate` values)?

6. **Ordering matters:** what happens to a `ROW_NUMBER() OVER (ORDER BY sales)` vs `ROW_NUMBER() OVER (PARTITION BY customerid ORDER BY sales)`? Write both and describe.

7. Window functions in `WHERE` are illegal. Demonstrate the error, then fix it by wrapping in a CTE to filter rows where `customer_total > 50`.
