import User from './user';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/refSchedule');

export const getUserByPhoneNumber = async (phoneNumber: string) => {
    try {
        const users = await User.find({ phoneNumber: phoneNumber });
        if (users.length === 0) {
            console.log('No user with this phone number was found');
        } else if (users.length > 1) {
            console.log(`Multiple users found with phone number: ${phoneNumber}`);
        }
        console.log(`User(s): ${users}`);
        mongoose.connection.close();
        return users;
    } catch (error) {
        console.error('An error occurred:', error);
        mongoose.connection.close();
    }
};

getUserByPhoneNumber('1234567890');
