import DB from "../../db";

const createGraph = async (databaseValue) => {
  const database = new DB();
  const collection = database.get.collection("graphs");

  const existingChannel = await collection.findOne(databaseValue);
  if (existingChannel) throw "Channel already exisitng";
  // add channel to the collection
  const channel = await collection.insertOne(databaseValue);
  return channel.ops[0];
};

export default {
  createGraph,
};
