# TUKE Canteen App

A React Native mobile + web app that displays daily menus for TUKE (Technical University of Kosice) canteens. Built as a bachelor thesis MVP.

Menu data is loaded by parsing the official canteen website ([jedalen.tuke.sk](https://jedalen.tuke.sk)).

**Live demo:** [tuke-canteen-app.vercel.app](https://tuke-canteen-app.vercel.app) (first load may take up to 1 minute due to proxy cold start; recommended: Chrome or Safari)

## Features

- **Drawer navigation** with canteen selection and screen links
- **Daily menu** with day picker (Mon–Fri) and pull-to-refresh
- **7 canteens** supported across Kosice and Presov
- **Allergen chips** (EU standard, 1–14) on meal cards
- **Contact directory** with management info and expandable canteen cards (tappable phone/email)
- **Dark mode** with system/light/dark theme options
- **Settings** — default canteen, allergen display, theme mode

## Tech Stack

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- [TypeScript](https://www.typescriptlang.org/)
- [expo-router](https://docs.expo.dev/router/introduction/) (file-based routing, drawer navigation)
- [node-html-parser](https://github.com/nickolasph/node-html-parser) for menu data scraping
- [react-native-svg](https://github.com/software-mansion/react-native-svg) for logo rendering
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for settings persistence

## Project Structure

```
app/                    # Screens (expo-router)
  _layout.tsx           # Root layout with providers
  (drawer)/             # Drawer navigation group
    _layout.tsx         # Drawer layout with canteen sidebar
    index.tsx           # Menu screen
    allergens.tsx       # Allergen reference
    contact.tsx         # Canteen contacts
    orders.tsx          # Orders (placeholder)
    settings.tsx        # App settings
components/             # Reusable UI components
src/
  services/             # Data fetching, parsing, context providers
  data/                 # Static data (contacts)
  utils/                # Helpers (date, price formatting)
  types.ts              # Domain types
  constants.ts          # Canteen list, allergen definitions
  theme.ts              # Light/dark theme system
proxy/                  # CORS proxy server (Express.js)
assets/                 # App icons, splash screen, TUKE logo
metro.config.js         # Metro bundler config (excludes proxy/)
vercel.json             # Vercel rewrite rules for SPA routing
eas.json               # EAS Build profiles
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/go) on your phone or an Android/iOS emulator

### Install and Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go or press `a` for Android / `i` for iOS emulator.

### Run on Web (local)

```bash
cd proxy && npm install && npm start &   # start CORS proxy on port 3001
npx expo start --web                     # start Expo web
```

## Deployment

### Web app (Vercel)

The web app is deployed on Vercel at [tuke-canteen-app.vercel.app](https://tuke-canteen-app.vercel.app). `vercel.json` rewrites all routes to `/index.html` for client-side navigation.

### CORS proxy (Render.com)

Browsers block direct requests to `jedalen.tuke.sk` (no CORS headers). The Express.js proxy in `proxy/` is deployed on Render.com at `tuke-canteen-proxy.onrender.com`. On web, `menuClient.ts` routes requests through this proxy automatically. On mobile (Android/iOS), requests go directly to the canteen server.

The Render.com free tier sleeps after inactivity — the first request after idle can take up to ~1 minute. Subsequent requests are fast.

See [proxy/README.md](proxy/README.md) for deployment instructions.

## Lint and Type Check

```bash
npm run lint
npx tsc --noEmit
```
