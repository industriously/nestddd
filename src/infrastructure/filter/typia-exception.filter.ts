import { ExceptionResponse } from '@INTERFACE/common';
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
    const body: ExceptionResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: createMessage(exception.expected, exception.path),
    };
    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}

const createMessage = (expected: string, path?: string): string => {
  if (path == undefined) {
    return `invalid type, expected to be ${expected}`;
  }
  const target = path.split('$input.')[1];
  return `${target} type is invalid.`;
};
