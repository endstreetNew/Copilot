# OctoFit Tracker

OctoFit Tracker is scaffolded as a React/Vite presentation tier and an
Express/TypeScript API tier backed by MongoDB through Mongoose.

## Run locally

Start MongoDB on port `27017`, then start the API and frontend in separate
terminals:

```bash
npm run dev --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/frontend
```

The frontend runs on port `5173`; the API runs on port `8000`. The Vite
development server forwards `/api` requests to the API. The API serves
`/api/users/`, `/api/teams/`, `/api/activities/`, `/api/leaderboard/`, and
`/api/workouts/`, with a health check at `/api/health`. In Codespaces, the API
base URL is `https://${CODESPACE_NAME}-8000.app.github.dev`; locally, it is
`http://localhost:8000`.

By default, the API connects to
`mongodb://localhost:27017/octofit_db`. Set `MONGODB_URI` to use another
MongoDB connection string.

## Build

```bash
npm run build --prefix octofit-tracker/backend
npm run build --prefix octofit-tracker/frontend
```
