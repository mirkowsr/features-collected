# Lesson 24 — Transactions & ACID

**Goal:** Understand transactions, the ACID guarantees, isolation levels, and locking.

---

## Theory

A **transaction** is a group of SQL statements that succeed or fail **as a unit** — all-or-nothing.

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;    -- make both permanent
-- or
ROLLBACK;  -- undo both
```

### ACID

| Letter | Property | Meaning |
|--------|----------|---------|
| **A**tomicity | all or nothing | a transaction can't be partially applied |
| **C**onsistency | valid → valid | constraints keep the DB in a legal state |
| **I**solation | concurrent txs don't interfere | each sees a consistent snapshot |
| **D**urability | committed = permanent | survives crashes (WAL) |

### Isolation levels (Postgres + SQL standard)

| Level | Prevents | Notes |
|-------|----------|-------|
| `READ UNCOMMITTED` | (almost nothing) | PG treats as Read Committed |
| `READ COMMITTED` (PG **default**) | dirty reads | sees only committed changes |
| `REPEATABLE READ` | + non-repeatable reads | snapshot per tx |
| `SERIALIZABLE` | + phantom reads | strictest, can cause aborts |

Set with: `BEGIN ISOLATION LEVEL SERIALIZABLE;` or `SET TRANSACTION ISOLATION LEVEL ...`.

### The anomalies (why isolation matters)

- **Dirty read** — reading uncommitted data.
- **Non-repeatable read** — same query returns different data mid-transaction.
- **Phantom read** — new rows appear mid-transaction.
- **Lost update** — two txs overwrite the same change.

### Locking

Postgres uses **MVCC** (Multi-Version Concurrency Control) — readers don't block writers and vice-versa, via row versions + snapshots. Explicit locks exist too: `SELECT ... FOR UPDATE` locks rows for later updates.

---

## Worked example — transfer with rollback

```sql
BEGIN;
  UPDATE sales.customers SET score = 999 WHERE customerid = 1;
  -- oops, wrong! undo:
ROLLBACK;
-- score unchanged

BEGIN;
  UPDATE sales.customers SET score = 400 WHERE customerid = 1;
COMMIT;
```

## Exercises

1. Wrap an `UPDATE` in a transaction, check the result with a `SELECT`, then `ROLLBACK`. Confirm the change was undone.

2. Wrap an `INSERT` in a transaction and `COMMIT` it. Confirm it persists (and clean it up afterward if it's test data).

3. Explain the difference between `COMMIT` and `ROLLBACK`, and why a bank transfer *must* be atomic.

4. In `psql` (or two connections), start two transactions. In one, `UPDATE` a row but **don't commit**. In the other, `SELECT` that row — do you see the change? (This demonstrates `READ COMMITTED` MVCC.) Then commit and re-check.

5. What isolation level gives the `SELECT ... FOR UPDATE` pattern meaning for avoiding **lost updates**? Write a `SELECT ... FOR UPDATE` example and explain what it locks.

6. Match each anomaly (dirty read, non-repeatable read, phantom read, lost update) to its description, and state which isolation level first prevents each.
