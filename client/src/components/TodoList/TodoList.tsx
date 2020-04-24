import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Todos } from "./__generated__/Todos";
import {
  CompleteTodo as CompleteTodoData,
  CompleteTodoVariables,
} from "./__generated__/CompleteTodo";

interface Props {
  title: string;
}

interface TodoProps {
  _id: string;
  completed: boolean;
  description: string;
  todo: string;
  completeTodo: (_id: string, completed: boolean) => Promise<void>;
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

const TodoItem = ({
  _id,
  completed,
  description,
  todo,
  completeTodo,
}: TodoProps) => {
  return (
    <>
      <p style={completed ? { textDecoration: "line-through" } : {}}>
        <b>{todo}</b> - {description}{" "}
        <button onClick={() => completeTodo(_id, !completed)}>done</button>{" "}
        <button>delete</button>
      </p>
    </>
  );
};

const TodoList = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<Todos>(TODOS);
  const [
    completeTodo,
    { loading: completeTodoLoading, error: completeTodoError },
  ] = useMutation<CompleteTodoData, CompleteTodoVariables>(COMPLETE_TODO);

  const handleCompleteTodo = async (_id: string, completed: boolean) => {
    await completeTodo({ variables: { _id, completed } });
    refetch();
  };

  const todos = data && data.todos;

  const todoItems =
    todos &&
    todos.map((todo) => (
      <TodoItem key={todo._id} {...todo} completeTodo={handleCompleteTodo} />
    ));

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Something went wrong</h1>;

  return (
    <>
      <h1>{title}</h1>
      <div>{todoItems}</div>
    </>
  );
};

export default TodoList;
