import { HttpExceptionFactory } from '@COMMON/exception';
import { AuthException } from '@devts/nestjs-auth';
import { LoggerService, HttpException } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { TypeGuardError } from 'typia';
import { LoggerServiceToken } from './constants';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(LoggerServiceToken)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof HttpException ||
          err instanceof TypeGuardError ||
          err instanceof AuthException
        ) {
          return throwError(() => err);
        } else {
          this.logger.error(err, context.getClass().name);
          return throwError(() => HttpExceptionFactory('ISE'));
        }
      }),
    );
  }
}
