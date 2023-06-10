import UserCollection from "../../models/userSchema";

const userResolvers = {
  Query: {
    async users() {
      try {
        return await UserCollection.find().sort({ createdAt: -1 });
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    async addUser(_, { user }) {
      try {
        const mongoUser = await UserCollection.create(user);
        if (mongoUser) {
          return mongoUser;
        } else {
          console.log("Order not created");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default userResolvers;
