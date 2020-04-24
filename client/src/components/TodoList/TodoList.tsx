import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Todos, Todos_todos } from "./__generated__/Todos";

interface Props {
  title: string;
}

interface TodoProps {
  _id: string;
  completed: boolean;
  description: string;
  todo: string;
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

const TodoItem = ({ _id, completed, description, todo }: TodoProps) => {
  return (
    <>
      <p style={completed ? { textDecoration: "line-through" } : {}}>
        <b>{todo}</b> - {description} <button>done</button>{" "}
        <button>delete</button>
      </p>
    </>
  );
};

const TodoList = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<Todos>(TODOS);

  const todos = data && data.todos;

  const todoItems =
    todos && todos.map((todo) => <TodoItem key={todo._id} {...todo} />);

  if (loading) return <h1>Loading..</h1>;

  return (
    <>
      <h1>{title}</h1>
      <div>{todoItems}</div>
    </>
  );
};

export default TodoList;
