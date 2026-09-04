# Lesson 02 — Entities, attributes & relationships

**Goal:** Learn to identify *entities* and *attributes* and to express *relationships* between entities — the first step of data modeling.

---

## Theory

### Entities & attributes

- **Entity** — a real-world thing we want to store data about (a *customer*, an *order*, a *product*). One entity → (usually) one table.
- **Attribute** — a property of that entity (a customer's `firstname`, an order's `orderdate`). One attribute → one column.

### Relationships — how entities are connected

A relationship describes how many instances of one entity relate to instances of another. In a relational DB, a relationship is implemented with a **foreign key** (lesson 03).

| Type | Meaning | Example |
|------|---------|---------|
| **One-to-one (1:1)** | One A ↔ one B | person ↔ passport (simplified) |
| **One-to-many (1:N)** | One A ↔ many B | customer ↔ orders (one customer places many orders) |
| **Many-to-many (M:N)** | Many A ↔ many B | students ↔ courses (needs a join table) |

### Reading `salesdb` as relationships

```
customers (1) ────< (N) orders        one customer has many orders
products  (1) ────< (N) orders        one product appears in many orders
employees (1) ────< (N) orders        one salesperson sells many orders
employees (1) ────< (N) employees     one manager manages many employees (self-reference)
```

Note the **self-referencing** relationship: `orders` has `salespersonid` pointing back to `employees`, and `employees` has `managerid` pointing to `employees` itself. One table can participate in multiple relationships.

### Cardinality notation (crow's foot)

```
 customer ══╦══< order     :  "one-to-many" (the < crow's foot = "many")
```

- `|` (single tick) = "one"
- `> / <` (crow's foot) = "many"
- `O` (circle) = "zero or one" (optional)

---

## Worked example — spot the many-to-many

Is `orders` a many-to-many between customers and products? No — each *order line* is a single customer + single product. Because `orders` sits in the middle and holds both FKs, the customer↔product relationship is effectively broken into two 1:N relationships. In a true M:N you'd need a separate *join table* (e.g. `enrollments(studentid, courseid)`).

---

## Exercises

1. For each pair, state the relationship type (1:1, 1:N, M:N):
   - customer ↔ order
   - product ↔ order
   - employee ↔ order (as salesperson)
   - employee ↔ employee (as manager)
   - customer ↔ product

2. Is the customer↔product relationship directly editable, or is it implied through `orders`? Which table is the "bridge"?

3. **Design (no SQL needed):** Imagine you add an `orders.orderid` that can have multiple physical shipments (a single order split into two boxes). What new entity would you introduce, and what relationship would it have to `orders`?

4. **Drawing:** Sketch a small ER diagram for `salesdb` using crow's-foot notation, showing the four tables and the relationship lines between them. (You'll formalize this fully in lesson 05.)

5. **Predict:** If you `SELECT customerid, count(*) FROM sales.orders GROUP BY customerid;`, which customer has the most orders? Which `customerid` values never appear in `orders`?
