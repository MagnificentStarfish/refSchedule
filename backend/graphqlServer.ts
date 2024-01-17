const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const User = require('./user');
const LocationModel = require('./location');


const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
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
      return await User.find();
    },
    locations: async () => {
      return await LocationModel.find();
    }
  },
  User: {
    address: async (parent: any) => {
      return await parent.populate('address').execPopulate();
    },
    games: async (parent: any) => {
      return await parent.populate('games').execPopulate();
    },
  },
};

// Starts the server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
