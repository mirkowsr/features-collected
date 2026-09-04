# Lesson 10 — Joins

**Goal:** Combine rows from multiple tables to answer questions spanning entities (customers + orders + products + employees).

---

## Theory

A **JOIN** matches rows across tables on a shared column (usually an FK↔PK).

```sql
SELECT ...
FROM left_table a
[INNER|LEFT|RIGHT|FULL|CROSS] JOIN right_table b
    ON a.key = b.key;
```

### Join types

| Join | Returns |
|------|---------|
| `INNER JOIN` | only rows with a match in **both** tables |
| `LEFT JOIN` | **all** left rows + matched right rows (NULLs where no match) |
| `RIGHT JOIN` | **all** right rows + matched left rows |
| `FULL JOIN` | all rows from both; NULLs on unmatched sides |
| `CROSS JOIN` | every combination (cartesian product) |

### "Anti" joins

Not a keyword — you build them with a `LEFT JOIN` + `WHERE ... IS NULL` to find **non-matching** rows:

```sql
-- customers with no orders
SELECT c.customerid, c.firstname
FROM sales.customers c
LEFT JOIN sales.orders o ON c.customerid = o.customerid
WHERE o.orderid IS NULL;
```

### Self joins

Join a table to itself (useful for hierarchies like `employees.managerid`):

```sql
SELECT e.firstname AS employee, m.firstname AS manager
FROM sales.employees e
LEFT JOIN sales.employees m ON e.managerid = m.employeeid;
```

### Multi-table joins

Chain as many as you need:

```sql
SELECT o.orderid, c.firstname, p.product, e.firstname AS salesperson
FROM sales.orders o
JOIN sales.customers  c ON o.customerid    = c.customerid
JOIN sales.products   p ON o.productid     = p.productid
JOIN sales.employees  e ON o.salespersonid = e.employeeid;
```

---

## Worked example — INNER vs LEFT

```sql
-- INNER: only customers who HAVE orders
SELECT c.customerid, c.firstname, o.orderid
FROM sales.customers c
INNER JOIN sales.orders o ON c.customerid = o.customerid;

-- LEFT: ALL customers, NULLs where no orders
SELECT c.customerid, c.firstname, o.orderid
FROM sales.customers c
LEFT JOIN sales.orders o ON c.customerid = o.customerid;
```

## Exercises

1. Using `INNER JOIN`, list each order's `orderid`, the customer's `firstname`, and the product's `product` name.

2. Using `LEFT JOIN`, list **all** customers (with `NULL` order fields) and their orders — then identify which customer(s) have **no** orders (anti-join pattern).

3. Join `sales.orders` to `sales.employees` (on `salespersonid`) to show each order with the salesperson's `firstname`. Use a `LEFT JOIN` so orders are never lost.

4. Produce a single result with `orderid`, `sales`, customer name, product name, **and** salesperson name — a 4-table join.

5. **Self join:** list every employee with their manager's name (manager may be `NULL`). Who is at the top of the hierarchy (no manager)?

6. What is the difference in **row count** between `INNER JOIN` and `CROSS JOIN` on `sales.customers` (5 rows) and `sales.products` (5 rows)? Predict, then verify. When would a `CROSS JOIN` ever be useful?

7. **Find unmatched:** which `salespersonid`s in `sales.orders` don't exist in `sales.employees`? (Run after lesson 05's FKs, or before — does your data have any?) 
