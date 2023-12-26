import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  picture: String,
  maxTravelDistance: Number,
  proficiency: String,
  availability: [String],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

const User = mongoose.model('User', userSchema);

export default User;
