import User from './user';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/refSchedule');

const deleteUser = async (email: string, phoneNumber: string) => {
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

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
    throw new Error('Failed to delete user');
  }
};

deleteUser('01@winterfell.com', '1234567890');
