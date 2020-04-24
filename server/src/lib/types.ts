import { ObjectId, Collection } from "mongodb";

export interface Todo {
  _id: ObjectId;
  todo: string;
}

export interface Database {
  todos: Collection<Todo>;
}
