import JWT from "../utils/jwt";

import ChannelSchema from "./channelValidator";

import channelService from "./channelService";

// to create channels for a user
const createChannel = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { id } = JWT.JWTDecode(req.session.user);
    // validate schema
    const { error, value } = ChannelSchema.validate({
      _user: id,
      name,
      description,
    });
    if (error) next(error);
    // create channel in db
    const channel = await channelService.createChannel(value);
    res.send(channel).status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
  }
};

const readChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

// update the channel for a user
const updateChannel = (req, res, next) => {
  // userid and channel name via channel token
  const { _user, name } = JWT.JWTDecode(req.params.id);
  const { description } = req.body;
  // channel schema validate
  const { error, value } = ChannelSchema.validate({
    _user,
    name,
    description,
  });
  if (error) next(error);
  channelService.updateChannel(value);
  next();
};

const listChannel = (req, res, next) => {
  const { id } = JWT.JWTDecode(req.session.user);
  // channel schemea validate
  const { error, value } = ChannelSchema.validate({
    _user: id,
  });
  if (error) next(error);
  // service to delete a channel
  channelService.deleteChannel(value);
  next();
};

// delete channel of a user
const deleteChannel = (req, res, next) => {
  // userid and channel name via channel token
  const { _user, name } = JWT.JWTDecode(req.params.id);
  // channel schema validate
  const { error, value } = ChannelSchema.validate({
    _user,
    name,
  });
  if (error) next(error);
  channelService.deleteChannel(value);
  next();
};

export default {
  createChannel,
  readChannel,
  updateChannel,
  listChannel,
  deleteChannel,
};
