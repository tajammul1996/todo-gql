/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTodo
// ====================================================

export interface DeleteTodo_deleteTodo {
  __typename: "Todo";
  _id: string;
  todo: string;
  description: string;
}

export interface DeleteTodo {
  deleteTodo: DeleteTodo_deleteTodo;
}

export interface DeleteTodoVariables {
  _id: string;
}
