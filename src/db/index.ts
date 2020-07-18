/* eslint-disable consistent-return */
import { MongoClient, MongoCallback, MongoClientCommonOption } from "mongodb";

interface DB {
  dbName?: string;
  options?: MongoClientCommonOption;
}
interface state {
  db: DB | null;
}
const state: state = { db: null };

// this config is used for connection pool
// fast and much better
// exports the db instance to everycomponent
export default class MongoConnectionPool {
  db: DB;

  constructor() {
    this.db = state.db;
  }

  static connect(url: string, done: MongoCallback<MongoClient>): void {
    MongoClient.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      (err, client) => {
        if (err) return done(err, client);
        state.db = client.db("Grephy");
        done(null, client);
      }
    );
  }

  get get(): DB {
    return this.db;
  }
}
