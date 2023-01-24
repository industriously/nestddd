import { AllExceptionFilter } from './filter/all-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TypeGuardErrorFilter } from './filter/typia-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './DB/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter }, // last filter
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: TypeGuardErrorFilter }, // first filter.
  ],
})
export class InfrastructureModule {}
