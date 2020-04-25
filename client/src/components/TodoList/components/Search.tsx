import React, { useState } from "react";
import { Input } from "antd";

import "../styles/todo.css";

interface SearchProps {
  handleNewTodo: (todo: string, description: string) => Promise<void>;
  addLoad: boolean;
}

const Search = ({ handleNewTodo, addLoad }: SearchProps) => {
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addTodo = (): void => {
    handleNewTodo(todo, description);
    setDescription("");
    setTodo("");
  };

  return (
    <div className="searchContainer">
      <Input
        type="text"
        placeholder="add new todo.."
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <Input.Search
        type="text"
        placeholder="add  todo description.."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        enterButton="Add Todo"
        onSearch={addTodo}
        loading={addLoad}
      />
    </div>
  );
};

export default Search;
