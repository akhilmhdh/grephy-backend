import Joi from "@hapi/joi";

// data: Joi.object().pattern(Joi.any().valid(Joi.in("yAxis")), Joi.number()),

const createGraph = Joi.object({
  _channel: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
  title: Joi.string().min(1).max(50).trim(),
  xAxis: Joi.string().min(1).max(20).trim(),
  yAxis: Joi.array().items(Joi.string().min(1).max(15)),
});

const updateGraph = Joi.object({
  name: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(150).trim(),
  title: Joi.string().min(1).max(50).trim(),
  xAxis: Joi.string().min(1).max(20).trim(),
  yAxis: Joi.array().items(Joi.string().min(1).max(15)),
});

export default { createGraph, updateGraph };
