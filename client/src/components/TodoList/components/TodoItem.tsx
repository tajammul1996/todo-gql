import React from "react";

interface TodoProps {
  _id: string;
  completed: boolean;
  description: string;
  todo: string;
  completeTodo: (_id: string, completed: boolean) => Promise<void>;
  deleteTodo: (_id: string) => Promise<void>;
}

const TodoItem = ({
  _id,
  completed,
  description,
  todo,
  completeTodo,
  deleteTodo,
}: TodoProps) => {
  return (
    <>
      <p style={completed ? { textDecoration: "line-through" } : {}}>
        <b>{todo}</b> - {description}{" "}
        <button onClick={() => completeTodo(_id, !completed)}>
          {completed ? "undo" : "done"}
        </button>{" "}
        <button onClick={() => deleteTodo(_id)}>delete</button>
      </p>
    </>
  );
};

export default TodoItem;
