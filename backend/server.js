var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect('mongodb://localhost:27017/refSchedule', {
                serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            });
            console.log('Connected to MongoDB');
            mongoose.connection.on('connected', () => {
                console.log('Mongoose reconnected to MongoDB');
            });
            mongoose.connection.on('disconnected', () => {
                console.log('Mongoose disconnected from MongoDB');
            });
            mongoose.connection.on('error', (error) => {
                console.error('Mongoose encountered an error', error);
            });
            mongoose.set('debug', true);
        }
        catch (error) {
            console.error('Failed to connect to MongoDB', error);
        }
    });
}
connectToDatabase();
