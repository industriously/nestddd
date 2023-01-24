import { ConfigModule as OriginalConfigModule } from '@nestjs/config';
import Joi from 'joi';

const validationSchema = Joi.object<any, false, IEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string().default('4000'),

  SESSION_SECRET: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_OAUTH_CALLBACK: Joi.string().required(),

  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GITHUB_OAUTH_CALLBACK: Joi.string().required(),
});

export const ConfigModule = OriginalConfigModule.forRoot({
  isGlobal: true,
  cache: false,
  envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationOptions: {
    abortEarly: true,
  },
  validationSchema,
});
