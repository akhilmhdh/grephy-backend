import JWT from "../utils/jwt";

import channelValidator from "./channelValidator";

import channelService from "./channelService";

// to create channels for a user
const createChannel = async (req, res, next) => {
  const { createChannelSchema } = channelValidator;

  try {
    const { name, description } = req.body;
    const { id } = JWT.JWTDecode(req.session.user);

    // validate schema
    const { error, value } = createChannelSchema.validate({
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
  const { updateChannelSchema } = channelValidator;

  try {
    // userid and channel name via channel token
    const { userID } = JWT.JWTDecode(req.session.user);
    const { id } = req.query;

    const { name, description } = req.body;

    // channel schema validate
    const { error, value } = updateChannelSchema.validate({
      _user: userID,
      _id: id,
      name,
      description,
    });

    // to remove all non given things from null
    Object.keys(value).forEach(
      (key) => value[key] == null && delete value[key]
    );
    // validating
    if (error) next(error);
    // const updateStatus = await channelService.updateChannel(
    //   { _user: id, name: channelName },
    //   value
    // );
    // res.send(updateStatus).status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
  }
};

const listChannels = async (req, res, next) => {
  const { listChannelSchema } = channelValidator;

  try {
    const { userID } = JWT.JWTDecode(req.session.user);

    // channel schemea validate
    const { error, value } = listChannelSchema.validate({
      _user: userID,
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
  const { deleteChannelSchema } = channelValidator;

  try {
    // userid and channel name via channel token
    const { userID } = JWT.JWTDecode(req.session.user);

    // get channel name to be deleted
    const { id } = req.query;

    // schema validation
    const { error, value } = deleteChannelSchema.validate({
      _user: userID,
      _id: id,
    });
    if (error) next(error);
    // status of deletion
    const status = await channelService.deleteChannel(value);
    res.send(status).status(200);
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
