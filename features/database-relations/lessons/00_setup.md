# Lesson 00 — Setup

**Goal:** Get PostgreSQL running, load the `salesdb` dataset, and connect from your editor.

---

## Theory

### What you are installing

| Term | What it is |
|------|------------|
| **PostgreSQL ("Postgres")** | An open-source *relational database management system (RDBMS)*. It is the **server** that stores your data and answers SQL queries. |
| **`psql`** | The command-line client that talks to Postgres. |
| **GUI client** | A nicer window (VS Code extension, DBeaver, DataGrip) that talks to Postgres for you. |

Your editor never talks to the data directly — it always goes through the **server**:

```
  your editor  ──SQL query──▶  PostgreSQL server  ──▶  data files
                              (port 5432)
```

### Databases vs. servers vs. schemas

- A **server** (Postgres) can host many **databases**.
- Each **database** can contain many **schemas** (namespaces to organize tables).
- In this course we use database `salesdb` and schema `sales` → tables are `sales.customers`, etc.

---

## Steps

### 1. Install & start Postgres

```bash
# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16
```

```bash
# Docker
docker run --name pg-sqlcourse \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 -d postgres:16
```

### 2. Load the data

From the repo root (where `datasets/postgres/init-postgres-salesdb.sql` lives):

```bash
psql -U postgres -h localhost -f datasets/postgres/init-postgres-salesdb.sql
```

The script:
1. Drops + recreates the `salesdb` database.
2. Creates the `sales` schema.
3. Creates 5 tables and loads the rows.

### 3. Connect from your editor

Use any client; connect to:
- **Host:** `localhost` · **Port:** `5432`
- **Database:** `salesdb` · **User:** `postgres` · **Password:** `postgres` (Docker) or whatever you set.

### 4. Sanity check

```sql
SELECT * FROM sales.customers;
```

```
 customerid | firstname | lastname  | country | score
------------+-----------+-----------+---------+-------
          1 | Jossef    | Goldberg  | Germany |   350
          2 | Kevin     | Brown     | USA     |   900
          3 | Mary      |           | USA     |   750
          4 | Mark      | Schwarz   | Germany |   500
          5 | Anna      | Adams     | USA     |
```

If you see 5 rows, you're ready. 🎉

---

## Exercises

1. List every table you have by querying the catalog:

   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'sales';
   ```

   → Expect 5 tables. Write down their names.

2. Run `SELECT * FROM sales.employees;` and note the `managerid` column — some values are `NULL`. Which employees have a manager?

3. Confirm you can run two statements in one query window. Run these one after another:

   ```sql
   SELECT count(*) AS num_orders FROM sales.orders;
   SELECT count(*) AS num_archive FROM sales.ordersarchive;
   ```

   → What do the two counts tell you about the archive table?

4. **Predict before you run:** without executing, guess how many rows `sales.products` has if there are 5 `Products.csv` entries. Then verify with `SELECT count(*) FROM sales.products;`.
