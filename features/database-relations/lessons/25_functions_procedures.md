# Lesson 25 — Stored procedures & functions (PL/pgSQL)

**Goal:** Write reusable server-side logic — functions that return values, and procedures that perform actions.

---

## Theory

### Function vs procedure

| | Function | Procedure |
|--|----------|-----------|
| Returns a value? | always (even `VOID`) | no |
| Call | inside `SELECT`/`WHERE` | `CALL name(...)` |
| Can it run transactions? | limited (can't `COMMIT` inside) | can manage transactions |
| Use | computations, data derivation | batch jobs, side effects |

Postgres supports multiple languages; **PL/pgSQL** is the default (adds variables, loops, conditionals; note it's *not* the `sql` language which is pure SQL).

### Function syntax

```sql
CREATE [OR REPLACE] FUNCTION name(args types) RETURNS type
LANGUAGE plpgsql [IMMUTABLE|STABLE|VOLATILE] AS $$
DECLARE
    v ...;
BEGIN
    ...
    RETURN expr;
END;
$$;
```

- `$$ ... $$` is a dollar-quoted string (avoids escaping quotes).
- `IMMUTABLE` → same args always same result (can be used in index expressions).

### Procedure syntax

```sql
CREATE OR REPLACE PROCEDURE name(args)
LANGUAGE plpgsql AS $$
BEGIN
    ...
END;
$$;
```

### Control flow (PL/pgSQL)

```sql
IF x > 0 THEN ... ELSIF ... ELSE ... END IF;
FOR i IN 1..10 LOOP ... END LOOP;
FOR rec IN SELECT ... LOOP ... END LOOP;
RETURN QUERY SELECT ...;   -- return a whole result set
```

---

## Worked examples

```sql
-- function: customer's full name
CREATE OR REPLACE FUNCTION sales.full_name(p_id INT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_first TEXT; v_last TEXT;
BEGIN
    SELECT firstname, lastname INTO v_first, v_last
    FROM sales.customers WHERE customerid = p_id;
    RETURN v_first || ' ' || COALESCE(v_last, '');
END;
$$;

SELECT sales.full_name(2);   -- Kevin Brown

-- function: return a result set of a customer's orders
CREATE OR REPLACE FUNCTION sales.customer_revenue(p_id INT)
RETURNS TABLE(customerid INT, total NUMERIC) LANGUAGE sql AS $$
    SELECT customerid, SUM(sales) FROM sales.orders WHERE customerid = p_id GROUP BY customerid;
$$;

SELECT * FROM sales.customer_revenue(2);
```

## Exercises

1. Write a function `sales.customer_country(p_id INT) RETURNS TEXT` returning the customer's `country`. Call it for customer 1.

2. Write a function `sales.total_sales_for_status(p_status TEXT) RETURNS NUMERIC` that sums `sales` for a given `orderstatus`. Call it for `'Delivered'`.

3. Write a function that returns a **table** of all orders for a given customer (`RETURNS TABLE(...)`). Call `SELECT * FROM ...`.

4. Write a **procedure** that logs a message (e.g. inserts into a small `sales.proc_log` table, or uses `RAISE NOTICE`). Call it with `CALL`.

5. Add control flow: write a function `sales.score_band(p_id INT) RETURNS TEXT` using `IF/ELSIF` to return 'High'/'Medium'/'Low'/'Unknown' based on score.

6. `IMMUTABLE` vs `STABLE` vs `VOLATILE`: explain the meaning of each and why marking a function that reads `sales.orders` as `IMMUTABLE` would be wrong.
