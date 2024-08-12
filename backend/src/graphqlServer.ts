import { ApolloServer, gql } from 'apollo-server';
import User from './user';

const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    address: Address!
    picture: String
    maxTravelDistance: Int!
    availability: [Availability]
  }

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
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  type Mutation {
    createUser(
      firstName: String!,
      lastName: String!,
      phoneNumber: String!,
      email: String!,
      address: AddressInput!,
      picture: String,
      maxTravelDistance: Int!,
      proficiency: String,
      availability: [AvailabilityInput]
    ): User!
    updateUser(
      id: ID!,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      email: String,
      picture: String,
      maxTravelDistance: Int,
      proficiency: String,
      availability: [AvailabilityInput]
    ): User
    deleteUser(email: String!, phoneNumber: String!): User
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

    getUserByLastName: async (_: any, args: { lastName: string }) => {
      try {
        const users = await User.find({ lastName: args.lastName });
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by last name');
      }
    },

    getUserByPhoneNumber: async (_: any, args: { phoneNumber: string }) => {
      try {
        const users = await User.find({ phoneNumber: args.phoneNumber });
        if (users.length > 1) {
          console.log(`Found multiple users with the same phone number: ${args.phoneNumber}`);
        }
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by phone number');
      }
    },

    healthCheck: () => 'Server is running',
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
        user = new User({
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
      } catch (error: any) {
        if (error.message.includes('E11000 duplicate key error')) {
          let field = Object.keys(error.keyPattern)[0];
          let userEmail = error.keyValue[field];
          let message = `A user with this ${field} (${userEmail}) already exists.`;
          throw new Error(message);
        } else {
          throw error;
        }
      }
      return user;
    },

    deleteUser: async (_: any, { email, phoneNumber }: { email: string; phoneNumber: string }) => {
      try {
        const user = await User.findOneAndDelete({ $or: [{ email }, { phoneNumber }] });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user');
      }
    },
  },
};

export { typeDefs, resolvers };
