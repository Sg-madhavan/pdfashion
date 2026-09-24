# PD Fashion – World of Personalized Gifts (React + Vite)

This project is the React + Vite + React Router port of the Next.js app
[`Sg-madhavan/pd-fashion-santa`](https://github.com/Sg-madhavan/pd-fashion-santa).

## Structure

```
index.html                 Static SEO metadata (was Next.js `metadata`/`viewport`)
public/                    Static assets (videos/santa-slowmo.mp4, favicon.svg)
src/
  main.tsx                 Entry – loads global CSS, mounts <App/>
  App.tsx                  <RouterProvider/>
  routes/router.tsx        Centralised React Router config
  layouts/RootLayout.tsx   Was app/layout.tsx (error boundary + suspense)
  pages/                   HomePage (was app/page.tsx), NotFoundPage, RouteErrorPage
  components/              PDFashionExperience (was app/pd-fashion-experience.tsx), ErrorBoundary, …
  hooks/useDocumentMeta.ts Per-route <title>/meta (was Next.js metadata API)
  services/enquiries.ts    POST /api/enquiries
  config/env.ts            VITE_* public env config
  styles/globals.css       Was app/globals.css (unchanged)
server/                    Node/Express backend (Drizzle + PostgreSQL) – server-only code
```

## Frontend

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview
```

## Backend (enquiry form)

```bash
cd server
cp .env.example .env     # set DATABASE_URL
npm install
npm run db:push          # create gift_enquiries table (drizzle-kit)
npm run dev              # http://localhost:3001
```

For local development with separate ports set `VITE_API_BASE_URL=http://localhost:3001`
in a root `.env.local`. In production, build the frontend and run `npm start` in
`server/` – it serves `dist/` and `/api/*` from one origin (like Next.js did).

Without a running backend the site works fully; the enquiry form shows its
existing error state ("Please try WhatsApp…").
