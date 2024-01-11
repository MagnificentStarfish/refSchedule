import mongoose, { Document, Schema } from 'mongoose';

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

interface IDayAvailability extends Document {
  dayOfWeek: DayOfWeek;
  refereeId: string;
  isAvailable: boolean;
}

const DayAvailabilitySchema: Schema = new mongoose.Schema({
  dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
  refereeId: { type: Schema.Types.ObjectId, ref: 'Referee', required: true },
  isAvailable: { type: Boolean, default: false },
});

const DayAvailability = mongoose.model<IDayAvailability>('DayAvailability', DayAvailabilitySchema);

export default DayAvailability;
