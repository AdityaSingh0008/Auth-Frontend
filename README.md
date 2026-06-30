# Auth Frontend (React)

React frontend for the fixed Express backend in `../Backend`.

## Setup
```bash
npm install
npm run dev
```
Opens on `http://localhost:5173`

If your backend runs on a different host/port, update `API_BASE` in `src/api.js`.

## Pages
- `/login` — login form
- `/signup` — registration form
- `/dashboard` — protected, requires a valid token (auto-redirects to `/login` if missing/expired)

## Build for production
```bash
npm run build
```
