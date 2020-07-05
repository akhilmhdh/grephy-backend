import Joi from "@hapi/joi";

// channel Schema for future me.
// A channel takes 4 values.
// _user: the user who created the channel.
// name: channel name of max length 50.
// description: a short note on purpose of this channel.
// var: these are channel variables for custom variables.

// const ChannelSchema = Joi.object({
//   _user: Joi.string().min(1).max(50),
//   name: Joi.string().min(1).max(50).trim(),
//   description: Joi.string().min(1).max(150).trim(),
//   var: Joi.array().items(
//     Joi.object({
//       name: Joi.string().min(1).max(30).required(),
//       value: Joi.any(),
//     })
//   ),
// });

const createChannel = Joi.object({
  _user: Joi.string().min(1).max(50).required(),
  name: Joi.string().min(1).max(50).trim().required(),
  description: Joi.string().min(1).max(150).trim().required(),
});

const updateChannel = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .required("Unauthorized"),
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
});

const readChannel = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const listChannel = Joi.object({
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const deleteChannel = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export default {
  createChannel,
  updateChannel,
  listChannel,
  readChannel,
  deleteChannel,
};
