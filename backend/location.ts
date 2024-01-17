import mongoose, { Schema, Document } from 'mongoose';
import Address from './address';

interface ILocation extends Document {
  name: string;
  address: typeof Address.schema;
}

interface ILocationModel extends mongoose.Model<ILocation> {}

const locationSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
});

const Location: ILocationModel = mongoose.model<ILocation>('Location', locationSchema);

export default Location;
