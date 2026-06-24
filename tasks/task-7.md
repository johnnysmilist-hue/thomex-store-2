---
title: Additional Homepage Carousels + Promotion Banner
status: done
priority: high
type: feature
tags: [homepage, carousels, promotions]
created_by: agent
created_at: 2026-06-24T10:30:00Z
position: 7
---

## Notes
Add 6 new horizontal-scroll product carousels and a clickable promotion banner to the homepage. All carousels use Jumia-style navigation (edge arrows, fade indicators, grab cursor).

## Checklist
- [x] Create HomeEssentials carousel (home & living category)
- [x] Create RecentFinds carousel (tracks user clicks/searches via localStorage)
- [x] Create PhoneDeals carousel (smartphones category)
- [x] Create ComputerDeals carousel (computers/laptops category)
- [x] Create SponsoredProducts carousel
- [x] Create PartnerDeals carousel
- [x] Create PromotionBanner (clickable, links to deals)
- [x] Wire all sections into index.tsx
- [x] Track product clicks in [id].tsx for RecentFinds

## Acceptance
- Homepage shows all new carousels with horizontal scroll
- RecentFinds persists across page refreshes
- Promotion banner is clickable and routes to deals page
- All carousels have Jumia-style arrows on desktop