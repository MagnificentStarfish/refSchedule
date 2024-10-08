import mongoose, { Document, Schema } from 'mongoose';
import { ProficiencyLevel } from './proficiency-level';

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: IAddress;
  picture?: string;
  maxTravelDistance: number;
  proficiency?: ProficiencyLevel;
  availability: {
    dayOfWeek: DayOfWeek;
    isAvailable: boolean;
  }[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /.+@.+\..+/ },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  picture: String,
  maxTravelDistance: { type: Number, required: true, min: 0, max: 1000 }, // Need to measure in miles
  proficiency: { type: String, enum: Object.values(ProficiencyLevel) },
  availability: [{
    dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: false },
    isAvailable: { type: Boolean, default: false },
  }],
});

const User = mongoose.model<IUser>('User', userSchema);
console.log('User model created successfully');

export default User;
