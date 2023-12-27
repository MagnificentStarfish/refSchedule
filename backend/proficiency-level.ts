import mongoose, { Document, Schema } from 'mongoose';

interface IProficiencyLevel extends Document {
  name: string;
  description: string;
}

const proficiencyLevelSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['RECREATIONAL', 'MIDDLE_SCHOOL_C_TEAM', 'MIDDLE_SCHOOL_JV', 'MIDDLE_SCHOOL_VARSITY', 'HIGH_SCHOOL_C_TEAM', 'HIGH_SCHOOL_JV', 'HIGH_SCHOOL_VARSITY']
  },
  description: { type: String, required: true }
});

const ProficiencyLevel = mongoose.model<IProficiencyLevel>('ProficiencyLevel', proficiencyLevelSchema);

export default ProficiencyLevel;
