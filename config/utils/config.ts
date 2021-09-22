import * as Joi from '@hapi/joi';

const config = {
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
  }),
};

export default config;
