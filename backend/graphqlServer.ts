const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const UserModel = require('./user');
const LocationModel = require('./location');
const AddressModel = require('./address');
const GameModel = require('./game');


const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    address: Address
    picture: String
    maxTravelDistance: Int
    proficiency: String
    availability: [Availability]
  }

  type Game {
    id: ID!
    location: Location!
    referees: [User]
    date: String!
    time: String!
    proficiencyLevel: String!
  }

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
    usersBylastName(lastName: String!): [User]
    usersByPhoneNumber(phoneNumber: String!): [User]
    allLocations: [Location]
    locationByName(name: String!): Location
    allGames: [Game]
    gamesByLocation(location: String!): [Game]
    gamesByReferee(referee: String!): [Game]
    gameById(id: ID!): Game
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  type Location {
    name: String
    address: Address
  }

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
    allUsers: async () => {
      try {
        return await UserModel.find().populate('address').populate('games');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users');
      }
    },

    usersByLastName: async (_: any, args: { lastName: string; }) => {
      try {
        return await UserModel.find({ lastName: args.lastName });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by last name');
      }
    },

    usersByPhoneNumber: async (_: any, args: { phoneNumber: string; }) => {
      try {
        return await UserModel.find({ phoneNumber: args.phoneNumber });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user(s) by phone number');
      }
    },

    allLocations: async () => {
      try {
        return await LocationModel.find().populate('address');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch locations');
      }
  },

    locationByName: async (_: any, args: { name: string; }) => {
      try {
        return await LocationModel.find({
          name: { $regex: new RegExp(args.name, 'i') }
        }).populate('address');
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch location by name');
      }
      },

      allGames: async () => {
      try {
        return await GameModel.find({});
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch all games');
      }
    },

    gameById: async (_: any, { id }: {id: string}) => {
  try {
    return await GameModel.findById(id);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch game with id ${id}`);
  }
},

    gamesByLocation: async (_: any, args: { location: string; }) => {
      try {
        return await GameModel.find({ location: args.location });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by location');
      }
    },

    gamesByReferee: async (_: any, args: { referee: string; }) => {
      try {
        return await GameModel.find({ referee: args.referee });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by referee');
      }
    },

Mutation: {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      phoneNumber,
      email,
      picture,
      maxTravelDistance,
      proficiency,
      availability,
    }: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      picture?: string;
      maxTravelDistance: number;
      proficiency: string;
      availability: string[];
    }
  ) => {
    try {
      const user = new UserModel({ firstName, lastName, phoneNumber, email, picture,
        maxTravelDistance, proficiency, availability });
      return await user.save();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  },
},

User: {
  address: async (parent: any) => {
    try {
      return await AddressModel.findById(parent.address);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch address for user');
    }
  },

  games: async (parent: any) => {
    try {
      return await GameModel.find({ _id: { $in: parent.games } });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch games for user');
    }
  },
},
Game: {
  location: async (parent: any) => {
    try {
      return await LocationModel.findById(parent.location);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch location for game');
    }
  },
},
},
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
