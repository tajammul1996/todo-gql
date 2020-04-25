import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Todos } from "./__generated__/Todos";
import {
  CompleteTodo as CompleteTodoData,
  CompleteTodoVariables,
} from "./__generated__/CompleteTodo";
import {
  DeleteTodo as DeleteTodoData,
  DeleteTodoVariables,
} from "./__generated__/DeleteTodo";

import TodoItem from "./TodoItem";

interface Props {
  title: string;
}

const TODOS = gql`
  query Todos {
    todos {
      _id
      todo
      description
      completed
    }
  }
`;

const COMPLETE_TODO = gql`
  mutation CompleteTodo($_id: ID!, $completed: Boolean!) {
    completeTodo(_id: $_id, completed: $completed) {
      _id
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($_id: ID!) {
    deleteTodo(_id: $_id) {
      _id
      todo
      description
    }
  }
`;

const TodoList = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<Todos>(TODOS);
  const [completeTodo] = useMutation<CompleteTodoData, CompleteTodoVariables>(
    COMPLETE_TODO
  );

  const [deleteTodo, { loading: dLoad, error: dErr }] = useMutation<
    DeleteTodoData,
    DeleteTodoVariables
  >(DELETE_TODO);

  const handleCompleteTodo = async (_id: string, completed: boolean) => {
    await completeTodo({ variables: { _id, completed } });
    refetch();
  };

  const handleDeleteTodo = async (_id: string) => {
    await deleteTodo({ variables: { _id } });
    refetch();
  };

  const todos = data && data.todos;

  const todoItems =
    todos &&
    todos.map((todo) => (
      <TodoItem
        key={todo._id}
        {...todo}
        completeTodo={handleCompleteTodo}
        deleteTodo={handleDeleteTodo}
      />
    ));

  const deleteMessage = dLoad && <h2>deleting todo...</h2>;

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Something went wrong</h1>;

  return (
    <>
      <h1>{title}</h1>
      <div>{todoItems}</div>
      {deleteMessage}
    </>
  );
};

export default TodoList;
