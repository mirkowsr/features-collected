import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '../../utils'

type LabelProps = React.ComponentPropsWithRef<typeof LabelPrimitive.Root>

function Label({ className, ref, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        'text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label, type LabelProps }
