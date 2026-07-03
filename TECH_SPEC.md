# MVP Tech Spec — Floot-like builder for non-technical makers (web + mobile)

Goal
- Low-code visual app builder aimed at non-technical makers.
- Web + mobile (responsive PWA).
- Primary data source: Google Sheets (easy onboarding); add others later.
- Single-team beta; hosted SaaS with inexpensive managed services.

MVP Scope
- Visual editor: drag-and-drop canvas, pages, simple component palette (Text, Image, Button, List, Form).
- Data binding: connect components to Google Sheets tables (sheet -> rows) and simple expressions.
- Logic: simple trigger → action editor (onClick → call connector → set state / navigate).
- Preview mode (simulate on web and mobile viewport).
- Deploy target: host frontend as static site (Vercel/Netlify); backend connectors as simple API (Render/Heroku).
- Auth: email-only signup via Clerk or Auth0 (starter: passwordless/email link optional).
- Project management: create/save/load projects for single-team use.

Key UX principles for non-technical makers
- Minimal config: connecting a Google Sheet should be 3 steps with clear guidance.
- Templates: prebuilt templates (todo, inventory, booking) to start quickly.
- WYSIWYG preview with mobile and desktop toggles.
- Clear error/help flows for data-binding.

Core Components (MVP)
- Palette: Text, Image, Button, Input, Form, Repeater/List, DataSource block.
- Property editor: label, binding selector (pick sheet + column), style presets.
- Data Source config: Google Sheets (public/published sheet URL first), later OAuth.
- Logic editor: simple rule editor (Trigger, Condition optional, Action). Actions: Call API, Set State, Navigate, Show Toast.

Architecture (MVP)
- Frontend: React + TypeScript, Vite, simple drag/drop (HTML5 or React DnD), Zustand or Jotai for app state, Monaco optional later.
- Backend: Node + Express (or serverless functions). Exposes connectors and user/project APIs.
- DB: Managed Postgres (Supabase) for projects & metadata. Use Supabase to speed dev (auth + DB + storage).
- Storage: S3-compatible (or Supabase storage) for assets.
- Hosting: Vercel for frontend; Render / Heroku for backend (cheap, simple scaling).

Google Sheets connector (MVP)
- Mode 1 (fast): read published sheet as CSV (user sets "Publish to web" in Sheets). No OAuth required; best for non-technical onboarding.
- Mode 2 (later): OAuth 2.0 connector for private sheets (adds server-side OAuth flow).

Deployment / SaaS cost minimization
- Frontend: static on Vercel / Netlify (free tier OK for small beta).
- Backend: single small instance on Render / Heroku (hobby tier ~$7–$15/mo).
- DB: Supabase or Neon free / starter tiers.
- Use managed services to minimize infra ops.

MVP timeline (single small team)
- Week 0–1: finalize UX flows & templates
- Weeks 2–6: implement visual editor, data-binding, Sheets connector (published sheet mode), preview
- Weeks 7–8: auth, project save/load, simple deploy docs, QA
- Launch beta (internal): week 9

Next immediate steps I can take
- Scaffold a GitHub repo with frontend + backend and CI deploy templates (Vercel + Render).
- Implement OAuth Sheets connector & simple auth.
- Build 3 starter templates and onboarding flow.
