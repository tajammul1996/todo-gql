import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { List, Button, Typography, Badge } from "antd";

import { Todos } from "../__generated__/Todos";
import {
  CompleteTodo as CompleteTodoData,
  CompleteTodoVariables,
} from "../__generated__/CompleteTodo";
import {
  DeleteTodo as DeleteTodoData,
  DeleteTodoVariables,
} from "../__generated__/DeleteTodo";

import {
  AddTodo as AddTodoData,
  AddTodoVariables,
} from "../__generated__/AddTodo";

import Search from "./Search";
import "../styles/todo.css";

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

const ADD_TODO = gql`
  mutation AddTodo($todo: String!, $description: String!) {
    addTodo(todo: $todo, description: $description) {
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

  const [addTodo, { loading: addLoad, error: addErr }] = useMutation<
    AddTodoData,
    AddTodoVariables
  >(ADD_TODO);

  const handleCompleteTodo = async (_id: string, completed: boolean) => {
    await completeTodo({ variables: { _id, completed } });
    refetch();
  };

  const handleDeleteTodo = async (_id: string): Promise<void> => {
    await deleteTodo({ variables: { _id } });
    refetch();
  };

  const handleNewTodo = async (
    todo: string,
    description: string
  ): Promise<void> => {
    await addTodo({ variables: { todo, description } });
    refetch();
  };

  const todos = data && data.todos;

  const todoItems = todos && (
    <List
      itemLayout="horizontal"
      dataSource={todos}
      renderItem={({ todo, description, _id, completed }) => (
        <List.Item
          actions={[
            <Button
              type="link"
              onClick={() => handleCompleteTodo(_id, !completed)}
            >
              {completed ? <Badge text="completed" color="orange" /> : "Done"}
            </Button>,
            <Button type="link" onClick={() => handleDeleteTodo(_id)} danger>
              Delete
            </Button>,
          ]}
        >
          {/* {completed && } */}
          <List.Item.Meta
            title={todo}
            description={description}
            style={completed ? { textDecoration: "line-through" } : {}}
          />
        </List.Item>
      )}
    />
  );

  const deleteMessage = dLoad && <h2>deleting todo...</h2>;

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Something went wrong</h1>;

  return (
    <div className="container">
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        {title}
      </Typography.Title>
      <Search handleNewTodo={handleNewTodo} addLoad={addLoad} />
      <div>{todoItems}</div>
      {deleteMessage}
    </div>
  );
};

export default TodoList;
