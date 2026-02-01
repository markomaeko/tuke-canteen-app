# TUKE Canteen App (MVP)

Mobile application prototype for displaying daily/weekly menus of TUKE canteens.
This project is a bachelor thesis MVP (React Native + Expo) and currently loads menu data by parsing the official TUKE canteen website.

## Features (current MVP)
- Select day (workdays only) and canteen
- Display menu sections and meal items (price, allergens)
- Handles closed canteens / announcements and missing menu
- Pull-to-refresh
- Optional filter: show only main meals (hides Drinks/Other/Side dishes)
- Settings (basic): default canteen, show allergens, etc.

## Tech stack
- React Native (Expo)
- expo-router
- TypeScript
- Data source (MVP): HTML parsing from `https://jedalen.tuke.sk`

## Project structure
- `app/` – routes (expo-router) and screens
- `components/` – reusable UI components (pickers, cards, sections, states)
- `src/services/` – data loading, parsing, settings storage/context
- `src/data/` – static data (canteens list, allergens list)
- `src/utils/` – helper functions (dates, money formatting)

## Run locally
### Prerequisites
- Node.js (LTS)
- Expo Go (mobile) or Android/iOS emulator

### Install & start
```bash
npm install
npx expo start
