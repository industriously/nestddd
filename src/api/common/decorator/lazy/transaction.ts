import { TRANSACTION_DECORATOR_KEY } from '@COMMON/constant';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export type TransactionLevel =
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE';

export const Transaction: (
  TransactionLevel?: TransactionLevel,
) => MethodDecorator = (TransactionLevel = 'REPEATABLE READ') => {
  return applyDecorators(
    SetMetadata(TRANSACTION_DECORATOR_KEY, TransactionLevel),
  );
};
