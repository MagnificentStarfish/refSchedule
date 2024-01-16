"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var proficiency_level_1 = require("./proficiency-level");
var day_availability_1 = require("./day-availability");
var userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Address' },
    picture: String,
    maxTravelDistance: Number,
    proficiency: { type: String, enum: Object.values(proficiency_level_1.ProficiencyLevel) },
    availability: [{
            dayOfWeek: { type: String, enum: Object.values(day_availability_1.DayOfWeek), required: true },
            isAvailable: { type: Boolean, default: false },
        }],
    games: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Game' }],
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
