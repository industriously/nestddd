import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerServiceToken } from './constants';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  providers: [
    {
      provide: LoggerServiceToken,
      useClass: ConsoleLogger,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  exports: [LoggerServiceToken],
})
export class LoggerModule {}
