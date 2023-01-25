import { IProfile } from '@INTERFACE/common';
import { accounts } from '@PRISMA';

export interface IAccountService {
  readonly findOne: (where: { id: string }) => Promise<accounts>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<accounts>;
}
