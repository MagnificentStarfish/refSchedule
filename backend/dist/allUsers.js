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
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/refSchedule');
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        users.forEach(user => {
            console.log(`Referee: ${user.lastName}, ${user.firstName}, ${user.phoneNumber}`);
        });
        mongoose_1.default.connection.close();
        return users;
    }
    catch (error) {
        console.error(error);
        mongoose_1.default.connection.close();
        throw new Error('Failed to fetch users');
    }
});
allUsers();
