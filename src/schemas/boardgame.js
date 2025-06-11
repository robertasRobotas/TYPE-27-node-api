import Joi from "joi";

const loginSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imgUrl: Joi.string().required(),
  releaseYear: Joi.number().required(),
  playTimeMin: Joi.number().required(),
  bestStartPlayAtAge: Joi.number().required(),
  rating: Joi.number().min(0).max(10).required(),
  dificulty: Joi.number().max(5).required(),
  boxSize: Joi.string().required(),
  ratingCount: Joi.number().required(),

  canPlayPersons: Joi.array().items(Joi.number().integer()).required(),
  bestPlayPersons: Joi.array().items(Joi.number().integer()).required(),
});

export default loginSchema;
