import * as Joi from 'joi';

export const CONFIG_VALIDATION_SCHEMA = Joi.object({
  DB_URL: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});

export const CONFIG_VALIDATION_OPTION = {
  allowUnknown: true,
  abortEarly: true,
};
