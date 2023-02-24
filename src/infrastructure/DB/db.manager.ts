import { Injectable } from '@nestjs/common';
import { Prisma } from '@PRISMA';
import { getNamespace } from 'cls-hooked';
import { PrismaService } from './prisma.service';
import {
  TRANSACTION_NS_KEY,
  TRANSACTION_CLIENT,
} from './transaction/constants';

@Injectable()
export class DBManager {
  constructor(private readonly client: PrismaService) {}

  getClient(): Prisma.TransactionClient {
    const namespace = getNamespace(TRANSACTION_NS_KEY);
    if (!namespace?.active) {
      throw Error('Namespace is not active');
    }
    return namespace.get(TRANSACTION_CLIENT) ?? this.client;
  }
}
