# Design Tokens

> Complete reference for `@repo/ui` design tokens: colors, radius, shadows, typography, transitions, and how to use them across code and design tools.

## Overview

Design tokens are the single source of truth for visual style in `@repo/ui`. They are defined as CSS custom properties in `src/tokens/index.css` and mapped into Tailwind v4 utilities via an `@theme inline` block, so every token is available as both a raw variable (`var(--color-primary)`) and a Tailwind class (`bg-primary`, `text-primary-foreground`, etc.).

### Why OKLCH?

All color tokens use the [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) color space. OKLCH is a perceptually uniform color model, meaning equal numeric changes produce equal visual changes. This gives us:

- **Predictable lightness** -- a lightness of `0.5` looks mid-tone regardless of hue.
- **Consistent contrast ratios** -- easier to maintain WCAG compliance across palettes.
- **Future-proof wide-gamut support** -- OKLCH can represent colors outside sRGB on displays that support them.

Neutral tokens (grays) use a chroma of `0`, which collapses OKLCH to a simple lightness scale. The only chromatic token is `--color-destructive` (`oklch(0.577 0.245 27.325)`), a vivid red.

### Theme Switching

Light mode values apply to `:root`. Dark mode values apply when the `.dark` class is present on an ancestor element (typically `<html class="dark">`). All tokens are scoped to CSS custom properties, so switching themes is instantaneous with no flash of unstyled content.

---

## Color Tokens

Every color token defines a foreground/background pair. Use the base token for backgrounds and the `-foreground` variant for text or icons rendered on that background.

| Token Name | CSS Variable | Light OKLCH | Dark OKLCH | Light Hex | Dark Hex | Tailwind Utility |
|---|---|---|---|---|---|---|
| Background | `--color-background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | `#ffffff` | `#0a0a0a` | `bg-background` |
| Foreground | `--color-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | `#0a0a0a` | `#fafafa` | `text-foreground` |
| Surface | `--color-surface` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | `#fafafa` | `#18181b` | `bg-surface` |
| Surface Foreground | `--color-surface-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | `#0a0a0a` | `#fafafa` | `text-surface-foreground` |
| Muted | `--color-muted` | `oklch(0.96 0 0)` | `oklch(0.269 0 0)` | `#f4f4f5` | `#27272a` | `bg-muted` |
| Muted Foreground | `--color-muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | `#71717a` | `#a1a1aa` | `text-muted-foreground` |
| Primary | `--color-primary` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | `#0a0a0a` | `#fafafa` | `bg-primary` |
| Primary Foreground | `--color-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | `#fafafa` | `#18181b` | `text-primary-foreground` |
| Secondary | `--color-secondary` | `oklch(0.96 0 0)` | `oklch(0.269 0 0)` | `#f4f4f5` | `#27272a` | `bg-secondary` |
| Secondary Foreground | `--color-secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | `#18181b` | `#fafafa` | `text-secondary-foreground` |
| Accent | `--color-accent` | `oklch(0.96 0 0)` | `oklch(0.269 0 0)` | `#f4f4f5` | `#27272a` | `bg-accent` |
| Accent Foreground | `--color-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | `#18181b` | `#fafafa` | `text-accent-foreground` |
| Destructive | `--color-destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.577 0.245 27.325)` | `#dc2626` | `#dc2626` | `bg-destructive` |
| Destructive Foreground | `--color-destructive-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | `#fafafa` | `#fafafa` | `text-destructive-foreground` |
| Border | `--color-border` | `oklch(0.87 0 0)` | `oklch(0.35 0 0)` | `#e4e4e7` | `#3f3f46` | `border-border` |
| Border Strong | `--color-border-strong` | `oklch(0.705 0 0)` | `oklch(0.5 0 0)` | `#a1a1aa` | `#52525b` | `border-border-strong` |
| Input | `--color-input` | `oklch(0.87 0 0)` | `oklch(0.35 0 0)` | `#e4e4e7` | `#3f3f46` | `border-input` |
| Ring | `--color-ring` | `oklch(0.556 0 0)` | `oklch(0.556 0 0)` | `#71717a` | `#71717a` | `ring-ring` |
| Overlay | `--color-overlay` | `oklch(0.145 0 0 / 0.6)` | `oklch(0 0 0 / 0.7)` | `#0a0a0a99` | `#000000b3` | `bg-overlay` |

**Usage examples:**

```html
<!-- Primary button -->
<button class="bg-primary text-primary-foreground rounded-lg px-4 py-2">
  Save
</button>

<!-- Destructive action -->
<button class="bg-destructive text-destructive-foreground rounded-lg px-4 py-2">
  Delete
</button>

<!-- Muted helper text -->
<p class="text-muted-foreground">Last updated 3 hours ago</p>

<!-- Card on a surface -->
<div class="bg-surface text-surface-foreground border border-border rounded-xl p-6">
  ...
</div>
```

---

## Radius Tokens

| Token Name | CSS Variable | Value | Pixels | Tailwind Utility |
|---|---|---|---|---|
| Small | `--radius-sm` | `0.25rem` | 4px | `rounded-sm` |
| Default / Medium | `--radius` / `--radius-md` | `0.375rem` | 6px | `rounded-md` |
| Large | `--radius-lg` | `0.5rem` | 8px | `rounded-lg` |
| Extra Large | `--radius-xl` | `0.75rem` | 12px | `rounded-xl` |

The `--radius` and `--radius-md` tokens are aliases for the same value. Components use `--radius-lg` or `--radius-xl` most often; smaller radii are used for badges, chips, and nested elements.

---

## Shadow Tokens

Shadow tokens use OKLCH black with varying alpha for consistency with the color system. In dark mode, shadows are typically invisible against dark backgrounds; consider using border or surface elevation instead.

| Token Name | CSS Variable | Value | Tailwind Utility |
|---|---|---|---|
| Small | `--shadow-sm` | `0 1px 2px 0 oklch(0 0 0 / 0.04)` | `shadow-sm` |
| Default | `--shadow` | `0 1px 3px 0 oklch(0 0 0 / 0.07), 0 1px 2px -1px oklch(0 0 0 / 0.07)` | `shadow` |
| Medium | `--shadow-md` | `0 4px 6px -1px oklch(0 0 0 / 0.07), 0 2px 4px -2px oklch(0 0 0 / 0.07)` | `shadow-md` |
| Large | `--shadow-lg` | `0 10px 15px -3px oklch(0 0 0 / 0.07), 0 4px 6px -4px oklch(0 0 0 / 0.07)` | `shadow-lg` |

---

## Typography Tokens

| Token Name | CSS Variable | Value | Tailwind Utility |
|---|---|---|---|
| Sans (default) | `--font-sans` | `'Inter', ui-sans-serif, system-ui, sans-serif` | `font-sans` |
| Monospace | `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | `font-mono` |

`Inter` and `JetBrains Mono` are the primary typefaces. The fallback stacks ensure acceptable rendering when web fonts have not loaded or are unavailable.

---

## Transition Tokens

All transitions use the same easing function -- `cubic-bezier(0.16, 1, 0.3, 1)` -- which produces a quick start with a gentle deceleration (ease-out character).

| Token Name | CSS Variable | Duration | Easing | Tailwind Utility |
|---|---|---|---|---|
| Fast | `--transition-fast` | 150ms | `cubic-bezier(0.16, 1, 0.3, 1)` | `transition-fast` |
| Normal | `--transition-normal` | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | `transition-normal` |
| Slow | `--transition-slow` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | `transition-slow` |

### Animation Tokens

| Token Name | CSS Variable | Value |
|---|---|---|
| Accordion Down | `--animate-accordion-down` | `accordion-down 200ms ease-out` |
| Accordion Up | `--animate-accordion-up` | `accordion-up 200ms ease-out` |

The `accordion-down` and `accordion-up` keyframes are defined alongside the tokens and animate height from `0` to `var(--radix-accordion-content-height)` (and the reverse).

---

## Customization

Tokens are plain CSS custom properties. Override them by redefining the variables in a stylesheet that loads after `@repo/ui`.

### Override in your app's global CSS

```css
/* app/globals.css */
@import '@repo/ui/styles';

:root {
  /* Swap the primary color to indigo */
  --color-primary: oklch(0.55 0.22 264);
  --color-primary-foreground: oklch(0.985 0 0);

  /* Tighten the default radius */
  --radius: 0.25rem;
  --radius-md: 0.25rem;
}

.dark {
  --color-primary: oklch(0.75 0.18 264);
  --color-primary-foreground: oklch(0.145 0 0);
}
```

### Override via inline styles (one-off)

```html
<div style="--color-primary: oklch(0.6 0.2 150)">
  <Button>Green Primary</Button>
</div>
```

### Override per-component with Tailwind

Because tokens map directly to Tailwind utilities, you can also override at the element level:

```html
<Button className="bg-[oklch(0.6_0.2_150)] text-white">
  Custom green
</Button>
```

### Guidelines

- Always define both `:root` and `.dark` overrides to maintain theme parity.
- When overriding color tokens, keep the foreground/background pairing -- ensure sufficient contrast (aim for WCAG AA, 4.5:1 for normal text).
- Radius overrides propagate to all components automatically since components reference the tokens, not hard-coded values.

---

## Transferring Tokens to Figma

This section provides three approaches for bringing `@repo/ui` tokens into Figma so that design and code stay in sync.

### OKLCH to Hex Conversion Reference

Figma does not natively support OKLCH values. Use this table to convert every OKLCH token to its sRGB hex equivalent.

| OKLCH Value | Hex | Description |
|---|---|---|
| `oklch(1 0 0)` | `#ffffff` | Pure white |
| `oklch(0.985 0 0)` | `#fafafa` | Near white |
| `oklch(0.96 0 0)` | `#f4f4f5` | Light gray |
| `oklch(0.87 0 0)` | `#e4e4e7` | Border gray (light) |
| `oklch(0.708 0 0)` | `#a1a1aa` | Mid gray |
| `oklch(0.705 0 0)` | `#a1a1aa` | Mid gray (alias) |
| `oklch(0.556 0 0)` | `#71717a` | Muted text gray |
| `oklch(0.5 0 0)` | `#52525b` | Dark mid gray |
| `oklch(0.35 0 0)` | `#3f3f46` | Border gray (dark) |
| `oklch(0.269 0 0)` | `#27272a` | Dark surface |
| `oklch(0.205 0 0)` | `#18181b` | Near black |
| `oklch(0.145 0 0)` | `#0a0a0a` | App black |
| `oklch(0 0 0)` | `#000000` | Pure black |
| `oklch(0.577 0.245 27.325)` | `#dc2626` | Destructive red |

For alpha values (overlay tokens), append the alpha channel as a two-digit hex suffix: `#0a0a0a99` for 60% opacity, `#000000b3` for 70% opacity.

---

### Option A: Figma Variables (Manual)

Figma Variables (introduced in Figma mid-2023) are the recommended native approach. They support modes (Light/Dark), scoping, and can be bound directly to component properties.

#### Step 1: Create a Variable Collection

1. Open your Figma design file.
2. Open the **Variables** panel (right sidebar, or via the menu: **Plugins > Variables**).
3. Click **Create collection** and name it `Design System`.

#### Step 2: Add Modes

1. In the `Design System` collection header, click the `+` next to the default mode name.
2. Rename the two modes to `Light` and `Dark`.

#### Step 3: Add Color Variables

Create one variable per token. Set the type to **Color** and enter the hex value for each mode.

| Variable Name | Type | Light Value | Dark Value |
|---|---|---|---|
| `color/background` | Color | `#ffffff` | `#0a0a0a` |
| `color/foreground` | Color | `#0a0a0a` | `#fafafa` |
| `color/surface` | Color | `#fafafa` | `#18181b` |
| `color/surface-foreground` | Color | `#0a0a0a` | `#fafafa` |
| `color/muted` | Color | `#f4f4f5` | `#27272a` |
| `color/muted-foreground` | Color | `#71717a` | `#a1a1aa` |
| `color/primary` | Color | `#0a0a0a` | `#fafafa` |
| `color/primary-foreground` | Color | `#fafafa` | `#18181b` |
| `color/secondary` | Color | `#f4f4f5` | `#27272a` |
| `color/secondary-foreground` | Color | `#18181b` | `#fafafa` |
| `color/accent` | Color | `#f4f4f5` | `#27272a` |
| `color/accent-foreground` | Color | `#18181b` | `#fafafa` |
| `color/destructive` | Color | `#dc2626` | `#dc2626` |
| `color/destructive-foreground` | Color | `#fafafa` | `#fafafa` |
| `color/border` | Color | `#e4e4e7` | `#3f3f46` |
| `color/border-strong` | Color | `#a1a1aa` | `#52525b` |
| `color/input` | Color | `#e4e4e7` | `#3f3f46` |
| `color/ring` | Color | `#71717a` | `#71717a` |
| `color/overlay` | Color | `#0a0a0a` (60% opacity) | `#000000` (70% opacity) |

For the overlay token, set the hex color and then reduce the opacity in the color picker to 60% (Light) or 70% (Dark).

#### Step 4: Add Radius Variables

Create number variables for border radius. These do not need modes.

| Variable Name | Type | Value |
|---|---|---|
| `radius/sm` | Number | `4` |
| `radius/md` | Number | `6` |
| `radius/lg` | Number | `8` |
| `radius/xl` | Number | `12` |

#### Step 5: Apply Variables to Components

1. Select a frame or component.
2. In the **Fill** section, click the color swatch, then click the **Variables** icon (diamond shape).
3. Choose the appropriate variable (e.g., `color/primary`).
4. For border radius, select the element, click the radius field, then click the **Variables** icon and bind it to `radius/lg`.

When you switch the page or section mode between `Light` and `Dark`, all bound colors update automatically.

#### Step 6: Scope Variables (Optional)

Right-click a variable and select **Edit variable**. Under **Scoping**, restrict where the variable can be applied:

- Color tokens ending in `-foreground`: scope to **Text** fills.
- `color/border`, `color/border-strong`, `color/input`: scope to **Stroke**.
- `color/ring`: scope to **Stroke** and **Effects**.
- All other color tokens: scope to **Frame** fills.

This prevents accidental misuse (e.g., using a background color for text).

---

### Option B: Tokens Studio Plugin

[Tokens Studio](https://tokens.studio/) (formerly Figma Tokens) is a Figma plugin that manages design tokens as structured JSON. It supports themes, token aliasing, and can sync with external sources (GitHub, GitLab, JSONBin, etc.).

#### Step 1: Install the Plugin

1. In Figma, go to **Community > Plugins**.
2. Search for **Tokens Studio for Figma**.
3. Click **Install** (or **Try it out** to run once).

#### Step 2: Create the Token JSON

Open Tokens Studio and switch to JSON edit mode. Paste the following structure, which follows the [Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/) format:

```json
{
  "color": {
    "background": {
      "$type": "color",
      "$value": "{color.background}",
      "$extensions": {
        "mode": {
          "Light": "#ffffff",
          "Dark": "#0a0a0a"
        }
      }
    },
    "foreground": {
      "$type": "color",
      "$value": "{color.foreground}",
      "$extensions": {
        "mode": {
          "Light": "#0a0a0a",
          "Dark": "#fafafa"
        }
      }
    },
    "surface": {
      "$type": "color",
      "$value": "{color.surface}",
      "$extensions": {
        "mode": {
          "Light": "#fafafa",
          "Dark": "#18181b"
        }
      }
    },
    "surface-foreground": {
      "$type": "color",
      "$value": "{color.surface-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#0a0a0a",
          "Dark": "#fafafa"
        }
      }
    },
    "muted": {
      "$type": "color",
      "$value": "{color.muted}",
      "$extensions": {
        "mode": {
          "Light": "#f4f4f5",
          "Dark": "#27272a"
        }
      }
    },
    "muted-foreground": {
      "$type": "color",
      "$value": "{color.muted-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#71717a",
          "Dark": "#a1a1aa"
        }
      }
    },
    "primary": {
      "$type": "color",
      "$value": "{color.primary}",
      "$extensions": {
        "mode": {
          "Light": "#0a0a0a",
          "Dark": "#fafafa"
        }
      }
    },
    "primary-foreground": {
      "$type": "color",
      "$value": "{color.primary-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#fafafa",
          "Dark": "#18181b"
        }
      }
    },
    "secondary": {
      "$type": "color",
      "$value": "{color.secondary}",
      "$extensions": {
        "mode": {
          "Light": "#f4f4f5",
          "Dark": "#27272a"
        }
      }
    },
    "secondary-foreground": {
      "$type": "color",
      "$value": "{color.secondary-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#18181b",
          "Dark": "#fafafa"
        }
      }
    },
    "accent": {
      "$type": "color",
      "$value": "{color.accent}",
      "$extensions": {
        "mode": {
          "Light": "#f4f4f5",
          "Dark": "#27272a"
        }
      }
    },
    "accent-foreground": {
      "$type": "color",
      "$value": "{color.accent-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#18181b",
          "Dark": "#fafafa"
        }
      }
    },
    "destructive": {
      "$type": "color",
      "$value": "{color.destructive}",
      "$extensions": {
        "mode": {
          "Light": "#dc2626",
          "Dark": "#dc2626"
        }
      }
    },
    "destructive-foreground": {
      "$type": "color",
      "$value": "{color.destructive-foreground}",
      "$extensions": {
        "mode": {
          "Light": "#fafafa",
          "Dark": "#fafafa"
        }
      }
    },
    "border": {
      "$type": "color",
      "$value": "{color.border}",
      "$extensions": {
        "mode": {
          "Light": "#e4e4e7",
          "Dark": "#3f3f46"
        }
      }
    },
    "border-strong": {
      "$type": "color",
      "$value": "{color.border-strong}",
      "$extensions": {
        "mode": {
          "Light": "#a1a1aa",
          "Dark": "#52525b"
        }
      }
    },
    "input": {
      "$type": "color",
      "$value": "{color.input}",
      "$extensions": {
        "mode": {
          "Light": "#e4e4e7",
          "Dark": "#3f3f46"
        }
      }
    },
    "ring": {
      "$type": "color",
      "$value": "{color.ring}",
      "$extensions": {
        "mode": {
          "Light": "#71717a",
          "Dark": "#71717a"
        }
      }
    },
    "overlay": {
      "$type": "color",
      "$value": "{color.overlay}",
      "$extensions": {
        "mode": {
          "Light": "rgba(10, 10, 10, 0.6)",
          "Dark": "rgba(0, 0, 0, 0.7)"
        }
      }
    }
  },
  "radius": {
    "sm": {
      "$type": "dimension",
      "$value": "4px"
    },
    "md": {
      "$type": "dimension",
      "$value": "6px"
    },
    "lg": {
      "$type": "dimension",
      "$value": "8px"
    },
    "xl": {
      "$type": "dimension",
      "$value": "12px"
    }
  },
  "shadow": {
    "sm": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "0px",
          "offsetY": "1px",
          "blur": "2px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.04)"
        }
      ]
    },
    "default": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "0px",
          "offsetY": "1px",
          "blur": "3px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.07)"
        },
        {
          "offsetX": "0px",
          "offsetY": "1px",
          "blur": "2px",
          "spread": "-1px",
          "color": "rgba(0, 0, 0, 0.07)"
        }
      ]
    },
    "md": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "0px",
          "offsetY": "4px",
          "blur": "6px",
          "spread": "-1px",
          "color": "rgba(0, 0, 0, 0.07)"
        },
        {
          "offsetX": "0px",
          "offsetY": "2px",
          "blur": "4px",
          "spread": "-2px",
          "color": "rgba(0, 0, 0, 0.07)"
        }
      ]
    },
    "lg": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "0px",
          "offsetY": "10px",
          "blur": "15px",
          "spread": "-3px",
          "color": "rgba(0, 0, 0, 0.07)"
        },
        {
          "offsetX": "0px",
          "offsetY": "4px",
          "blur": "6px",
          "spread": "-4px",
          "color": "rgba(0, 0, 0, 0.07)"
        }
      ]
    }
  },
  "font": {
    "sans": {
      "$type": "fontFamily",
      "$value": "'Inter', ui-sans-serif, system-ui, sans-serif"
    },
    "mono": {
      "$type": "fontFamily",
      "$value": "'JetBrains Mono', ui-monospace, monospace"
    }
  }
}
```

#### Step 3: Configure Themes

In Tokens Studio:

1. Go to the **Themes** tab.
2. Create two themes: `Light` and `Dark`.
3. For each theme, set the corresponding mode values from the `$extensions.mode` entries.
4. When you activate a theme, Tokens Studio applies those values to your Figma document.

#### Step 4: Apply Tokens to Layers

1. Select a layer in Figma.
2. Open Tokens Studio.
3. Click a token to apply it. Color tokens apply to fills by default; right-click for stroke, text, or other properties.
4. Shadow tokens apply as drop shadows on the selected layer.

#### Step 5: Sync with Source Control (Optional)

Tokens Studio supports syncing token JSON to GitHub, GitLab, or a custom URL. Point it at a `tokens.json` file in your repository so that token updates in code automatically propagate to the Figma file (and vice versa).

---

### Option C: Script-based / API

For teams that need automated, repeatable synchronization between CSS tokens and Figma, a script-based approach is the most maintainable long-term solution.

#### Concept: CSS-to-JSON Parser

The following Node.js script concept reads `src/tokens/index.css`, extracts custom properties, converts OKLCH to hex, and outputs a JSON file compatible with Tokens Studio or the Figma REST API.

```js
// scripts/export-tokens.mjs
//
// Concept script -- parse CSS custom properties and emit
// a Figma-compatible token JSON file.
//
// Dependencies:
//   npm install culori

import { readFileSync, writeFileSync } from 'node:fs';
import { formatHex, parse } from 'culori';

const css = readFileSync('src/tokens/index.css', 'utf-8');

/**
 * Extract all --color-* custom properties from a CSS block.
 * Returns an array of { name, value } objects.
 */
function extractTokens(css, selector) {
  const regex = new RegExp(
    `${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]+)\\}`,
    'g'
  );
  const match = regex.exec(css);
  if (!match) return [];

  const block = match[1];
  const propRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  const tokens = [];
  let m;
  while ((m = propRegex.exec(block)) !== null) {
    tokens.push({ name: m[1], value: m[2].trim() });
  }
  return tokens;
}

/**
 * Convert an OKLCH string to hex. Falls back to the raw value
 * if parsing fails (e.g., for non-color tokens).
 */
function toHex(oklchValue) {
  const color = parse(oklchValue);
  if (!color) return oklchValue;
  return formatHex(color);
}

const lightTokens = extractTokens(css, ':root');
const darkTokens = extractTokens(css, '.dark');

const darkMap = Object.fromEntries(
  darkTokens.map((t) => [t.name, t.value])
);

const output = {};

for (const token of lightTokens) {
  if (!token.name.startsWith('color-')) continue;

  const key = token.name; // e.g. "color-background"
  output[key] = {
    $type: 'color',
    $value: {
      Light: toHex(token.value),
      Dark: toHex(darkMap[key] || token.value),
    },
  };
}

writeFileSync(
  'tokens.json',
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log('Wrote tokens.json with %d color tokens', Object.keys(output).length);
```

Run with:

```bash
node scripts/export-tokens.mjs
```

#### Figma REST API

The [Figma Variables REST API](https://www.figma.com/developers/api#variables) allows programmatic creation and updating of variables in a Figma file. The workflow is:

1. Generate `tokens.json` using the script above.
2. Use the Figma API endpoints:
   - `POST /v1/files/:fileKey/variables` -- create variable collections and variables.
   - `POST /v1/files/:fileKey/variables/modes` -- set mode values (Light/Dark).
3. Authenticate with a Figma personal access token.

Example API call to create a variable:

```bash
curl -X POST "https://api.figma.com/v1/files/FILE_KEY/variables" \
  -H "X-Figma-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "variableCollections": [
      {
        "action": "CREATE",
        "id": "temp-collection-id",
        "name": "Design System",
        "initialModeId": "temp-light-mode"
      }
    ],
    "variableModes": [
      {
        "action": "CREATE",
        "id": "temp-light-mode",
        "name": "Light",
        "variableCollectionId": "temp-collection-id"
      },
      {
        "action": "CREATE",
        "id": "temp-dark-mode",
        "name": "Dark",
        "variableCollectionId": "temp-collection-id"
      }
    ],
    "variables": [
      {
        "action": "CREATE",
        "id": "temp-var-bg",
        "name": "color/background",
        "variableCollectionId": "temp-collection-id",
        "resolvedType": "COLOR",
        "codeSyntax": {
          "WEB": "--color-background"
        }
      }
    ],
    "variableModeValues": [
      {
        "variableId": "temp-var-bg",
        "modeId": "temp-light-mode",
        "value": { "r": 1, "g": 1, "b": 1, "a": 1 }
      },
      {
        "variableId": "temp-var-bg",
        "modeId": "temp-dark-mode",
        "value": { "r": 0.039, "g": 0.039, "b": 0.039, "a": 1 }
      }
    ]
  }'
```

The `codeSyntax.WEB` field links the Figma variable back to the CSS custom property name, visible in Figma's Dev Mode.

#### Style Dictionary

[Style Dictionary](https://amzn.github.io/style-dictionary/) is an open-source tool by Amazon for transforming design tokens across platforms. You can:

1. Define tokens in a `tokens.json` source file (the DTCG JSON from Option B works).
2. Configure Style Dictionary to output:
   - CSS custom properties (already the source of truth in `@repo/ui`).
   - Figma-compatible JSON for Tokens Studio import.
   - iOS/Android values if needed in the future.

Example `config.json`:

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "src/tokens/",
      "files": [
        {
          "destination": "generated.css",
          "format": "css/variables"
        }
      ]
    },
    "figma": {
      "transformGroup": "js",
      "buildPath": "figma/",
      "files": [
        {
          "destination": "figma-tokens.json",
          "format": "json/nested"
        }
      ]
    }
  }
}
```

This creates a bidirectional pipeline: token changes in code generate Figma-importable JSON, and token changes in Figma (via Tokens Studio sync) can generate updated CSS.

---

## Related

- [`src/tokens/index.css`](../src/tokens/index.css) -- token definitions (source of truth).
- [`src/styles/globals.css`](../src/styles/globals.css) -- global stylesheet that imports tokens and sets up Tailwind.
- [OKLCH Color Picker](https://oklch.com/) -- interactive tool for exploring and converting OKLCH colors.
- [Figma Variables documentation](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) -- official guide.
- [Tokens Studio documentation](https://docs.tokens.studio/) -- plugin docs.
- [Style Dictionary](https://amzn.github.io/style-dictionary/) -- multi-platform token transformer.
- [Design Tokens Community Group spec](https://tr.designtokens.org/format/) -- the W3C draft format used in the JSON examples above.
