import DB from "../../db";

const createGraph = async (databaseValue) => {
  const database = new DB();
  const collection = database.get.collection("graphs");

  const existingGraph = await collection.findOne(databaseValue);
  if (existingGraph) throw new Error("Channel already exisitng");

  // add channel to the collection
  const Graph = await collection.insertOne(databaseValue);
  return Graph.ops[0];
};

export default {
  createGraph,
};
