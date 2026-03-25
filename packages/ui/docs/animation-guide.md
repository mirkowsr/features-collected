# Animation Guide

> How `@repo/ui` handles animation -- built-in CSS keyframes, transition tokens, and optional motion presets for consumers who need animated overlays.

## Overview

The architecture plan originally called for `motion` (the lightweight Framer Motion successor)
with shared animation presets powering all overlay components. The presets were implemented and
are exported from the package. However, during Phase 3 implementation, the decision was made to
use plain CSS and Tailwind for all built-in component animations instead.

The reasoning:

1. **Radix handles mount/unmount internally.** Overlay primitives (Dialog, Popover, Sheet, etc.)
   manage their own portal lifecycle. Wrapping them in `AnimatePresence` adds complexity without
   proportional benefit for the built-in components.
2. **`tailwindcss-animate` does not exist in Tailwind v4.** The `animate-in`, `fade-in-0`,
   `zoom-in-95` utilities that many Radix+Tailwind setups rely on are a v3-era plugin. Rather
   than fighting the framework or shimming deprecated utilities, components use clean instant
   show/hide.
3. **Simplicity wins for a shared library.** Instant transitions are predictable, have zero
   motion-related bugs, and keep the component footprint small. Consumers who need entrance/exit
   animations can opt in via the exported motion presets (see below).

The result: built-in overlay components (Dialog, AlertDialog, Sheet, Tooltip, Popover,
DropdownMenu, Select) appear and disappear instantly. The Accordion is the one exception -- it
uses CSS keyframe animations for its expand/collapse behavior. The `motion` package is listed as
a dependency but is not imported by any built-in component.

## Built-in Animations

### Accordion Keyframes

The Accordion component uses CSS `@keyframes` for smooth height transitions. These are defined in
`src/tokens/index.css` and mapped to Tailwind utilities via `@theme inline`:

```css
/* src/tokens/index.css */

@keyframes accordion-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
```

The `@theme inline` block registers them as Tailwind animation utilities:

```css
@theme inline {
  --animate-accordion-down: accordion-down 200ms ease-out;
  --animate-accordion-up: accordion-up 200ms ease-out;
}
```

The `AccordionContent` component applies them via Radix data attributes:

```tsx
<AccordionPrimitive.Content
  className={cn(
    'overflow-hidden text-sm',
    'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    className,
  )}
>
```

This pattern -- CSS keyframes registered through `@theme inline` and toggled by Radix
`data-[state=*]` selectors -- is the recommended approach for adding animation to Radix-based
components in Tailwind v4.

### Transition Tokens

Three CSS custom properties provide consistent easing curves and durations for CSS transitions.
They are defined in `:root` inside `src/tokens/index.css` and available to any consumer that
imports `@repo/ui/tokens`:

```css
--transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-normal: 200ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 300ms cubic-bezier(0.16, 1, 0.3, 1);
```

All three use the same `cubic-bezier(0.16, 1, 0.3, 1)` ease-out curve (fast attack, gentle
settle). The Accordion trigger uses `--transition-normal` for its hover underline transition:

```tsx
className={cn(
  'transition-all duration-[var(--transition-normal)]',
  'hover:underline',
)}
```

Use these tokens in your own CSS or inline Tailwind when you want transitions that match the
design system's timing:

```css
.sidebar-panel {
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}

.quick-fade {
  transition: opacity var(--transition-fast);
}
```

Or with Tailwind's arbitrary value syntax:

```tsx
<div className="transition-opacity duration-[var(--transition-fast)]">
  ...
</div>
```

## Motion Presets (Tier 3)

The `motion` package is installed as a dependency and a set of animation presets are exported from
`@repo/ui`. These are **not used by any built-in component**. They exist as a Tier 3 escape hatch
for consumers who want animated entrance/exit transitions on overlay content.

### Available Presets

All presets are exported from the package root and defined in `src/animations/presets.ts`:

```ts
import {
  overlayAnimation,    // backdrop fade (opacity 0 -> 1)
  contentAnimation,    // scale + fade (0.95 -> 1, for dialogs)
  slideDownAnimation,  // slide + fade from above (dropdowns, selects, popovers)
  slideUpAnimation,    // slide + fade from below (bottom sheets, toasts)
  sheetAnimation,      // parameterized slide from edge (side: 'top' | 'right' | 'bottom' | 'left')
  collapseAnimation,   // height 0 -> auto + fade (accordion/collapsible)
  tooltipAnimation,    // scale + fade (0.96 -> 1, tooltip)
} from '@repo/ui'
```

Each preset (except `sheetAnimation`) is a plain object with `initial`, `animate`, `exit`, and
`transition` properties -- the shape expected by `motion/react` component props:

```ts
// Example: contentAnimation
{
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
}
```

`sheetAnimation` is a function that takes a `side` parameter and returns the animation object:

```ts
sheetAnimation('right')
// -> { initial: { x: '100%', opacity: 1 }, animate: { x: 0, y: 0, opacity: 1 }, ... }

sheetAnimation('bottom')
// -> { initial: { y: '100%', opacity: 1 }, animate: { x: 0, y: 0, opacity: 1 }, ... }
```

### Usage with motion/react

To use these presets, import `motion` and `AnimatePresence` from `motion/react` alongside the
preset you need. Spread the preset onto a `motion.div` that wraps (or replaces) the Radix
content:

```tsx
import { motion, AnimatePresence } from 'motion/react'
import { overlayAnimation, contentAnimation, DialogTitle, DialogDescription } from '@repo/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

function AnimatedDialog({ open, onOpenChange, children }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Animated overlay */}
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-overlay"
                {...overlayAnimation}
              />
            </DialogPrimitive.Overlay>

            {/* Animated content */}
            <DialogPrimitive.Content forceMount asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border border-border bg-surface p-6 shadow-lg rounded-lg"
                {...contentAnimation}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
```

Key points:

- Use `forceMount` on `Portal`, `Overlay`, and `Content` so Radix does not unmount them --
  `AnimatePresence` needs to control the exit animation.
- The `open` state must be controlled (passed as a prop) so you can conditionally render inside
  `AnimatePresence`.
- Spread the preset object directly onto the `motion.div` -- the `initial`, `animate`, `exit`,
  and `transition` keys map to the motion component API.

## Adding Animations to Overlay Components

If you do not need the `motion` package, you can add lightweight animations to overlay components
using CSS transitions and Radix data attributes. Three approaches, from simplest to most
involved:

**Option A: Tailwind transition utilities**

Add Tailwind's built-in transition classes directly. This works for simple opacity or transform
effects but does not support exit animations (the element unmounts before the transition
completes):

```tsx
<PopoverContent className="transition-opacity duration-200 ease-out">
  ...
</PopoverContent>
```

**Option B: CSS transitions with design tokens**

Use the transition tokens for consistent timing across your app:

```css
.my-panel {
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}
```

**Option C: CSS keyframes via @theme inline**

For full enter/exit control, define custom keyframes and register them with Tailwind the same way
the Accordion does. This is the most work but gives you CSS-only enter/exit animations:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@theme inline {
  --animate-fade-in: fade-in 200ms ease-out;
  --animate-fade-out: fade-out 150ms ease-in;
}
```

Then apply with Radix data attributes:

```tsx
<DialogOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
```

Note that CSS-only exit animations may not complete before Radix unmounts the element. For
reliable exit animations, use the motion presets with `AnimatePresence` as described in the
previous section.

## Related

- [three-tier-model.md](./three-tier-model.md) -- Component tiers and the Tier 3 escape hatch
- [design-tokens.md](./design-tokens.md) -- Token naming, OKLCH values, and semantic layers
- [getting-started.md](./getting-started.md) -- Installation, setup, and basic usage
