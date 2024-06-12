"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByPhoneNumber = void 0;
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/refSchedule');
const getUserByPhoneNumber = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({ phoneNumber: phoneNumber });
        if (users.length === 0) {
            console.log('No user with this phone number was found');
        }
        else if (users.length > 1) {
            console.log(`Multiple users found with phone number: ${phoneNumber}`);
        }
        console.log(`User(s): ${users}`);
        mongoose_1.default.connection.close();
        return users;
    }
    catch (error) {
        console.error('An error occurred:', error);
        mongoose_1.default.connection.close();
    }
});
exports.getUserByPhoneNumber = getUserByPhoneNumber;
(0, exports.getUserByPhoneNumber)('1234567890');
