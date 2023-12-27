import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  address: Schema.Types.ObjectId;
  picture: string;
  maxTravelDistance: number;
  proficiency: { type: Schema.Types.ObjectId, ref: 'ProficiencyLevel' };
  availability: string[];
  games: Schema.Types.ObjectId[];
}

const userSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  picture: String,
  maxTravelDistance: Number,
  proficiency: { type: mongoose.Schema.Types.ObjectId, ref: 'ProficiencyLevel' },
  availability: [String],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
