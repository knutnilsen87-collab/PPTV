## Data + Auth Gating Patch
- Home fetches `/api/videos` (no-store) and renders cards
- `/video/[id]` requires session; unauthenticated users are redirected to `/login?callbackUrl=/video/[id]`
- `/login` page sends magic link using NextAuth Email provider
- Absolute URL helper ensures server component fetch works behind proxies

### Acceptance
- Visiting `/video/<existing-id>` while logged out shows login; after link → returns to the video
- Home shows seeded videos; if empty, shows skeleton cards
