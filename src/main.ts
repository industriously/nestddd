import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CORS_ORGIN } from '@COMMON/constants';
import { PrismaService } from '@INFRA/DB';
import { LoggerServiceToken } from '@INFRA/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      credentials: true,
      origin: CORS_ORGIN,
    },
  });
  app.useLogger(app.get(LoggerServiceToken));
  app.get(PrismaService).enableShutdownHooks(app);

  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());

  await app.listen(process.env.PORT, () => {
    process.send ? process.send('ready') : undefined;
  });
}
bootstrap();
