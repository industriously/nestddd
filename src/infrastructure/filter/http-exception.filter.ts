import { ExceptionResponse } from '@INTERFACE/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const body: ExceptionResponse = {
      statusCode: exception.getStatus(),
      message: exception.message,
    };
    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}
