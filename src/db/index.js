/* eslint-disable consistent-return */
import { MongoClient } from "mongodb";

const state = { db: null };

// this config is used for connection pool
// fast and much better
// exports the db instance to everycomponent
export default class MongoConnectionPool {
  constructor() {
    this.db = state.db;
  }

  static connect(url, done) {
    MongoClient.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      (err, client) => {
        if (err) return done(err);
        state.db = client.db("Grephy");
        done();
      }
    );
  }

  get get() {
    return this.db;
  }
}
