# features-collected

A Turborepo monorepo for shipping features fast. Each feature is self-contained with its own frontend (React/Astro) and backend (NestJS), all sharing a common `utils` package.

---

## Project Structure

```
features-collected/
├── turbo.json                    # Turborepo pipeline config
├── tsconfig.base.json            # Shared TypeScript base config
├── pnpm-workspace.yaml           # pnpm workspace + build allow-list
│
├── config/
│   ├── eslint/                   # @repo/eslint-config (base, react, astro)
│   └── prettier/                 # @repo/prettier-config
│
├── utils/                        # @repo/utils — shared hooks, helpers, types
│   └── src/
│       └── index.ts              # Add and export shared code here
│
├── templates/                    # Source templates used by create-feature
│   ├── frontend-react/           # Vite + React + TypeScript
│   ├── frontend-astro/           # Astro + TypeScript
│   └── backend-nestjs/           # NestJS + TypeScript
│
├── scripts/
│   └── create-feature.mjs        # Interactive CLI for scaffolding features
│
└── features/
    └── feature-a/                # Example feature (generated from templates)
        ├── frontend-react/
        ├── frontend-astro/
        └── backend/
```

---

## Prerequisites

- **Node.js** v18 or higher
- **pnpm** v8 or higher

```bash
npm install -g pnpm
```

---

## Setup

```bash
git clone <your-repo-url>
cd features-collected
pnpm install
```

That's it. All workspace packages are linked automatically.

---

## Creating a New Feature

Run the interactive CLI from the root:

```bash
pnpm create-feature
```

You will be asked three questions:

```
  features-collected — create-feature

  Feature name (kebab-case): › payments

  Frontend framework?
    1) React (Vite)
    2) Astro
    3) Both
    4) None
  Enter number(s), comma-separated: 3

  Include NestJS backend? (y/n): y

  Creating feature...

  ✓ features/payments/frontend-react
  ✓ features/payments/frontend-astro
  ✓ features/payments/backend

  Done! Feature "payments" created.

  Next steps:
    pnpm install        # link new packages
    pnpm dev            # start all apps
```

After the CLI finishes, run `pnpm install` to link the new packages into the workspace, then start developing.

---

## Running All Features

From the root, start every app in the workspace in parallel:

```bash
pnpm dev
```

Turborepo runs all `dev` scripts concurrently — React apps, Astro sites, and NestJS backends all start at once.

The TUI (Terminal User Interface) is enabled by default. You will see a sidebar listing all running services — use `↑`/`↓` to cycle through them and view individual logs instead of interleaved output. Press `Ctrl+C` to quit. To fall back to plain streaming logs, pass `--ui stream`.

---

## Running a Single Feature

### Option 1 — filter from root (recommended)

Use Turborepo's `--filter` flag with the package name defined in the feature's `package.json`:

```bash
# Run only the React frontend of feature-a
pnpm dev --filter @repo/feature-a-frontend

# Run only the NestJS backend of feature-a
pnpm dev --filter @repo/feature-a-backend

# Run all packages inside feature-a (frontend + backend)
pnpm dev --filter "@repo/feature-a-*"
```

### Option 2 — cd into the package

```bash
cd features/feature-a/frontend-react
pnpm dev
```

```bash
cd features/feature-a/backend
pnpm dev
```

---

## Building

### Build everything

```bash
pnpm build
```

Turborepo builds packages in the correct dependency order automatically.

### Build a single feature

```bash
pnpm build --filter @repo/payments-frontend
pnpm build --filter @repo/payments-backend

# Build all packages in a feature
pnpm build --filter "@repo/payments-*"
```

Build outputs land in each package's `dist/` directory.

---

## Linting & Formatting

### Run across all packages

```bash
pnpm lint          # check for lint errors
pnpm lint:fix      # auto-fix lint errors

pnpm format        # format all files with Prettier
pnpm format:check  # check formatting without writing
```

### Run for a single feature

```bash
pnpm lint --filter @repo/payments-frontend
pnpm format --filter @repo/payments-backend
```

### Run inside a package directly

```bash
cd features/payments/frontend-react
pnpm lint
pnpm format
```

ESLint rules used across all frontends:

- `@typescript-eslint/recommended` — TypeScript best practices
- `react` + `react-hooks` — React and hooks rules
- `jsx-a11y` — accessibility
- `import/order` — enforced import grouping and ordering
- `eslint-config-prettier` — disables rules that conflict with Prettier

Astro packages additionally use `eslint-plugin-astro`.

---

## Adding Shared Code to Utils

The `utils` package (`@repo/utils`) is available in every feature as a workspace dependency.

**1. Add your code to `utils/src/index.ts`:**

```ts
// utils/src/index.ts

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
}
```

**2. Import it anywhere in the monorepo:**

```ts
// In any frontend or backend package
import { formatDate, type PaginatedResponse } from '@repo/utils'
```

No install or config changes needed — the workspace link is already set up in every feature's `package.json`.

---

## Adding a New Template

If you want to add a new template type (e.g. a React Native app or a tRPC server):

**1. Create the template folder:**

```bash
mkdir -p templates/my-new-template/src
```

**2. Add the template files.** Use `__FEATURE_NAME__` as a placeholder anywhere you need the feature name — in file content and `package.json` name fields:

```json
{
  "name": "@repo/__FEATURE_NAME__-my-type"
}
```

**3. Register it in the CLI** (`scripts/create-feature.mjs`):

Add your new option to the frontend/backend prompt choices and add a `copyDir` call for it in the scaffold section, following the same pattern as the existing templates.

**4. Done.** Running `pnpm create-feature` will now offer the new template as an option.
