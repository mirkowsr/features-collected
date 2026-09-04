# Lesson 17 — CTEs (& recursive CTEs)

**Goal:** Write readable, reusable named subqueries with `WITH`, and walk hierarchies with recursive CTEs.

---

## Theory

A **Common Table Expression (CTE)** is a named, temporary result set:

```sql
WITH name AS (
    SELECT ...
)
SELECT ... FROM name ...;
```

- Makes complex queries **readable** and **reusable** (reference a CTE multiple times).
- Chain multiple CTEs with commas.
- CTEs can reference **previous** CTEs in the same `WITH`.

### Recursive CTE

Uses `WITH RECURSIVE` to loop until a condition stops — great for tree/hierarchy data (`employees.managerid`):

```sql
WITH RECURSIVE t AS (
    -- anchor: starting row(s)
    SELECT ... WHERE ...          -- (non-recursive term)
    UNION ALL
    -- recursive: joins back to the CTE
    SELECT ... FROM t JOIN ... ON ...   -- (recursive term)
)
SELECT * FROM t;
```

---

## Worked examples

```sql
-- non-recursive: total revenue per customer, then top 2
WITH revenue AS (
    SELECT customerid, SUM(sales) AS total
    FROM sales.orders
    GROUP BY customerid
)
SELECT * FROM revenue ORDER BY total DESC LIMIT 2;

-- recursive: the management chain under employee 1
WITH RECURSIVE chain AS (
    SELECT employeeid, firstname, managerid
    FROM sales.employees
    WHERE employeeid = 1          -- anchor
    UNION ALL
    SELECT e.employeeid, e.firstname, e.managerid
    FROM sales.employees e
    JOIN chain c ON e.managerid = c.employeeid   -- recursive
)
SELECT * FROM chain;
```

## Exercises

1. Rewrite the "customers above average score" query from lesson 16 using a CTE for the average. (Cleaner, and lets you reference the avg multiple times.)

2. Create a CTE `monthly` computing total `sales` per `DATE_TRUNC('month', orderdate)`, then select the month with the **highest** total.

3. Chain two CTEs: `customer_revenue` (total per customer) then `top_customers` (rows with revenue > 50). Select from `top_customers`.

4. Build a recursive CTE to list **all employees under manager `1`** (the whole subtree), showing `employeeid`, `firstname`, and their `managerid`.

5. Using a recursive CTE, compute the "depth" of each employee in the management tree starting from the CEO (the employee with `managerid IS NULL`).

6. Why use a CTE over a subquery? Give two concrete benefits (readability + one more), and write a query that reuses a single CTE twice to demonstrate.

7. `WITH RECURSIVE` to generate a sequence: produce a table of integers 1..10 using a recursive CTE (no base table). Then use it to `CROSS JOIN` and label orders.
