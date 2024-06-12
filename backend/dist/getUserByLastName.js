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
exports.getUserByLastName = void 0;
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/refSchedule');
const getUserByLastName = (lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find({ lastName: lastName });
        if (user.length === 0) {
            console.log('No users with this last name were found');
            mongoose_1.default.connection.close();
            return null;
        }
        console.log(`User: ${user}`);
        mongoose_1.default.connection.close();
        return user;
    }
    catch (error) {
        console.error('An error occurred:', error);
        mongoose_1.default.connection.close();
    }
});
exports.getUserByLastName = getUserByLastName;
(0, exports.getUserByLastName)('Doe');
