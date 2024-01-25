// import mongoose, { Schema, Document } from 'mongoose';
// import User from './user';
// import Location from './location';
// import { ProficiencyLevel } from './proficiency-level';

// interface IGame extends Document {
//   location: typeof Location.schema;
//   referees: typeof User.schema;
//   date: Date;
//   time: string;
//   proficiencyLevel: ProficiencyLevel;
// }

// const gameSchema: Schema = new mongoose.Schema({
//   location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
//   referees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   proficiencyLevel: { type: String, enum: Object.values(ProficiencyLevel), required: true },
// });

// const Game = mongoose.model<IGame>('Game', gameSchema);

// export default Game;
