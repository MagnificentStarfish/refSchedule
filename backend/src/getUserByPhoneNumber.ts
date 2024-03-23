import User from './user';
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/refSchedule');


export const getUserByPhoneNumber = async (phoneNumber: string) => {
    try {
        const user = await User.find({ phoneNumber: phoneNumber });
        // const user = await User.findOne({ phoneNumber: phoneNumber });  For returning first match
        if (user.length === 0) {
            console.log('No user with this phone number was found');
            mongoose.connection.close();
            return null;
        }
        console.log(`User: ${user}`);
        mongoose.connection.close();
        return user;
    } catch (error) {
        console.error('An error occurred:', error);
        mongoose.connection.close();
    }
};

getUserByPhoneNumber('1234567890');
