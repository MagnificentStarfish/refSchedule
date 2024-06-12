import User from './user';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/refSchedule');

const deleteUser = async (email: string, phoneNumber: string) => {
  try {
    const result = await User.deleteMany({
      $or: [{ email: email }, { phoneNumber: phoneNumber }]
    });

    console.log(`Successfully deleted ${result.deletedCount} user(s).`);

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
    throw new Error('Failed to delete user');
  }
};

deleteUser('user@example.com', '123-456-7890');
