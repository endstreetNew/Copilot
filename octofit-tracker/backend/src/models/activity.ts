import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'cycling', 'strength', 'yoga'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, trim: true },
    seedKey: { type: String, select: false },
  },
  { collection: 'activities', timestamps: true },
);

export default model('Activity', activitySchema);
