import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import session from 'express-session';
import { sessionConfig } from './session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());
  app.use(session(sessionConfig));

  await app.listen(4000, () => {
    process.send ? process.send('ready') : undefined;
  });
}
bootstrap();
