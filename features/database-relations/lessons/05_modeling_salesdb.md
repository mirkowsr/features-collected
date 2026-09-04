# Lesson 05 — Modeling `salesdb` (your own ER diagram + real FKs)

**Goal:** Apply everything from lessons 01–04 to (a) draw the ER diagram of `salesdb`, and (b) actually *add the missing foreign keys* to the Postgres schema.

---

## Theory

### ER diagram summary

An **Entity-Relationship (ER) diagram** documents entities, attributes, and relationships. Minimal drawing rules:

- **Entity** = a box labeled with the table name.
- **Attribute** = small bubbles/lines; mark the **PK** with a key symbol.
- **Relationship** = a line between boxes, annotated with cardinality (crow's foot).

`salesdb` (crow's foot):

```
 ┌───────────┐          ┌────────────────┐          ┌───────────┐
 │ customers │ 1      N │     orders     │ N      1 │ products  │
 │───────────│══╦──────<│────────────────│>──────═╦══│───────────│
 │◇customerid│          │◇ orderid       │          │◇ productid│
 └───────────┘          │  productid (FK)│          └───────────┘
                        │  customerid(FK)│
 ┌───────────┐          │  salespersonid │
 │ employees │ 1      N │      (FK)      │
 │───────────│══╦──────<│────────────────│
 │◇employeeid│          └────────────────┘
 │  managerid│──◯ (self)
 └───────────┘
```

`◇` = primary key · `1` = one · `N`/crow's foot = many.

### Adding constraints with ALTER

The Postgres init script created tables **without** FKs. You add them afterward:

```sql
ALTER TABLE sales.orders
  ADD CONSTRAINT fk_orders_customer
  FOREIGN KEY (customerid) REFERENCES sales.customers (customerid);
```

### Naming conventions

Postgres doesn't require naming constraints, but it's good practice: `fk_<table>_<column>` for FKs, `pk_<table>` for PKs, `u_<table>_<col>` for uniques.

---

## Worked example — add one FK

```sql
-- link orders.productid → products.productid
ALTER TABLE sales.orders
  ADD CONSTRAINT fk_orders_product
  FOREIGN KEY (productid) REFERENCES sales.products (productid);
```

After adding, an invalid insert is rejected:

```sql
-- should fail: product 999 does not exist
INSERT INTO sales.orders (orderid, productid, quantity, sales)
VALUES (9999, 999, 1, 10);
-- ERROR:  insert or update on table "orders" violates foreign key constraint
```

## Exercises

1. Draw the full ER diagram for `salesdb` (all 5 tables, all 4 relationships, PKs marked, cardinalities correct). Include the self-reference on `employees`.

2. Write the four `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` statements to restore referential integrity in `salesdb`:
   - `orders.productid → products.productid`
   - `orders.customerid → customers.customerid`
   - `orders.salespersonid → employees.employeeid`
   - `employees.managerid → employees.employeeid`

   Run them, then pick an `ON DELETE` rule for each and explain your reasoning.

3. **Verify enforcement:** after adding the FKs, run the "orphan check" queries from lesson 03 again. Then try inserting an order with `customerid = 50`. What happens, and why?

4. `ordersarchive` deliberately has **no** FK constraints and even contains duplicate `orderid`s. Why would an archive table be designed that way? (Think: what is an archive's purpose, and what do FKs cost?)

5. **Design critique:** the `orders` table mixes `customerid` and `salespersonid`. Could a single order legitimately involve a customer whose `salespersonid` just left the company? Which `ON DELETE` choice on `orders.salespersonid` best handles that, and what does it set the value to?

6. **Schema tooling:** list three ways (GUI, `psql \d`, querying `information_schema`/`pg_catalog`) to *see* the FK constraints you just added, and run at least one.
