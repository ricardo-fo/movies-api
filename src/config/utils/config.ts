import * as Joi from '@hapi/joi';

const config = {
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    SMTP_SERVICE: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.string().required(),
    SMTP_AUTH_USER: Joi.string().required(),
    SMTP_AUTH_PASS: Joi.string().required(),
  }),
};

export default config;
