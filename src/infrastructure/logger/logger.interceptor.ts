import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggerServiceToken } from './injection.token';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(LoggerServiceToken)
    private readonly logger: ConsoleLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(err.message ?? err, context.getClass().name);
        return throwError(() => err);
      }),
    );
  }
}
