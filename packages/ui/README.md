# @repo/ui

> Internal design system built on React 19, Radix UI Primitives, and Tailwind CSS v4 — minimalistic, black-and-white, contour/outline aesthetic.

Private package (`v0.0.0`) located at `packages/ui/` in the monorepo. Not published to any registry.

---

## Quick Start

From a consumer app in the same monorepo:

1. Add the dependency to the consumer's `package.json`:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

2. Install:

```bash
pnpm install
```

3. Import the design tokens CSS in your app's entry point:

```ts
import '@repo/ui/tokens'
```

4. Import and use components:

```tsx
import { Button } from '@repo/ui'
```

### Package Exports

```json
{
  ".":        { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./tokens": "./src/tokens/index.css"
}
```

---

## Components

25 components across four categories:

| Category | Components |
|---|---|
| Core Primitives | Button, Badge, Separator, Label, Input, Textarea, Card, Skeleton, Alert |
| Interactive | Toggle, Switch, Checkbox, RadioGroup, Tabs, Accordion, Avatar, ScrollArea |
| Overlays | Tooltip, Popover, DropdownMenu, Select, Dialog, AlertDialog, Sheet |
| Data Display | Table |

### Three-Tier Consumer Model

Components expose three levels of abstraction:

| Tier | What You Get | When to Use |
|---|---|---|
| Tier 1 — Styled | Pre-composed, opinionated components | Most application code |
| Tier 2 — CVA Variants | Variant functions via class-variance-authority | Custom compositions that need consistent variants |
| Tier 3 — Raw Primitives | Unstyled Radix UI primitives | Full control over markup and styling |

See `docs/three-tier-model.md` for details.

---

## Scripts

Run from the monorepo root:

```bash
pnpm build --filter @repo/ui            # Build with tsup
pnpm --filter @repo/ui typecheck        # TypeScript check
pnpm --filter @repo/ui dev              # Watch mode
pnpm --filter @repo/ui storybook        # Dev Storybook (port 6006)
pnpm --filter @repo/ui storybook:build  # Production Storybook
```

---

## Documentation

| Guide | Description |
|---|---|
| `docs/getting-started.md` | Installation and setup |
| `docs/design-tokens.md` | Token reference, customization, Figma transfer |
| `docs/three-tier-model.md` | Tier 1/2/3 consumer model |
| `docs/animation-guide.md` | Animation system and motion presets |
| `docs/dark-mode.md` | Dark mode implementation |
| `docs/contributing.md` | How to add new components |

---

## Tech Stack

| Technology | Role |
|---|---|
| React 19 | UI framework (no `forwardRef` — ref passed as prop) |
| Radix UI Primitives | Accessible, unstyled behavior layer |
| Tailwind CSS v4 | Utility-first styling with `@theme inline` |
| CVA | Variant management via `class-variance-authority` |
| `cn()` (clsx + tailwind-merge) | Conditional class merging utility |
| OKLCH color space | Perceptually uniform color tokens |
| tsup | Library bundling |
| Storybook 8 | Component development and documentation |

### Design Philosophy

- Minimalistic black-and-white, contour/outline visual style
- Neutral grays with borders as the primary visual language
- OKLCH color space for perceptual uniformity across light and dark modes
- Composable primitives over monolithic components

---

## License

Internal and private. Not licensed for use outside this monorepo.
