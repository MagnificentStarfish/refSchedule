import mongoose, { Document, Schema } from 'mongoose';

export enum ProficiencyLevel {
  RECREATIONAL = 'RECREATIONAL',
  MIDDLE_SCHOOL_C_TEAM = 'MIDDLE_SCHOOL_C_TEAM',
  MIDDLE_SCHOOL_JV = 'MIDDLE_SCHOOL_JV',
  MIDDLE_SCHOOL_VARSITY = 'MIDDLE_SCHOOL_VARSITY',
  HIGH_SCHOOL_C_TEAM = 'HIGH_SCHOOL_C_TEAM',
  HIGH_SCHOOL_JV = 'HIGH_SCHOOL_JV',
  HIGH_SCHOOL_VARSITY = 'HIGH_SCHOOL_VARSITY'
}

interface IProficiencyLevel extends Document {
  name: ProficiencyLevel;
  description: string;
}

const proficiencyLevelSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: Object.values(ProficiencyLevel)
  },
  description: { type: String, required: true }
});

const ProficiencyLevelModel = mongoose.model<IProficiencyLevel>('ProficiencyLevel', proficiencyLevelSchema);

export default ProficiencyLevelModel;
