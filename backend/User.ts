import mongoose, { Document, Schema } from 'mongoose';
import { ProficiencyLevel } from './proficiency-level';
import { DayOfWeek } from './day-availability';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: Schema.Types.ObjectId;
  picture: string;
  maxTravelDistance: number;
  proficiency: ProficiencyLevel;
  availability: [{
    dayOfWeek: DayOfWeek;
    isAvailable: boolean;
  }];
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
  availability: [{
    dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
    isAvailable: { type: Boolean, default: false },
  }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
