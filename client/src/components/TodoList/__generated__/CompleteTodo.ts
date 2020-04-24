/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteTodo
// ====================================================

export interface CompleteTodo_completeTodo {
  __typename: "Todo";
  _id: string;
}

export interface CompleteTodo {
  completeTodo: CompleteTodo_completeTodo;
}

export interface CompleteTodoVariables {
  _id: string;
  completed?: boolean | null;
}
