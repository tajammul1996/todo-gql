require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Todo } from "../src/lib/types";

const seed = async () => {
  try {
    console.log("[seed]: running...");
    const db = await connectDatabase();
    const todos: Todo[] = [
      {
        _id: new ObjectId(),
        todo: "update access assignments",
        description:
          "css assignments needs to be updated and have to add new designs",
        completed: false,
      },
      {
        _id: new ObjectId(),
        todo: "complete blog post",
        description: "complete much awaited blog post",
        completed: false,
      },
      {
        _id: new ObjectId(),
        todo: "create power point presentation",
        description:
          "javascript presentation needs to created using keynote or ms powerpoint",
        completed: false,
      },
    ];

    for (const todo of todos) {
      await db.todos.insertOne(todo);
    }
    console.log("[seed]: successful.");
  } catch {
    throw new Error("failed ot seed db");
  }
};

seed();
