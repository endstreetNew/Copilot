import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    seedKey: { type: String, select: false },
  },
  { collection: 'workouts', timestamps: true },
);

export default model('Workout', workoutSchema);
