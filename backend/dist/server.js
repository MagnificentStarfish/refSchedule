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
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_1 = require("apollo-server");
const graphqlServer_1 = require("./graphqlServer");
const graphqlServer_2 = require("./graphqlServer");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb://localhost:27017/refSchedule', {
                serverSelectionTimeoutMS: 30000,
            });
            console.log('Connected to MongoDB');
            mongoose_1.default.connection.on('connected', () => {
                console.log('Mongoose reconnected to MongoDB');
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.log('Mongoose disconnected from MongoDB');
            });
            mongoose_1.default.connection.on('error', (error) => {
                console.error('Mongoose encountered an error', error);
            });
            mongoose_1.default.set('debug', true);
            const server = new apollo_server_1.ApolloServer({ typeDefs: graphqlServer_1.typeDefs, resolvers: graphqlServer_2.resolvers });
            server.listen().then(({ url }) => {
                console.log(`🚀 Server ready at ${url}`);
            });
        }
        catch (error) {
            console.error('Failed to connect to MongoDB', error);
        }
    });
}
connectToDatabase();
