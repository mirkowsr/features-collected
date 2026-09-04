# Lesson 09 — Filtering with WHERE

**Goal:** Select only the rows you want using comparison, logical, range, list, and pattern filters.

---

## Theory

### Operators

| Type | Operators | Example |
|------|-----------|---------|
| Comparison | `=` `!=`/`<>` `>` `<` `>=` `<=` | `price >= 20` |
| Logical | `AND` `OR` `NOT` | `country='USA' AND score>500` |
| Range | `BETWEEN x AND y` (inclusive) | `sales BETWEEN 10 AND 50` |
| List | `IN (...)` | `category IN ('Clothing','Sports')` |
| Pattern | `LIKE` / `ILIKE` | `firstname LIKE 'M%'` |
| NULL | `IS NULL` / `IS NOT NULL` | `score IS NULL` |

### Pattern matching (`LIKE` vs `ILIKE`)

- `%` = any number of characters (including none).
- `_` = exactly one character.
- `LIKE` is case-sensitive in Postgres; **`ILIKE` is case-insensitive**.

```sql
firstname LIKE 'M%'     -- starts with M (case-sensitive)
firstname ILIKE 'm%'    -- starts with m/M (insensitive)
country LIKE 'U_A'      -- three letters, ends in A
```

### Operator precedence

`AND` binds tighter than `OR`. Use parentheses to be explicit:

```sql
WHERE (country = 'USA' OR country = 'Germany') AND score > 400
```

### NULL is special

`NULL` is "unknown", so `score = NULL` is **never true** — use `score IS NULL`.

---

## Worked examples

```sql
-- customers from Germany with a score
SELECT * FROM sales.customers
WHERE country = 'Germany' AND score IS NOT NULL;

-- orders with sales between 20 and 60
SELECT orderid, sales FROM sales.orders
WHERE sales BETWEEN 20 AND 60;

-- products in a list
SELECT * FROM sales.products
WHERE category IN ('Clothing', 'Accessories');

-- names starting with M (case-insensitive)
SELECT firstname FROM sales.customers WHERE firstname ILIKE 'm%';
```

## Exercises

1. Return all customers whose `score` is greater than `500` and whose country is `'USA'`.

2. Return products with `price` **between** `15` and `25` (inclusive), sorted by price descending.

3. Return orders whose `orderstatus` is `'Delivered'` **or** whose `sales` is greater than `50`.

4. Return customers whose `lastname` is `NULL`. (Then check: does `lastname = NULL` also work? Explain why not.)

5. Use `LIKE`/`ILIKE` to find all customers whose `firstname` ends in `'in'` (e.g. "Kevin", "Martin" — but there's also "Jossef", "Mary"... test both cases). How do `LIKE '%in'` and `ILIKE '%in'` differ?

6. Find orders where `quantity = 0` OR `shipaddress IS NULL`. Interpret the business meaning of the result.

7. **Precedence trap:** predict the difference between these two, then run both:
   ```sql
   SELECT country, score FROM sales.customers
   WHERE country = 'USA' OR country = 'Germany' AND score > 400;

   SELECT country, score FROM sales.customers
   WHERE (country = 'USA' OR country = 'Germany') AND score > 400;
   ```
   Why does the first one behave unintuitively?
