# B-Bright Design System — MASTER

**Brand:** Youth Leadership & Entrepreneurship Platform — Cape Verde / Africa  
**Style:** Bold Flat + Subtle Depth  
**Audience:** Youth 18–35 years  

---

## Color Palette

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| Primary | `--color-primary` | `#0769B9` | Buttons, links, highlights |
| Primary Dark | `--color-primary-dark` | `#1565C0` | Hover states |
| Primary Deeper | `--color-primary-deeper` | `#055a9e` | Active / pressed |
| Navy | `--color-primary-navy` | `#003755` | Dark section bg, borders |
| Accent | `--color-accent` | `#00C4FF` | CTAs, icon accents, contact info |
| Accent Dark | `--color-accent-dark` | `#007599` | Accent hover |
| Section Dark | `--color-section-dark` | `#0D1B2A` | Dark hero sections |
| Footer BG | `--color-footer-bg` | `#000E17` | Footer background |
| Surface | `--color-surface` | `#F5F7FA` | Light card backgrounds |
| Surface Alt | `--color-surface-alt` | `#EEF4FF` | Blue-tinted panels |
| Text | `--foreground` | `#171717` | Body text (light bg) |
| Text Muted | `--color-text-muted` | `#616161` | Secondary text |
| Text Light | `--color-text-light` | `#D8D4DE` | Text on dark backgrounds |

### Dark Section Text Rules
- Headings on dark bg: `text-white`
- Body on dark bg: `text-[#D8D4DE]` or `text-gray-300`
- Accent text on dark bg: `text-[var(--color-accent)]` (#00C4FF)

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Proxima Nova | 800 | 48–64px |
| Heading H1 | Proxima Nova | 700 | 40–48px |
| Heading H2 | Proxima Nova | 700 | 32–40px |
| Heading H3 | Proxima Nova | 600 | 24–32px |
| Body Large | Proxima Nova | 400 | 18px |
| Body | Proxima Nova | 400 | 16px |
| Small / Caption | Proxima Nova | 400 | 14px |
| Label / Tag | Proxima Nova | 600 | 12–14px, uppercase, tracking-wider |

**Line heights:** headings `1.2`, body `1.5–1.75`  
**Fallback stack:** `"Proxima Nova", "Geist Sans", Arial, Helvetica, sans-serif`

---

## Spacing Scale (4pt base)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96px`

**Section padding:** `py-16` (mobile) → `py-24` (desktop)  
**Container:** `max-w-7xl mx-auto px-6`  
**Card padding:** `p-6` (24px)  
**Element gap:** `gap-4` or `gap-6`

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Tags, badges |
| `--radius-md` | 8px | Inputs, small cards |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Large cards, modals |
| `--radius-2xl` | 24px | Hero elements |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,55,85,0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 16px rgba(0,55,85,0.12)` | Default card |
| `--shadow-lg` | `0 8px 32px rgba(0,55,85,0.18)` | Elevated elements |
| `--shadow-xl` | `0 16px 48px rgba(0,55,85,0.24)` | Modals |
| `--shadow-glow` | `0 0 24px rgba(7,105,185,0.35)` | Primary glow effect |

---

## Component Patterns

### Buttons
```
Primary:   bg-[--color-primary] text-white hover:bg-[--color-primary-dark] rounded-full px-6 py-3 font-semibold transition-all duration-200
Secondary: border border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white rounded-full px-6 py-3
Ghost:     text-[--color-accent] hover:underline
```

### Cards (light bg)
```
bg-white rounded-xl shadow-md p-6 border border-[--color-border-light]
```

### Cards (dark bg)
```
bg-[rgba(255,255,255,0.05)] rounded-xl p-6 border border-[rgba(255,255,255,0.1)]
```

### Section Dark
```
bg-[--color-section-dark] text-white
```

### Section Navy
```
bg-[--color-primary-navy] text-white
```

---

## Icon System
- Library: **Lucide React** (consistent stroke 1.5–2px)
- Sizes: `size-4` (16px) inline, `size-5` (20px) default, `size-6` (24px) nav, `size-8` (32px) feature icons
- Color on light bg: `text-[--color-primary]`
- Color on dark bg: `text-[--color-accent]`

---

## Animation Rules
- Duration: `150ms` (micro), `200ms` (hover), `300ms` (transitions)
- Easing: `ease-out` entering, `ease-in` exiting
- Hover scale: `hover:scale-105` on cards only
- Always add `transition-all` or specific property
- Respect `prefers-reduced-motion` (handled in globals.css)

---

## Breakpoints
| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Wide desktop |
| 2xl | 1536px | Ultra wide |

---

## Anti-patterns to Avoid
- Raw hex values in components — use CSS variables
- Mixing light/dark shadows inconsistently
- Cyan accent (#00C4FF) on light backgrounds without sufficient contrast (use #007599 instead)
- Font sizes below 14px for body text
- Buttons without hover/focus states
- Images without `alt` text
