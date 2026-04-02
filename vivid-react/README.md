# Vivid Auto Details (React + Next.js)

This folder contains the new React migration baseline for the Vivid Auto Details website.

## What is already migrated

- Next.js App Router project scaffolded
- Existing site styles and image assets imported
- Reusable React layout components:
	- `src/components/SiteHeader.tsx`
	- `src/components/SiteFooter.tsx`
- React quote form component:
	- `src/components/QuoteForm.tsx`
- Supabase-ready lead API route:
	- `src/app/api/leads/route.ts`

## Local setup

1. Copy environment template:

```bash
cp .env.example .env.local
```

2. Fill `.env.local` values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

3. Run the app:

```bash
npm run dev
```

4. Open:

`http://localhost:3000`

## Build check

```bash
npm run build
```

## Next migration steps

- Migrate remaining pages (`/services`, `/gallery`, `/blog`, `/faqs`) into App Router routes
- Convert remaining interactive behaviors from legacy `script.js` into React hooks/components
- Add admin CRM routes after Supabase auth is configured

## Deploy

Deploy to Vercel and set the same environment variables in project settings.
