# Contributing to @repo/ui

> Guidelines for adding and modifying components in the internal design system.

## Overview

`@repo/ui` is a private component library built on React 19, Radix UI, Tailwind CSS v4, and CVA.
Every component follows a strict set of conventions to keep the codebase consistent, accessible,
and easy to maintain. Read this guide before opening a PR that touches any component.

## Code Style

All packages in the monorepo share a common code style enforced by Prettier and ESLint. The
settings that matter most when working inside `@repo/ui`:

| Setting | Value |
|---|---|
| Semicolons | No |
| Quotes | Single |
| Trailing commas | All (including function params) |
| Print width | 100 characters |
| Indentation | 2 spaces (no tabs) |

TypeScript is configured with `strict: true` and `noUncheckedIndexedAccess: true`. Array and
object index access returns `T | undefined` -- always guard or assert before use. Access
environment variables with bracket notation (`process.env['VAR']`) to satisfy this rule.

Use `import type` for type-only imports:

```ts
import type { VariantProps } from 'class-variance-authority'
```

React 19 patterns apply throughout the package:

- Destructure `ref` directly from props. Do NOT use `forwardRef`.
- Do NOT use `React.FC` or `React.FunctionComponent`. Use plain function declarations.

## Component Architecture

### File Structure

Each component lives in its own folder under `src/components/`. The structure is flat -- no
nested subfolders inside a component directory.

```
src/components/button/
  button.tsx            # component implementation
  button.stories.tsx    # Storybook stories
  index.ts              # barrel exports
```

Three files per component, always. The folder name and the `.tsx` filename use kebab-case.

### Component Pattern

Every component follows this pattern:

```tsx
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-input bg-background',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    // additional custom props here
  }

function Button({ className, ref, variant, size, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
```

Rules enforced by this pattern:

1. **`data-slot` on every DOM element.** Every rendered HTML element must have a `data-slot`
   attribute with a descriptive kebab-case value (e.g. `data-slot="button"`,
   `data-slot="dialog-content"`, `data-slot="card-header"`).

2. **`cn()` for all className merging.** Import from `../../utils`. Never concatenate class
   strings manually.

3. **`ref` destructured from props.** React 19 passes `ref` as a regular prop. Do not use
   `forwardRef`.

4. **Named exports only.** No default exports anywhere in the package.

5. **Prop types exported as named types.** Consumers need access to prop types for generic
   wrappers and type-safe composition.

6. **CVA variants exported separately.** Variant functions (e.g. `buttonVariants`) are
   exported alongside the component so consumers can use them at Tier 2 without importing
   the component itself.

7. **Context-only re-exports.** Components that render no DOM -- such as Root, Provider,
   Portal, or Sub from Radix -- can be simple `const` re-exports:

   ```ts
   const Dialog = DialogPrimitive.Root
   const DialogPortal = DialogPrimitive.Portal
   ```

### Barrel Export Pattern

Each component folder has an `index.ts` that re-exports everything:

```ts
// src/components/button/index.ts
export {
  Button,
  buttonVariants,
  type ButtonProps,
} from './button'
```

After creating the barrel, add the component to the main package barrel at `src/index.ts`:

```ts
export {
  Button,
  buttonVariants,
  type ButtonProps,
} from './components/button'
```

### Story Pattern

Every component ships with Storybook stories. Stories live alongside the component in the same
folder.

```tsx
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => <Button {...args} />,
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}
```

Rules for stories:

- Always include `tags: ['autodocs']` in the meta object.
- The **Default** story must use `render: (args) => (...)` with `{...args}` spread so that
  Storybook Docs controls work correctly.
- Showcase or gallery stories (e.g. Variants, Sizes) can use `render: () => (...)` without
  args spread.
- For form component stories, use the `<Label>` component from `@repo/ui` -- not a plain
  `<label>` element.
- The story file's default export is the only default export permitted in the package.

## Adding a New Component

Follow these steps in order:

1. **Create the folder.** Add `src/components/{name}/` where `{name}` is kebab-case.

2. **Create `{name}.tsx`.** Implement the component following the pattern above. Include the
   CVA variants (if applicable), the prop type, and the component function. Add `data-slot` to
   every rendered DOM element. Use `cn()` for className merging. Destructure `ref` from props.

3. **Create `{name}.stories.tsx`.** Write a Default story with `render: (args) => (...)` and
   at least one showcase story demonstrating variants or states.

4. **Create `index.ts`.** Barrel-export the component, variants, and prop types.

5. **Update `src/index.ts`.** Add the new exports to the main barrel file.

6. **Run build verification.** See the next section.

7. **Verify in Storybook.** Start Storybook locally and confirm the component renders
   correctly with working controls.

## Component Checklist

Run through this checklist before opening a PR:

- [ ] `data-slot` attribute on every rendered DOM element
- [ ] `cn()` used for all className merging
- [ ] `ref` destructured from props (not using `forwardRef`)
- [ ] Named exports only (no default exports except story meta)
- [ ] Prop types exported as named types
- [ ] CVA variants exported separately (if applicable)
- [ ] Stories include a Default story with `render: (args) => (...)` and args spread
- [ ] Stories include at least one showcase story
- [ ] Component barrel file (`index.ts`) created
- [ ] Component added to main barrel (`src/index.ts`)
- [ ] Build passes
- [ ] Typecheck passes
- [ ] Storybook build passes

## Build Verification

All three commands must pass before a PR is ready:

```bash
# Compile the package
pnpm build --filter @repo/ui

# Type-check without emitting
pnpm --filter @repo/ui typecheck

# Build Storybook (catches story-level errors)
pnpm --filter @repo/ui storybook:build
```

Run these from the repository root. If any command fails, fix the errors before submitting.

## Related

- [getting-started.md](./getting-started.md) -- Installation, setup, and basic usage
- [three-tier-model.md](./three-tier-model.md) -- Component architecture (primitive, styled, composed)
- [design-tokens.md](./design-tokens.md) -- Token naming, OKLCH values, and semantic layers
- [dark-mode.md](./dark-mode.md) -- Dark mode implementation and token overrides
