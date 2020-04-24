require("dotenv").config();
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";

import { connectDatabase } from "./database/index";
import { todoResolvers as resolvers } from "./graphql/resolvers/Todos";
import { typeDefs } from "./graphql/typeDefs";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT, () =>
    console.log(`[server started]: [port ${process.env.PORT}]`)
  );
  const todos = await db.todos.find({}).toArray();
  console.log(todos);
};

mount(express());
