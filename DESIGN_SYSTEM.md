# SM Design System

The website uses two CSS layers:

1. `design-system.css` — brand tokens, themes, layout primitives, accessibility, buttons, and fields.
2. `styles.css` — page-specific compositions and one-off visual treatments.

## Change the brand globally

Edit the raw palette and semantic aliases in `:root` inside `design-system.css`.

- `--accent`: primary interactive color
- `--ink`: primary foreground
- `--paper`: page background
- `--panel`: elevated surface
- `--muted`: secondary text
- `--line`: grid and border color
- `--size-content`: narrow content width
- `--size-shell`: main page width
- `--section-space` and `--section-pad`: vertical rhythm

Dark mode uses the same semantic tokens under `body.dark`, so components do not need theme-specific colors.

## Components

### Buttons

```html
<a class="ds-button" href="#">Primary</a>
<button class="ds-button ds-button--secondary">Secondary</button>
<button class="ds-button ds-button--ghost">Ghost</button>
<button class="ds-button ds-button--accent">Accent</button>
<button class="ds-button ds-button--icon" aria-label="Download">↓</button>
```

Legacy `.site-button` uses the same component rules, so current pages remain compatible.

### Fields

```html
<label class="ds-field">
  Email
  <input class="ds-input" type="email" />
</label>
```

### Layout primitives

- `.ds-container` — centered `1150px` site shell
- `.ds-content` — centered `760px` reading width
- `.ds-stack` — vertical layout using `--stack-gap`
- `.ds-cluster` — wrapping horizontal actions using `--cluster-gap`
- `.ds-grid` — grid using `--grid-gap`
- `.ds-surface` — themed panel and border
- `.ds-rule-block` / `.ds-rule-inline` — shared grid lines

## Rules for new components

- Consume semantic tokens; never hardcode the main brand colors.
- Use the 4px spacing scale.
- Reuse `.ds-button` and `.ds-input` rather than redefining control states.
- Put reusable primitives in `design-system.css`; keep page compositions in `styles.css`.
- Include hover, focus-visible, disabled, dark mode, and mobile behavior.
