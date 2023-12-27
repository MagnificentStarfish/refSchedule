import mongoose, { Document, Schema } from 'mongoose';
import { ProficiencyLevel } from './proficiency-level';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  address: Schema.Types.ObjectId;
  picture: string;
  maxTravelDistance: number;
  proficiency: ProficiencyLevel;
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
  proficiency: { type: String, enum: Object.values(ProficiencyLevel)},
  availability: [String],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
