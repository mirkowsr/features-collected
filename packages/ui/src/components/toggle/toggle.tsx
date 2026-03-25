import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

// CVA variants exported for Tier 2 consumers
export const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium',
    'transition-colors duration-[var(--transition-fast)]',
    'hover:bg-muted hover:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-border-strong bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-2',
        default: 'h-9 px-3',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ToggleProps = React.ComponentPropsWithRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

function Toggle({
  className,
  variant,
  size,
  ref,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, type ToggleProps }
