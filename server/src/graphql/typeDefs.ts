import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Todo {
    _id: ID!
    todo: String!
    description: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(todo: String!, description: String!): Todo!
    deleteTodo(_id: ID!): Todo!
    completeTodo(_id: ID!, completed: Boolean!): Todo!
  }
`;
