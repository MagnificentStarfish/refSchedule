const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const User = require('./user');


const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
  }

  type Query {
    users: [User]
  }
`;


const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
};

// Starts the server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
