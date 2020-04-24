import { IResolvers } from "apollo-server-express";
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
  Todo: {
    id: (todo: Todo): string => todo._id.toString(),
  },
};
