import mongoose, { Schema, Document } from 'mongoose';
import User from './user';

interface IGame extends Document {
  location: string; // replace with your actual Location type
  referees: typeof User.schema;
  time: string;
}

const gameSchema: Schema = new mongoose.Schema({
  location: String, // replace with your actual Location schema if it's an embedded document
  referees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  time: { type: String, required: true }
});

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;
