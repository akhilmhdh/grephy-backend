import JWT from "../utils/jwt";

import ChannelSchema from "./channelValidator";

import channelService from "./channelService";

const createChannel = (req, res, next) => {
  const { name, description } = req.body;
  const user = JWT.JWTDecode(req.session.user);
  const { error, value } = ChannelSchema.validate({
    _user: user,
    name,
    description,
  });
  if (error) {
    next(error);
  }
  channelService.createChannel(value);
  next();
};

const readChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

const updateChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

const listChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

const deleteChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

export default {
  createChannel,
  readChannel,
  updateChannel,
  listChannel,
  deleteChannel,
};
