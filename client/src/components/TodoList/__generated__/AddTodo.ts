/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTodo
// ====================================================

export interface AddTodo_addTodo {
  __typename: "Todo";
  todo: string;
  description: string;
}

export interface AddTodo {
  addTodo: AddTodo_addTodo;
}

export interface AddTodoVariables {
  todo: string;
  description: string;
}
