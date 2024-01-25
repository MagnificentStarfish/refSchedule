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

// export interface IAddress {
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
// }

interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  // address: IAddress;
  picture: string;
  maxTravelDistance: number;
  proficiency: ProficiencyLevel;
  availability: [{
    dayOfWeek: DayOfWeek;
    isAvailable: boolean;
  }];
  // games: Schema.Types.ObjectId[];
}

const userSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  // address: {
  //   street: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   zip: { type: String, required: true },
  // },
  picture: String,
  maxTravelDistance: Number,
  proficiency: { type: String, enum: Object.values(ProficiencyLevel)},
  availability: [{
    dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
    isAvailable: { type: Boolean, default: false },
  }],
  // games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
