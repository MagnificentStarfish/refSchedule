// import mongoose, { Schema, Document } from 'mongoose';
// import { IAddress } from './user';

// interface ILocation extends Document {
//   name: string;
//   address: IAddress;
// }

// interface ILocationModel extends mongoose.Model<ILocation> {}

// const locationSchema: Schema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zip: { type: String, required: true },
//   },
// });

// const Location: ILocationModel = mongoose.model<ILocation>('Location', locationSchema);

// export default Location;
