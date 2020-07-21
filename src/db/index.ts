/* eslint-disable consistent-return */
import { MongoClient, MongoCallback } from "mongodb";

// this config is used for connection pool
// fast and much better
// exports the db instance to everycomponent
export default class MongoConnectionPool {
  public static client: MongoClient;

  public static connect(url: string, done: MongoCallback<MongoClient>): void {
    MongoClient.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      (err, client) => {
        if (err) return done(err, client);
        MongoConnectionPool.client = client;
        done(null, client);
      }
    );
  }

  public disconnect(): void {
    MongoConnectionPool.client.close();
  }
}
