import Joi from "@hapi/joi";

// channel Schema for future me.
// A channel takes 4 values.
// _user: the user who created the channel.
// name: channel name of max length 50.
// description: a short note on purpose of this channel.
// var: these are channel variables for custom variables.

const ChannelSchema = Joi.object({
  _user: Joi.string().min(1).max(50),
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
  var: Joi.array().items(
    Joi.object({
      name: Joi.string().min(1).max(30).required(),
      value: Joi.any(),
    })
  ),
});

export default ChannelSchema;
