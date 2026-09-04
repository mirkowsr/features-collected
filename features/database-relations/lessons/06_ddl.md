# Lesson 06 — DDL: CREATE / ALTER / DROP, types & constraints

**Goal:** Define database structure — create, alter, and drop tables; understand PostgreSQL data types and constraints.

---

## Theory

### Data types (the common ones)

| Category | Types | Example |
|----------|-------|---------|
| Integer | `SMALLINT`, `INT`, `BIGINT` | `INT` |
| Serial (auto-increment) | `SMALLSERIAL`, `SERIAL`, `BIGSERIAL` | `SERIAL` |
| Decimal | `NUMERIC(p,s)`, `REAL`, `DOUBLE PRECISION` | `NUMERIC(10,2)` |
| Text | `VARCHAR(n)`, `TEXT`, `CHAR(n)` | `VARCHAR(50)` |
| Date/Time | `DATE`, `TIME`, `TIMESTAMP`, `TIMESTAMPTZ`, `INTERVAL` | `TIMESTAMP` |
| Boolean | `BOOLEAN` | `TRUE` |
| Other | `UUID`, `JSONB`, arrays `INT[]`, `ENUM` | `JSONB` |

> `SERIAL` is syntactic sugar for an `INT` + a sequence + a default. Modern Postgres prefers `GENERATED ... AS IDENTITY`.

### Constraints

| Constraint | Enforces |
|-----------|----------|
| `PRIMARY KEY` | unique + not null |
| `FOREIGN KEY` | referential integrity |
| `UNIQUE` | no duplicate values (allows NULL) |
| `NOT NULL` | value required |
| `CHECK` | arbitrary condition (e.g. `price >= 0`) |
| `DEFAULT` | fills value when omitted |

### Command forms

```sql
CREATE TABLE [IF NOT EXISTS] name ( column type [constraints], ... );

ALTER TABLE name ADD COLUMN ... | DROP COLUMN ... | ALTER COLUMN ... | ADD CONSTRAINT ...;

DROP TABLE [IF EXISTS] name [CASCADE];
```

---

## Worked example — create & alter a table

```sql
CREATE TABLE sales.audit_log (
    id        SERIAL PRIMARY KEY,
    event     VARCHAR(100) NOT NULL,
    amount    NUMERIC(10,2) DEFAULT 0,
    happened  TIMESTAMPTZ DEFAULT now(),
    CHECK (amount >= 0)
);

ALTER TABLE sales.audit_log ADD COLUMN note TEXT;
ALTER TABLE sales.audit_log ALTER COLUMN note SET DEFAULT 'n/a';
ALTER TABLE sales.audit_log DROP COLUMN note;

DROP TABLE sales.audit_log;
```

## Exercises

1. Write `CREATE TABLE` for a `sales.categories` table with: an auto-increment `id`, a `name` (required, up to 50 chars), and a `description` (`TEXT`, optional). Make `name` unique.

2. Add a `CHECK` constraint to `sales.products` ensuring `price >= 0`. Then test it by attempting to insert a product with price `-5` (should fail).

3. Alter `sales.customers` to add a `created_at TIMESTAMPTZ` column with a default of `now()`. Confirm existing rows get the default.

4. What's the difference between `CHAR(5)`, `VARCHAR(5)`, and `TEXT` in terms of storage and trailing spaces? Which should you default to, and why?

5. `SERIAL` vs `GENERATED ALWAYS AS IDENTITY` — write the equivalent `CREATE TABLE` using the identity syntax for a `sales.tags` table with a generated PK. Why does modern Postgres prefer the identity syntax?

6. Use `information_schema.columns` to list all columns of `sales.products` and confirm which are `NOT NULL`.
