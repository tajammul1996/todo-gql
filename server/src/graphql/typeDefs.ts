import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Todo {
    id: ID!
    todo: String!
    description: String!
  }

  type Query {
    todos: [Todo!]!
  }
`;
