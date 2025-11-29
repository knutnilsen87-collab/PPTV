# ProPokerTV UI Notes
- Landmarks: header/nav/main applied; Skip link is visible on focus.
- Keyboard: Nav supports Tab/Enter; drawer announces state via aria-expanded.
- A11y: thumbnails use empty alt (decorative) with titled context; ensure player captions.
- Theming: ThemeToggle toggles root `.dark` class.
- Onboarding: localStorage for now; migrate to server flag post-auth.
- Replace mock data with API calls once Prisma models are in.
