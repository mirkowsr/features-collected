# Getting Started with @repo/ui

> Internal design system for the monorepo -- React 19, Radix UI, Tailwind CSS v4, OKLCH tokens.

## Overview

`@repo/ui` is a private component library that ships 25 production-ready components built on
Radix UI Primitives, styled with Tailwind CSS v4, and managed through CVA
(class-variance-authority). The design language is minimalistic black-and-white contour/outline,
using OKLCH color space for perceptual uniformity.

This guide covers how to install, configure, and consume `@repo/ui` in any app within the
monorepo.

## Prerequisites

- **Node.js** >= 18
- **pnpm** (never npm or yarn -- this is a pnpm workspace)
- A working checkout of the monorepo with `pnpm install` already run

## Installation

### 1. Add the workspace dependency

In your consumer app's `package.json`, add `@repo/ui` as a dependency:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

Then run from the repo root:

```bash
pnpm install
```

### 2. Set up Tailwind CSS v4

Your consumer app needs `tailwindcss` v4 and the `@tailwindcss/vite` plugin.

Add the dependencies:

```bash
pnpm add tailwindcss @tailwindcss/vite --filter @repo/your-app
```

Register the plugin in your Vite config:

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### 3. Import the design tokens

In your app's CSS entrypoint (e.g. `src/index.css` or `src/app.css`), import the token
stylesheet. This provides the full set of OKLCH color tokens, radius values, and dark-mode
overrides:

```css
@import '@repo/ui/tokens';
```

Alternatively, import it from your TypeScript/JSX entrypoint:

```ts
// src/main.tsx
import '@repo/ui/tokens'
```

Either approach works. The token CSS includes `@import 'tailwindcss'`, so you do not need a
separate Tailwind import in your consumer app.

### 4. Build the UI package

If the UI package has not been built yet, run:

```bash
pnpm build --filter @repo/ui
```

For active development with automatic rebuilds:

```bash
pnpm --filter @repo/ui dev
```

## Usage

Import components directly from `@repo/ui`:

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui'

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card uses design tokens from the shared UI package.</p>
        <Button variant="outline" size="sm">
          Get started
        </Button>
      </CardContent>
    </Card>
  )
}
```

Button variants and sizes are controlled through CVA props:

```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

## Available Components

25 components organized across four phases:

| Phase | Components |
|---|---|
| **1 -- Core** | Button, Badge, Separator, Label, Input, Textarea, Card (compound), Skeleton, Alert |
| **2 -- Interactive** | Toggle, Switch, Checkbox, RadioGroup, Tabs, Accordion, Avatar, ScrollArea |
| **3 -- Overlays** | Tooltip, Popover, DropdownMenu, Select, Dialog, AlertDialog, Sheet |
| **4 -- Data** | Table (compound) |

All components are exported from the package root. Compound components (Card, Table) export their
sub-components as named exports (e.g. `CardHeader`, `CardContent`, `TableRow`, `TableCell`).

## Package Exports

The `@repo/ui` package exposes two entry points:

```json
{
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./tokens": "./src/tokens/index.css"
}
```

- **`.`** -- All components, variants, utilities (`cn`), and TypeScript types.
- **`./tokens`** -- The design token CSS (OKLCH color palette, spacing, radii, dark-mode layer).

## Storybook

Browse all components, their variants, and interactive controls in Storybook:

```bash
pnpm --filter @repo/ui storybook
```

This starts Storybook on [http://localhost:6006](http://localhost:6006).

To build a static Storybook site:

```bash
pnpm --filter @repo/ui storybook:build
```

## Build and Typecheck

```bash
# Production build
pnpm build --filter @repo/ui

# Watch mode (rebuilds on file changes)
pnpm --filter @repo/ui dev

# Type checking
pnpm --filter @repo/ui typecheck
```

## Related

- [design-tokens.md](./design-tokens.md) -- Token naming, OKLCH values, and semantic layers
- [three-tier-model.md](./three-tier-model.md) -- Component architecture (primitive, styled, composed)
- [dark-mode.md](./dark-mode.md) -- Dark mode implementation and token overrides
