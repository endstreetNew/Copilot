import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    seedKey: { type: String, select: false },
  },
  { collection: 'users', timestamps: true },
);

export default model('User', userSchema);
