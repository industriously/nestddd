import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { NestInterceptor } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { Observable } from 'rxjs';
import { TRANSACTION_NS_KEY } from './constants';

export class TransactionInterceptor implements NestInterceptor {
  constructor() {
    createNamespace(TRANSACTION_NS_KEY);
  }
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const namespace =
      getNamespace(TRANSACTION_NS_KEY) ?? createNamespace(TRANSACTION_NS_KEY);

    return namespace.runPromise(async () => next.handle());
  }
}
