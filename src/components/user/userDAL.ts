import DB from "../../db";
import { InsertOneWriteOpResult } from "mongodb";

interface arg {
  uID: string;
  name: string;
  email: string;
  provider: string;
}

// Data Access layer for User login
const UserLogin = async ({
  uID,
  name,
  email,
  provider,
}: arg): Promise<InsertOneWriteOpResult<{ _id: unknown }>> => {
  const collection = DB.client.db("Grephy").collection("users");
  // checks for existing user if found return it
  const existingUser = await collection.findOne({ uID, name, provider });
  if (existingUser) return existingUser;
  // if not existing create a new user doc
  const user = await collection.insertOne({ uID, name, email, provider });
  return user;
};

export default {
  UserLogin,
};
