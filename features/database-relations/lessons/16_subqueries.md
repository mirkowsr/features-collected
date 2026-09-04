# Lesson 16 — Subqueries

**Goal:** Nest queries inside other queries — scalar, list, correlated, and `EXISTS`.

---

## Theory

A **subquery** is a query inside another query, by result shape:

| Shape | Returns | Typical location |
|-------|---------|------------------|
| **Scalar** | single value | `SELECT`, `WHERE x = (...)`, `HAVING` |
| **Column/list** | one column, many rows | `WHERE x IN (...)`, `ANY`/`ALL` |
| **Table** | multiple cols/rows | `FROM (...)`, `JOIN (...)` |

### WHERE a subquery is used

```sql
-- scalar subquery
SELECT *
FROM sales.orders
WHERE sales > (SELECT AVG(sales) FROM sales.orders);

-- list subquery with IN
SELECT * FROM sales.products
WHERE productid IN (SELECT productid FROM sales.orders WHERE orderstatus = 'Delivered');

-- table subquery in FROM
SELECT t.country, t.total
FROM (SELECT country, SUM(score) AS total FROM sales.customers GROUP BY country) t;
```

### Correlated subquery

Refers to the outer query's row; re-evaluated per row:

```sql
SELECT c.customerid, c.firstname
FROM sales.customers c
WHERE EXISTS (
    SELECT 1 FROM sales.orders o
    WHERE o.customerid = c.customerid
);
```

- `EXISTS` — true if the subquery returns *any* row (usually the fastest "has at least one" test).
- `NOT EXISTS` — anti-join alternative.
- `ANY` / `ALL` compare a value against a list: `sales > ANY(...)`.

---

## Worked example

```sql
-- customers whose score is above the overall average
SELECT customerid, score
FROM sales.customers
WHERE score > (SELECT AVG(score) FROM sales.customers);

-- products that have never been ordered
SELECT productid, product
FROM sales.products p
WHERE NOT EXISTS (SELECT 1 FROM sales.orders o WHERE o.productid = p.productid);
```

## Exercises

1. Return the customer(s) with the **highest** `score` using a scalar subquery with `= (SELECT MAX(score) ...)`. What complication does `NULL` introduce?

2. List all orders whose `sales` is **above the average** order `sales`.

3. Find products that appear in at least one `'Delivered'` order (using `IN`).

4. Find all employees who have **sold at least one order** (using `EXISTS`). Then do the same with `IN`. Which reads better?

5. Customers who have **no** orders — write it both with `NOT EXISTS` and with the `LEFT JOIN ... IS NULL` pattern from lesson 10. Confirm identical results.

6. Use `ANY`/`ALL`: find orders whose `sales` is greater than **every** order placed in January 2025 (`ALL`), and greater than **any** such order (`ANY`). Explain the difference.

7. **Correlation:** for each employee, show `firstname` and their **total sold** using a correlated scalar subquery in the `SELECT` list. When would this be slower than a `GROUP BY` join (covered later)?
