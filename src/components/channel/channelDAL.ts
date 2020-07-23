/* eslint-disable no-throw-literal */
/* eslint-disable no-underscore-dangle */
import DB from "../../db";

const createChannel = async (databaseValue) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  const existingChannel = await collection.findOne(databaseValue);
  if (existingChannel) throw "Channel already exisitng";
  // add channel to the collection
  const channel = await collection.insertOne(databaseValue);
  return channel.ops[0];
};

const updateChannel = async (query, channelUpdateData) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // find and update the channel
  const channel = await collection.updateOne(query, {
    $set: channelUpdateData,
  });

  return channel;
};

const listChannels = async (user) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // fetch all channels of the user
  const channel = await collection.find(user).toArray();
  return channel;
};

const deleteChannel = async (query) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // delete given channel of the user
  const channel = await collection.deleteOne(query);
  return channel;
};

export default {
  createChannel,
  updateChannel,
  listChannels,
  deleteChannel,
};
