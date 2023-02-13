import { SIGN_IN_FAIL_URL } from '@COMMON/constants';
import { AuthException } from '@devts/nestjs-auth';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(AuthException)
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: AuthException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    httpAdapter.redirect(
      ctx.getResponse(),
      HttpStatus.PERMANENT_REDIRECT,
      SIGN_IN_FAIL_URL + '?error=' + exception.message,
    );
  }
}
