# Lesson 08 — SELECT basics

**Goal:** Retrieve and shape data: columns, aliases, `DISTINCT`, `LIMIT`, ordering, and static values.

---

## Theory

```sql
SELECT [DISTINCT] <columns/expressions>   -- what to return
FROM   <table>                           -- where to read from
[WHERE  <filter>]                        -- which rows
[ORDER BY <col> [ASC|DESC], ...]         -- sort
[LIMIT  n [OFFSET m]];                   -- cap / paginate
```

Key concepts:

- `*` selects all columns; prefer listing only what you need.
- **Aliases** rename columns/tables: `col AS alias` (or `col alias`). Use `AS` for clarity.
- `DISTINCT` removes duplicate rows from the result.
- `LIMIT` caps rows (PostgreSQL; SQL Server uses `TOP`, MySQL uses `LIMIT` too).
- `ORDER BY` sorts; default `ASC` (ascending). Can sort by multiple columns.
- You can select **constants** and **computed expressions** (no table needed).

---

## Worked examples

```sql
-- all columns
SELECT * FROM sales.customers;

-- specific columns + alias
SELECT firstname AS name, country, score FROM sales.customers;

-- distinct countries
SELECT DISTINCT country FROM sales.customers;

-- top 3 by score
SELECT * FROM sales.customers ORDER BY score DESC LIMIT 3;

-- constant + computed
SELECT 123 AS x, 5 * 7 AS answer;
```

Result of the `DISTINCT` query → `Germany`, `USA`.

## Exercises

1. Return `customerid`, `firstname`, and `country` from `sales.customers`, aliasing `customerid` to `id` and `firstname` to `name`. Sort by `customerid`.

2. Write a query returning only the `product` and `category` columns from `sales.products`, sorted by `price` descending.

3. How many **distinct** `country` values exist in `sales.customers`? (Use `DISTINCT`.)

4. Return the **3 most recent** orders from `sales.orders`, showing `orderid`, `orderdate`, and `sales`, ordered by `orderdate` descending.

5. Use `LIMIT` + `OFFSET` to return orders in "pages" of 4: first page (`OFFSET 0`), second page (`OFFSET 4`).

6. Compute and select a constant expression — e.g. the string `'SalesDB'` aliased as `db_name` and `1000 * 1.2` as `target` — without touching any table.

7. What does `SELECT DISTINCT orderstatus FROM sales.orders;` return, and why is it useful for building a filter dropdown?
