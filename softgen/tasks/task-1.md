---
title: Design System + App Shell
status: done
priority: urgent
type: chore
tags: [design-system, theme]
created_by: agent
created_at: 2026-06-24T08:14:00Z
position: 1
---
## Notes
Design system and app shell for Thomex marketplace.

## Checklist
- [x] Define design tokens (colors, typography, spacing)
- [x] Update globals.css with brand palette and custom utilities
- [x] Configure tailwind.config.ts with brand colors, fonts, animations
- [x] Create types for Product, Category, Cart, Order, User
- [x] Create mock data (16 products, 8 categories)
- [x] Set up CartContext with localStorage persistence
- [x] Build Header with search, cart badge, category nav
- [x] Build Footer with links and newsletter
- [x] Build Layout wrapper with CartProvider
- [x] Update _app.tsx to use Layout

## Acceptance
- Brand colors render correctly across components
- Header shows cart badge that updates when items added
- Footer has working links to category pages
- All pages render through consistent Layout
- Mock data loads and displays products