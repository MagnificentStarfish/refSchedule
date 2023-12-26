const userResolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('address');
    },
  },
};

module.exports = userResolvers;
