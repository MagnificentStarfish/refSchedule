import Game from './game';

const gameResolvers = {
  Query: {
    games: async () => {
      return await Game.find({}).populate('location');
    },
  },
};

module.exports = gameResolvers;
