# Lesson 14 — CASE expressions

**Goal:** Produce conditional logic inside a query — categorize, map, and conditionally aggregate.

---

## Theory

`CASE` is an expression (returns a value), usable in `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, etc.

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    [ELSE fallback]          -- optional; NULL if omitted
END
```

A shorthand for equality checks:

```sql
CASE column
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ELSE fallback
END
```

### Conditional aggregation

Wrap an aggregate result in `CASE` inside the aggregate to count/sum only matching rows:

```sql
SELECT
    SUM(CASE WHEN orderstatus = 'Delivered' THEN sales ELSE 0 END) AS delivered_sales
FROM sales.orders;
```

---

## Worked examples

```sql
-- categorize a customer score
SELECT customerid, score,
  CASE
    WHEN score IS NULL    THEN 'Unknown'
    WHEN score >= 800     THEN 'High'
    WHEN score >= 400     THEN 'Medium'
    ELSE 'Low'
  END AS score_band
FROM sales.customers;

-- map status to a short label
SELECT orderid,
  CASE orderstatus
    WHEN 'Delivered' THEN 'DONE'
    WHEN 'Shipped'   THEN 'IN TRANSIT'
    ELSE 'OTHER'
  END AS status_label
FROM sales.orders;
```

## Exercises

1. Categorize each order's `sales` into `'Small'` (< 25), `'Medium'` (25–49), and `'Large'` (≥ 50). What `ELSE` case (if any) do you need?

2. Add a `delivery_bucket` column to orders: `'Fast'` if it shipped within 5 days (`shipdate - orderdate <= 5 days`), else `'Slow'`. Handle NULL `shipdate`.

3. Using the shorthand form, map `department` to a code: `'Sales' → 'S'`, `'Marketing' → 'M'`, else `'Other'`.

4. **Conditional aggregation:** in one query, count how many orders are `'Delivered'` and how many are `'Shipped'` (two generated columns).

5. In one query, compute total `sales` for `'Delivered'` orders and total `sales` for `'Shipped'` orders side by side (two columns).

6. Use `CASE` in `ORDER BY` to force a custom precedence when listing customers by country: `Germany` first, then `USA`, then others.
