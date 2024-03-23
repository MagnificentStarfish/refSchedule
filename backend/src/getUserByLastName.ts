import User from './user';
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/refSchedule');


export const getUserByLastName = async (lastName: string) => {
    try {
        const user = await User.find({ lastName: lastName });
        if (user.length === 0) {
            console.log('No users with this last name were found');
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

getUserByLastName('Doe');
