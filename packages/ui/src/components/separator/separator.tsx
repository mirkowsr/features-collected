import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '../../utils'

type SeparatorProps = React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root>

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator, type SeparatorProps }
