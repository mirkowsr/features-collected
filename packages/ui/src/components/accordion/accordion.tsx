import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '../../utils'

type AccordionProps = React.ComponentPropsWithRef<typeof AccordionPrimitive.Root>

function Accordion({
  className,
  ref,
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion"
      className={cn('w-full', className)}
      {...props}
    />
  )
}

type AccordionItemProps = React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>

function AccordionItem({
  className,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn('border-b border-border', className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>

function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium',
          'transition-all duration-[var(--transition-normal)]',
          'hover:bg-accent hover:text-accent-foreground',
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps = React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>

function AccordionContent({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden text-sm',
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
}
