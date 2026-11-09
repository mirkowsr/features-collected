import { and, eq, getTableColumns, ilike, or, type SQL } from 'drizzle-orm'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'
import type { FilterParams } from './filter-builder.type'

export class FilterBuilder {
  private readonly tableColumns

  constructor(
    private readonly table: PgTable,
    private readonly fuzzyColumns: PgColumn[],
    private readonly defaultPageSize = 20,
  ) {
    this.tableColumns = getTableColumns(table)
  }

  build({ q, page, pageSize, ...restQueryParams }: FilterParams) {
    const pageNumber = this.parsePositiveInt(page, 1)
    const pageSizeNumber = this.parsePositiveInt(pageSize, this.defaultPageSize)
    const offset = (pageNumber - 1) * pageSizeNumber
    let conditions: SQL | undefined

    if (q) {
      conditions = this.buildFuzzySearchFilters({ q })
    } else {
      conditions = this.buildQueryParamBasedFilters(restQueryParams)
    }

    return { conditions, pageNumber, pageSizeNumber, offset }
  }

  private parsePositiveInt(
    value: string | undefined,
    fallback: number,
  ): number {
    if (value === undefined || value === '') return fallback

    const n = Number(value)
    return Number.isFinite(n) ? Math.max(1, Math.floor(n)) : fallback
  }

  private buildQueryParamBasedFilters(
    params: Record<string, unknown>,
  ): SQL | undefined {
    const conditions: SQL[] = []

    for (const [key, value] of Object.entries(params)) {
      const column = this.tableColumns[key]

      if (value && column) {
        conditions.push(eq(column, value))
      }
    }

    return conditions.length ? and(...conditions) : undefined
  }

  private buildFuzzySearchFilters({ q }: { q: string }): SQL | undefined {
    const conditions = this.fuzzyColumns.map((column) =>
      ilike(column, `%${q}%`),
    )

    return conditions.length ? or(...conditions) : undefined
  }
}
