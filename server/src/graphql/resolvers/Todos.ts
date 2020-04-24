import { IResolvers } from "apollo-server-express";
import { InsertOneWriteOpResult } from "mongodb";

import { ObjectId } from "mongodb";
import { Database, Todo } from "../../lib/types";

export const todoResolvers: IResolvers = {
  Query: {
    todos: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Todo[]> => await db.todos.find({}).toArray(),
  },

  Mutation: {
    addTodo: async (
      _root: undefined,
      {
        todo,
        description,
        completed = false,
      }: { todo: string; description: string; completed: boolean },
      { db }: { db: Database }
    ): Promise<Todo> => {
      const res = await (
        await db.todos.insertOne({ todo, description, completed })
      ).ops[0];
      return res;
    },

    deleteTodo: async (
      _root: undefined,
      { _id }: { _id: string },
      { db }: { db: Database }
    ): Promise<Todo> => {
      const res = await db.todos.findOneAndDelete({ _id: new ObjectId(_id) });
      if (!res.value) throw new Error("Failed to delete todo");
      return res.value;
    },

    completeTodo: async (
      _root: undefined,
      { _id, completed }: { _id: string; completed: boolean },
      { db }: { db: Database }
    ) => {
      await (
        await db.todos.findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { completed } },
          { upsert: true }
        )
      ).value;

      const res = await db.todos.findOne({ _id: new ObjectId(_id) });
      return res;
    },
  },
};
