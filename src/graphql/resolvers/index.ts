import { UserInputError } from "apollo-server";
import { Kind } from "graphql";
import { GraphQLScalarType } from "graphql";
import userResolvers from "./user";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom date",
  serialize(value) {
    if (value instanceof Date) {
      return new Date(value).toString();
    }
    throw new UserInputError("Provided value is not correct");
  },
  parseValue(value) {
    if (value instanceof Date) {
      return new Date(value);
    }
    throw new UserInputError("Provided value is not correct");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new UserInputError("Provided value is not correct");
  },
});

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  Date: dateScalar,
};
export default resolvers;
