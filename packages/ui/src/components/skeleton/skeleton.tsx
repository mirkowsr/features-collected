import { cn } from '../../utils'

type SkeletonProps = React.ComponentPropsWithRef<'div'>

function Skeleton({
  className,
  ref,
  ...props
}: SkeletonProps) {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton, type SkeletonProps }
