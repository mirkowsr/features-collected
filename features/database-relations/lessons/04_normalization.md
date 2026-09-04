# Lesson 04 — Normalization & denormalization

**Goal:** Learn to design tables that avoid redundancy and anomalies ("normal forms"), and when to deliberately break those rules.

---

## Theory

### The problem: redundancy & anomalies

Consider storing customer info *inside* the orders table:

| orderid | customer_name | customer_country | sales |
|---------|---------------|------------------|-------|
| 1 | Kevin Brown | USA | 10 |
| 2 | Kevin Brown | USA | 15 |

Problems:
- **Update anomaly** — Kevin moves to Canada: you must update *every* row or data becomes inconsistent.
- **Insert anomaly** — can't record a new customer until they place an order.
- **Delete anomaly** — deleting Kevin's only order deletes the fact he exists.

**Normalization** restructures tables to eliminate these.

### The normal forms (simplified)

| Form | Rule | Meaning |
|------|------|---------|
| **1NF** | Atomic values | Each cell holds a single value, no repeating groups / arrays. |
| **2NF** | 1NF + no partial dependency | Non-key columns depend on the *whole* composite key, not part of it. |
| **3NF** | 2NF + no transitive dependency | Non-key columns depend only on the key, nothing else. |

> Memory aid: **"the key, the whole key, and nothing but the key."** (3NF)

### Example in `salesdb`

`sales.orders` stores `customerid` (a key), *not* `customer_name`/`customer_country`. Those live in `sales.customers`. That's 3NF: order attributes depend on the order's key; customer attributes live with the customer.

If `orders` instead stored `customer_country` too, that'd be a **transitive dependency** (`order → customerid → country`) — a 3NF violation, because `country` depends on `customerid`, not directly on `orderid`.

### Denormalization — breaking the rules on purpose

Sometimes you intentionally duplicate data to make **reads faster**, at the cost of update complexity (which normalization was protecting against).

- **OLTP** (transactional, lots of small writes) → highly normalized (3NF+).
- **OLAP / data warehouses** (analytics, bulk reads) → often denormalized (star schemas, pre-aggregated facts).
- Trade-off: you accept update/insert complexity or redundancy in exchange for simpler, faster `SELECT`s.

---

## Worked example — spot the violation

Which of these is a normalization violation, and which form does it break?

```sql
CREATE TABLE orders_bad (
    orderid     INT PRIMARY KEY,
    productid   INT,
    customerid  INT,
    country     VARCHAR(50),   -- duplicated from customers
    sales       INT,
    line_total  INT            -- = sales * quantity, computable
);
```

- `country` duplicates `customers.country` → **transitive dependency → 3NF violation**.
- `line_total` is derivable (`sales * quantity`) → storing computed/redundant data (also problematic for update consistency).

## Exercises

1. Classify each as 1NF, 2NF, or 3NF violation (or "fine"):
   - A `customers` cell stores `"USA, Germany"` (two countries).
   - A composite-key table `enrollments(studentid, courseid, course_title)` where `course_title` depends only on `courseid`.
   - `orders` column `customer_country` duplicating `customers.country`.

2. Is `sales.orders` in 3NF? Justify briefly using the "nothing but the key" test.

3. The `employees` table has `managerid`. Is storing the manager *id* (a key) normal or denormalized? What would be the denormalized alternative, and why is the id version correct?

4. **Scenario:** You build a dashboard that shows "total sales per customer" and it must load in <50 ms. Would you read a fully-normalized `orders` + `customers` and aggregate on the fly, or keep a pre-computed `customer_sales_summary` table? What do we call that second approach, and what's its downside?

5. **Design (no SQL):** Split the hypothetical `customers` with two countries in one cell into a proper normalized structure (1NF/2NF/3NF). What new table(s) emerge?
