/* eslint-disable no-throw-literal */
/* eslint-disable no-underscore-dangle */
import { ObjectId } from "mongodb";
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

const updateChannel = async (_id, channelUpdateData) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // find and update the channel
  const objectID = new ObjectId(_id);
  const channel = await collection.updateOne(
    { _id: objectID },
    {
      $set: channelUpdateData,
    }
  );

  return channel;
};

const listChannels = async (_user) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // fetch all channels of the user
  const channel = await collection.find(_user).toArray();
  return channel;
};

const deleteChannel = async (channelID) => {
  const database = new DB();
  const collection = database.get.collection("channels");

  // fetch all channels of the user
  const objectID = new ObjectId(channelID);
  const channel = await collection.deleteOne({ _id: objectID });
  return channel;
};

export default {
  createChannel,
  updateChannel,
  listChannels,
  deleteChannel,
};
