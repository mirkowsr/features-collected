import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '../../utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root

type TooltipTriggerProps = React.ComponentPropsWithRef<typeof TooltipPrimitive.Trigger>

function TooltipTrigger({
  className,
  ref,
  ...props
}: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type TooltipContentProps = React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>

function TooltipContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md',
          'transition-opacity duration-150',
          'data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipTriggerProps,
  type TooltipContentProps,
}
