/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Todos
// ====================================================

export interface Todos_todos {
  __typename: "Todo";
  _id: string;
  todo: string;
  description: string;
  completed: boolean;
}

export interface Todos {
  todos: Todos_todos[];
}
