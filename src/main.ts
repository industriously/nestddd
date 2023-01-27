import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import session from 'express-session';
import { sessionConfig } from './session.config';
import { PrismaService } from '@PRISMA/service';
import { LoggerServiceToken } from '@LOGGER/service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  app.useLogger(app.get(LoggerServiceToken));
  app.get(PrismaService).enableShutdownHooks(app);

  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());
  app.use(session(sessionConfig));

  await app.listen(process.env.PORT, () => {
    process.send ? process.send('ready') : undefined;
  });
}
bootstrap();
