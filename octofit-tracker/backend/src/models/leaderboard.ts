import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
    seedKey: { type: String, select: false },
  },
  { collection: 'leaderboard', timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
