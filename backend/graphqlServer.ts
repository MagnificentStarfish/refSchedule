import { ApolloServer, gql } from 'apollo-server';
import User from './user'


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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
