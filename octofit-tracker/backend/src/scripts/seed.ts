import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const seedKey = 'octofit-sample-data';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase(): Promise<void> {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({ seedKey }),
    Team.deleteMany({ seedKey }),
    Activity.deleteMany({ seedKey }),
    Leaderboard.deleteMany({ seedKey }),
    Workout.deleteMany({ seedKey }),
  ]);

  const teamData = [
    {
      name: 'Trail Blazers',
      description: 'A team focused on outdoor runs and weekend hikes.',
      seedKey,
    },
    {
      name: 'Core Collective',
      description: 'A balanced crew building strength and consistency.',
      seedKey,
    },
  ];
  const teams = await Team.create(teamData);
  const [trailBlazers, coreCollective] = teams;

  const userData = [
    {
      username: 'maya.moves',
      email: 'maya@example.com',
      fullName: 'Maya Chen',
      team: trailBlazers._id,
      seedKey,
    },
    {
      username: 'leo.runs',
      email: 'leo@example.com',
      fullName: 'Leo Martinez',
      team: trailBlazers._id,
      seedKey,
    },
    {
      username: 'amara.strong',
      email: 'amara@example.com',
      fullName: 'Amara Okafor',
      team: coreCollective._id,
      seedKey,
    },
  ];
  const users = await User.create(userData);
  const [maya, leo, amara] = users;

  await Promise.all([
    Team.updateOne({ _id: trailBlazers._id }, { $set: { members: [maya._id, leo._id] } }),
    Team.updateOne({ _id: coreCollective._id }, { $set: { members: [amara._id] } }),
  ]);

  const activityData = [
    {
      user: maya._id,
      type: 'running',
      durationMinutes: 38,
      calories: 312,
      date: new Date('2026-10-03T07:30:00.000Z'),
      notes: 'Easy riverside run.',
      seedKey,
    },
    {
      user: leo._id,
      type: 'cycling',
      durationMinutes: 52,
      calories: 428,
      date: new Date('2026-10-04T08:00:00.000Z'),
      notes: 'Steady ride with the team.',
      seedKey,
    },
    {
      user: amara._id,
      type: 'strength',
      durationMinutes: 45,
      calories: 276,
      date: new Date('2026-10-04T16:30:00.000Z'),
      notes: 'Full-body strength session.',
      seedKey,
    },
  ];
  await Activity.create(activityData);

  const leaderboardData = [
    { user: maya._id, points: 840, rank: 1, period: '2026-10', seedKey },
    { user: leo._id, points: 720, rank: 2, period: '2026-10', seedKey },
    { user: amara._id, points: 665, rank: 3, period: '2026-10', seedKey },
  ];
  await Leaderboard.create(leaderboardData);

  const workoutData = [
    {
      name: 'Beginner Tempo Run',
      description: 'Warm up, alternate steady and brisk intervals, then cool down.',
      type: 'cardio',
      difficulty: 'beginner',
      durationMinutes: 30,
      equipment: ['running shoes'],
      seedKey,
    },
    {
      name: 'Full-Body Foundation',
      description: 'A balanced circuit of bodyweight squats, push-ups, and lunges.',
      type: 'strength',
      difficulty: 'beginner',
      durationMinutes: 35,
      equipment: ['exercise mat'],
      seedKey,
    },
    {
      name: 'Mobility Reset',
      description: 'Gentle mobility and stretching to support post-workout recovery.',
      type: 'recovery',
      difficulty: 'beginner',
      durationMinutes: 20,
      equipment: ['exercise mat'],
      seedKey,
    },
  ];
  await Workout.create(workoutData);

  console.log('Database seeding complete');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
