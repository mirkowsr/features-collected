-- ============================================================================
-- generate-big-salesdb.sql
-- Companion to lessons/22.5_test_data_generation.md
--
-- Creates a separate `bigsalesdb` database with the SAME table shapes as
-- `salesdb` (except the archive), loaded with generated data:
--   10,000 customers · 500 products · 1,000 employees · 200,000 orders
--
-- Usage (from the lessons directory):
--   psql -U postgres -h localhost -f datasets/postgres/generate-big-salesdb.sql
--
-- Your small `salesdb` is NOT touched.
-- ============================================================================

DROP DATABASE IF EXISTS bigsalesdb;
CREATE DATABASE bigsalesdb;

\connect bigsalesdb

CREATE SCHEMA sales;

-- ---------------------------------------------------------------------------
-- Tables — same shapes as init-postgres-salesdb.sql (PKs only, FKs added here
-- because 200k rows of orphans would make the performance lessons pointless)
-- ---------------------------------------------------------------------------

CREATE TABLE sales.customers (
    customerid  INT PRIMARY KEY,
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    country     VARCHAR(50),
    score       INT
);

CREATE TABLE sales.employees (
    employeeid  INT PRIMARY KEY,
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    department  VARCHAR(50),
    birthdate   DATE,
    gender      CHAR(1),
    salary      INT,
    managerid   INT REFERENCES sales.employees (employeeid)
);

CREATE TABLE sales.products (
    productid   INT PRIMARY KEY,
    product     VARCHAR(50),
    category    VARCHAR(50),
    price       INT
);

CREATE TABLE sales.orders (
    orderid       INT PRIMARY KEY,
    productid     INT REFERENCES sales.products (productid),
    customerid    INT REFERENCES sales.customers (customerid),
    salespersonid INT REFERENCES sales.employees (employeeid),
    orderdate     DATE,
    shipdate      DATE,
    orderstatus   VARCHAR(50),
    shipaddress   VARCHAR(255),
    billaddress   VARCHAR(255),
    quantity      INT,
    sales         INT,
    creationtime  TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Customers: 10,000 — skewed countries, some NULL lastnames/scores
-- ---------------------------------------------------------------------------

INSERT INTO sales.customers (customerid, firstname, lastname, country, score)
SELECT
    g,
    'Customer' || g,
    CASE WHEN g % 17 = 0 THEN NULL ELSE 'Family' || (g % 997) END,
    (ARRAY['USA','USA','USA','Germany','Germany','France','Poland','Japan'])[1 + g % 8],
    CASE WHEN g % 11 = 0 THEN NULL ELSE floor(random() * 1000)::int END
FROM generate_series(1, 10000) AS g;

-- ---------------------------------------------------------------------------
-- Products: 500
-- ---------------------------------------------------------------------------

INSERT INTO sales.products (productid, product, category, price)
SELECT
    g,
    'Product-' || g,
    (ARRAY['Clothing','Sports','Accessories','Electronics','Home'])[1 + g % 5],
    5 + floor(random() * 495)::int
FROM generate_series(1, 500) AS g;

-- ---------------------------------------------------------------------------
-- Employees: 1,000 in a shallow hierarchy (employeeid 1 = CEO)
-- ---------------------------------------------------------------------------

INSERT INTO sales.employees (employeeid, firstname, lastname, department, birthdate, gender, salary, managerid)
SELECT
    g,
    'Employee' || g,
    'Dept' || (g % 20),
    (ARRAY['Sales','Marketing','Engineering','Support'])[1 + g % 4],
    date '1965-01-01' + floor(random() * 14000)::int,
    CASE WHEN g % 2 = 0 THEN 'M' ELSE 'F' END,
    40000 + floor(random() * 80000)::int,
    CASE WHEN g = 1 THEN NULL ELSE 1 + (g % 50) END   -- 50 top managers
FROM generate_series(1, 1000) AS g;

-- ---------------------------------------------------------------------------
-- Orders: 200,000 over two years
-- - skewed customers (some "whales")
-- - sales = quantity x product price (correlated, like real data)
-- - weighted orderstatus (~80% Delivered)
-- ---------------------------------------------------------------------------

INSERT INTO sales.orders
    (orderid, productid, customerid, salespersonid, orderdate, shipdate,
     orderstatus, shipaddress, billaddress, quantity, sales, creationtime)
SELECT
    g,
    pid.productid,
    -- triangular skew: hot customers get disproportionate orders
    1 + floor(abs(random() - random()) * 10000)::int,
    1 + floor(random() * 1000)::int,
    d.orderdate,
    d.orderdate + floor(random() * 14)::int,
    CASE WHEN random() < 0.8 THEN 'Delivered'
         WHEN random() < 0.9 THEN 'Shipped'
         ELSE 'Pending' END,
    (1000 + g % 9000) || ' Generated Ave',
    (1000 + g % 9000) || ' Generated Ave',
    qty.q,
    qty.q * p.price,
    d.orderdate + (floor(random() * 86400)::int || ' seconds')::interval
FROM generate_series(1, 200000) AS g
CROSS JOIN LATERAL (SELECT floor(random() * 10) + 1 AS q) AS qty
CROSS JOIN LATERAL (SELECT date '2023-01-01' + floor(random() * 730)::int AS orderdate) AS d
-- correlate the product pick on g so it is re-evaluated for EVERY row
-- (an uncorrelated random() here is planned ONCE for the whole query — an
--  InitPlan — and every order would get the same product)
CROSS JOIN LATERAL (SELECT 1 + ((floor(random() * 500)::int + g) % 500) AS productid) AS pid
JOIN sales.products p ON p.productid = pid.productid;

-- ---------------------------------------------------------------------------
-- Refresh planner statistics (lesson 27) and report
-- ---------------------------------------------------------------------------

ANALYZE sales.customers;
ANALYZE sales.products;
ANALYZE sales.employees;
ANALYZE sales.orders;

SELECT 'customers' AS table_name, count(*) FROM sales.customers
UNION ALL SELECT 'products',  count(*) FROM sales.products
UNION ALL SELECT 'employees', count(*) FROM sales.employees
UNION ALL SELECT 'orders',    count(*) FROM sales.orders;
