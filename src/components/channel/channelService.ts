/* eslint-disable no-underscore-dangle */
import { ObjectID } from "mongodb";
import channelDAL from "./channelDAL";

import {
  createChannel,
  listChannel
  response,
  querySchema,
  updateChannelSchema,
} from "./channel.interface";
import { ErrorHandler } from "../utils/error";

const createChannel = async ({
  _user,
  name,
  description,
}: createChannel): Promise<response> => {
  // create channel in database
  const { err, value } = await channelDAL.createChannel({
    _user,
    name,
    description,
  });
  if (err) throw new ErrorHandler(417, err);
  // return with token
  return value;
};

const updateChannel = async (
  channel: querySchema,
  channelUpdatedData: updateChannelSchema
): Promise<string> => {
  // update channel in database
  const _id = new ObjectID(channel._id);

  const { err, value } = await channelDAL.updateChannel(
    { _id, _user: channel._user },
    channelUpdatedData
  );
  if (err) throw new ErrorHandler(417, err);
  // return with token
  if (value.result.nModified) return "Updated Successfully";
  return "Updated, No changes";
};

// list all the channels user has
const listChannels = async (user:listChannel): Promise<response> => {
  const {err,value} = await channelDAL.listChannels(user);
  // adds each channel with a token
  if (err) throw new ErrorHandler(417, err);
  return value
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
