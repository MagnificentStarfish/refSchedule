import mongoose from 'mongoose';

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/refSchedule', {
      serverSelectionTimeoutMS: 30000,
    });

    console.log('Connected to MongoDB');

    mongoose.connection.on('connected', () => {
      console.log('Mongoose reconnected to MongoDB');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      console.error('Mongoose encountered an error', error);
    });

    mongoose.set('debug', true);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

connectToDatabase();
