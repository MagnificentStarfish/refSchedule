// const { ApolloServer, gql } = require('apollo-server');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const UserModel = require('./user');
// const LocationModel = require('./location');
// const AddressModel = require('./address');
// const GameModel = require('./game');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer, gql } from 'apollo-server';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import UserModel from '../src/user';
// import LocationModel from './location';
// import AddressModel from './address';
// import GameModel from './game';
const typeDefs = gql `
  type User {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    # address: Address
    picture: String
    maxTravelDistance: Int
    proficiency: String
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
    dayOfWeek: DayOfWeek!
    isAvailable: Boolean
  }

  input AvailabilityInput {
  dayOfWeek: DayOfWeek!
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
    # usersByLastName(lastName: String!): [User]
    # usersByPhoneNumber(phoneNumber: String!): [User]
    # allLocations: [Location]
    # locationByName(name: String!): Location
    # allGames: [Game]
    # gamesByLocation(location: String!): [Game]
    # gamesByReferee(referee: String!): [Game]
    # gameById(id: ID!): Game
  }

  # type Address {
  #   street: String!
  #   city: String!
  #   state: String!
  #   zip: String!
  # }

  # type Location {
  #   name: String
  #   address: Address
  # }

#   input AddressInput {
#   street: String!
#   city: String!
#   state: String!
#   zip: String!
# }

type Mutation {
  createUser(firstName: String!, lastName: String!, phoneNumber: String!, email: String!,
    picture: String, maxTravelDistance: Int!, proficiency: String!, availability: [AvailabilityInput]): User!
  updateUser(id: ID!, firstName: String, lastName: String, phoneNumber: String, email: String,
    picture: String, maxTravelDistance: Int, proficiency: String, availability: [AvailabilityInput]): User
  deleteUser(id: ID!): User
}


`;
const resolvers = {
    Query: {
        allUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield UserModel.find().populate('games');
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch users');
            }
        }),
        // usersByLastName: async (_: any, args: { lastName: string; }) => {
        //   try {
        //     return await UserModel.find({ lastName: args.lastName });
        //   } catch (error) {
        //     console.error(error);
        //     throw new Error('Failed to fetch user(s) by last name');
        //   }
        // },
        // usersByPhoneNumber: async (_: any, args: { phoneNumber: string; }) => {
        //   try {
        //     return await UserModel.find({ phoneNumber: args.phoneNumber });
        //   } catch (error) {
        //     console.error(error);
        //     throw new Error('Failed to fetch user(s) by phone number');
        //   }
        // },
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
        createUser: (_, { firstName, lastName, phoneNumber, email, picture,
        // address,
        maxTravelDistance, proficiency, availability, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log('Creating user...');
                console.log('Input data:', {
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    picture,
                    // address,
                    maxTravelDistance,
                    proficiency,
                    availability,
                });
                // console.log('HERE IS THE ADDRESS', address);
                // console.log('HERE IS THE ADDRESS', address);
                // console.log('HERE IS THE ADDRESS', address);
                const user = new UserModel({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    picture,
                    // address: {
                    //   street: address.street,
                    //   city: address.city,
                    //   state: address.state,
                    //   zip: address.zip,
                    // },
                    maxTravelDistance,
                    proficiency,
                    availability,
                });
                console.log('User model:', user);
                // console.log('User model:', user);
                // console.log('User model:', user);
                // console.log('User model address:', user.address);
                // console.log('User model address:', user.address);
                // console.log('User model address:', user.address);
                const result = yield user.save();
                console.log('Result of save operation:', result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error name:', error.name);
                    console.error('Error message:', error.message);
                }
                console.error('Error object:', error);
                throw new Error('Failed to create user');
            }
        }),
    },
    // Game: {
    //   location: async (parent: any) => {
    //     try {
    //       return await LocationModel.findById(parent.location);
    //     } catch (error) {
    //       console.error(error);
    //       throw new Error('Failed to fetch location for game');
    //     }
    //   },
    // },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
