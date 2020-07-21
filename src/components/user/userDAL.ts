import DB from "../../db";

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
}: arg): Promise<string> => {
  const database = new DB();
  const collection = database.get.collection("users");
  // checks for existing user if found return it
  const existingUser = await collection.findOne({ uID, name, provider });
  if (existingUser) return existingUser;
  // if not existing create a new user doc
  const user = await collection.insertOne({ uID, name, email, provider });
  return user.ops[0];
};

export default {
  UserLogin,
};
