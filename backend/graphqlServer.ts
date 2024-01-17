const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const User = require('./user');
const LocationModel = require('./location');
const AddressModel = require('./address');


const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    phoneNumber: String
    email: String
    address: Address
    picture: String
    maxTravelDistance: Int
    proficiency: String
    availability: [Availability]
    games: [Game]
  }

  type Query {
    users: [User]
    usersBylastName(lastName: String!): [User]
    usersByPhoneNumber(phoneNumber: String!): [User]
    Locations: [Location]
    LocationByName(name: String!): Location
  }

  type Address {
    street: String
    city: String
    state: String
    zip: String
  }

  type Location {
    name: String
    address: Address
  }
`;


const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find().populate('address').populate('games');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users');
      }
    },

    usersByLastName: async (_: any, args: { lastName: string; }) => {
      try {
        return await User.find({ lastName: args.lastName });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by last name');
      }
    },

    usersByPhoneNumber: async (_: any, args: { phoneNumber: string; }) => {
      try {
        return await User.find({ phoneNumber: args.phoneNumber });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by phone number');
      }
    },

    locations: async () => {
      try {
        return await LocationModel.find();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch locations');
      }
  }
},
User: {
  address: async (parent: any) => {
    try {
      return parent.address;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch address for user');
    }
  },

  games: async (parent: any) => {
    try {
      return parent.games;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch games for user');
    }
  },
},
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
