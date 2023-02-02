import { Account } from '@INTERFACE/account';
import { Session } from 'express-session';

export type ISession = Session & {
  account?: Pick<Account.State, 'id'>;
};
