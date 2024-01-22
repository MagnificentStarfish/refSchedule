import mongoose from 'mongoose';
// import { ProficiencyLevel } from './proficiency-level';

export var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Monday"] = "Monday";
    DayOfWeek["Tuesday"] = "Tuesday";
    DayOfWeek["Wednesday"] = "Wednesday";
    DayOfWeek["Thursday"] = "Thursday";
    DayOfWeek["Friday"] = "Friday";
    DayOfWeek["Saturday"] = "Saturday";
    DayOfWeek["Sunday"] = "Sunday";
})(DayOfWeek || (DayOfWeek = {}));

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    picture: String,
    maxTravelDistance: Number,
    // proficiency: { type: String, enum: Object.values(ProficiencyLevel) },
    availability: [{
            dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
            isAvailable: { type: Boolean, default: false },
        }],
});

const User = mongoose.model('User', userSchema);
export default User;



// import mongoose from 'mongoose';
// import { ProficiencyLevel } from './proficiency-level';
// export var DayOfWeek;
// (function (DayOfWeek) {
//     DayOfWeek["Monday"] = "Monday";
//     DayOfWeek["Tuesday"] = "Tuesday";
//     DayOfWeek["Wednesday"] = "Wednesday";
//     DayOfWeek["Thursday"] = "Thursday";
//     DayOfWeek["Friday"] = "Friday";
//     DayOfWeek["Saturday"] = "Saturday";
//     DayOfWeek["Sunday"] = "Sunday";
// })(DayOfWeek || (DayOfWeek = {}));
// const userSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     phoneNumber: String,
//     email: String,
//     // address: {
//     //   street: { type: String, required: true },
//     //   city: { type: String, required: true },
//     //   state: { type: String, required: true },
//     //   zip: { type: String, required: true },
//     // },
//     picture: String,
//     maxTravelDistance: Number,
//     proficiency: { type: String, enum: Object.values(ProficiencyLevel) },
//     availability: [{
//             dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
//             isAvailable: { type: Boolean, default: false },
//         }],
//     // games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
// });
// const User = mongoose.model('User', userSchema);
// export default User;
