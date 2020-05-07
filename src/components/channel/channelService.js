/* eslint-disable no-underscore-dangle */
import channelDAL from "./channelDAL";
import JWT from "../utils/jwt";

const createChannel = async ({ _user, name, description }) => {
  // create channel in database
  const channel = await channelDAL.createChannel({ _user, name, description });
  // return with token
  return {
    ...channel,
    token: JWT.JWTEncode({ _user: channel._user, name: channel.name }),
  };
};

const updateChannel = async (channelName, { _user, name, description }) => {
  // update channel in database
  const channel = await channelDAL.updateChannel(channelName, {
    _user,
    name,
    description,
  });
  // return with token
  if (channel.nModified) {
    return {
      name,
      description,
      token: JWT.JWTEncode({ _user: channel._user, name: channel.name }),
    };
  }
  return "Didn't changed anything";
};

export default {
  createChannel,
  updateChannel,
};
