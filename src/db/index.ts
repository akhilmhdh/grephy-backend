/* eslint-disable consistent-return */
import { MongoClient, MongoCallback, MongoClientCommonOption } from "mongodb";

const state = { db: null };

interface DB {
  dbName?: string;
  options?: MongoClientCommonOption;
}

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
