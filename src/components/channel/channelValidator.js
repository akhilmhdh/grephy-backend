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

const createChannelSchema = Joi.object({
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required("Unauthorized"),
  name: Joi.string().min(1).max(50).trim().required(),
  description: Joi.string().min(1).max(150).trim().required(),
});

const updateChannelSchema = Joi.object({
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
});

const readChannelSchema = Joi.object({
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const listChannelSchema = Joi.object({
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const deleteChannelSchema = Joi.object({
  _user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export default {
  createChannelSchema,
  updateChannelSchema,
  listChannelSchema,
  readChannelSchema,
  deleteChannelSchema,
};
