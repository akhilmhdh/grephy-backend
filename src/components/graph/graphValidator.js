import Joi from "@hapi/joi";

const GraphValidator = Joi.object({
  _channel: Joi.string().min(1).max(50),
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
  xAxis: Joi.string().min(1).max(20).trim(),
  yAxis: Joi.array().items(Joi.string().min(1).max(15)),
  data: Joi.object().pattern(Joi.any().valid(Joi.in("yAxis")), Joi.number()),
});

export default GraphValidator;
