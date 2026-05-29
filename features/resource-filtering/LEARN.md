# Resource Filtering — Learning Roadmap

A curated list of topics to study around API resource filtering, querying, and
retrieval. Each section links to external resources for self-study — no code
examples, just concepts to understand.

---

## 1. Pagination

- **Offset pagination** — `?page=2&limit=20`. Simple but has a "phantom row"
  problem when data changes between pages.
- **Cursor (keyset) pagination** — stable under writes, faster on large
  datasets, harder to implement.
- **Seek method** — the database-level optimisation behind cursor pagination.

**Search terms:** `offset vs cursor pagination`, `keyset pagination postgres`,
`seek method API design`

---

## 2. Sorting

- Single-column sort.
- Multi-column sort — precedence and tie-breaking.
- Null ordering — `NULLS FIRST` / `NULLS LAST` across databases.
- Case-insensitive sorting and collation.

**Key question:** Why must sort fields be validated against an allowlist?

**Search terms:** `API sort by multiple fields`, `order by nulls first`,
`SQL injection via ORDER BY`

---

## 3. Filter Operators

- Equality (`?age=25`).
- Comparison operators — greater-than, less-than, ranges.
- String matching — contains, starts-with, ends-with.
- List membership — `?city=London,Paris,Tokyo`.
- Null filtering.

**Search terms:** `REST API filter operators`, `JSON:API filtering`,
`OData $filter conventions`

---

## 4. Text Search

- `ILIKE` / `LIKE` — simple, no index for leading wildcards.
- PostgreSQL full-text search — `tsvector` / `tsquery`, ranking (stemming,
  stop words).
- Trigram indexes (`pg_trgm`) — fast fuzzy substring matching.
- External search engines — Meilisearch, Typesense, Elasticsearch.

**Key question:** At what point does `ILIKE` stop scaling and warrant an
external search engine?

**Search terms:** `postgres full text search vs like`,
`tsvector performance`, `when to use meilisearch vs postgres search`

---

## 5. Field Selection / Projection

- Sparse fieldsets — let the client request only the columns they need.
- Sensitive field exclusion — never leak fields like `passwordHash` even if
  requested.

**Search terms:** `sparse fieldsets REST`,
`graphql field selection vs REST fields parameter`

---

## 6. Relationship / Nested Filtering

- Filtering by related entity fields — `?author.name=John` on a posts
  endpoint.
- Deep nesting — `?author.address.city=London`.
- Performance trap — joining many tables just for filtering.
- Denormalisation as an alternative for common relationship filters.

**Search terms:** `filter by nested resource REST API`,
`REST API filtering by relation`

---

## 7. API Query Language Standards

Existing specifications that have already solved these design problems:

| Standard     | Key features                                                 |
| ------------ | ------------------------------------------------------------ |
| **JSON:API** | `filter`, `sort`, `include`, `fields`, `page`                |
| **OData**    | `$filter`, `$orderby`, `$top`, `$skip`, `$count`, `$expand`  |
| **GraphQL**  | Solves over-fetching / under-fetching differently altogether |

**Key question:** What do these standards have in common? What does that tell
you about the "right" set of features?

**Search terms:** `JSON:API filtering spec`, `OData protocol query options`,
`REST vs GraphQL filtering`

---

## 8. Security & Guardrails

- Query depth limiting — prevent expensive deep-filter queries.
- Complexity scoring — reject queries that would scan too many rows.
- Rate limiting by query cost (not just request count).
- SQL injection via sort/order — always validate column names.
- Tenant isolation — never let a filter accidentally leak cross-tenant data.

**Search terms:** `API query complexity limiting`,
`REST API security filtering parameters`

---

## Suggested Study Order

| Step | Topic                                            | Est. time |
| ---- | ------------------------------------------------ | --------- |
| 1    | Pagination (offset vs cursor)                    | 1–2 h     |
| 2    | Sorting + allowlist security                     | 30 min    |
| 3    | Filter operators (comparisons, strings, lists)   | 1 h       |
| 4    | JSON:API filter / sort / page spec               | 1 h       |
| 5    | Text search basics (ILIKE → tsvector → external) | 1–2 h     |
| 6    | Relationship filtering + performance trade-offs  | 1 h       |
| 7    | Security (complexity limits, tenant isolation)   | 1 h       |
| 8    | Field selection                                  | 30 min    |
