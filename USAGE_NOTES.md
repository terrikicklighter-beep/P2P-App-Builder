Running the scaffold
- Backend:
  - cd backend
  - npm install
  - npm run dev
  - Test: GET http://localhost:4000/api/sheets?csvUrl=<url-encoded-csv-url>
- Frontend:
  - cd frontend
  - npm install
  - npm run dev
  - Open http://localhost:5173

How to obtain CSV URL for a Google Sheet (quick onboarding)
1. In Google Sheets: File → Publish to web → Select the sheet → Publish.
2. Copy the "Link" and append: /export?format=csv&gid=<gid> if needed, or use the provided CSV export link.
3. Paste that into the Published CSV URL input on the builder and click "Load Sheet".

Next upgrades I recommend (I can implement)
- Add OAuth2 Google Sheets connector for private sheets (server-side).
- Save projects to Supabase Postgres, with user auth.
- Improve canvas (use React Flow for better layout, snapping).
- Add property editor & bindings UI to pick sheet columns for each component.
- Add PWA manifest + mobile styling and preview mode.
- Add deploy/preview flow (one-click preview + hosting).
