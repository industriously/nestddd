import { IEnv } from '@INTERFACE/common';
import { ConfigModule as OriginalConfigModule } from '@nestjs/config';
import Joi from 'joi';

const validationSchema = Joi.object<any, false, IEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_OAUTH_CALLBACK: Joi.string().required(),

  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GITHUB_OAUTH_CALLBACK: Joi.string().required(),

  ACCESS_TOKEN_PUBLIC_KEY: Joi.string().required(),
  ACCESS_TOKEN_PRIVATE_KEY: Joi.string().required(),
  REFRESH_TOKEN_PUBLIC_KEY: Joi.string().required(),
  REFRESH_TOKEN_PRIVATE_KEY: Joi.string().required(),
});

export const ConfigModule = OriginalConfigModule.forRoot({
  isGlobal: true,
  cache: false,
  envFilePath: '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationOptions: {
    abortEarly: true,
  },
  validationSchema:
    process.env.NODE_ENV === 'test' ? undefined : validationSchema,
});
