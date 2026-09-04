-- ============================================================================
-- generate-big-salesdb.sql
-- Companion to lessons/22.5_test_data_generation.md
--
-- Creates a separate `bigsalesdb` database with the same table shapes as
-- `salesdb`, loaded with generated data:
--   10,000 customers · 500 products · 1,000 employees · 200,000 orders
--
-- Usage:
--   psql -U postgres -h localhost -f datasets/postgres/generate-big-salesdb.sql
--
-- Your small `salesdb` is NOT touched.
-- ============================================================================

DROP DATABASE IF EXISTS bigsalesdb;
CREATE DATABASE bigsalesdb;

\connect bigsalesdb

CREATE SCHEMA sales;

-- ---------------------------------------------------------------------------
-- Tables (same shapes as salesdb, types from lesson 06.5 where it matters)
-- ---------------------------------------------------------------------------

CREATE TABLE sales.customers (
    customerid  INT PRIMARY KEY,
    firstname   TEXT NOT NULL,
    lastname    TEXT,
    country     TEXT,
    score       INT
);

CREATE TABLE sales.products (
    productid   INT PRIMARY KEY,
    product     TEXT NOT NULL,
    price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    category    TEXT
);

CREATE TABLE sales.employees (
    employeeid  INT PRIMARY KEY,
    firstname   TEXT NOT NULL,
    lastname    TEXT,
    gender      TEXT,
    managerid   INT REFERENCES sales.employees (employeeid)
);

CREATE TABLE sales.orders (
    orderid       BIGINT PRIMARY KEY,
    productid     INT NOT NULL REFERENCES sales.products (productid),
    customerid    INT NOT NULL REFERENCES sales.customers (customerid),
    salespersonid INT REFERENCES sales.employees (employeeid),
    orderdate     DATE NOT NULL,
    quantity      INT NOT NULL CHECK (quantity > 0),
    sales         NUMERIC(12,2) NOT NULL CHECK (sales >= 0),
    orderstatus   TEXT NOT NULL DEFAULT 'Pending'
);

-- ---------------------------------------------------------------------------
-- Customers: 10,000
-- Skewed country distribution, some NULL lastnames/scores like the small db
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
-- Products: 500, correlated name/price/category
-- ---------------------------------------------------------------------------

INSERT INTO sales.products (productid, product, price, category)
SELECT
    g,
    'Product-' || g,
    round((5 + random() * 495)::numeric, 2),
    (ARRAY['Clothing','Sports','Accessories','Electronics','Home'])[1 + g % 5]
FROM generate_series(1, 500) AS g;

-- ---------------------------------------------------------------------------
-- Employees: 1,000 in a shallow hierarchy (employeeid 1 = CEO)
-- ---------------------------------------------------------------------------

INSERT INTO sales.employees (employeeid, firstname, lastname, gender, managerid)
SELECT
    g,
    'Employee' || g,
    'Dept' || (g % 20),
    CASE WHEN g % 2 = 0 THEN 'M' ELSE 'F' END,
    CASE WHEN g = 1 THEN NULL ELSE 1 + (g % 50) END   -- 50 top managers
FROM generate_series(1, 1000) AS g;

-- ---------------------------------------------------------------------------
-- Orders: 200,000 over two years
-- - skewed customers (some "whales")
-- - sales correlated with quantity × product price
-- - weighted orderstatus (80% Delivered)
-- ---------------------------------------------------------------------------

INSERT INTO sales.orders
    (orderid, productid, customerid, salespersonid, orderdate, quantity, sales, orderstatus)
SELECT
    g,
    pid.productid,
    -- triangular skew: hot customers get disproportionate orders
    1 + floor(abs(random() - random()) * 10000)::int,
    1 + floor(random() * 1000)::int,
    date '2023-01-01' + floor(random() * 730)::int,
    qty.q,
    round((qty.q * p.price)::numeric, 2),
    CASE WHEN random() < 0.8 THEN 'Delivered'
         WHEN random() < 0.9 THEN 'Shipped'
         ELSE 'Pending' END
FROM generate_series(1, 200000) AS g
CROSS JOIN LATERAL (SELECT floor(random() * 10) + 1 AS q) AS qty
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
