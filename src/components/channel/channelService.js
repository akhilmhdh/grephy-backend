/* eslint-disable no-underscore-dangle */
import channelDAL from "./channelDAL";
import JWT from "../utils/jwt";

const createChannel = async ({ _user, name, description }) => {
  // create channel in database
  const channel = await channelDAL.createChannel({ _user, name, description });
  // return with token
  return {
    ...channel,
    token: JWT.JWTEncode({ _id: channel._id }),
  };
};

const updateChannel = async (_id, channelUpdatedData) => {
  // update channel in database
  const channel = await channelDAL.updateChannel(_id, channelUpdatedData);
  // return with token
  if (channel.result.nModified) return "Updated Successfully";

  return "Didn't changed anything";
};

// list all the channels user has
const listChannels = async (_user) => {
  const channel = await channelDAL.listChannels(_user);
  // adds each channel with a token
  return channel.map((el) => ({
    ...el,
    token: JWT.JWTEncode({ _id: el._id }),
  }));
};

// delete a channel of a user
const deleteChannel = async (channelID) => {
  const channel = await channelDAL.deleteChannel(channelID);
  if (channel.result.n) return "Deleted Successfully";
  return "Channel Deletetion Failure";
};

export default {
  createChannel,
  updateChannel,
  listChannels,
  deleteChannel,
};
