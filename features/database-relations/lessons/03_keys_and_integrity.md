# Lesson 03 — Keys & referential integrity

**Goal:** Understand primary keys, foreign keys, and the rules that keep related data consistent.

---

## Theory

### Primary key (PK)

A **primary key** uniquely identifies each row in a table.

- Must be **unique** and **NOT NULL**.
- One per table; can be a single column or a *composite* (multiple columns).
- Chosen as either a **natural key** (real-world, e.g. an email) or a **surrogate key** (meaningless auto-incrementing `id`).

```sql
CREATE TABLE products (
    productid INT PRIMARY KEY,   -- surrogate key
    ...
);
```

### Foreign key (FK)

A **foreign key** is a column (or columns) whose values must match the primary key of another table. It *implements* a relationship and enforces **referential integrity** — you can't have an order pointing to a non-existent customer.

```sql
CREATE TABLE orders (
    orderid    INT PRIMARY KEY,
    customerid INT,
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);
```

### Referential integrity — what FKs guarantee

If `orders.customerid` is a FK to `customers.customerid`, then:

| Action | Effect enforced by the FK |
|--------|---------------------------|
| Insert an order with `customerid = 999` | ❌ rejected (no such customer) |
| Delete customer `1` who still has orders | depends on `ON DELETE` rule (below) |
| Update customer `1` to `100` | cascades or blocks, per `ON UPDATE` rule |

FK **actions** on delete/update:

| Option | Behaviour on parent delete/update |
|--------|-----------------------------------|
| `CASCADE` | Also delete/update the child rows |
| `SET NULL` | Set child FK to `NULL` |
| `RESTRICT`/`NO ACTION` | Block the delete/update (default) |
| `SET DEFAULT` | Set child FK to a default value |

### Composite keys

When no single column is unique, combine columns: a `enrollments` table might use `(studentid, courseid)` as its composite PK.

### Why `salesdb`'s Postgres schema has *no* FKs

Open `init-postgres-salesdb.sql` — tables are created but **no `FOREIGN KEY` constraints** are declared (only MySQL's version includes them). Data still *looks* related because the IDs happen to line up, but the database won't *enforce* it. Adding FKs is your lesson-05 exercise.

---

## Worked example — find orphan rows

Without FKs, "orphan" rows are possible. Check if every `orders.customerid` exists in `customers`:

```sql
SELECT DISTINCT o.customerid
FROM sales.orders o
LEFT JOIN sales.customers c ON o.customerid = c.customerid
WHERE c.customerid IS NULL;
```

(Empty result = no orphans. You'll learn `LEFT JOIN`/`IS NULL` properly in lesson 10.)

## Exercises

1. Which columns are the **primary keys** of each of the 5 tables? Which table has a **composite**-key candidate?

2. List every **foreign-key relationship** that *should* exist in `salesdb` (table.column → table.column). There are four; hint: three go into `orders`, one is a self-reference on `employees`.

3. For the relationship `orders.salespersonid → employees.employeeid`, what should the `ON DELETE` rule be if a salesperson leaves but we must keep their sales history? (`SET NULL`, `CASCADE`, or `RESTRICT`?) Explain your choice.

4. **Surrogate vs natural:** customer `firstname` alone can't be a PK. Why not? Give an example of a *natural* key that would work, and one reason a *surrogate* `customerid` is usually better.

5. Write a query (using `LEFT JOIN` + `IS NULL`, as in the worked example) to check whether every `orders.salespersonid` has a matching `employees.employeeid`. What do you find?
