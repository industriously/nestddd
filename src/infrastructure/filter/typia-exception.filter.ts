import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { TypeGuardError } from 'typia';

@Catch(TypeGuardError)
export class TypeGuardErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: TypeGuardError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    httpAdapter.reply(
      ctx.getResponse(),
      createMessage(exception.expected, exception.path),
      HttpStatus.BAD_REQUEST,
    );
  }
}

const createMessage = (expected: string, path?: string): string => {
  const target = path?.split('$input.')[1];
  if (target == undefined) {
    return `invalid type, expected to be ${expected}`;
  }
  return `${target} type is invalid.`;
};
