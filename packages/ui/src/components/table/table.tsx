import { cn } from '../../utils'

type TableProps = React.ComponentPropsWithRef<'table'>

function Table({
  className,
  ref,
  ...props
}: TableProps) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-auto">
      <table
        ref={ref}
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

type TableHeaderProps = React.ComponentPropsWithRef<'thead'>

function TableHeader({
  className,
  ref,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

type TableBodyProps = React.ComponentPropsWithRef<'tbody'>

function TableBody({
  className,
  ref,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

type TableFooterProps = React.ComponentPropsWithRef<'tfoot'>

function TableFooter({
  className,
  ref,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        'border-t bg-muted/50 font-medium [&>tr:last-child]:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

type TableRowProps = React.ComponentPropsWithRef<'tr'>

function TableRow({
  className,
  ref,
  ...props
}: TableRowProps) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

type TableHeadProps = React.ComponentPropsWithRef<'th'>

function TableHead({
  className,
  ref,
  ...props
}: TableHeadProps) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

type TableCellProps = React.ComponentPropsWithRef<'td'>

function TableCell({
  className,
  ref,
  ...props
}: TableCellProps) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

type TableCaptionProps = React.ComponentPropsWithRef<'caption'>

function TableCaption({
  className,
  ref,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
}
