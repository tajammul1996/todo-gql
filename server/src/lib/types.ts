import { ObjectId, Collection } from "mongodb";

export interface Todo {
  _id: ObjectId;
  todo: string;
  description: string;
}

export interface Database {
  todos: Collection<Todo>;
}
