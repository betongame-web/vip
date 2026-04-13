# ViperPro Vue/Laravel -> React + Vite migration

This package is a **best-effort React + Vite frontend migration scaffold** built from the uploaded ZIP.

## What is included

- React + Vite application structure
- Route structure mirrored from the original Vue router
- Auth context using the original JWT endpoints
- Settings context using `/api/settings/data`
- Converted key screens:
  - Home
  - Login
  - Register
  - Forgot Password
  - Reset Password
  - Casino list
  - Casino search
  - Casino play
  - Wallet
  - Deposit
  - Withdraw
  - Transactions
  - Favorites
  - Recents
  - Affiliate
  - Stripe success/cancel
  - Landing spin
- Original assets folder copied into `public/assets`
- File-by-file Vue -> React mapping in `migration/vue-react-map.json`

## Honest limitation

The original ZIP is **not only a Vue frontend**.

It also contains:
- Laravel backend
- Filament admin panel
- payment gateway controllers
- provider integrations
- websocket/auth middleware
- Blade views and email templates

React + Vite can replace the **frontend layer**, but it does **not replace Laravel backend/business logic** on its own.

That means:
- admin panel is not rewritten into React here
- payment webhooks stay in Laravel/PHP
- provider callback logic stays in Laravel/PHP
- several sports pages were scaffolded because the backend looked incomplete in the ZIP
- modal-heavy / animation-heavy Vue pages were simplified where safe

## Coverage summary

- Source Vue/JS files inventoried: 98
- Files with meaningful React/JS implementation: 39
- Files mapped but not fully implemented yet: 59

## Important environment variables

Create a `.env` file with values like:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_BASE_URL=http://localhost:8000
```

If React is served from the same domain as Laravel, this can be:

```bash
VITE_API_BASE_URL=/api
VITE_APP_BASE_URL=
```

## Run

```bash
npm install
npm run dev
```

## Recommended next steps

1. Keep Laravel as API/backend.
2. Move only the customer-facing Vue SPA to this React app.
3. Rebuild sportsbook only after confirming the real sportsbook backend/service.
4. Move admin panel separately; do not force Filament into React unless you truly want a new admin stack.
5. Audit and remove exposed keys / obfuscated client code before production.
