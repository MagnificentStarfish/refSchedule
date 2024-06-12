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
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
// import mongoose from './server';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
const user_1 = __importDefault(require("./user"));
// import LocationModel from './location';
// import AddressModel from './address';
// import GameModel from './game';
// mongoose.connect('mongodb://localhost:27017/refSchedule', {
//   }).then(() => {
//     console.log('Connected to MongoDB');
//   }).catch((error) => {
//     console.error('Failed to connect to MongoDB', error);
//   });
const typeDefs = (0, apollo_server_1.gql) `
  type User {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    address: Address!
    picture: String
    maxTravelDistance: Int!
    # proficiency: String
    availability: [Availability]
  }

  # type Game {
  #   id: ID!
  #   location: Location!
  #   referees: [User]
  #   date: String!
  #   time: String!
  #   proficiencyLevel: String!
  # }

  type Availability {
    dayOfWeek: DayOfWeek
    isAvailable: Boolean
  }

  input AvailabilityInput {
  dayOfWeek: DayOfWeek
  isAvailable: Boolean
}

  enum DayOfWeek {
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
  }

  type Query {
    allUsers: [User]
    getUserByLastName(lastName: String!): [User]
    getUserByPhoneNumber(phoneNumber: String!): [User]
    healthCheck: String
    # allLocations: [Location]
    # locationByName(name: String!): Location
    # allGames: [Game]
    # gamesByLocation(location: String!): [Game]
    # gamesByReferee(referee: String!): [Game]
    # gameById(id: ID!): Game
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  # type Location {
  #   name: String
  #   address: Address
  # }

  input AddressInput {
  street: String!
  city: String!
  state: String!
  zip: String!
}

type Mutation {
  createUser(firstName: String!, lastName: String!, phoneNumber: String!, email: String!, address: AddressInput!,
    picture: String, maxTravelDistance: Int!, proficiency: String, availability: [AvailabilityInput]): User!
  updateUser(id: ID!, firstName: String, lastName: String, phoneNumber: String, email: String,
    picture: String, maxTravelDistance: Int, proficiency: String, availability: [AvailabilityInput]): User
  deleteUser(id: ID!): User
}


`;
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        allUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return users;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch users');
            }
        }),
        getUserByLastName: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({ lastName: args.lastName });
                return users;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch user(s) by last name');
            }
        }),
        getUserByPhoneNumber: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({ phoneNumber: args.phoneNumber });
                if (users.length > 1) {
                    console.log('Found multiple users with the same phone number: ${args.phoneNumber}');
                }
                return users;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch user(s) by phone number');
            }
        }),
        healthCheck: () => 'Server is running',
        //   allLocations: async () => {
        //     try {
        //       return await LocationModel.find().populate('address');
        //   } catch (error) {
        //       console.error(error);
        //       throw new Error('Failed to fetch locations');
        //     }
        // },
        // locationByName: async (_: any, args: { name: string; }) => {
        //   try {
        //     return await LocationModel.find({
        //       name: { $regex: new RegExp(args.name, 'i') }
        //     }).populate('address');
        //     } catch (error) {
        //       console.error(error);
        //       throw new Error('Failed to fetch location by name');
        //   }
        //   },
        //       allGames: async () => {
        //       try {
        //         return await GameModel.find({});
        //       } catch (error) {
        //         console.error(error);
        //         throw new Error('Failed to fetch all games');
        //       }
        //     },
        //     gameById: async (_: any, { id }: {id: string}) => {
        //   try {
        //     return await GameModel.findById(id);
        //   } catch (error) {
        //     console.error(error);
        //     throw new Error(`Failed to fetch game with id ${id}`);
        //   }
        // },
        //     gamesByLocation: async (_: any, args: { location: string; }) => {
        //       try {
        //         return await GameModel.find({ location: args.location });
        //       } catch (error) {
        //         console.error(error);
        //         throw new Error('Failed to fetch games by location');
        //       }
        //     },
        //     gamesByReferee: async (_: any, args: { referee: string; }) => {
        //       try {
        //         return await GameModel.find({ referee: args.referee });
        //       } catch (error) {
        //         console.error(error);
        //         throw new Error('Failed to fetch games by referee');
        //       }
        //     },
    },
    Mutation: {
        createUser: (_, { firstName, lastName, phoneNumber, email, address, picture, maxTravelDistance, proficiency, availability, }) => __awaiter(void 0, void 0, void 0, function* () {
            let user;
            try {
                user = new user_1.default({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    address,
                    picture,
                    maxTravelDistance,
                    proficiency,
                    availability,
                });
                yield user.save();
            }
            catch (error) {
                if (error.message.includes('E11000 duplicate key error')) {
                    let field = Object.keys(error.keyPattern)[0];
                    let userEmail = error.keyValue[field];
                    let message = `A user with this ${field} (${userEmail}) already exists.`;
                    throw new Error(message);
                }
                else {
                    throw error;
                }
            }
            return user;
        }),
    },
};
exports.resolvers = resolvers;
