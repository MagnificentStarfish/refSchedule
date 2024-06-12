"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const proficiency_level_1 = require("./proficiency-level");
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Monday"] = "Monday";
    DayOfWeek["Tuesday"] = "Tuesday";
    DayOfWeek["Wednesday"] = "Wednesday";
    DayOfWeek["Thursday"] = "Thursday";
    DayOfWeek["Friday"] = "Friday";
    DayOfWeek["Saturday"] = "Saturday";
    DayOfWeek["Sunday"] = "Sunday";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /.+@.+\..+/ },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    },
    picture: String,
    maxTravelDistance: { type: Number, required: true, min: 0, max: 1000 },
    proficiency: { type: String, enum: Object.values(proficiency_level_1.ProficiencyLevel) },
    availability: [{
            dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: false },
            isAvailable: { type: Boolean, default: false },
        }],
    // games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
