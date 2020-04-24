require("dotenv").config();
import express, { Application } from "express";
import { connectDatabase } from "./database/index";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  app.listen(process.env.PORT, () =>
    console.log(`[server started]: [port ${process.env.PORT}]`)
  );
  const todos = await db.todos.find({}).toArray();
  console.log(todos);
};

mount(express());
