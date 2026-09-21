# Implementation tasks — `salesdb` in Drizzle ORM

Build the course dataset as a NestJS + Drizzle backend by hand, following each task.

---

## Phase 0 — Schema

- **T1** — `customers` table *(02, 03)*
- **T2** — `products` table *(02, 03)*
- **T3** — `employees` table (self-ref) *(05)*
- **T4** — `orders` table (3 FKs) *(03, 05)*
- **T5** — `ordersarchive` table (no PK/FK) *(05)*
- **T6** — export all + migrate *(05)*

## Phase 1 — Reading & filtering

- **T7** — `customers` module scaffold
- **T8** — `GET /customers` *(08)*
- **T9** — `GET /customers/countries` *(08)*
- **T10** — `GET /customers/top` *(08)*
- **T11** — `GET /customers/filter` *(09)*
- **T12** — `GET /customers/search` *(09)*
- **T13** — `GET /customers/null-score` + `null-lastname` *(13)*
- **T14** — `GET /customers/score-bands` *(14)*
- **T15** — `GET /customers` pagination *(09.5)*

## Phase 2 — Joins *(10)*

- **T16** — `orders` module scaffold
- **T17** — `GET /orders/detail` (4-table INNER JOIN)
- **T18** — `GET /orders/all-with-customer` (LEFT JOIN)
- **T19** — `GET /orders/anti/customers-without-orders`
- **T20** — `employees` module + `GET /employees/hierarchy` (self-join)

## Phase 3 — Aggregation *(15)*

- **T21** — `GET /orders/by-status`
- **T22** — `GET /orders/customers-with-multiple` (HAVING)
- **T23** — `GET /orders/monthly` (DATE_TRUNC)
- **T24** — `GET /employees/salary-stats`

## Phase 4 — Sets & subqueries

- **T25** — `GET /orders/union-archive` *(11)*
- **T26** — `GET /orders/changed-vs-archive` *(11)*
- **T27** — `GET /orders/above-average` *(16)*
- **T28** — `analytics` module + `GET /analytics/products-in-delivered` *(16)*

## Phase 5 — CTEs & windows

- **T29** — `GET /analytics/revenue-top` *(17)*
- **T30** — `GET /analytics/rank-by-sales` *(19)*
- **T31** — `GET /analytics/running-totals` *(18, 21)*

## Phase 6 — Functions & nulls

- **T32** — functions endpoint set *(12, 13, 20)*

## Phase 7 — DML/DDL

- **T33** — bulk insert / update-from-temp *(07.6)*
- **T34** — upsert + RETURNING *(07.5)*
- **T35** — `customers.uuid` + `products.price` numeric *(06.5)*
- **T36** — timestamps + generated column *(04.5)*

## Phase 8 — Transactions

- **T37** — atomic stock guard *(24.5)*
- **T38** — `FOR UPDATE` *(24.5)*
- **T39** — optimistic version *(24.5)*

## Phase 9 — Indexes & performance

- **T40** — indexes + `EXPLAIN` *(23, 27)*
- **T41** — incident drill *(27.5)*

## Phase 10 — Advanced (optional)

- **T42** — JSONB GIN, trigger, views *(23.5, 26, 22)*

---

## Rules of the exercise

1. Read the lesson → implement by hand → `db:seed` → hit endpoint → compare to lesson output → note it.
2. Review happens per-phase; code is never pre-written for you (except `seed.ts`, already provided).
3. Ask specific "how do I…" questions when stuck; steering, not answers.
