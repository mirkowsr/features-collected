# Lesson 12 — Functions (string / numeric / date-time)

**Goal:** Transform values with built-in scalar functions.

---

## Theory

### String functions

| Function | Action | Example → result |
|----------|--------|------------------|
| `length(s)` | char count | `length('abc')` → 3 |
| `upper(s)` / `lower(s)` | case | `upper('a')` → `A` |
| `trim(s)` / `ltrim` / `rtrim` | strip whitespace | `trim(' x ')` → `x` |
| `concat(a,b,...)` | join, NULL-safe | `concat('a', null, 'b')` → `ab` |
| `\|\|` | concatenate (NULL-propagates) | `'a' \|\| 'b'` → `ab` |
| `substring(s, start, len)` | extract | `substring('hello',2,3)` → `ell` |
| `replace(s, from, to)` | replace | `replace('a-b','-','')` → `ab` |
| `left(s,n)` / `right(s,n)` | n chars | `left('hello',2)` → `he` |
| `position(x IN s)` | find | `position('l' in 'hello')` → 3 |
| `split_part(s, d, n)` | split on delim | `split_part('a,b,c',',',2)` → `b` |
| `initcap(s)` | Title Case | `initcap('john doe')` → `John Doe` |

### Numeric functions

| Function | Action |
|----------|--------|
| `round(x, n)` | round to n decimals |
| `ceil(x)` / `floor(x)` | round up / down |
| `abs(x)` | absolute value |
| `pow(x,y)` / `power` | power |
| `sqrt(x)` | square root |
| `mod(x,y)` | remainder |
| `greatest(...)` / `least(...)` | max/min of args |

### Date/time functions

| Expression | Result |
|-----------|--------|
| `now()` / `CURRENT_TIMESTAMP` | current timestamp |
| `CURRENT_DATE` | today |
| `age(d1, d2)` | interval between |
| `EXTRACT(field FROM d)` | pull part (`year`, `month`, `day`, `dow`, ...) |
| `DATE_TRUNC('month', d)` | truncate to month start |
| `d + INTERVAL '1 day'` | arithmetic |
| `to_char(d, 'YYYY-MM-DD')` | format as text |

```sql
SELECT
  upper(firstname)                    AS up,
  concat(firstname, ' ', lastname)    AS full_name,
  length(lastname)                    AS len
FROM sales.customers;

SELECT
  orderid,
  orderdate,
  DATE_TRUNC('month', orderdate) AS month,
  EXTRACT(year FROM orderdate)   AS yr,
  EXTRACT(dow  FROM orderdate)   AS day_of_week  -- 0=Sun
FROM sales.orders;

SELECT round(price * 1.19, 2) AS vat_price FROM sales.products;
```

---

## Worked example

```sql
-- first initial + last name, uppercase
SELECT upper(concat(left(firstname,1), '. ', lastname)) AS display
FROM sales.customers
WHERE lastname IS NOT NULL;
```

## Exercises

1. Return each customer's `firstname` in uppercase and their `lastname` reversed (`reverse()`).

2. Build a `full_name` for every customer using `concat(firstname, ' ', lastname)`. What's different when `lastname IS NULL` compared to using `||`?

3. For each order, return `orderid`, `orderdate`, and a `month` column (use `DATE_TRUNC`) and a `year` column (use `EXTRACT`).

4. Compute the "VAT" (20% tax) price of each product as `round(price * 1.20, 2)`, aliased `vat_price`, then also `floor(price*1.20)` aliased `vat_floor`. When would you choose `floor`?

5. Use `split_part` on `shipaddress` (e.g. `'9833 Mt. Dias Blv.'`) to extract the street number, or on any comma-separated string you create.

6. How many days between each order's `orderdate` and its `shipdate`? (`shipdate - orderdate` returns an `INTERVAL`; cast to days or use `age`.) Which order took the longest to ship?
