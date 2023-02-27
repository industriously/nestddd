import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { ThrowThenDecorator } from './throw-then.executor';
import { TypeGuardErrorFilter } from './typia-exception.filter';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter }, // last filter
    { provide: APP_FILTER, useClass: TypeGuardErrorFilter },
    ThrowThenDecorator,
  ],
})
export class FilterModule {}
