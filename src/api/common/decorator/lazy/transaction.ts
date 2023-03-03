import { TRANSACTION_DECORATOR_KEY } from '@COMMON/constants';
import { MethodMarker, Optional } from '@INTERFACE/common';
import { SetMetadata } from '@nestjs/common';

export type TransactionLevel =
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE';

export const Transaction: (
  TransactionLevel?: TransactionLevel,
) => MethodDecorator = (TransactionLevel = 'REPEATABLE READ') => {
  return SetMetadata(TRANSACTION_DECORATOR_KEY, TransactionLevel);
};

export const TransactionMarker: MethodMarker<Optional<TransactionLevel>> =
  (transactionLevel = 'REPEATABLE READ') =>
  (target) => {
    return Reflect.defineMetadata(
      TRANSACTION_DECORATOR_KEY,
      transactionLevel,
      target,
    );
  };
