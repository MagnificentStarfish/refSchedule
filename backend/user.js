"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = void 0;
var mongoose_1 = require("mongoose");
var proficiency_level_1 = require("./proficiency-level");
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
var userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Address' },
    picture: String,
    maxTravelDistance: Number,
    proficiency: { type: String, enum: Object.values(proficiency_level_1.ProficiencyLevel) },
    availability: [{
            dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
            isAvailable: { type: Boolean, default: false },
        }],
    games: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Game' }],
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
