import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

import TodoList from "./components/TodoList/components/TodoList";

const client = new ApolloClient({
  uri: "/api",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <TodoList title="Todos" />
  </ApolloProvider>,
  document.getElementById("root")
);
