import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TypeGuardErrorFilter } from './filter/typia-exception.filter';
import { AuthExceptionFilter } from './filter/auth-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './DB/prisma.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, PrismaModule, ConfigModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter }, // last filter
    { provide: APP_FILTER, useClass: TypeGuardErrorFilter },
    { provide: APP_FILTER, useClass: AuthExceptionFilter }, // first filter.
  ],
})
export class InfrastructureModule {}
