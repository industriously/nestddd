import { DBClient } from '@INTERFACE/common';
import { ProviderBuilder } from '@UTIL';
import { getNamespace } from 'cls-hooked';
import { PrismaService } from './prisma.service';
import { TRANSACTION_CLIENT, TRANSACTION_NS_KEY } from './transaction';

export const ClientFactory = (prisma: PrismaService): DBClient => {
  return ProviderBuilder<DBClient>({
    get() {
      const namespace = getNamespace(TRANSACTION_NS_KEY);
      if (!namespace?.active) {
        throw Error('Namespace is not active');
      }

      return namespace.get(TRANSACTION_CLIENT) ?? prisma;
    },
  }).build();
};
