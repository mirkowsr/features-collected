# AGENTS.md

Guidelines for agentic coding assistants working in this repository.

---

## Repository Overview

A **pnpm + Turborepo monorepo** that scaffolds full-stack features, each consisting of:
- A **React 19 + Vite** or **Astro 5** frontend
- A **NestJS 11 + TypeORM + PostgreSQL** backend

Workspace packages live under `features/`, `utils/`, and `config/`. Templates for new features
are in `templates/`. Scripts in `scripts/` drive the interactive scaffold CLI.

---

## Package Manager

Always use **pnpm**. Never use `npm` or `yarn`.

```bash
pnpm install               # install all workspace dependencies
pnpm add <pkg> --filter @repo/<name>   # add a dep to a specific package
```

---

## Build / Dev Commands

All commands are run from the **repo root** via Turborepo unless you are working inside a single
package and want to skip the overhead.

```bash
# Root — runs across all packages in dependency order
pnpm build                 # compile every package (tsc + vite build / astro build / nest build)
pnpm dev                   # start all dev servers concurrently (TUI: ↑/↓ to cycle services)

# Filter to a single feature or package (preferred when iterating)
pnpm build --filter @repo/feature-a-backend
pnpm dev   --filter "@repo/feature-a-*"

# Per-package (run from the package directory, or with --filter)
# React frontend
tsc && vite build          # production build
vite                       # dev server

# Astro frontend
astro build
astro dev

# NestJS backend
nest build
nest start --watch         # dev with hot-reload
node dist/main             # production start
```

---

## Lint / Format Commands

```bash
# Root — runs across all packages
pnpm lint                  # eslint src (report errors)
pnpm lint:fix              # eslint src --fix (auto-fix)
pnpm format                # prettier --write src
pnpm format:check          # prettier --check src (CI-safe, no writes)

# Filter to one package
pnpm lint --filter @repo/feature-a-frontend
pnpm lint:fix --filter "@repo/feature-a-*"
```

Always run `pnpm lint:fix` and `pnpm format` before committing changes.

---

## Test Commands

**No test runner is configured.** There are no test files or test scripts in any package.
When tests are added, update this section with the appropriate commands.

---

## Docker (PostgreSQL)

```bash
pnpm docker:up             # start PostgreSQL 16 in background
pnpm docker:down           # stop containers
pnpm docker:reset          # wipe volumes and restart (destroys all data)
pnpm docker:logs           # tail postgres logs
```

The backend reads `process.env['DATABASE_URL']` (or similar vars) from a `.env` file.
Copy `.env.example` to `.env` and fill in values before starting the backend.

---

## Code Style

### Formatting (Prettier)

| Setting | Value |
|---|---|
| Semicolons | **No** |
| Quotes | **Single** |
| Trailing commas | **All** (including function params) |
| Print width | **100** characters |
| Indentation | **2 spaces** (no tabs) |
| Bracket spacing | Yes — `{ foo }` not `{foo}` |
| Arrow parens | Always — `(x) => x` not `x => x` |
| Line endings | LF |

### TypeScript

All packages extend `tsconfig.base.json`. Key flags that affect everyday code:

- `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- `noUncheckedIndexedAccess: true` — array/object access returns `T | undefined`; always guard
  or assert before use.
- `isolatedModules: true` — each file must be independently compilable.
- NestJS backends additionally require `emitDecoratorMetadata: true` and
  `experimentalDecorators: true` for DI decorators.

Never suppress TypeScript with `// @ts-ignore`. Prefer `// @ts-expect-error` with a comment
explaining why, and only when there is no better alternative.

### Imports

1. Group and separate with a **blank line** in this order:
   - Built-ins (`node:fs`, `node:path`, …)
   - External packages (`react`, `@nestjs/common`, …)
   - Internal workspace packages (`@repo/utils`, …)
   - Parent imports (`../`)
   - Sibling imports (`./`)

2. Within each group, sort **alphabetically, case-insensitive**.

3. Use **`import type`** for type-only imports:
   ```ts
   import type { FC } from 'react'
   ```

4. No duplicate imports. No barrel re-exports that create circular dependencies.

### Naming Conventions

| Item | Style | Example |
|---|---|---|
| React components | PascalCase | `UserCard`, `App` |
| Component files | PascalCase | `UserCard.tsx` |
| NestJS classes | PascalCase | `AppModule`, `UserService` |
| Functions & variables | camelCase | `bootstrap`, `getUserById` |
| Script-level path constants | SCREAMING_SNAKE | `FEATURES_DIR`, `TEMPLATES_DIR` |
| Unused parameters | Prefix with `_` | `_unusedParam` |
| npm package names | kebab-case | `@repo/feature-a-backend` |
| Non-component filenames | kebab-case | `create-feature.mjs` |
| Template placeholders | `__FEATURE_NAME__` (double underscores) | — |

### Error Handling

- **Guard clauses + early throws** — prefer `if (!root) throw new Error('…')` over silent
  optional-chaining no-ops.
- **Top-level async entrypoints** — always wrap with `.catch()`:
  ```ts
  main().catch((err) => { console.error(err); process.exit(1) })
  ```
- **Fatal script errors** — call `process.exit(1)` so Turbo marks the task as failed.
- **Environment variables** — access via bracket notation (`process.env['PORT']`) to satisfy
  `noUncheckedIndexedAccess`. Validate at startup and throw if required vars are missing.
- **No `console.log` in library/frontend code** — use `console.warn` or `console.error`.
  `console.log` is allowed inside `scripts/` and NestJS entry points.
- **Avoid `any`** — `@typescript-eslint/no-explicit-any` is a warning; fix the type instead.
- **Avoid non-null assertions (`!`)** — guarded by a lint warning; prefer proper null checks.

### File Organization

```
src/
  main.ts(x)         # entrypoint
  App.tsx            # root React component (React packages)
  app.module.ts      # root NestJS module (backend packages)
  app.controller.ts
  <domain>/          # one subdirectory per domain/feature slice
    <domain>.module.ts
    <domain>.service.ts
    <domain>.controller.ts
    <domain>.entity.ts
```

Build output always goes to `dist/`. Do not commit `dist/`.

---

## Adding a New Feature

Use the interactive scaffold script instead of creating files by hand:

```bash
node scripts/create-feature.mjs
```

To run a single feature's dev servers:

```bash
node scripts/run-feature.mjs <feature-name>
# or
pnpm dev --filter "@repo/<feature-name>-*"
```

---

## Key Configuration Files

| File | Purpose |
|---|---|
| `turbo.json` | Pipeline: build → lint → format task graph; TUI enabled by default |
| `pnpm-workspace.yaml` | Workspace package globs |
| `tsconfig.base.json` | Shared TypeScript base (extended by all packages) |
| `config/eslint/index.js` | Base ESLint config (`@repo/eslint-config`) |
| `config/eslint/react.js` | React-specific ESLint additions |
| `config/eslint/astro.js` | Astro-specific ESLint additions |
| `config/prettier/index.js` | Shared Prettier config (`@repo/prettier-config`) |
| `docker-compose.yml` | PostgreSQL 16 service definition |
| `.env.example` | Template for required environment variables |

---

## Design System (`@repo/ui`) — Conventions

The `packages/ui` package is an internal design system built on **Radix UI Primitives**, styled
with **CSS variables (OKLCH) + Tailwind CSS v4**, using **CVA** for variant management.

### Tech Stack Constraints

- **Tailwind CSS v4** — do NOT use the `tailwindcss-animate` plugin or any of its utilities
  (`animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`, etc.). They do not exist in v4.
- Use native Tailwind v4 transition utilities (`transition-*`, `duration-*`, `ease-*`) combined
  with Radix `data-[state=*]:` attribute selectors for all animations.
- **React 19** — destructure `ref` from props. No `forwardRef`, no `React.FC`.
- **No Next.js patterns** — no `"use client"`, no RSC. This is React 19 + Vite.
- **Storybook 8.x** — `preview` file must be `.tsx` (not `.ts`). Use `initialGlobals` instead
  of the deprecated `defaultValue` in `globalTypes`.

### Animation Strategy

Animation approach: **CSS transitions only** (no `motion` library, no `tailwindcss-animate`).

| Element type | Approach |
|---|---|
| Overlays (backdrop) | `transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0` |
| Dialog/AlertDialog content | `transition-all duration-200` + opacity and scale via `data-[state=open/closed]:` |
| Sheet content | `transition-transform duration-300 ease-out` + directional slide via CVA side variants |
| Tooltip content | `transition-opacity duration-150` + `data-[state=delayed-open]:opacity-100` |
| Popover/DropdownMenu/Select content | `transition-opacity duration-200` + `data-[state=open/closed]:` |
| Accordion | CSS `@keyframes` using `--radix-accordion-content-height` |

Radix unmounts overlays from the DOM on close — only enter animations are visible without
`forceMount`. This is acceptable and matches the shadcn/ui approach.

### Radix UI Notes

- **Tooltip** uses `data-[state=delayed-open]` (not `data-[state=open]`) for showing content.
- **Overlays** (Dialog, Sheet, AlertDialog) unmount from DOM on close — exit animations require
  `forceMount` on Portal/Content. Without it, only enter animations play. This is acceptable.
- **Context-only components** (Root, Provider, Portal, Sub) render no DOM element — they can be
  `const` re-exports without function wrapping.
- **All other components** must be wrapped in a function component with `data-slot`, `cn()`,
  and `ref` destructuring, even if they only pass through to the Radix primitive.

### Focus Ring Convention

ALWAYS use `focus-visible:` (never bare `focus:`) for keyboard focus styles.

Standard ring pattern for all interactive elements:

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
```

Never use `focus:outline-none`, `focus:ring-*`, etc. — these trigger on mouse click too.
Never leave `ring-offset-background` without a corresponding `ring-offset-2` (they must pair).

### Semantic HTML Convention

| Element type | Tag | Type base |
|---|---|---|
| Inline (Badge, Label) | `<span>` | `ComponentPropsWithRef<'span'>` |
| Block (Card, Alert) | `<div>` | `ComponentPropsWithRef<'div'>` |
| Interactive (Button) | `<button>` | `ComponentPropsWithRef<'button'>` |
| Text input | `<input>` / `<textarea>` | `ComponentPropsWithRef<'input'>` / `ComponentPropsWithRef<'textarea'>` |

### Component Export Checklist

Every component MUST export:

- [ ] The component function (named export, never default)
- [ ] A `type {ComponentName}Props` for **every** sub-component (e.g. `AlertTitleProps`,
      `AlertDescriptionProps` — not just the root)
- [ ] CVA variants (if applicable) as `{componentName}Variants`
- [ ] All of the above re-exported in the component's `index.ts`
- [ ] All of the above re-exported in `src/index.ts`

### Component Authoring Rules

- `data-slot="{component-name}"` on every rendered DOM element
- `cn()` for class merging on every `className` prop
- Named exports only — never `export default`
- One folder per component (flat structure), co-located stories
- CVA variants exported separately for Tier 2 consumers
- Pass `className` through CVA when using it: `cn(variants({ variant, size, className }))`
  (not `cn(variants({ variant, size }), className)`)

### Story Rules

- **Default stories** MUST use `render: (args) => (...)` with `{...args}` spread so Storybook
  Docs controls work.
- Showcase/gallery stories can use `render: () => (...)`.
- **NEVER** use raw HTML elements (`<input>`, `<label>`, `<button>`) in stories when the design
  system has a corresponding component. Always use `<Input>`, `<Label>`, `<Button>`, etc.

### Three-Tier Consumer Model

| Tier | What | Example |
|---|---|---|
| 1 | Pre-styled components | `<Button variant="outline">` |
| 2 | Exported CVA variants only | `buttonVariants({ variant: 'ghost', size: 'sm' })` |
| 3 | Raw Radix primitives + `cn()` | Full custom composition |

### Bug Fix Protocol

When fixing bugs in the design system:

1. Skip bugs explicitly marked as "false positive" or "acceptable/by-design" — do not touch.
2. Fix in priority order: **Critical > Major > Minor > Nit**.
3. When multiple bugs touch the same file, batch them into one edit session.
4. After all fixes: run `pnpm build --filter @repo/ui`, `pnpm --filter @repo/ui typecheck`,
   and `pnpm --filter @repo/ui storybook:build` before declaring done.

### Phase Completion Criteria

Before marking any implementation phase complete, verify:

1. Every component passes the Component Export Checklist above.
2. Every interactive element uses the Focus Ring Convention above.
3. `pnpm build`, `typecheck`, and `storybook:build` all pass with zero errors.
4. Stories use only design system components (no raw HTML elements).
5. No bare `focus:` pseudo-class anywhere (only `focus-visible:`).
6. All animations follow the Animation Strategy table above.

### Architecture Decision Records

- Keep architecture decisions in `packages/ui/docs/ARCHITECTURE.md` (not temp files).
- When deviating from the original plan, **update the document** with the new decision and
  rationale — never leave stale decisions.
- Tester agents should reference this document, not the original plan.
