# Low-code builder (starter scaffold)

This is a small starter scaffold for a visual builder MVP:
- Frontend: React + Vite — simple drag/drop canvas and component palette.
- Backend: Express — simple Google Sheets connector (reads published sheet CSV and returns JSON).

Quick start (local)
1. Clone / create two folders: `frontend/` and `backend/`.
2. Paste the frontend files into `frontend/` and the backend files into `backend/`.
3. Install and start each:

# Backend
cd backend
npm install
npm run dev
# API server started at http://localhost:4000

# Frontend
cd frontend
npm install
npm run dev
# Open http://localhost:5173

Notes
- The Sheets connector reads a published Google Sheet CSV URL (File → Publish to web in Google Sheets). This avoids OAuth for quick onboarding. For private sheets, OAuth will be added next.
- For SaaS hosting:
  - Frontend: deploy to Vercel (connected to GitHub).
  - Backend: deploy to Render / Heroku as a web service.
  - Metadata DB & auth: Supabase (optional to set up project persistence).
