import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '../../utils'

type ScrollAreaProps = React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>

function ScrollArea({
  className,
  children,
  ref,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full rounded-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

type ScrollBarProps = React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

function ScrollBar({
  className,
  orientation = 'vertical',
  ref,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      data-slot="scroll-bar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-px',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-bar-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export {
  ScrollArea,
  ScrollBar,
  type ScrollAreaProps,
  type ScrollBarProps,
}
