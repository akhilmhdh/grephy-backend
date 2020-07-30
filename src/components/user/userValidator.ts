import Joi from '@hapi/joi';

const UserSchema = Joi.object({
    uID: Joi.string().min(1),
    name: Joi.string().min(1),
    provider: Joi.string().valid('google', 'github'),
    email: Joi.string().email().default(null)
});

export default UserSchema;
