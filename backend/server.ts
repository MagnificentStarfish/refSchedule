import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/refSchedule')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Could not connect to MongoDB', err));
