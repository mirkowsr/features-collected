# Dark Mode

> Class-based dark mode driven by OKLCH token overrides -- toggle `.dark` on any ancestor element to switch the entire subtree.

## Overview

`@repo/ui` supports dark mode through a CSS-class strategy. Adding the `.dark` class to any
parent element causes all CSS custom properties to be overridden with their dark counterparts.
Because every component is styled through Tailwind utilities that reference these tokens
(`bg-background`, `text-foreground`, `border-border`, etc.), the entire UI adapts automatically
without any component-level changes.

This approach is framework-agnostic. It works with any rendering strategy -- server-rendered HTML,
client-side React, static builds -- as long as the `.dark` class is present in the DOM ancestry.

## How It Works

The token stylesheet (`src/tokens/index.css`) defines two sets of values inside `@layer base`:

```css
@layer base {
  :root {
    /* Light mode tokens */
    --color-background: oklch(1 0 0);          /* pure white */
    --color-foreground: oklch(0.145 0 0);      /* near black */
    --color-surface: oklch(0.985 0 0);
    --color-muted: oklch(0.96 0 0);
    --color-primary: oklch(0.145 0 0);
    --color-border: oklch(0.87 0 0);
    --color-overlay: oklch(0.145 0 0 / 0.6);
    /* ... all other tokens ... */
  }

  .dark {
    /* Dark mode overrides */
    --color-background: oklch(0.145 0 0);      /* near black */
    --color-foreground: oklch(0.985 0 0);      /* near white */
    --color-surface: oklch(0.205 0 0);
    --color-muted: oklch(0.269 0 0);
    --color-primary: oklch(0.985 0 0);
    --color-border: oklch(0.35 0 0);
    --color-overlay: oklch(0 0 0 / 0.7);
    /* ... all other tokens ... */
  }
}
```

When `.dark` is present on an ancestor, CSS specificity causes the `.dark` block to override
`:root`. The `@theme inline` directive maps these variables into Tailwind utility classes, so
`bg-background` automatically resolves to the active value -- light or dark -- depending on which
set of tokens is in scope.

Some components additionally use Tailwind's `dark:` variant modifier for fine-grained adjustments
that go beyond a simple token swap.

## Toggling Dark Mode

The UI package does not ship a theme toggle -- that is the consumer app's responsibility. Below
are four common approaches, from simplest to most complete.

### Class Toggle

The minimal approach. Directly toggle the `.dark` class on the document root:

```tsx
// Toggle dark mode on/off
document.documentElement.classList.toggle('dark')
```

This is all that is needed for the tokens to switch. Every component within the page will
respond immediately.

### React State

Wrap your app in a container that applies `.dark` based on React state:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-background text-foreground min-h-screen">
        {children}
      </div>
    </div>
  )
}
```

Pass `setTheme` through context or props so child components can trigger the switch.

### System Preference

Detect the operating system's preferred color scheme and react to changes:

```tsx
function useSystemTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return theme
}
```

The SSR guard (`typeof window === 'undefined'`) ensures this works in server-rendered contexts
without crashing.

### Persisted Preference

Combine system preference detection with `localStorage` so the user's choice survives page
reloads:

```tsx
function usePersistedTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return [theme, setTheme] as const
}
```

This is the recommended approach for production apps. It respects the system default on first
visit, then persists any manual override.

## Storybook Preview

Storybook includes a toolbar toggle for switching between light and dark mode during development.
The configuration lives in `.storybook/preview.tsx`.

A `globalTypes.theme` entry adds sun/moon icons to the Storybook toolbar. A decorator wraps every
story in a container that conditionally applies the `.dark` class:

```tsx
decorators: [
  (Story, context) => {
    const theme = context.globals['theme'] || 'light'
    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="bg-background text-foreground p-8 min-h-[200px]">
          <Story />
        </div>
      </div>
    )
  },
],
```

The default is `light`. Click the moon icon in the toolbar to switch to dark mode -- all stories
will re-render with dark tokens applied.

## Design Considerations

- **No `next-themes`** -- this monorepo uses React 19 + Vite, not Next.js. The `.dark` class
  approach was chosen for simplicity and framework-agnosticism.
- **Token parity** -- every light-mode token has a carefully designed dark counterpart. See
  [design-tokens.md](./design-tokens.md) for the full value table.
- **Shadows** -- shadow tokens shift to deeper blacks with higher opacity in dark mode (e.g.
  `0.07` in light becomes `0.3`--`0.4` in dark) so shadows remain visible against dark
  backgrounds.
- **Overlay** -- the overlay token increases from 60% black (`oklch(0.145 0 0 / 0.6)`) in light
  mode to 70% pure black (`oklch(0 0 0 / 0.7)`) in dark mode for stronger backdrop contrast.
- **Scoped switching** -- because `.dark` is class-based, you can scope dark mode to a subtree
  rather than the entire page. This is useful for preview panels or split-view editors.

## Related

- [getting-started.md](./getting-started.md) -- Installation, setup, and basic usage
- [design-tokens.md](./design-tokens.md) -- Token naming, OKLCH values, and semantic layers
- [three-tier-model.md](./three-tier-model.md) -- Component architecture (primitive, styled, composed)
