# Lesson 07 — DML: INSERT / UPDATE / DELETE / TRUNCATE

**Goal:** Add, change, and remove data.

---

## Theory

| Statement | Purpose | Notes |
|-----------|---------|-------|
| `INSERT INTO t (cols) VALUES (...), (...)` | add rows | can add many at once |
| `INSERT INTO t (cols) SELECT ...` | copy/transform from another table | very common in ETL |
| `UPDATE t SET col = v WHERE ...` | change existing rows | **always filter with WHERE** |
| `DELETE FROM t WHERE ...` | remove rows | **always filter with WHERE** |
| `TRUNCATE t` | remove all rows instantly | resets tables, can't be rolled back as easily |

### Danger: missing WHERE

```sql
UPDATE customers SET score = 0;   -- updates EVERY row!
DELETE FROM orders;               -- deletes EVERY row!
```

Always write the `WHERE` first, or run a `SELECT` with the same condition first to preview.

### INSERT variations

```sql
-- explicit columns (recommended)
INSERT INTO customers (customerid, firstname, country, score)
VALUES (6, 'Anna', 'USA', NULL);

-- omitted columns get DEFAULT or NULL
INSERT INTO customers (customerid, firstname)
VALUES (7, 'Sam');

-- copy from another table
INSERT INTO backup_customers (customerid, firstname, country, score)
SELECT customerid, firstname, country, score FROM customers;
```

---

## Worked example — preview, then update

```sql
-- 1) preview what you're about to change
SELECT customerid, score FROM sales.customers WHERE customerid = 5;

-- 2) update
UPDATE sales.customers
SET score = 0
WHERE customerid = 5;

-- 3) add a brand new customer
INSERT INTO sales.customers (customerid, firstname, lastname, country, score)
VALUES (6, 'Lena', 'Weber', 'Germany', 620);
```

## Exercises

1. Insert yourself (or a fictional person) as new customer `7`, leaving `score` `NULL`. Then `SELECT` the row to confirm.

2. Insert **three** products in a single `INSERT ... VALUES` statement into `sales.products` (`productid` 106–108, any names/prices).

3. Update the `score` of the customer you inserted in exercise 1 to `428`, **only** that row. What would have happened if you'd forgotten the `WHERE`?

4. Use `INSERT INTO ... SELECT` to copy all `sales.orders` rows into a new table `sales.orders_backup` (create it first with the same columns). Verify the row counts match.

5. Delete the backup rows where `orderdate < '2025-02-01'`, then `TRUNCATE sales.orders_backup`. What's the practical difference you observe between `DELETE` and `TRUNCATE`?

6. **Danger check:** write a `UPDATE` that sets `shipaddress = 'Unknown'` for every order whose `shipaddress IS NULL`. Preview with a `SELECT` first, then run it — but only after wrapping it in a transaction you can `ROLLBACK` (see lesson 24 for `BEGIN`/`ROLLBACK`):
   ```sql
   BEGIN;
   UPDATE ...;
   SELECT ...;  -- check
   ROLLBACK;    -- undo instead of committing
   ```
