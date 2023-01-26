import { ExceptionResponse } from '@INTERFACE/common';
import { LoggerServiceToken } from '@LOGGER/service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(LoggerServiceToken)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    this.logger.warn(exception);
    const body: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL_SERVER_ERROR',
    };
    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}
