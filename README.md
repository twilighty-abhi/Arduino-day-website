# Arduino Day 2026 @ TinkerSpace Kochi

Interactive event website for Arduino Day 2026 at TinkerSpace Kochi (March 28).

## Features

- **Hero** with countdown, typing effect, and circuit-board background
- **About** Arduino Day theme, LED blink simulator, Arduino fact carousel
- **Event details** with add-to-calendar
- **Schedule** placeholder with interactive cards
- **Venue** info for TinkerSpace Kochi with map
- **Registration CTA** and **FAQ** accordion
- **Share** button (clipboard + native share on mobile)
- **Mobile-first** responsive design
- **Vercel-ready** deployment

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Framer Motion

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import the project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js — click Deploy
4. Optional: Add a custom domain in Project Settings

No environment variables required for the static site.

## Customization

- **Schedule**: Edit `lib/schedule.ts`
- **FAQ**: Edit `components/FAQ.tsx`
- **Registration URL**: Update the CTA link in `components/RegistrationCTA.tsx`
- **Venue map**: Update the iframe `src` in `components/Venue.tsx` with the exact TinkerSpace location
