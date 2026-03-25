import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '../../utils'

type RadioGroupProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>

function RadioGroup({ className, ref, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn('grid gap-2', className)}
      {...props}
    />
  )
}

type RadioGroupItemProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>

function RadioGroupItem({ className, ref, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-border-strong',
        'shadow-sm transition-colors duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:text-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps }
