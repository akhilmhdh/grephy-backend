import Joi from "@hapi/joi";

const ChannelSchema = Joi.object({
  _user: Joi.string().min(1).max(50).required(),
  name: Joi.string().min(1).max(50).required().trim(),
  description: Joi.string().min(1).max(150).trim(),
  var: Joi.array().items({
    name: Joi.string().min(1).max(30).required(),
    value: Joi.any(),
  }),
});

export default ChannelSchema;
