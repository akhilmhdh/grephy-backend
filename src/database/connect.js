import { MongoClient } from "mongodb";

MongoClient.connect("mongodb://localhost:27017/Grephy", (err, db) => {
  if (err) {
    return "Couldnot connect";
  }
  console.log("connected");

  db.close();
});
