import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    login: String!
    password: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  #    type Pizza {
  #        _id: ID!
  #        name: String!
  #        type: [String!]
  #        imgUrl: String!
  #        minCost: Int!
  #        sizes: Size!
  #        doughTypeCostPercent: DoughTypeCostPercent!
  #    }
  #    type Size {
  #        small: Int!
  #        medium: Int!
  #        large: Int!
  #    }
  #    type DoughTypeCostPercent {
  #        thin: Int!
  #        traditional: Int!
  #    }
  #    type CartItem {
  #        _id: String!
  #        imgUrl: String!
  #        name: String!
  #        cost: Int!
  #        size: String!
  #        height: String!
  #        amount: Int!
  #    }
  #    input CartItemInput {
  #        _id: String!
  #        imgUrl: String!
  #        name: String!
  #        cost: Int!
  #        size: String!
  #        height: String!
  #        amount: Int!
  #    }
  #    type Order {
  #        _id: ID!
  #        orderNumber: Int!
  #        orderSum: Int!
  #        orderPizzaAmount: Int!
  #        date: Date!
  #        pizzas: [CartItem]!
  #    }
  #    input OrderInput {
  #        orderSum: Int!
  #        orderPizzaAmount: Int!
  #        date: Date!
  #        pizzas: [CartItemInput]!
  #    }
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type Mutation {
    addUser(user: UserInput!): User
  }
  #  type Subscription {
  #    newOrder: Order
  #  }
`;

export default typeDefs;
