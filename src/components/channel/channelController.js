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
const updateChannel = async (req, res, next) => {
  try {
    // userid and channel name via channel token
    const { _user, name } = JWT.JWTDecode(req.params.id);
    const { newName, newDescription } = req.body;
    // channel schema validate
    const { error, value } = ChannelSchema.validate({
      _user,
      name: newName,
      description: newDescription,
    });
    // to remove all non given things from null
    Object.keys(value).forEach(
      (key) => value[key] == null && delete value[key]
    );
    // validating
    if (error) next(error);
    const channel = await channelService.updateChannel(name, value);
    res.send(channel).status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
  }
};

const listChannels = async (req, res, next) => {
  try {
    const { id } = JWT.JWTDecode(req.session.user);
    // channel schemea validate
    const { error, value } = ChannelSchema.validate({
      _user: id,
    });
    if (error) next(error);
    // service to delete a channel
    const channel = await channelService.listChannels(value);
    res.send(channel).status(200);
    next();
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// delete channel of a user
const deleteChannel = async (req, res, next) => {
  try {
    // userid and channel name via channel token
    const { _user, name } = JWT.JWTDecode(req.params.id);
    // channel schema validate
    const { error, value } = ChannelSchema.validate({
      _user,
      name,
    });
    if (error) next(error);
    const channel = await channelService.deleteChannel(value);
    res.send(channel).status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  createChannel,
  readChannel,
  updateChannel,
  listChannels,
  deleteChannel,
};
