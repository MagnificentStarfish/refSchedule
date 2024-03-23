import User from './user';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/refSchedule');



const allUsers = async () => {
    try {
      const users = await User.find();
      users.forEach(user => {
        console.log(`Referee: ${user.lastName}, ${user.firstName}, ${user.phoneNumber}`);
      });
      mongoose.connection.close();
      return users;
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
      throw new Error('Failed to fetch users');
    }
};

  allUsers();
