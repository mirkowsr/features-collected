# Lesson 22 — Views

**Goal:** Create reusable, persistent "virtual tables" to hide complexity and secure data.

---

## Theory

A **view** is a saved `SELECT` query you can query like a table. It stores the *query*, not the data (it's re-evaluated on each use). Think of it as a named, reusable query that acts as an interface over the underlying tables.

### Why use views?

1. **Hide complexity** — expose a simple interface over a complex join.
2. **Security** — expose only certain columns/rows to certain users.
3. **Consistency** — one definition reused everywhere.
4. **Backward compatibility** — keep old "table" shapes stable while refactoring the real schema.

### Commands

```sql
CREATE [OR REPLACE] VIEW name AS <select>;
ALTER VIEW name RENAME TO new_name;
DROP VIEW [IF EXISTS] name [CASCADE];
```

### Updatable views

A view is *automatically updatable* if it's a simple select from a single table (no aggregates/joins/DISTINCT). `INSERT`/`UPDATE`/`DELETE` through it affect the base table.

### Materialized views (Postgres extra)

`CREATE MATERIALIZED VIEW` **stores** the result (like a table). `REFRESH MATERIALIZED VIEW name` recomputes it. Great for expensive aggregations queried often, at the cost of being stale until refreshed.

---

## Worked examples

```sql
-- hide the 4-table join complexity
CREATE VIEW sales.v_order_details AS
SELECT o.orderid,
       o.sales,
       c.firstname || ' ' || COALESCE(c.lastname,'') AS customer,
       p.product,
       e.firstname                                  AS salesperson
FROM sales.orders o
JOIN sales.customers c ON o.customerid = c.customerid
JOIN sales.products  p ON o.productid  = p.productid
JOIN sales.employees e ON o.salespersonid = e.employeeid;

SELECT * FROM sales.v_order_details WHERE sales > 30;

-- materialized: monthly sales snapshot
CREATE MATERIALIZED VIEW sales.mv_monthly AS
SELECT DATE_TRUNC('month', orderdate) AS month, SUM(sales) AS total
FROM sales.orders GROUP BY 1;
```

## Exercises

1. Create a view `sales.v_top_customers` showing each customer's `customerid`, `firstname`, and total `sales`, sorted descending. Query it.

2. Create a view `sales.v_products_nodiscount` that exposes only `productid`, `product`, `category` (hiding `price`). Explain how this helps with data security.

3. Test updatability: create a view over just `sales.customers` and try `INSERT`/`UPDATE` through it. Does it propagate to the base table? Now add a `DISTINCT`/`GROUP BY` and see if it's still updatable.

4. Create a **materialized view** of total sales per `orderstatus`, then `REFRESH` it after inserting a new order, and show the value changes.

5. Use `CREATE OR REPLACE VIEW` to change `v_order_details` to also include `orderstatus`. Verify with a query.

6. List all views (and materialized views) in the `sales` schema. What's the difference in how data is stored between a view and a materialized view?
