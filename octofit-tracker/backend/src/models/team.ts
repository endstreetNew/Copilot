import { model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    seedKey: { type: String, select: false },
  },
  { collection: 'teams', timestamps: true },
);

export default model('Team', teamSchema);
