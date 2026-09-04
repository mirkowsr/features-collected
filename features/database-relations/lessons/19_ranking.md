# Lesson 19 — Window ranking functions

**Goal:** Assign ranks/positions within partitions.

---

## Theory

| Function | Behaviour | Duplicates |
|----------|-----------|------------|
| `ROW_NUMBER()` | unique sequential number per partition | never ties (deterministic if ordered uniquely) |
| `RANK()` | rank with gaps on ties | ties share rank, next rank skips |
| `DENSE_RANK()` | rank without gaps on ties | ties share rank, next is consecutive |
| `NTILE(n)` | split into n roughly-equal buckets | — |
| `PERCENT_RANK()` / `CUME_DIST()` | percentile rank / cumulative distribution | — |

All require `ORDER BY` (and optionally `PARTITION BY`).

### Difference, illustrated (values 10, 20, 20, 30)

| value | ROW_NUMBER | RANK | DENSE_RANK |
|-------|-----------|------|-----------|
| 10 | 1 | 1 | 1 |
| 20 | 2 | 2 | 2 |
| 20 | 3 | 2 | 2 |
| 30 | 4 | 4 | 3 |

---

## Worked examples

```sql
-- rank customers by score overall
SELECT customerid, score,
       RANK() OVER (ORDER BY score DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY score DESC) AS dense
FROM sales.customers;

-- row_number per customer, latest order first
SELECT orderid, customerid, orderdate,
       ROW_NUMBER() OVER (PARTITION BY customerid ORDER BY orderdate DESC) AS rn
FROM sales.orders;
```

## Exercises

1. Rank products by `price` descending using `RANK()`. Do any prices tie? What's the effect on the following rank?

2. Add `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` side by side for `sales.orders` ordered by `sales DESC`. Find a tie and explain the difference across the three columns.

3. "Latest order per customer": use `ROW_NUMBER() OVER (PARTITION BY customerid ORDER BY orderdate DESC)`, then filter to `rn = 1` (wrap in a CTE). This is the classic *top-N per group* pattern.

4. Split the 10 orders into 3 buckets with `NTILE(3) OVER (ORDER BY sales DESC)`. Which bucket each order falls in, and are the bucket sizes equal?

5. For each customer, rank their orders by `sales` within that customer (`PARTITION BY customerid`). Which customer's top order has the smallest `sales`?

6. Where would you use `RANK()` vs `ROW_NUMBER()` in a real "leaderboard" scenario, and why? Give a concrete example where the difference matters.
