import { Prisma } from '@PRISMA';

export interface DBClient {
  readonly get: () => Prisma.TransactionClient;
}
