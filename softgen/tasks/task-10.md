---
title: PWA Installable App
status: done
priority: high
type: feature
tags: [pwa, offline, install, service-worker]
created_by: agent
created_at: 2026-06-24T11:10:00Z
position: 10
---

## Notes
PWA fully implemented with manual service worker (next.config.mjs is protected). Install prompt, offline page, manifest, and meta tags all live.

## Checklist
- [x] Service worker with cache-first strategy
- [x] Update manifest.json with proper PWA fields
- [x] Create PWAInstallPrompt component
- [x] Add to _app.tsx with meta tags
- [x] Use existing logo as PWA icon
- [x] Add theme-color meta tags for light/dark
- [x] Create offline fallback page

## Acceptance
- App shows "Add to Home Screen" prompt on mobile
- Works offline with cached pages
- Has proper app icon and splash screen