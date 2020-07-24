/* eslint-disable no-underscore-dangle */
import { ObjectID } from "mongodb";
import channelDAL from "./channelDAL";

interface createChannel {
  _user: string;
  name: string;
  description: string;
}

const createChannel = async ({
  _user,
  name,
  description,
}: createChannel): Promise<> => {
  // create channel in database
  const channel = await channelDAL.createChannel({ _user, name, description });
  // return with token
  return channel;
};

const updateChannel = async (id, _user, channelUpdatedData) => {
  // update channel in database
  const _id = new ObjectID(id);
  const channel = await channelDAL.updateChannel(
    { _id, _user },
    channelUpdatedData
  );
  // return with token
  if (channel.result.nModified) return "Updated Successfully";
  return "Didn't changed anything";
};

// list all the channels user has
const listChannels = async (user) => {
  const channel = await channelDAL.listChannels(user);
  // adds each channel with a token
  return channel;
};

// delete a channel of a user
const deleteChannel = async (id, _user) => {
  // pass data to DAL layer
  const _id = new ObjectID(id);
  const channel = await channelDAL.deleteChannel({ _id, _user });
  if (channel.result.n) return "Deleted Successfully";
  return "Channel Deletetion Failure";
};

export default {
  createChannel,
  updateChannel,
  listChannels,
  deleteChannel,
};