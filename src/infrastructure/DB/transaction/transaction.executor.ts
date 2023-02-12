import { getNamespace } from 'cls-hooked';
import { TransactionLevel } from '@COMMON/decorator/lazy';
import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { TRANSACTION_ENTITY_KEY, TRANSACTION_NS_KEY } from './constant';
import { Prisma } from '@PRISMA';
import { TRANSACTION_DECORATOR_KEY } from '@COMMON/constant';
import { PrismaService } from '../prisma.service';

@Aspect(TRANSACTION_DECORATOR_KEY)
export class TransactionDecorator implements LazyDecorator {
  constructor(private readonly prisma: PrismaService) {}

  wrap({ method, metadata }: WrapParams<any, TransactionLevel>) {
    return (...args: unknown[]) => {
      const namespace = getNamespace(TRANSACTION_NS_KEY);
      if (!namespace?.active) {
        throw Error('Namespace is not active');
      }
      const client = namespace.get(TRANSACTION_ENTITY_KEY);
      if (client) {
        return method(...args);
      }
      return this.prisma.$transaction(
        (tx) => {
          namespace.set(TRANSACTION_ENTITY_KEY, tx);
          return method(...args);
        },
        {
          isolationLevel: TransactionLevel[metadata],
        },
      );
    };
  }
}

const TransactionLevel: {
  [key in TransactionLevel]: Prisma.TransactionIsolationLevel;
} = {
  'READ UNCOMMITTED': 'ReadUncommitted',
  'READ COMMITTED': 'ReadCommitted',
  'REPEATABLE READ': 'RepeatableRead',
  SERIALIZABLE: 'Serializable',
};
