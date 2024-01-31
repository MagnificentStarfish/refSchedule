import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphqlServer';
import { resolvers } from './graphqlServer';

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/refSchedule', {
      serverSelectionTimeoutMS: 30000,
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

    // Start Apollo Server after connecting to the database
    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

connectToDatabase();
