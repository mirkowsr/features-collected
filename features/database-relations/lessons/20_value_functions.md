# Lesson 20 — Window value functions (LAG / LEAD / FIRST_VALUE / LAST_VALUE)

**Goal:** Access neighboring or boundary rows within a window.

---

## Theory

| Function | Returns |
|----------|---------|
| `LAG(col, n, default)` | value `n` rows **before** the current row |
| `LEAD(col, n, default)` | value `n` rows **after** the current row |
| `FIRST_VALUE(col)` | first value in the window frame |
| `LAST_VALUE(col)` | last value in the window frame |
| `NTH_VALUE(col, n)` | nth value in the frame |

These need `ORDER BY` (and optional `PARTITION BY`).

### The classic `LAST_VALUE` gotcha

The default frame is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, so `LAST_VALUE` often equals the current row, not the partition's last row. To get the true last value, expand the frame:

```sql
LAST_VALUE(col) OVER (ORDER BY orderdate
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
```

---

## Worked examples

```sql
-- previous and next order's sales per customer
SELECT customerid, orderid, orderdate, sales,
       LAG(sales)  OVER (PARTITION BY customerid ORDER BY orderdate) AS prev_sales,
       LEAD(sales) OVER (PARTITION BY customerid ORDER BY orderdate) AS next_sales
FROM sales.orders
ORDER BY customerid, orderdate;

-- first order date per customer
SELECT customerid, orderdate,
       FIRST_VALUE(orderdate) OVER (PARTITION BY customerid ORDER BY orderdate) AS first_order
FROM sales.orders;
```

## Exercises

1. For each order (per customer, ordered by `orderdate`), add `prev_sales` (`LAG`) and `next_sales` (`LEAD`). Identify the row(s) where `prev_sales` is `NULL` — what does that mean?

2. Use `LAG` to compute the **change** in `sales` between consecutive orders for a customer: `sales - LAG(sales) ...`.

3. Days between consecutive orders per customer: `orderdate - LAG(orderdate) OVER (PARTITION BY customerid ORDER BY orderdate)`. Which customer re-ordered fastest?

4. Using `FIRST_VALUE` and `LAST_VALUE`, show each order's `orderdate` alongside the customer's **first** and **last** order date. (Remember the `LAST_VALUE` frame gotcha — fix the frame.)

5. Demonstrate the `LAST_VALUE` gotcha: run `LAST_VALUE(orderdate) OVER (PARTITION BY customerid ORDER BY orderdate)` with and without `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`, and explain the different results.

6. Use `NTH_VALUE(sales, 2)` to get the second order's sales per customer.
