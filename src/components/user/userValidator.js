import Joi from "@hapi/joi";

const UserSchema = Joi.object({
  uID: Joi.string().min(1).required(),
  name: Joi.string().min(1).required(),
  provider: Joi.string().valid("google", "github").required(),
  email: Joi.string().email().default(null),
});

export default UserSchema;
