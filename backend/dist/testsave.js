"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/refSchedule');
const user = new user_1.default({
    firstName: 'Test4',
    lastName: 'User4',
    phoneNumber: '1234567890',
    email: 'test@example.com',
    address: {
        street: '456 Main St',
        city: 'Mytown',
        state: 'WA',
        zip: '12355',
    },
    picture: 'http://example.com/test.jpg',
    maxTravelDistance: 20,
    availability: [{
            dayOfWeek: 'Monday',
            isAvailable: true,
        }],
});
user.save()
    .then(() => {
    console.log('User saved successfully');
    console.log('User:', user);
    mongoose_1.default.connection.close();
})
    .catch(err => {
    console.error('Error saving user:', err);
    mongoose_1.default.connection.close();
});
// import mongoose from 'mongoose';
// import User from './user.js';
// import { ProficiencyLevel } from './proficiency-level.js';
// mongoose.connect('mongodb://localhost:27017/refSchedule', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });
// const user = new User({
//   firstName: 'Test',
//   lastName: 'User',
//   phoneNumber: '1234567890',
//   email: 'test@example.com',
//   picture: 'http://example.com/test.jpg',
//   maxTravelDistance: 10,
//   proficiency: ProficiencyLevel.RECREATIONAL,
//   availability: 'Weekdays',
// });
// user.save()
//   .then(result => console.log('User saved successfully:', result))
//   .catch(error => console.error('Error while saving user:', error));
