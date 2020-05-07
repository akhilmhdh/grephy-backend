import DB from "../../db";

const createChannel = async (databaseValue) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  const existingUser = await collection.findOne(databaseValue);
  // eslint-disable-next-line no-throw-literal
  if (existingUser) throw "Channel already exisitng";
  // add channel to the collection
  const channel = await collection.insertOne(databaseValue);
  return channel.ops[0];
};

export default {
  createChannel,
};
