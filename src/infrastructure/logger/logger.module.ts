import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerServiceToken } from './injection.token';
import { LoggerInterceptor } from './logger.interceptor';
import { WinstonService } from './winston.service';

@Module({
  providers: [
    {
      provide: LoggerServiceToken,
      useClass: WinstonService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  exports: [LoggerServiceToken],
})
export class LoggerModule {}
