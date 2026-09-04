# Lesson 13 — Handling NULLs

**Goal:** Understand `NULL` semantics and handle missing values with `COALESCE`, `NULLIF`, and filtering.

---

## Theory

### `NULL` means "unknown / missing"

- Any comparison with `NULL` yields `NULL` (not true/false): `NULL = 5` → `NULL`.
- To test: `col IS NULL` / `col IS NOT NULL`.
- Aggregates **ignore** NULLs (`SUM`, `AVG`, ...), but `COUNT(*)` counts rows while `COUNT(col)` counts non-NULL values.

### Functions

| Function | Behaviour |
|----------|-----------|
| `COALESCE(a,b,...)` | first non-NULL argument |
| `NULLIF(a,b)` | returns NULL if `a = b`, else `a` (often for division-by-zero) |

### NULL vs empty string vs blank spaces

These are different in Postgres:
- `NULL` — no value.
- `''` — empty string (a real value).
- `'   '` — string of spaces.

`orders.billaddress` contains all three (`NULL`, `''`, and real addresses). Be precise about which you mean.

---

## Worked examples

```sql
-- replace NULL score with 0
SELECT customerid, COALESCE(score, 0) AS score
FROM sales.customers;

-- avoid division by zero: 100 / 0 -> NULL
SELECT sales, NULLIF(quantity, 0) AS qty,
       sales / NULLIF(quantity, 0) AS unit_price
FROM sales.orders;

-- differentiate NULL vs empty vs blank
SELECT orderid,
       billaddress,
       billaddress IS NULL     AS is_null,
       billaddress = ''        AS is_empty,
       length(billaddress)     AS len
FROM sales.orders;
```

## Exercises

1. Replace every `NULL` `score` in `sales.customers` with `0` using `COALESCE`. Then compute the average score with and without the replacement — explain the difference.

2. Why does the raw `AVG(score)` (before COALESCE) **not** treat the NULL as 0? How many rows does `COUNT(score)` vs `COUNT(*)` report on `customers`?

3. Use `NULLIF(quantity, 0)` in a division to compute `sales / quantity` (unit price) per order. Which order(s) produce `NULL`, and why?

4. Identify orders whose `billaddress` is an **empty string** (`= ''`) vs `NULL` vs a blank string. List their `orderid`s grouped by category hint (`CASE`, lesson 14, or three separate queries).

5. `COALESCE(shipaddress, 'No address')` — write the query and count how many orders show "No address".

6. **Aggregate trap:** what's the difference between `COUNT(*)`, `COUNT(score)`, and `COUNT(DISTINCT country)` on `customers`? Run all three and explain each number.
