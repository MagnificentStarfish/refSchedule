"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = void 0;
var mongoose_1 = require("mongoose");
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
var DayAvailabilitySchema = new mongoose_1.default.Schema({
    dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
    refereeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Referee', required: true },
    isAvailable: { type: Boolean, default: false },
});
var DayAvailability = mongoose_1.default.model('DayAvailability', DayAvailabilitySchema);
exports.default = DayAvailability;
