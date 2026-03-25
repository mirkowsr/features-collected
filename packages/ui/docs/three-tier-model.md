# Three-Tier Consumer Model

> `@repo/ui` exposes three levels of abstraction so consumers can choose the right escape hatch for every use case.

## Overview

The design system is structured around three tiers of consumption. Most consumers should stay at
Tier 1 -- pre-styled components that handle accessibility, refs, and Radix internals. When you
need more control, drop down to Tier 2 (variant functions only) or Tier 3 (raw primitives with
the `cn()` utility). All three tiers share the same OKLCH design tokens exposed through Tailwind
CSS utilities.

## Tier 1: Styled Components

**Default -- most consumers use this.**

Import pre-styled components and use them directly. They handle Radix primitives, styling,
accessibility, and refs internally. You get a consistent, accessible UI with zero configuration.

```tsx
import { Button, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@repo/ui'

function MyFeature() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>Are you sure?</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
```

Key characteristics of Tier 1 components:

- All use `data-slot` attributes for CSS targeting.
- All accept a `className` prop for Tailwind overrides (merged via `cn()`).
- All forward `ref` via React 19 prop destructuring (no `forwardRef`).
- All prop types are exported as named types (e.g. `ButtonProps`, `DialogContentProps`).

## Tier 2: CVA Variants

Import just the variant functions to apply consistent styles to your own elements. Useful when you
need the design system's visual language but not the Radix behavior -- for example, styling a
plain anchor tag or a third-party component.

Available variant exports:

| Export | Variants | Sizes |
|---|---|---|
| `buttonVariants` | default, destructive, outline, secondary, ghost, link | default, sm, lg, icon |
| `badgeVariants` | default, secondary, destructive, outline | -- |
| `alertVariants` | default, destructive | -- |
| `toggleVariants` | default, outline | default, sm, lg |
| `sheetVariants` | top, right, bottom, left (side) | -- |

```tsx
import { buttonVariants } from '@repo/ui'

// Use on a plain anchor tag
<a href="/home" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
  Go Home
</a>

// Use on a Next.js Link (if applicable)
<Link className={buttonVariants({ variant: 'ghost' })}>
  Dashboard
</Link>
```

Each variant function returns a className string. Pass the result to any element's `className`
prop -- no Radix dependency required.

## Tier 3: Raw Primitives + cn()

Full escape hatch. Import the `cn()` utility and use Radix primitives directly with Tailwind
classes. The design tokens (CSS variables) are still available through Tailwind utilities, so
your custom component stays visually consistent with the rest of the system.

```tsx
import { cn } from '@repo/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

function CustomDialog({ className, ...props }) {
  return (
    <DialogPrimitive.Content
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}
```

### The `cn()` utility

`cn()` combines `clsx` and `tailwind-merge`. Always use it for className merging to avoid
Tailwind class conflicts.

```tsx
import { cn } from '@repo/ui'

cn('px-4 py-2', 'px-8')        // -> 'px-8 py-2' (tailwind-merge resolves conflicts)
cn('text-sm', undefined, false) // -> 'text-sm' (clsx handles falsy values)
cn('base-class', className)     // -> safe merging with consumer overrides
```

`cn()` is the only utility you need at this tier. It is re-exported from the package root
alongside all components and variants.

## Choosing the Right Tier

| Scenario | Tier | Why |
|---|---|---|
| Standard UI -- buttons, forms, dialogs | Tier 1 | Fastest, consistent, accessible |
| Custom element needs design system styling | Tier 2 | Visual consistency without Radix |
| Highly custom component with unique behavior | Tier 3 | Full control, tokens still available |
| Third-party component needs consistent look | Tier 2 | Apply variants to any element |
| One-off layout or section | Tier 3 | Just tokens + `cn()` |

Start at Tier 1. Drop to a lower tier only when you hit a limitation that requires it. The
tiers are not mutually exclusive -- a single feature can mix all three depending on the needs of
each individual component.

## Related

- [getting-started.md](./getting-started.md) -- Installation, setup, and basic usage
- [design-tokens.md](./design-tokens.md) -- Token naming, OKLCH values, and semantic layers
- [dark-mode.md](./dark-mode.md) -- Dark mode implementation and token overrides
