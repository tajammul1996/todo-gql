import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}-mongodb.services.clever-cloud.com:27017/bskxcpzucz2fjxo`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("bskxcpzucz2fjxo");

  return {
    todos: db.collection("todos"),
  };
};
