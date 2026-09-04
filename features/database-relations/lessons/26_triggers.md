# Lesson 26 — Triggers

**Goal:** Run logic automatically when data changes (INSERT/UPDATE/DELETE) — for auditing, validation, and derived data.

---

## Theory

A **trigger** fires a function before/after an event on a table.

```sql
CREATE [OR REPLACE] TRIGGER name
  {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE}
  ON table
  [FOR EACH ROW | FOR EACH STATEMENT]
  EXECUTE FUNCTION trigger_function_name();
```

### Key pieces

1. **Trigger function** — a PL/pgSQL function returning type `TRIGGER`. In `FOR EACH ROW` triggers it has access to:
   - `NEW` — the new row (INSERT/UPDATE).
   - `OLD` — the old row (UPDATE/DELETE).
   - Returns `NEW` (row triggers) or `NULL` (to skip the row).

2. **Timing**: `BEFORE` (validate/modify before write) or `AFTER` (log/audit after).

3. **Granularity**: `FOR EACH ROW` (per row) vs `FOR EACH STATEMENT` (once per statement).

### Common uses

- **Audit logs** — record who changed what and when.
- **Validation** — enforce rules beyond constraints (raise an exception to reject).
- **Derived/denormalized data** — keep a totals table in sync.
- **Soft deletes**.

### Syntax of a trigger function

```sql
CREATE OR REPLACE FUNCTION func() RETURNS TRIGGER AS $$
BEGIN
    ...
    RETURN NEW;   -- (or OLD, or NULL)
END;
$$ LANGUAGE plpgsql;
```

---

## Worked example — audit log

```sql
CREATE TABLE sales.audit_log (
    id        SERIAL PRIMARY KEY,
    orderid   INT,
    action    TEXT,
    changed_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION sales.audit_orders()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO sales.audit_log (orderid, action) VALUES (NEW.orderid, 'INSERT');
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO sales.audit_log (orderid, action) VALUES (NEW.orderid, 'UPDATE');
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO sales.audit_log (orderid, action) VALUES (OLD.orderid, 'DELETE');
        RETURN OLD;
    END IF;
END;
$$;

CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON sales.orders
FOR EACH ROW EXECUTE FUNCTION sales.audit_orders();
```

`TG_OP` holds `'INSERT'`/`'UPDATE'`/`'DELETE'`.

## Exercises

1. Create an audit table + `AFTER INSERT` trigger that logs every new order's `orderid`. Then insert a test order and verify the log. (Clean up the test row.)

2. Add `UPDATE` and `DELETE` handling to the trigger function using `TG_OP`. Test all three actions.

3. Create a `BEFORE INSERT` trigger that rejects (raises an exception) orders with `sales < 0`. Compare to a `CHECK` constraint — when is a trigger the right tool?

4. Use `NEW` to auto-fill a column: a `BEFORE INSERT OR UPDATE` trigger that sets `shipaddress = 'Unspecified'` when `shipaddress IS NULL`.

5. Explain the difference between `FOR EACH ROW` and `FOR EACH STATEMENT`, and when each is appropriate (auditing every change vs. one bulk signal).

6. Inspect your triggers via `information_schema.triggers` (or `pg_trigger`). List them, then drop one with `DROP TRIGGER`.
