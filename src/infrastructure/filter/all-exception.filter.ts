import { HttpExceptionMessage } from '@COMMON/exception';
import { ExceptionResponse } from '@INTERFACE/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(_: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const body: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpExceptionMessage.ISE,
    };
    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}
