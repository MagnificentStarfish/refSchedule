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
const deleteUser = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.deleteMany({
            $or: [{ email: email }, { phoneNumber: phoneNumber }]
        });
        console.log(`Successfully deleted ${result.deletedCount} user(s).`);
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.error(error);
        mongoose_1.default.connection.close();
        throw new Error('Failed to delete user');
    }
});
deleteUser('user@example.com', '2');
