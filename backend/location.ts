import mongoose, { Schema, Document } from 'mongoose';
import Address from './address';

interface ILocation extends Document {
  name: string;
  address: typeof Address.schema;
}

const locationSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
});

const Location = mongoose.model<ILocation>('Location', locationSchema);

export default Location;
