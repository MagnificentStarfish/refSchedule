// const { ApolloServer, gql } = require('apollo-server');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const UserModel = require('./user');
// const LocationModel = require('./location');
// const AddressModel = require('./address');
// const GameModel = require('./game');
import { MongoError, MongoServerError } from 'mongodb';
import { ApolloServer, gql } from 'apollo-server';
// import mongoose from './server';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import User from './user';
// import LocationModel from './location';
// import AddressModel from './address';
// import GameModel from './game';

// mongoose.connect('mongodb://localhost:27017/refSchedule', {
//   }).then(() => {
//     console.log('Connected to MongoDB');
//   }).catch((error) => {
//     console.error('Failed to connect to MongoDB', error);
//   });

const typeDefs = gql`
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

const resolvers = {
  Query: {
    allUsers: async () => {
      try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users');
      }
    },

    getUserByLastName: async (_: any, args: { lastName: string; }) => {
      try {
        const users = await User.find({ lastName: args.lastName });
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by last name');
      }
    },

    getUserByPhoneNumber: async (_: any, args: { phoneNumber: string; }) => {
      try {
        const users = await User.find({ phoneNumber: args.phoneNumber });
        if (users.length > 1) {
          console.log('Found multiple users with the same phone number: ${args.phoneNumber}');
        }
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by phone number');
      }
    },

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
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      picture,
      maxTravelDistance,
      proficiency,
      availability,
    }: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      address: {
        street: string;
        city: string;
        state: string;
        zip: string;
      };
      picture?: string;
      maxTravelDistance: number;
      proficiency?: string;
      availability?: Array<{ dayOfWeek: string; isAvailable: boolean }>;
    }
  ) => {
    let user;
    try {
      const user = new User({
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

      await user.save();
    } catch (error: unknown) {
      if (error instanceof MongoServerError && (error.code === 11000 || error.code === 11001)) {
        throw new Error('A user with this phone number already exists.');
      } else {
        throw new Error('An error occurred while creating the user.');
      }
    }
    return user;
  },
},
};
// Mutation: {
//   createUser: async (_: any, { firstName }: { firstName: string; }) => {
//   const user = new UserModel({ firstName });
//   return await user.save();
// },
// },
// };
  // createUser: async (_: any, { firstName }: { firstName: string; }) => {
  //   const user = new UserModel({ firstName });
  //   return await user.save();
  // },
  // createUser: async (
  //   _: any,
  //   {
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     email,
  //     picture,
  //     // address,
  //     maxTravelDistance,
  //     proficiency,
  //     availability,
    // }: {
      // firstName: string;
  //     lastName: string;
  //     phoneNumber: string;
  //     email: string;
  //     picture?: string;
  //     // address: {
  //       // street: string;
  //       // city: string;
  //       // state: string;
  //       // zip: string;
  //     // };
  //     maxTravelDistance: number;
  //     proficiency?: string;
  //     availability: string[];
  //   }
  // ) => {
  //   try {
  //     console.log('Creating user...');
  //     console.log('Input data:', {
  //       firstName,
//         lastName,
//         phoneNumber,
//         email,
//         picture,
//         // address,
//         maxTravelDistance,
//         proficiency,
//         availability,
      // });

      // const user = new UserModel({
      //   firstName,
//         lastName,
//         phoneNumber,
//         email,
//         picture,
//         // address: {
//         //   street: address.street,
//         //   city: address.city,
//         //   state: address.state,
//         //   zip: address.zip,
//         // },
//         maxTravelDistance,
//         proficiency,
//         availability,
      // });

//       console.log('User model:', user);
//       const result = await user.save();
//       console.log('Result of save operation:', result);
//       return result;
//     }
//     catch (error) {
//   if (error instanceof Error) {
//     console.error('Error name:', error.name);
//     console.error('Error message:', error.message);
//   }
//   console.error('Error object:', error);
//   throw new Error('Failed to create user');
// }
//   },

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
// },
// };


// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }: { url: string }) => {
//   console.log(`Server ready at ${url}`);
// });

export { typeDefs, resolvers}
