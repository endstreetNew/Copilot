import cors from 'cors';
import express from 'express';
import type { Model } from 'mongoose';
import { connectDatabase } from './config/database';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Team from './models/team';
import User from './models/user';
import Workout from './models/workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

function listDocuments<T>(resourceModel: Model<T>) {
  return async (_request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const documents = await resourceModel.find().lean().exec();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  };
}

app.get('/api/users/', listDocuments(User));
app.get('/api/teams/', listDocuments(Team));
app.get('/api/activities/', listDocuments(Activity));
app.get('/api/leaderboard/', listDocuments(Leaderboard));
app.get('/api/workouts/', listDocuments(Workout));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use(
  (error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exitCode = 1;
});
