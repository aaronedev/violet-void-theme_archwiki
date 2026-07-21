# Void Reading Surface Design Specification

## Subject and job

Violet Void is a reading theme for the ArchWiki, a technical reference used by Arch Linux users while installing, repairing, and configuring systems. The article page has one primary job: let a reader scan structure quickly, find a command or warning, and read the surrounding explanation reliably.

The theme must continue to look unmistakably like Violet Void while preserving the familiar ArchWiki information architecture. It is a disciplined technical reading surface, not a promotional page and not a terminal emulator.

## Approved direction

Use **Void as an instrument panel**: quiet black and charcoal reading surfaces, restrained structural borders, a single violet navigation signal, and terminal colours reserved for semantic content such as commands, success, warnings, and destructive states.

The implementation is deliberately targeted:

- Restore the article body and remove accidental Vector controls before making aesthetic refinements.
- Keep the desktop article and its left table of contents stable and familiar.
- Make the offline, `client-nojs` mobile table of contents compact and scrollable.
- Flatten primary reading surfaces—ordinary wiki tables and article message boxes—without changing modal, popover, dropdown, or other intentionally elevated surfaces.
- Strengthen the heading hierarchy with one violet signal rule rather than adding glows or decorative gradients throughout the page.
- Reduce passive link brightness while retaining terminal colours for package, manual-page, status, and code semantics.

## Rejected alternatives

### Global token flattening

Changing the shared radius or shadow tokens would affect dialogs, menus, dropdowns, badges, form controls, and unrelated site surfaces. That is too broad for a reading-surface refinement and would make regressions difficult to localize. The implementation must override radius, shadow, and gradient only on the named primary reading components.

### Full retro-terminal reskin

Turning every heading, link, border, and panel into bright monospace terminal chrome would weaken long-form readability and erase ArchWiki familiarity. Monospace remains a utility language for commands, code, values, and compact technical labels. Article prose and headings remain sans-serif.

## Compact palette

| Role | Value | Use |
| --- | --- | --- |
| Void | `#0f0f0f` | Deepest page and control background |
| Base | `#181818` | Main article and primary reading surface |
| Raised | `#202020` | Intentionally elevated surfaces and subdued table headers |
| Text | `#e7e7e7` | Primary prose and heading text |
| Muted Link | `#b3a7d8` | Ordinary article and navigation links |
| Signal Violet | `#8950c7` | Active navigation, focus, heading rule, and selected state |

Existing terminal colours remain available for their current semantic roles. They must not replace Muted Link for ordinary article navigation.

## Typography

- Body and headings: `Inter`, followed by the existing system sans-serif stack. Body copy prioritizes density and legibility; headings use weight, spacing, and rules to make long technical articles scannable.
- Utility and code: `JetBrains Mono`, then `Fira Code`, `Source Code Pro`, and the existing monospace fallbacks. Use this role for commands, code blocks, package-like values, and technical utility labels.
- `h1`: strongest title treatment, primary text, and the one solid Signal Violet rule.
- `h2`: clear section break with a thinner, muted violet border and tighter spacing than `h1`.
- `h3`–`h6`: typographic hierarchy only; no competing decorative rules.

## Layout concept

Desktop keeps the recognizable ArchWiki reading relationship: a restrained left table of contents beside a stable article column.

```text
┌──────────────────────────────────────────────────────────────┐
│ Arch navigation                                             │
├──────────────┬───────────────────────────────────────────────┤
│ Contents     │ Article title                                │
│ section      │ ━━━━━━━━━━━━━━━━━ Signal Violet              │
│ subsection   │ Lead, commands, tables, and notices          │
│ section      │                                               │
│              │ Section                                      │
│              │ ───────────────── muted violet rule           │
└──────────────┴───────────────────────────────────────────────┘
```

On narrow `client-nojs` pages, the title-bar table of contents becomes a compact disclosure. Its panel is constrained to the viewport, capped in height, and independently scrollable; it must not consume the full article viewport.

```text
┌──────────────────────────┐
│ Article title        [≡] │
│ ━━━━━━━━━━━━━━━━━━━━━━━  │
│ ┌ Contents ────────────┐ │
│ │ section             ││ │
│ │ subsection          ││ │
│ │ … scroll …          ││ │
│ └─────────────────────┘│ │
│ Article prose           │
└──────────────────────────┘
```

## Signature

The signature is one solid Signal Violet heading rule. It marks the article entrance and establishes direction without surrounding every container in violet glow. Secondary section rules are thinner and lower-contrast so they support the signature instead of competing with it.

## Confirmed root causes

The offline ArchWiki captures exposed four concrete cascade and rendering defects:

1. In `src/components/modern-css.styl`, the `reading-progress` scroll animation is applied directly to `.mw-parser-output`. Its `from` keyframe sets `transform: scaleX(0)`, so the article content itself can be painted at zero horizontal scale. Reading progress must never transform the content container.
2. In `src/components/ui-components.styl`, the generic `input[type="checkbox"]` rule catches Vector’s `.vector-dropdown-checkbox` inputs. Vector uses those inputs as invisible dropdown state controls; the theme gives them a 16px background and border, producing empty outlined squares.
3. Upstream Vector table-of-contents rules use breaking behavior that permits mid-word wrapping. The theme must explicitly restore `word-break: normal` and `overflow-wrap: normal` for TOC text, using sufficient cascade strength.
4. Upstream important link declarations win over the theme’s ordinary link colour. The theme needs a focused important selector for article links, followed by equally focused semantic exceptions for package and manual-page links.

These are root-cause fixes. `content-visibility` and containment may remain unless measured evidence shows a separate problem after the scroll transform is removed.

## Component treatment

### Article and links

- `.mw-parser-output` must have non-zero width and must not receive `animation-name: reading-progress` or an equivalent scale transform.
- Ordinary article links use Muted Link with an important theme selector strong enough to beat upstream Vector rules.
- Package and manual-page links preserve their terminal-green semantic treatment with equal or greater specificity.
- Hover and focus remain visibly distinct. Focus uses Signal Violet and must not depend on colour alone.

### Vector dropdown controls

- Generic themed checkbox rules must exclude `.vector-dropdown-checkbox`.
- The excluded Vector input must retain its upstream invisible hit-area behavior; it must not gain a visible border, background, check mark, or 16px fixed box.
- Ordinary checkboxes and radio buttons retain the existing Violet Void styling.

### Table of contents

- TOC words wrap only at normal word boundaries.
- A TOC link receives extra start padding only when its list item actually contains a toggle control. Leaf entries must not reserve empty toggle space.
- Desktop TOC width and article relationship remain stable.
- At the existing small breakpoint, `html.client-nojs` title-bar TOC content uses `width: min(22rem, calc(100vw - 2rem))`, `max-height: min(60vh, 28rem)`, and vertical scrolling.
- Touch targets remain at least 24px high; keyboard focus remains visible.

### Primary tables

- `.wikitable` keeps Base cells, Raised headers, subtle borders, zebra differentiation, and violet row hover.
- The primary `.wikitable` surface uses no gradient, no box shadow, and no card-like outer rounding.
- Infoboxes, security tracker tables, responsive data-table utilities, dialogs, dropdowns, and modals are outside this flattening change unless they already inherit a corrected `.wikitable` rule.

### Primary message boxes

- `.ambox`, `.ombox`, `.imbox`, and `.tmbox` use a flat low-opacity semantic fill, a subtle boundary, and their existing semantic left rail where present.
- Those four primary message surfaces use no gradient and no box shadow.
- Their semantic colour families remain intact: violet/information, red/serious, magenta/content, yellow/style, cyan/move, green/license, and muted/protection.
- Inline citation markers, tooltip overlays, category/footer boxes, dialogs, dropdowns, and modal/elevated surfaces retain their existing treatment.

## Behavior requirements

- The article body renders at desktop and mobile widths without requiring JavaScript.
- Offline pages served from `/usr/share/doc/arch-wiki/html` remain usable despite missing live MediaWiki behavior.
- TOC disclosures keep their checkbox-driven Vector behavior while the state input remains visually invisible.
- The mobile TOC scrolls internally and never creates horizontal viewport overflow.
- Reduced-motion users receive no new animation. Removing the article transform improves that baseline.
- Print behavior continues to use the existing print-specific message and table rules.

## Accessibility

- Text and Muted Link must maintain readable contrast against Base; Muted Link `#b3a7d8` is intentionally less luminous than the former passive link colour while remaining clearly distinguishable.
- Signal Violet is never the only indication of keyboard focus; the existing outline geometry remains.
- Active TOC state combines colour with weight or position.
- Message types retain text/icon context and a structural rail or border, not colour alone.
- Normal word wrapping prevents narrow TOC columns from becoming character fragments.
- The mobile TOC is keyboard reachable, scrollable, and constrained without clipping focused items.

## Testing and acceptance

### Build contracts

The canonical built UserCSS must be tested for these durable source-to-output contracts:

- No `reading-progress` animation declaration targets `.mw-parser-output`.
- Generic checkbox styling excludes `.vector-dropdown-checkbox`.
- TOC text emits normal word breaking, conditional toggle spacing, and the `client-nojs` mobile size constraints.
- Muted Link is emitted and applied through a focused important selector, while semantic package/manual links remain terminal green.
- Primary `.wikitable` and message-box rules emit flat backgrounds and `box-shadow: none` without changing global layout tokens.
- `h1` and `h2` emit visibly differentiated rule treatments.

### Static validation

Run `npm run test:build`, `npm run lint`, `npm run build`, and `git diff --check`. All commands must pass after implementation.

### Offline visual validation

Serve `/usr/share/doc/arch-wiki/html` on loopback and capture `Installation_guide.html` and `WireGuard.html` at 1440×1000 and 390×844. Capture before inspecting so every run leaves visual evidence under `output/playwright/offline-archwiki/`.

For all four states verify:

- `.mw-parser-output` width and its first paragraph width are greater than zero.
- No Vector dropdown checkbox appears as an empty outlined square.
- TOC text does not wrap within a word.
- the article background, primary text, Muted Link, and Signal Violet rule match the approved palette;
- primary tables and notices are flat while dropdowns and other elevated surfaces retain their intended depth;
- mobile has no horizontal overflow and the `client-nojs` TOC is compact and scrollable.

An independent read-only review must compare the final diff and screenshots with this specification before the change is accepted.
