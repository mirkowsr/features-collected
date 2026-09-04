# Lesson 01 — What is a database? The relational model

**Goal:** Understand databases, tables, the *relational model*, and why we use SQL.

---

## Theory

### Why not just Excel/CSV?

A CSV is a flat file with one table. Real systems need many related tables, accessed by many users at once, with guarantees about correctness. That's what a **DBMS** provides:

| Capability | What it means |
|-----------|---------------|
| Storage & retrieval | Efficiently store large amounts of data and find it fast. |
| Concurrency | Many users read/write at the same time safely. |
| Integrity | Rules (keys, constraints) prevent invalid data. |
| Durability | Data survives crashes (transactions, WAL). |
| Security | Permissions control who can do what. |
| Query language | A universal way to ask questions: **SQL**. |

### The relational model (Edgar Codd, 1970)

Data is stored in **relations** (we call them **tables**):

- Each **table** = a set of **rows** (records / tuples) and **columns** (fields / attributes).
- Each **row** represents one *thing*: a customer, an order, a product.
- Each **column** holds one *attribute* of that thing, with a declared **data type**.
- Relationships between tables are expressed by **shared keys** (lesson 03).

```
         customers
┌────────────┬──────────┬─────────┬────────┐
│ customerid │ firstname│ country │ score  │  ← columns (attributes)
├────────────┼──────────┼─────────┼────────┤
│     1      │  Jossef  │ Germany │  350   │  ← row (one customer)
│     2      │  Kevin   │  USA    │  900   │
└────────────┴──────────┴─────────┴────────┘
```

### SQL — "Structured Query Language"

SQL is the standard language for relational databases, split into sub-languages:

| Sub-language | Commands | Purpose |
|-------------|----------|---------|
| **DDL** | `CREATE`, `ALTER`, `DROP` | Define the *structure* (tables, types, constraints) |
| **DML** | `INSERT`, `UPDATE`, `DELETE` | Change the *data* |
| **DQL** | `SELECT` | *Query* (read) the data |
| **DCL** | `GRANT`, `REVOKE` | Control access |
| **TCL** | `COMMIT`, `ROLLBACK` | Manage transactions |

> We'll cover DQL the most, DDL/DML next, and DCL/TCL in the engineering part.

### PostgreSQL vs others

PostgreSQL is one dialect of SQL. Other RDBMSs: MySQL, SQL Server, Oracle, SQLite. ~90% of SQL is identical across them; the 10% is function names and syntax sugar. We target PostgreSQL here.

---

## Worked example — exploring a table

```sql
-- What columns does sales.orders have, and what type is each?
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'sales' AND table_name = 'orders'
ORDER BY ordinal_position;
```

## Exercises

1. Using the query above as a template, list the columns (and their types) of `sales.employees`. Which columns are numeric? Which are dates?

2. *Data types review* — look at the `sales.orders` columns. Why do you think `quantity` and `sales` are `INT` while `orderstatus` is `VARCHAR(50)`? What's the difference between storing a number as `INT` vs `VARCHAR`?

3. Classify each statement as DDL, DML, DQL, DCL, or TCL:
   - `CREATE TABLE ...`
   - `SELECT * FROM ...`
   - `INSERT INTO ...`
   - `COMMIT`
   - `GRANT SELECT ON ... TO ...`

4. In your own words: what problem does a DBMS solve that a plain CSV cannot? Give two concrete examples.
