---
title: Auth + Account System
status: done
priority: high
type: feature
tags: [auth, account, login, signup]
created_by: agent
created_at: 2026-06-24T10:50:00Z
position: 9
---

## Notes
Build complete auth system: login, signup, account dashboard, auth context with localStorage persistence. Header shows auth state. Checkout prompts login but allows guest.

## Checklist
- [x] Create AuthContext with localStorage session
- [x] Build login page
- [x] Build signup page
- [x] Build account dashboard page
- [x] Update Header with auth state + user menu
- [x] Update cart/checkout to prompt login
- [x] Add logout functionality

## Acceptance
- Users can register and log in
- Account page shows user info and order history
- Header shows avatar when logged in
- Logout clears session