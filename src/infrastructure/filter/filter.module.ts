import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthExceptionFilter } from './auth-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { TypeGuardErrorFilter } from './typia-exception.filter';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter }, // last filter
    { provide: APP_FILTER, useClass: TypeGuardErrorFilter },
    { provide: APP_FILTER, useClass: AuthExceptionFilter }, // first filter.
  ],
})
export class FilterModule {}
