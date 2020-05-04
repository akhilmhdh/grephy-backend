import DB from "../../db";

// Data Access layer for User login
const UserLogin = async ({ uID, name, email, provider }) => {
  const database = new DB();
  const collection = database.get.collection("users");

  const existingUser = await collection.findOne({ uID, name, provider });
  if (existingUser) return existingUser;
  const user = await collection.insertOne({ uID, name, email, provider });
  return user.ops[0];
};

export default {
  UserLogin,
};
