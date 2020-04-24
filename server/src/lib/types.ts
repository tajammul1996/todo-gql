import { ObjectId, Collection } from "mongodb";

export interface Todo {
  _id: ObjectId;
  todo: string;
  description: string;
  completed: boolean;
}

export interface Database {
  todos: Collection<Todo>;
}
