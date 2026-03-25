import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '../../utils'

type CheckboxProps = React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>

function Checkbox({ className, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-border-strong',
        'shadow-sm transition-colors duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn('flex items-center justify-center text-current')}
      >
        <Check className="h-3.5 w-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, type CheckboxProps }
