/* eslint-disable no-throw-literal */
/* eslint-disable no-underscore-dangle */
import DB from "../../db";
import {
  createChannel,
  updateChannel,
  listChannel,
  response,
  querySchema,
} from "./channel.interface";

const createChannel = async (
  databaseValue: createChannel
): Promise<response> => {
  const collection = DB.client.db("Grephy").collection("channels");
  const existingChannel = await collection.findOne(databaseValue);
  if (existingChannel) return { err: "Channel already exisitng", value: null };
  // add channel to the collection
  const channel = await collection.insertOne(databaseValue);
  return { err: null, value: channel };
};

const updateChannel = async (
  query: querySchema,
  channelUpdateData: updateChannel
): Promise<response> => {
  const collection = DB.client.db("Grephy").collection("channels");

  // find and update the channel
  const channel = await collection.updateOne(query, {
    $set: channelUpdateData,
  });

  return { err: null, value: channel };
};

const listChannels = async (user: listChannel): Promise<response> => {
  const collection = DB.client.db("Grephy").collection("channels");

  // fetch all channels of the user
  const channel = await collection.find(user).toArray();

  return { err: null, value: channel };
};

const deleteChannel = async (query: querySchema) => {
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
