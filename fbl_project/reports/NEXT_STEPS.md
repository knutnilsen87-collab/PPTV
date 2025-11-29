# ProPokerTV – Next Steps
Generated: 2025-11-28 21:44:23

## 1. User account

- [ ] Make /account editable (display name, bio, country, favourite game, avatar).
- [ ] Add server action or API route to update the User in Prisma.
- [ ] Add proper success + error messages.

## 2. Authentication & security

- [ ] Improve login errors and loading states.
- [ ] Add password change flow on /account.
- [ ] Clean up all remaining Norwegian text – everything should be in English.

## 3. Admin dashboard

- [ ] Implement real Users table (list all users).
- [ ] Add role management (USER / CREATOR / ADMIN).
- [ ] Wire Clips & Play of the Week cards to real data.
- [ ] Add basic site settings + analytics later.

## 4. Clips & video

- [ ] Connect uploads to real video storage (e.g. Mux / similar).
- [ ] Show “My clips” per user with status.
- [ ] Improve the video player configuration.

## 5. Play of the Week

- [ ] Enforce one vote per user per round/week.
- [ ] Visual “you voted” state in the UI.
- [ ] Admin view for candidates, votes and winners.

## 6. Production readiness

- [ ] Move from SQLite to Postgres in production.
- [ ] Verify Prisma migrations for a clean history.
- [ ] Add logging/monitoring (e.g. error tracking).
- [ ] Configure CI/CD pipeline and deployment.

