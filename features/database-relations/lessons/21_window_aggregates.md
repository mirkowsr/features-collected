# Lesson 21 — Window aggregates (running totals & moving averages)

**Goal:** Apply aggregate functions as windows for running/moving calculations.

---

## Theory

Any aggregate (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`) can be a window function. Combined with `ORDER BY` + a frame, they become **running**/moving calculations.

### Common frames

| Frame | Effect |
|-------|--------|
| `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` | running total |
| `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` | rolling 3-row window |
| `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` | centered window |
| `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` | full partition (same as no frame) |

### Real use cases

- **Running total** of sales over time.
- **Moving average** (e.g. 3-day) to smooth noise.
- **Cumulative count** of orders per customer.
- **Running % share** of a partition total.

---

## Worked examples

```sql
-- running total and 3-row moving average of sales, globally by date
SELECT orderid, orderdate, sales,
       SUM(sales) OVER (ORDER BY orderdate
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
       AVG(sales) OVER (ORDER BY orderdate
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3
FROM sales.orders
ORDER BY orderdate;

-- running share of each customer's total revenue
SELECT customerid, orderid, sales,
       SUM(sales) OVER (PARTITION BY customerid ORDER BY orderdate) AS running,
       SUM(sales) OVER (PARTITION BY customerid) AS cust_total,
       SUM(sales) OVER (PARTITION BY customerid ORDER BY orderdate) * 100.0
           / SUM(sales) OVER (PARTITION BY customerid) AS running_pct
FROM sales.orders
ORDER BY customerid, orderdate;
```

## Exercises

1. Compute a running total of `sales` (global, ordered by `orderdate`). What's the final value, and what does it represent?

2. Compute a **3-row moving average** of `sales` ordered by `orderdate`. Compare it to the raw `sales` to see the smoothing effect.

3. Per customer, compute a running `COUNT(*)` of orders (cumulative order number per customer).

4. Per customer, compute the **running percentage** of their total revenue (`running / customer_total * 100`). Verify the last row per customer is 100%.

5. Per department, compute a running total of `salary` ordered by `salary`, to see when cumulative salary crosses thresholds.

6. **Frame boundary:** what's the difference between a running total using `ROWS` vs `RANGE` when there are duplicate `orderdate` values? Construct a small example (or reason it out) and explain.
