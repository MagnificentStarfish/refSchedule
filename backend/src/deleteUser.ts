import User from './user';
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/refSchedule');
  }
};

export const deleteUser = async (email: string, phoneNumber: string) => {
  await connectToDatabase();

  try {
    const usersToDelete = await User.find({
      $or: [{ email: email }, { phoneNumber: phoneNumber }]
    });

    if (usersToDelete.length > 0) {
      usersToDelete.forEach(user => {
        console.log(`Deleting user: ${user.firstName} ${user.lastName}`);
      });

      const result = await User.deleteMany({
        $or: [{ email: email }, { phoneNumber: phoneNumber }]
      });

      console.log(`Successfully deleted ${result.deletedCount} user(s).`);
    } else {
      console.log('No users found to delete.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete user');
  } finally {
    mongoose.connection.close();
  }
};
